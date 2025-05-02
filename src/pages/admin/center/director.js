import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/center/Info.module.css';

export default function DirectorInfo() {
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
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="센터장 소개 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>센터장 소개</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h2>기본 정보</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
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
            
            <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
            <label htmlFor="프로필사진">프로필 사진</label>
            <div className={styles.imageUpload}>
              <input
                type="file"
                id="프로필사진"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="프로필 사진 미리보기" />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
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

        <div className={styles.formSection}>
          <h2>전문 분야</h2>
          <div className={styles.arrayInputHeader}>
            <div className={styles.arrayInputActions}>
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
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.전문분야.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('전문분야', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>학력</h2>
          <div className={styles.arrayInputHeader}>
            <div className={styles.arrayInputActions}>
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
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.학력.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('학력', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>경력</h2>
          <div className={styles.arrayInputHeader}>
            <div className={styles.arrayInputActions}>
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
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.경력.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('경력', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>자격증</h2>
          <div className={styles.arrayInputHeader}>
            <div className={styles.arrayInputActions}>
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
                className={styles.addButton}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.arrayItems}>
            {formData.자격증.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => removeArrayItem('자격증', index)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
DirectorInfo.getLayout = (page) => page;
