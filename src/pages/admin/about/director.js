import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';

export default function DirectorPage() {
  const [formData, setFormData] = useState({
    이름: '',
    직책: '',
    프로필사진URL: '',
    학력: [],
    경력: [],
    전문분야: [],
    자격증: [],
    소개글: ''
  });

  const [originalData, setOriginalData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newValue, setNewValue] = useState({
    학력: '',
    경력: '',
    전문분야: '',
    자격증: ''
  });
  
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

  // 센터장 정보 가져오기
  useEffect(() => {
    const fetchDirectorInfo = async () => {
      try {
        const directorInfoDoc = await getDoc(doc(db, '센터정보', 'director'));
        
        if (directorInfoDoc.exists()) {
          const data = directorInfoDoc.data();
          setFormData({
            이름: data.이름 || '',
            직책: data.직책 || '',
            프로필사진URL: data.프로필사진URL || '',
            학력: data.학력 || [],
            경력: data.경력 || [],
            전문분야: data.전문분야 || [],
            자격증: data.자격증 || [],
            소개글: data.소개글 || ''
          });
          setOriginalData(data);
          setImagePreview(data.프로필사진URL);
        }
      } catch (error) {
        console.error('센터장 정보 가져오기 오류:', error);
        setError('센터장 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDirectorInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setNewValue({ ...newValue, [name]: value });
  };

  const addArrayItem = (field) => {
    if (newValue[field] && newValue[field].trim() !== '') {
      setFormData({
        ...formData,
        [field]: [...formData[field], newValue[field]]
      });
      setNewValue({ ...newValue, [field]: '' });
    }
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

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

  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const path = `center/director_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      let profileImageURL = formData.프로필사진URL;

      // 새 프로필 이미지 업로드 (있는 경우)
      if (profileImage) {
        profileImageURL = await uploadImage(profileImage);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (originalData?.프로필사진URL && originalData.프로필사진URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.프로필사진URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      const directorInfoRef = doc(db, '센터정보', 'director');
      const data = {
        ...formData,
        프로필사진URL: profileImageURL,
        수정일: serverTimestamp()
      };

      // 문서가 존재하면 업데이트, 없으면 새로 생성
      if (originalData) {
        await updateDoc(directorInfoRef, data);
      } else {
        data.생성일 = serverTimestamp();
        await setDoc(directorInfoRef, data);
      }

      setOriginalData(data);
      alert('센터장 정보가 저장되었습니다.');
      setSaving(false);
    } catch (error) {
      console.error('센터장 정보 저장 오류:', error);
      setError('센터장 정보 저장 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="센터장 소개 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="센터장 소개 - 위즈포레 관리자">
      <div className="page-header">
        <div className="header-nav">
          <Link href="/admin/about">센터 소개</Link> &gt; 센터장 소개
        </div>
        <h1>센터장 소개</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="content-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-section">
            <h2>기본 정보</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="이름">이름 *</label>
                <input
                  type="text"
                  id="이름"
                  name="이름"
                  value={formData.이름}
                  onChange={handleInputChange}
                  required
                  placeholder="예: 홍길동"
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
                  required
                  placeholder="예: 센터장"
                />
              </div>
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
                rows="6"
                placeholder="센터장 소개글을 입력하세요"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>전문 분야</h2>
            <div className="array-input-header">
              <div className="array-input-actions">
                <input
                  type="text"
                  name="전문분야"
                  value={newValue.전문분야}
                  onChange={handleArrayInputChange}
                  placeholder="예: 언어발달, 아동심리"
                />
                <button 
                  type="button" 
                  onClick={() => addArrayItem('전문분야')}
                  className="add-button"
                >
                  추가
                </button>
              </div>
            </div>
            <div className="array-items">
              {formData.전문분야.map((item, index) => (
                <div key={index} className="array-item">
                  <span>{item}</span>
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('전문분야', index)}
                    className="remove-button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>학력</h2>
            <div className="array-input-header">
              <div className="array-input-actions">
                <input
                  type="text"
                  name="학력"
                  value={newValue.학력}
                  onChange={handleArrayInputChange}
                  placeholder="예: OO대학교 OO학과 학사"
                />
                <button 
                  type="button" 
                  onClick={() => addArrayItem('학력')}
                  className="add-button"
                >
                  추가
                </button>
              </div>
            </div>
            <div className="array-items">
              {formData.학력.map((item, index) => (
                <div key={index} className="array-item">
                  <span>{item}</span>
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('학력', index)}
                    className="remove-button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>경력</h2>
            <div className="array-input-header">
              <div className="array-input-actions">
                <input
                  type="text"
                  name="경력"
                  value={newValue.경력}
                  onChange={handleArrayInputChange}
                  placeholder="예: OO기관 OO직책 (2018-2020)"
                />
                <button 
                  type="button" 
                  onClick={() => addArrayItem('경력')}
                  className="add-button"
                >
                  추가
                </button>
              </div>
            </div>
            <div className="array-items">
              {formData.경력.map((item, index) => (
                <div key={index} className="array-item">
                  <span>{item}</span>
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('경력', index)}
                    className="remove-button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>자격증</h2>
            <div className="array-input-header">
              <div className="array-input-actions">
                <input
                  type="text"
                  name="자격증"
                  value={newValue.자격증}
                  onChange={handleArrayInputChange}
                  placeholder="예: 언어재활사 1급"
                />
                <button 
                  type="button" 
                  onClick={() => addArrayItem('자격증')}
                  className="add-button"
                >
                  추가
                </button>
              </div>
            </div>
            <div className="array-items">
              {formData.자격증.map((item, index) => (
                <div key={index} className="array-item">
                  <span>{item}</span>
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('자격증', index)}
                    className="remove-button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={saving}
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
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
        
        .content-wrapper {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          padding: 2rem;
        }
        
        .form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-section h2 {
          font-size: 1.2rem;
          color: #4B5563;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
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
        
        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #2563EB;
          outline: none;
        }
        
        .image-upload {
          margin-top: 0.5rem;
        }
        
        .image-preview {
          margin-top: 1rem;
          max-width: 300px;
          border: 1px solid #E5E7EB;
          border-radius: 0.375rem;
          overflow: hidden;
        }
        
        .image-preview img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        .array-input-header {
          margin-bottom: 1rem;
        }
        
        .array-input-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .array-input-actions input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.15s ease-in-out;
        }
        
        .array-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .array-item {
          display: flex;
          align-items: center;
          background-color: #EBF5FF;
          border-radius: 0.25rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        
        .array-item span {
          color: #1F2937;
        }
        
        .add-button {
          background-color: #2563EB;
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }
        
        .add-button:hover {
          background-color: #1D4ED8;
        }
        
        .remove-button {
          background: none;
          border: none;
          color: #4B5563;
          cursor: pointer;
          margin-left: 0.5rem;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 9999px;
        }
        
        .remove-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #DC2626;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        
        .submit-button {
          background-color: #2563EB;
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }
        
        .submit-button:hover {
          background-color: #1D4ED8;
        }
        
        .submit-button:disabled {
          background-color: #93C5FD;
          cursor: not-allowed;
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
      `}</style>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
DirectorPage.getLayout = (page) => page;