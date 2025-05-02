import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';

export default function VisionPage() {
  const [formData, setFormData] = useState({
    비전: '',
    인사말: '',
    이미지URL: ''
  });

  const [originalData, setOriginalData] = useState(null);
  const [visionImage, setVisionImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // 비전 정보 가져오기
  useEffect(() => {
    const fetchVisionInfo = async () => {
      try {
        const visionInfoDoc = await getDoc(doc(db, '센터정보', 'vision'));
        
        if (visionInfoDoc.exists()) {
          const data = visionInfoDoc.data();
          setFormData({
            비전: data.비전 || '',
            인사말: data.인사말 || '',
            이미지URL: data.이미지URL || ''
          });
          setOriginalData(data);
          setImagePreview(data.이미지URL);
        }
      } catch (error) {
        console.error('비전 정보 가져오기 오류:', error);
        setError('비전 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisionInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setVisionImage(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const path = `center/vision_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      let imageURL = formData.이미지URL;

      // 새 이미지 업로드 (있는 경우)
      if (visionImage) {
        imageURL = await uploadImage(visionImage);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (originalData?.이미지URL && originalData.이미지URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.이미지URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      const visionInfoRef = doc(db, '센터정보', 'vision');
      const data = {
        ...formData,
        이미지URL: imageURL,
        수정일: serverTimestamp()
      };

      // 문서가 존재하면 업데이트, 없으면 새로 생성
      if (originalData) {
        await updateDoc(visionInfoRef, data);
      } else {
        data.생성일 = serverTimestamp();
        await setDoc(visionInfoRef, data);
      }

      setOriginalData(data);
      alert('비전·인사말 정보가 저장되었습니다.');
      setSaving(false);
    } catch (error) {
      console.error('비전·인사말 정보 저장 오류:', error);
      setError('비전·인사말 정보 저장 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="비전 · 인사말 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="비전 · 인사말 - 위즈포레 관리자">
      <div className="page-header">
        <div className="header-nav">
          <Link href="/admin/about">센터 소개</Link> &gt; 비전 · 인사말
        </div>
        <h1>비전 · 인사말</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="content-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-section">
            <h2>비전</h2>
            <div className="form-group">
              <label htmlFor="비전">비전</label>
              <textarea
                id="비전"
                name="비전"
                value={formData.비전}
                onChange={handleTextareaChange}
                rows="4"
                placeholder="센터의 비전을 입력하세요"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>인사말</h2>
            <div className="form-group">
              <label htmlFor="인사말">인사말</label>
              <textarea
                id="인사말"
                name="인사말"
                value={formData.인사말}
                onChange={handleTextareaChange}
                rows="6"
                placeholder="센터장의 인사말을 입력하세요"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>이미지</h2>
            <div className="form-group">
              <label htmlFor="이미지">대표 이미지</label>
              <div className="image-upload">
                <input
                  type="file"
                  id="이미지"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="대표 이미지 미리보기" />
                  </div>
                )}
              </div>
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
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
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
          border: 1px solid #E5E7EB;
          border-radius: 0.375rem;
          overflow: hidden;
        }
        
        .image-preview img {
          max-width: 100%;
          height: auto;
          display: block;
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
VisionPage.getLayout = (page) => page;