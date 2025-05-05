import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, storage } from '../../../firebase/firebase';
import { getHomeSettings, updateHomeSettings } from '../../../services/settingsService';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/home/Index.module.css';

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

  // 홈 페이지 설정 가져오기
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const homeConfig = await getHomeSettings();
        
        if (homeConfig) {
          // 기존 한국어 데이터 구조와 호환성 유지를 위한 변환
          const koreanData = {
            히어로: {
              헤드라인: homeConfig.hero?.title || '',
              서브헤드라인: homeConfig.hero?.subtitle || '',
              배경이미지URL: homeConfig.hero?.backgroundImageURL || '',
              버튼텍스트: homeConfig.hero?.buttonText || '',
              버튼링크: homeConfig.hero?.buttonLink || ''
            },
            주요프로그램: {
              활성화: homeConfig.programs?.enabled !== false
            },
            전문가하이라이트: {
              활성화: homeConfig.experts?.enabled !== false
            },
            센터소개: {
              활성화: homeConfig.about?.enabled !== false
            },
            커뮤니티업데이트: {
              활성화: homeConfig.news?.enabled !== false
            }
          };
          
          setFormData(koreanData);
          setOriginalData(homeConfig);
          setImagePreview(homeConfig.hero?.backgroundImageURL);
        }
      } catch (error) {
        console.error('홈 설정 가져오기 오류:', error);
        setError('홈 설정을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
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
        if (originalData?.hero?.backgroundImageURL && originalData.hero.backgroundImageURL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.hero.backgroundImageURL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      // 한국어 formData에서 영어 데이터 구조로 변환
      const homeConfigData = {
        hero: {
          title: formData.히어로.헤드라인,
          subtitle: formData.히어로.서브헤드라인,
          backgroundImageURL: backgroundImageURL,
          buttonText: formData.히어로.버튼텍스트,
          buttonLink: formData.히어로.버튼링크,
          enabled: true
        },
        programs: {
          title: '전문 프로그램',
          subtitle: '전문가와 함께하는 맞춤형 프로그램',
          description: '위즈포레의 전문가들이 제공하는 다양한 프로그램을 소개합니다.',
          enabled: formData.주요프로그램.활성화
        },
        experts: {
          title: '전문가 소개',
          subtitle: '최고의 전문가와 함께하세요',
          description: '위즈포레의 전문가들을 소개합니다.',
          enabled: formData.전문가하이라이트.활성화
        },
        about: {
          title: '센터 소개',
          subtitle: '위즈포레는 아이들의 미래를 함께 만들어갑니다',
          description: '위즈포레 사회서비스센터는 아동과 가족의 건강과 행복을 위해 다양한 서비스를 제공합니다.',
          image: originalData?.about?.image || '',
          enabled: formData.센터소개.활성화
        },
        news: {
          title: '센터 소식',
          subtitle: '위즈포레의 최신 소식을 만나보세요',
          description: '위즈포레의 다양한 소식과 활동을 알려드립니다.',
          enabled: formData.커뮤니티업데이트.활성화
        },
        facilities: {
          title: '시설 안내',
          subtitle: '최적의 환경에서 최고의 서비스를',
          description: '위즈포레의 다양한 시설을 소개합니다.',
          enabled: true
        },
        contact: {
          title: '문의하기',
          subtitle: '궁금한 점이 있으신가요?',
          description: '언제든지 문의해주세요. 빠르게 답변해드리겠습니다.',
          image: originalData?.contact?.image || '',
          enabled: true
        }
      };

      // 기존 설정이 있으면 병합
      if (originalData) {
        // 기존 설정의 섹션별 필드 유지
        Object.keys(homeConfigData).forEach(section => {
          if (originalData[section]) {
            // title, subtitle, description 등은 기존 값 유지
            ['title', 'subtitle', 'description'].forEach(field => {
              if (originalData[section][field] && section !== 'hero') {
                homeConfigData[section][field] = originalData[section][field];
              }
            });
            
            // enabled 값은 formData 기준으로 업데이트
            if (section === 'hero') {
              // hero 섹션은 항상 활성화
              homeConfigData.hero.enabled = true;
            }
          }
        });
      }

      // Firestore에 저장
      await updateHomeSettings(homeConfigData);
      
      setOriginalData(homeConfigData);
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