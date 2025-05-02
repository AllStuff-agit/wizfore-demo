import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/AdminHomeIndex.module.css';

export default function HomePage() {
  const [formData, setFormData] = useState({
    히어로: {
      헤드라인: '',
      서브헤드라인: '',
      배경이미지URL: '',
      버튼텍스트: '',
      버튼링크: ''
    },
    주요프로그램: {
      활성화: true
    },
    전문가하이라이트: {
      활성화: true
    },
    센터소개: {
      활성화: true
    },
    커뮤니티업데이트: {
      활성화: true
    }
  });

  const [originalData, setOriginalData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
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

  // 메인 페이지 설정 가져오기
  useEffect(() => {
    const fetchMainPageSettings = async () => {
      try {
        const mainPageDoc = await getDoc(doc(db, '센터정보', 'main_page'));
        
        if (mainPageDoc.exists()) {
          const data = mainPageDoc.data();
          setFormData({
            히어로: {
              헤드라인: data.히어로?.헤드라인 || '',
              서브헤드라인: data.히어로?.서브헤드라인 || '',
              배경이미지URL: data.히어로?.배경이미지URL || '',
              버튼텍스트: data.히어로?.버튼텍스트 || '',
              버튼링크: data.히어로?.버튼링크 || ''
            },
            주요프로그램: {
              활성화: data.주요프로그램?.활성화 !== false
            },
            전문가하이라이트: {
              활성화: data.전문가하이라이트?.활성화 !== false
            },
            센터소개: {
              활성화: data.센터소개?.활성화 !== false
            },
            커뮤니티업데이트: {
              활성화: data.커뮤니티업데이트?.활성화 !== false
            }
          });
          setOriginalData(data);
          setImagePreview(data.히어로?.배경이미지URL);
        }
      } catch (error) {
        console.error('홈 설정 가져오기 오류:', error);
        setError('홈 설정을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMainPageSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 중첩된 객체 필드 처리
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (type === 'checkbox') {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: checked
          }
        });
      } else {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: value
          }
        });
      }
    } else {
      if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setBackgroundImage(file);
    
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const uploadBackgroundImage = async (file) => {
    const timestamp = Date.now();
    const path = `main_page/hero_background_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      let backgroundImageURL = formData.히어로.배경이미지URL;

      // 새 배경 이미지 업로드 (있는 경우)
      if (backgroundImage) {
        backgroundImageURL = await uploadBackgroundImage(backgroundImage);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (originalData?.히어로?.배경이미지URL && originalData.히어로.배경이미지URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.히어로.배경이미지URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      // 히어로 섹션 배경 이미지 URL 업데이트
      const updatedFormData = {
        ...formData,
        히어로: {
          ...formData.히어로,
          배경이미지URL: backgroundImageURL
        }
      };

      const mainPageRef = doc(db, '센터정보', 'main_page');
      const data = {
        ...updatedFormData,
        수정일: serverTimestamp()
      };

      // 문서가 존재하면 업데이트, 없으면 새로 생성
      if (originalData) {
        await updateDoc(mainPageRef, data);
      } else {
        data.생성일 = serverTimestamp();
        await setDoc(mainPageRef, data);
      }

      setOriginalData(data);
      alert('홈 설정이 저장되었습니다.');
      setSaving(false);
    } catch (error) {
      console.error('홈 설정 저장 오류:', error);
      setError('홈 설정 저장 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="홈 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="홈 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>홈</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h2>히어로 섹션</h2>
          <div className={styles.formGroup}>
            <label htmlFor="히어로.헤드라인">헤드라인</label>
            <input
              type="text"
              id="히어로.헤드라인"
              name="히어로.헤드라인"
              value={formData.히어로.헤드라인}
              onChange={handleInputChange}
              placeholder="예: 아이들의 밝은 미래를 함께 만들어갑니다"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="히어로.서브헤드라인">서브헤드라인</label>
            <input
              type="text"
              id="히어로.서브헤드라인"
              name="히어로.서브헤드라인"
              value={formData.히어로.서브헤드라인}
              onChange={handleInputChange}
              placeholder="예: 위즈포레는 특수교육 및 치료 서비스를 통해 아동 발달을 지원합니다"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="배경이미지">배경 이미지</label>
            <div className={styles.imageUpload}>
              <input
                type="file"
                id="배경이미지"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="배경 이미지 미리보기" />
                </div>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="히어로.버튼텍스트">버튼 텍스트</label>
              <input
                type="text"
                id="히어로.버튼텍스트"
                name="히어로.버튼텍스트"
                value={formData.히어로.버튼텍스트}
                onChange={handleInputChange}
                placeholder="예: 프로그램 알아보기"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="히어로.버튼링크">버튼 링크</label>
              <input
                type="text"
                id="히어로.버튼링크"
                name="히어로.버튼링크"
                value={formData.히어로.버튼링크}
                onChange={handleInputChange}
                placeholder="예: /programs"
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>섹션 활성화 설정</h2>
          <p>메인 페이지에 표시할 섹션을 선택하세요.</p>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="주요프로그램.활성화"
                checked={formData.주요프로그램.활성화}
                onChange={handleInputChange}
              />
              <span>프로그램 소개 섹션</span>
            </label>
          </div>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="전문가하이라이트.활성화"
                checked={formData.전문가하이라이트.활성화}
                onChange={handleInputChange}
              />
              <span>전문가 하이라이트 섹션</span>
            </label>
          </div>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="센터소개.활성화"
                checked={formData.센터소개.활성화}
                onChange={handleInputChange}
              />
              <span>센터 소개 섹션</span>
            </label>
          </div>
          
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="커뮤니티업데이트.활성화"
                checked={formData.커뮤니티업데이트.활성화}
                onChange={handleInputChange}
              />
              <span>커뮤니티 업데이트 섹션</span>
            </label>
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
HomePage.getLayout = (page) => page;