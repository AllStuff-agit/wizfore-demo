import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    이름: '',
    카테고리: '',
    설명: '',
    이미지URL: '',
    순서: 0,
    isActive: true
  });
  const [facilityImage, setFacilityImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const router = useRouter();

  // 카테고리 옵션
  const categories = [
    '치료실',
    '상담실',
    '그룹 활동 공간',
    '특수 스포츠 시설',
    '편의 시설',
    '기타'
  ];

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 시설 데이터 불러오기
  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setIsLoading(true);
      
      // Firestore에서 시설 데이터 가져오기
      const facilitiesCollection = collection(db, '센터정보', 'facilities', 'items');
      const q = query(facilitiesCollection, orderBy('카테고리'), orderBy('순서'));
      const querySnapshot = await getDocs(q);
      
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setFacilities(items);
    } catch (err) {
      console.error('시설 데이터 불러오기 오류:', err);
      setError('시설 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 입력 폼 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === '순서') {
      // 순서는 숫자 값으로 변환
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // 이미지 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setFacilityImage(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      이름: '',
      카테고리: '',
      설명: '',
      이미지URL: '',
      순서: 0,
      isActive: true
    });
    setFacilityImage(null);
    setImagePreview('');
    setEditMode(false);
    setEditId(null);
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const path = `facilities/image_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // 입력값 검증
    if (!formData.이름 || !formData.카테고리) {
      alert('필수 필드를 모두 입력해주세요.');
      setSaving(false);
      return;
    }

    try {
      let imageURL = formData.이미지URL;

      // 새 이미지 업로드 (있는 경우)
      if (facilityImage) {
        imageURL = await uploadImage(facilityImage);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (editMode && formData.이미지URL && formData.이미지URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, formData.이미지URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      const facilityData = {
        ...formData,
        이미지URL: imageURL,
        updatedAt: serverTimestamp()
      };

      if (editMode) {
        // 기존 항목 업데이트
        const facilityRef = doc(db, '센터정보', 'facilities', 'items', editId);
        await updateDoc(facilityRef, facilityData);
      } else {
        // 새 항목 추가
        const facilitiesCollection = collection(db, '센터정보', 'facilities', 'items');
        const newItemRef = doc(facilitiesCollection);
        facilityData.createdAt = serverTimestamp();
        await setDoc(newItemRef, facilityData);
      }

      resetForm();
      fetchFacilities();
      alert(editMode ? '시설 정보가 수정되었습니다.' : '시설이 추가되었습니다.');
    } catch (err) {
      console.error(editMode ? '시설 수정 오류:' : '시설 추가 오류:', err);
      setError(editMode ? '시설 정보 수정에 실패했습니다.' : '시설 추가에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 항목 수정 모드 전환
  const handleEdit = (facility) => {
    setFormData({
      이름: facility.이름 || '',
      카테고리: facility.카테고리 || '',
      설명: facility.설명 || '',
      이미지URL: facility.이미지URL || '',
      순서: facility.순서 || 0,
      isActive: facility.isActive !== false
    });
    setImagePreview(facility.이미지URL || '');
    setEditMode(true);
    setEditId(facility.id);
  };

  // 항목 삭제
  const handleDelete = async (id, imageURL) => {
    if (!window.confirm('정말로 이 시설을 삭제하시겠습니까?')) {
      return;
    }

    try {
      // Firestore에서 시설 문서 삭제
      const facilityRef = doc(db, '센터정보', 'facilities', 'items', id);
      await deleteDoc(facilityRef);

      // Storage에서 이미지 삭제 (있는 경우)
      if (imageURL && imageURL.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageURL);
          await deleteObject(imageRef);
        } catch (error) {
          console.warn('이미지 삭제 실패:', error);
        }
      }

      fetchFacilities();
      alert('시설이 삭제되었습니다.');
    } catch (err) {
      console.error('시설 삭제 오류:', err);
      setError('시설 삭제에 실패했습니다.');
    }
  };

  // 항목 활성화 상태 전환
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const facilityRef = doc(db, '센터정보', 'facilities', 'items', id);
      await updateDoc(facilityRef, {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchFacilities();
    } catch (err) {
      console.error('상태 변경 오류:', err);
      setError('시설 상태 변경에 실패했습니다.');
    }
  };

  // 카테고리별로 시설 그룹화
  const facilitiesByCategory = facilities.reduce((acc, facility) => {
    const category = facility.카테고리 || '기타';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(facility);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <AdminLayout title="시설 안내 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="시설 안내 - 위즈포레 관리자">
      <div className="page-header">
        <div className="header-nav">
          <Link href="/admin/about">센터 소개</Link> &gt; 시설 안내
        </div>
        <h1>시설 안내</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="content-grid">
        {/* 시설 목록 섹션 */}
        <section className="list-section">
          <h2>시설 목록</h2>
          
          {facilities.length === 0 ? (
            <div className="empty-list">등록된 시설이 없습니다.</div>
          ) : (
            <div className="facilities-list">
              {Object.entries(facilitiesByCategory).map(([category, items]) => (
                <div key={category} className="category-group">
                  <h3 className="category-title">{category}</h3>
                  <div className="facilities-grid">
                    {items.map((facility) => (
                      <div 
                        key={facility.id} 
                        className={`facility-card ${!facility.isActive ? 'inactive-card' : ''}`}
                      >
                        <div className="facility-actions">
                          <button 
                            onClick={() => handleEdit(facility)} 
                            className="edit-button"
                            title="수정"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(facility.id, facility.이미지URL)} 
                            className="delete-button"
                            title="삭제"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button 
                            onClick={() => handleToggleActive(facility.id, facility.isActive)} 
                            className="toggle-button"
                            title={facility.isActive ? '비활성화' : '활성화'}
                          >
                            {facility.isActive ? 
                              <i className="fas fa-eye-slash"></i> : 
                              <i className="fas fa-eye"></i>
                            }
                          </button>
                        </div>
                        
                        <div className="facility-image">
                          {facility.이미지URL ? (
                            <img src={facility.이미지URL} alt={facility.이름} />
                          ) : (
                            <div className="image-placeholder">
                              <i className="fas fa-building"></i>
                            </div>
                          )}
                          <div className="facility-status">
                            {facility.isActive ? (
                              <span className="status-active">활성</span>
                            ) : (
                              <span className="status-inactive">비활성</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="facility-content">
                          <h4 className="facility-name">{facility.이름}</h4>
                          {facility.설명 && (
                            <p className="facility-description">{facility.설명}</p>
                          )}
                          <div className="facility-meta">
                            <span className="facility-order">순서: {facility.순서}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* 입력 폼 섹션 */}
        <section className="form-section">
          <h2>{editMode ? '시설 수정' : '새 시설 추가'}</h2>
          
          <form onSubmit={handleSubmit} className="facility-form">
            <div className="form-group">
              <label htmlFor="이름">시설 이름 *</label>
              <input
                type="text"
                id="이름"
                name="이름"
                value={formData.이름}
                onChange={handleInputChange}
                placeholder="예: 언어치료실"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="카테고리">카테고리 *</label>
              <select
                id="카테고리"
                name="카테고리"
                value={formData.카테고리}
                onChange={handleInputChange}
                required
              >
                <option value="">카테고리 선택</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="순서">정렬 순서</label>
              <input
                type="number"
                id="순서"
                name="순서"
                value={formData.순서}
                onChange={handleInputChange}
                min="0"
                placeholder="0"
              />
              <small>낮은 숫자가 먼저 표시됩니다.</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="설명">설명</label>
              <textarea
                id="설명"
                name="설명"
                value={formData.설명}
                onChange={handleInputChange}
                rows="4"
                placeholder="시설에 대한 설명을 입력하세요"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="시설이미지">시설 이미지</label>
              <div className="image-upload">
                <input
                  type="file"
                  id="시설이미지"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="시설 이미지 미리보기" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <span>활성화 (웹사이트에 표시)</span>
              </label>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> 저장 중...
                  </>
                ) : (
                  editMode ? '수정하기' : '추가하기'
                )}
              </button>
              
              {editMode && (
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={resetForm}
                >
                  취소
                </button>
              )}
            </div>
          </form>
        </section>
      </div>

      <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
        
        .header-nav {
          font-size: 0.9rem;
          color: #6B7280;
          margin-bottom: 0.5rem;
        }
        
        .header-nav a {
          color: #2563EB;
          text-decoration: none;
        }
        
        .header-nav a:hover {
          text-decoration: underline;
        }
        
        .page-header h1 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2rem;
        }
        
        .list-section, .form-section {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          padding: 1.5rem;
        }
        
        .list-section h2, .form-section h2 {
          font-size: 1.2rem;
          color: #4B5563;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .facilities-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .category-group {
          margin-bottom: 1.5rem;
        }
        
        .category-title {
          font-size: 1.1rem;
          color: #1F2937;
          margin-bottom: 1rem;
          padding-left: 0.5rem;
          border-left: 3px solid #2563EB;
        }
        
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .facility-card {
          background-color: #F9FAFB;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease-in-out;
          position: relative;
        }
        
        .facility-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .inactive-card {
          opacity: 0.7;
        }
        
        .facility-actions {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          display: flex;
          gap: 0.25rem;
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 4px;
          padding: 0.25rem;
        }
        
        .edit-button, .delete-button, .toggle-button {
          background: none;
          border: none;
          cursor: pointer;
          width: 1.75rem;
          height: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.25rem;
          transition: background-color 0.15s ease-in-out;
        }
        
        .edit-button {
          color: #2563EB;
        }
        
        .edit-button:hover {
          background-color: #EFF6FF;
        }
        
        .delete-button {
          color: #DC2626;
        }
        
        .delete-button:hover {
          background-color: #FEE2E2;
        }
        
        .toggle-button {
          color: #4B5563;
        }
        
        .toggle-button:hover {
          background-color: #F3F4F6;
        }
        
        .facility-image {
          height: 180px;
          position: relative;
          background-color: #F3F4F6;
          overflow: hidden;
        }
        
        .facility-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9CA3AF;
          font-size: 3rem;
        }
        
        .facility-status {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
        }
        
        .status-active, .status-inactive {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .status-active {
          background-color: #D1FAE5;
          color: #047857;
        }
        
        .status-inactive {
          background-color: #F3F4F6;
          color: #6B7280;
        }
        
        .facility-content {
          padding: 1rem;
        }
        
        .facility-name {
          font-size: 1.1rem;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }
        
        .facility-description {
          color: #4B5563;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .facility-meta {
          color: #6B7280;
          font-size: 0.75rem;
        }
        
        .empty-list {
          padding: 2rem;
          text-align: center;
          color: #6B7280;
          background-color: #F9FAFB;
          border-radius: 8px;
          border: 1px dashed #E5E7EB;
        }
        
        .facility-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 0.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }
        
        .form-group small {
          display: block;
          color: #6B7280;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        
        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.15s ease-in-out;
        }
        
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          font-size: 1rem;
          line-height: 1.5;
          transition: border-color 0.15s ease-in-out;
          resize: vertical;
        }
        
        .form-group input[type="text"]:focus,
        .form-group input[type="number"]:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #2563EB;
          outline: none;
        }
        
        .image-upload {
          margin-top: 0.5rem;
        }
        
        .image-preview {
          margin-top: 1rem;
          max-width: 100%;
          max-height: 200px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
        }
        
        .image-preview img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 500;
          color: #374151;
        }
        
        .checkbox-label input {
          margin-right: 0.5rem;
        }
        
        .form-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .submit-button, .cancel-button {
          padding: 0.75rem 1.25rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .submit-button {
          background-color: #2563EB;
          color: white;
          border: none;
        }
        
        .submit-button:hover {
          background-color: #1D4ED8;
        }
        
        .submit-button:disabled {
          background-color: #93C5FD;
          cursor: not-allowed;
        }
        
        .cancel-button {
          background-color: #F3F4F6;
          color: #4B5563;
          border: 1px solid #D1D5DB;
        }
        
        .cancel-button:hover {
          background-color: #E5E7EB;
        }
        
        .error {
          background-color: #FEE2E2;
          color: #B91C1C;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #2563EB;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .facilities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
FacilitiesPage.getLayout = (page) => page;