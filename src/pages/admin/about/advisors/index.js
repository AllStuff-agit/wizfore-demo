import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    이름: '',
    소속: '',
    직책: '',
    전문분야: '',
    프로필사진URL: '',
    소개글: '',
    isActive: true
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const router = useRouter();

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 자문위원 데이터 불러오기
  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      setIsLoading(true);
      
      // Firestore에서 자문위원 데이터 가져오기
      const advisorsCollection = collection(db, '센터정보', 'advisors', 'items');
      const q = query(advisorsCollection, orderBy('이름'));
      const querySnapshot = await getDocs(q);
      
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setAdvisors(items);
    } catch (err) {
      console.error('자문위원 데이터 불러오기 오류:', err);
      setError('자문위원 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 입력 폼 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 이미지 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setProfileImage(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      이름: '',
      소속: '',
      직책: '',
      전문분야: '',
      프로필사진URL: '',
      소개글: '',
      isActive: true
    });
    setProfileImage(null);
    setImagePreview('');
    setEditMode(false);
    setEditId(null);
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const path = `advisors/profile_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // 입력값 검증
    if (!formData.이름 || !formData.소속 || !formData.직책) {
      alert('필수 필드를 모두 입력해주세요.');
      setSaving(false);
      return;
    }

    try {
      let profileImageURL = formData.프로필사진URL;

      // 새 프로필 이미지 업로드 (있는 경우)
      if (profileImage) {
        profileImageURL = await uploadImage(profileImage);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (editMode && formData.프로필사진URL && formData.프로필사진URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, formData.프로필사진URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      const advisorData = {
        ...formData,
        프로필사진URL: profileImageURL,
        updatedAt: serverTimestamp()
      };

      if (editMode) {
        // 기존 항목 업데이트
        const advisorRef = doc(db, '센터정보', 'advisors', 'items', editId);
        await updateDoc(advisorRef, advisorData);
      } else {
        // 새 항목 추가
        const advisorsCollection = collection(db, '센터정보', 'advisors', 'items');
        const newItemRef = doc(advisorsCollection);
        advisorData.createdAt = serverTimestamp();
        await setDoc(newItemRef, advisorData);
      }

      resetForm();
      fetchAdvisors();
      alert(editMode ? '자문위원 정보가 수정되었습니다.' : '자문위원이 추가되었습니다.');
    } catch (err) {
      console.error(editMode ? '자문위원 수정 오류:' : '자문위원 추가 오류:', err);
      setError(editMode ? '자문위원 정보 수정에 실패했습니다.' : '자문위원 추가에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 항목 수정 모드 전환
  const handleEdit = (advisor) => {
    setFormData({
      이름: advisor.이름 || '',
      소속: advisor.소속 || '',
      직책: advisor.직책 || '',
      전문분야: advisor.전문분야 || '',
      프로필사진URL: advisor.프로필사진URL || '',
      소개글: advisor.소개글 || '',
      isActive: advisor.isActive !== false
    });
    setImagePreview(advisor.프로필사진URL || '');
    setEditMode(true);
    setEditId(advisor.id);
  };

  // 항목 삭제
  const handleDelete = async (id, imageURL) => {
    if (!window.confirm('정말로 이 자문위원을 삭제하시겠습니까?')) {
      return;
    }

    try {
      // Firestore에서 자문위원 문서 삭제
      const advisorRef = doc(db, '센터정보', 'advisors', 'items', id);
      await deleteDoc(advisorRef);

      // Storage에서 프로필 이미지 삭제 (있는 경우)
      if (imageURL && imageURL.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageURL);
          await deleteObject(imageRef);
        } catch (error) {
          console.warn('이미지 삭제 실패:', error);
        }
      }

      fetchAdvisors();
      alert('자문위원이 삭제되었습니다.');
    } catch (err) {
      console.error('자문위원 삭제 오류:', err);
      setError('자문위원 삭제에 실패했습니다.');
    }
  };

  // 항목 활성화 상태 전환
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const advisorRef = doc(db, '센터정보', 'advisors', 'items', id);
      await updateDoc(advisorRef, {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchAdvisors();
    } catch (err) {
      console.error('상태 변경 오류:', err);
      setError('자문위원 상태 변경에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="전문 자문단 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="전문 자문단 - 위즈포레 관리자">
      <div className="page-header">
        <div className="header-nav">
          <Link href="/admin/about">센터 소개</Link> &gt; 전문 자문단
        </div>
        <h1>전문 자문단</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="content-grid">
        {/* 자문위원 목록 섹션 */}
        <section className="list-section">
          <h2>자문위원 목록</h2>
          
          {advisors.length === 0 ? (
            <div className="empty-list">등록된 자문위원이 없습니다.</div>
          ) : (
            <div className="advisors-grid">
              {advisors.map((advisor) => (
                <div 
                  key={advisor.id} 
                  className={`advisor-card ${!advisor.isActive ? 'inactive-card' : ''}`}
                >
                  <div className="advisor-header">
                    <div className="advisor-status">
                      {advisor.isActive ? (
                        <span className="status-active">활성</span>
                      ) : (
                        <span className="status-inactive">비활성</span>
                      )}
                    </div>
                    <div className="advisor-actions">
                      <button 
                        onClick={() => handleEdit(advisor)} 
                        className="edit-button"
                        title="수정"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(advisor.id, advisor.프로필사진URL)} 
                        className="delete-button"
                        title="삭제"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button 
                        onClick={() => handleToggleActive(advisor.id, advisor.isActive)} 
                        className="toggle-button"
                        title={advisor.isActive ? '비활성화' : '활성화'}
                      >
                        {advisor.isActive ? 
                          <i className="fas fa-eye-slash"></i> : 
                          <i className="fas fa-eye"></i>
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div className="advisor-content">
                    <div className="advisor-image">
                      {advisor.프로필사진URL ? (
                        <img src={advisor.프로필사진URL} alt={`${advisor.이름} 프로필`} />
                      ) : (
                        <div className="image-placeholder">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="advisor-info">
                      <h3>{advisor.이름}</h3>
                      <p className="advisor-title">{advisor.소속} {advisor.직책}</p>
                      {advisor.전문분야 && (
                        <p className="advisor-specialty">
                          <span className="label">전문 분야:</span> {advisor.전문분야}
                        </p>
                      )}
                      {advisor.소개글 && (
                        <p className="advisor-bio">{advisor.소개글}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* 입력 폼 섹션 */}
        <section className="form-section">
          <h2>{editMode ? '자문위원 수정' : '새 자문위원 추가'}</h2>
          
          <form onSubmit={handleSubmit} className="advisor-form">
            <div className="form-group">
              <label htmlFor="이름">이름 *</label>
              <input
                type="text"
                id="이름"
                name="이름"
                value={formData.이름}
                onChange={handleInputChange}
                placeholder="예: 홍길동"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="소속">소속 *</label>
                <input
                  type="text"
                  id="소속"
                  name="소속"
                  value={formData.소속}
                  onChange={handleInputChange}
                  placeholder="예: OO대학교"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="직책">직책 *</label>
                <input
                  type="text"
                  id="직책"
                  name="직책"
                  value={formData.직책}
                  onChange={handleInputChange}
                  placeholder="예: 교수"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="전문분야">전문 분야</label>
              <input
                type="text"
                id="전문분야"
                name="전문분야"
                value={formData.전문분야}
                onChange={handleInputChange}
                placeholder="예: 언어병리학, 특수교육"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="프로필사진">프로필 사진</label>
              <div className="image-upload">
                <input
                  type="file"
                  id="프로필사진"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="프로필 사진 미리보기" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="소개글">소개글</label>
              <textarea
                id="소개글"
                name="소개글"
                value={formData.소개글}
                onChange={handleInputChange}
                rows="4"
                placeholder="자문위원 소개글을 입력하세요"
              ></textarea>
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
        
        .advisors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .advisor-card {
          background-color: #F9FAFB;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease-in-out;
        }
        
        .advisor-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .inactive-card {
          opacity: 0.7;
        }
        
        .advisor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: #F3F4F6;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .advisor-status {
          display: flex;
          align-items: center;
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
        
        .advisor-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .edit-button, .delete-button, .toggle-button {
          background: none;
          border: none;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
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
        
        .advisor-content {
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
        }
        
        .advisor-image {
          flex: 0 0 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #F3F4F6;
        }
        
        .advisor-image img {
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
          font-size: 2rem;
        }
        
        .advisor-info {
          flex: 1;
        }
        
        .advisor-info h3 {
          font-size: 1.25rem;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }
        
        .advisor-title {
          color: #4B5563;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        
        .advisor-specialty {
          color: #4B5563;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }
        
        .advisor-specialty .label {
          font-weight: 600;
        }
        
        .advisor-bio {
          color: #6B7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .empty-list {
          padding: 2rem;
          text-align: center;
          color: #6B7280;
          background-color: #F9FAFB;
          border-radius: 8px;
          border: 1px dashed #E5E7EB;
        }
        
        .advisor-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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
        
        .form-group input[type="text"] {
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
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .advisors-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
AdvisorsPage.getLayout = (page) => page;