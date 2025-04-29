import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/AdminCenterInfo.module.css';

export default function CenterInfo() {
  const [formData, setFormData] = useState({
    센터명: '',
    소개: '',
    비전: '',
    인사말: '',
    연락처: '',
    이메일: '',
    주소: {
      도로명: '',
      상세주소: '',
      우편번호: ''
    },
    운영시간: {
      평일: '',
      주말: '',
      공휴일: ''
    },
    SNS: {
      유튜브: '',
      인스타그램: '',
      페이스북: ''
    },
    로고URL: ''
  });

  const [originalData, setOriginalData] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
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

  // 센터 정보 가져오기
  useEffect(() => {
    const fetchCenterInfo = async () => {
      try {
        const centerInfoDoc = await getDoc(doc(db, '센터정보', 'info'));
        
        if (centerInfoDoc.exists()) {
          const data = centerInfoDoc.data();
          setFormData({
            센터명: data.센터명 || '',
            소개: data.소개 || '',
            비전: data.비전 || '',
            인사말: data.인사말 || '',
            연락처: data.연락처 || '',
            이메일: data.이메일 || '',
            주소: {
              도로명: data.주소?.도로명 || '',
              상세주소: data.주소?.상세주소 || '',
              우편번호: data.주소?.우편번호 || ''
            },
            운영시간: {
              평일: data.운영시간?.평일 || '',
              주말: data.운영시간?.주말 || '',
              공휴일: data.운영시간?.공휴일 || ''
            },
            SNS: {
              유튜브: data.SNS?.유튜브 || '',
              인스타그램: data.SNS?.인스타그램 || '',
              페이스북: data.SNS?.페이스북 || ''
            },
            로고URL: data.로고URL || ''
          });
          setOriginalData(data);
          setLogoPreview(data.로고URL);
        }
      } catch (error) {
        console.error('센터 정보 가져오기 오류:', error);
        setError('센터 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCenterInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 중첩된 객체 필드 처리 (주소, 운영시간, SNS)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setLogoFile(file);
    
    // 로고 미리보기
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const uploadLogo = async (file) => {
    const timestamp = Date.now();
    const path = `center/logo_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      let logoURL = formData.로고URL;

      // 새 로고 이미지 업로드 (있는 경우)
      if (logoFile) {
        logoURL = await uploadLogo(logoFile);

        // 기존 이미지 URL이 storage의 URL이면 삭제 시도
        if (originalData?.로고URL && originalData.로고URL.includes('firebasestorage.googleapis.com')) {
          try {
            const oldImageRef = ref(storage, originalData.로고URL);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('기존 이미지 삭제 실패:', error);
          }
        }
      }

      const centerInfoRef = doc(db, '센터정보', 'info');
      const data = {
        ...formData,
        로고URL: logoURL,
        수정일: serverTimestamp()
      };

      // 문서가 존재하면 업데이트, 없으면 새로 생성
      if (originalData) {
        await updateDoc(centerInfoRef, data);
      } else {
        data.생성일 = serverTimestamp();
        await setDoc(centerInfoRef, data);
      }

      setOriginalData(data);
      alert('센터 정보가 저장되었습니다.');
      setSaving(false);
    } catch (error) {
      console.error('센터 정보 저장 오류:', error);
      setError('센터 정보 저장 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="센터 기본 정보 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="센터 기본 정보 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>센터 기본 정보</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h2>기본 정보</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="센터명">센터명 *</label>
              <input
                type="text"
                id="센터명"
                name="센터명"
                value={formData.센터명}
                onChange={handleInputChange}
                required
                placeholder="예: 위즈포레 사회서비스센터"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="logo">로고 이미지</label>
              <div className={styles.logoUpload}>
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {logoPreview && (
                  <div className={styles.logoPreview}>
                    <img src={logoPreview} alt="로고 미리보기" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="소개">센터 소개</label>
            <textarea
              id="소개"
              name="소개"
              value={formData.소개}
              onChange={handleTextareaChange}
              rows="4"
              placeholder="센터에 대한 간략한 소개를 입력하세요"
            ></textarea>
          </div>

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

        <div className={styles.formSection}>
          <h2>연락처 정보</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="연락처">대표 전화</label>
              <input
                type="text"
                id="연락처"
                name="연락처"
                value={formData.연락처}
                onChange={handleInputChange}
                placeholder="예: 051-123-4567"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="이메일">대표 이메일</label>
              <input
                type="email"
                id="이메일"
                name="이메일"
                value={formData.이메일}
                onChange={handleInputChange}
                placeholder="예: contact@wizfore.com"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="주소.도로명">도로명 주소</label>
            <input
              type="text"
              id="주소.도로명"
              name="주소.도로명"
              value={formData.주소.도로명}
              onChange={handleInputChange}
              placeholder="도로명 주소를 입력하세요"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="주소.상세주소">상세 주소</label>
              <input
                type="text"
                id="주소.상세주소"
                name="주소.상세주소"
                value={formData.주소.상세주소}
                onChange={handleInputChange}
                placeholder="상세 주소를 입력하세요"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="주소.우편번호">우편번호</label>
              <input
                type="text"
                id="주소.우편번호"
                name="주소.우편번호"
                value={formData.주소.우편번호}
                onChange={handleInputChange}
                placeholder="예: 12345"
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>운영 시간</h2>
          <div className={styles.formGroup}>
            <label htmlFor="운영시간.평일">평일</label>
            <input
              type="text"
              id="운영시간.평일"
              name="운영시간.평일"
              value={formData.운영시간.평일}
              onChange={handleInputChange}
              placeholder="예: 09:00 ~ 18:00"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="운영시간.주말">주말</label>
            <input
              type="text"
              id="운영시간.주말"
              name="운영시간.주말"
              value={formData.운영시간.주말}
              onChange={handleInputChange}
              placeholder="예: 09:00 ~ 13:00 (토요일만)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="운영시간.공휴일">공휴일</label>
            <input
              type="text"
              id="운영시간.공휴일"
              name="운영시간.공휴일"
              value={formData.운영시간.공휴일}
              onChange={handleInputChange}
              placeholder="예: 휴무"
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>SNS 정보</h2>
          <div className={styles.formGroup}>
            <label htmlFor="SNS.유튜브">
              <i className="fab fa-youtube"></i> 유튜브
            </label>
            <input
              type="text"
              id="SNS.유튜브"
              name="SNS.유튜브"
              value={formData.SNS.유튜브}
              onChange={handleInputChange}
              placeholder="유튜브 채널 URL"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="SNS.인스타그램">
              <i className="fab fa-instagram"></i> 인스타그램
            </label>
            <input
              type="text"
              id="SNS.인스타그램"
              name="SNS.인스타그램"
              value={formData.SNS.인스타그램}
              onChange={handleInputChange}
              placeholder="인스타그램 계정 URL"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="SNS.페이스북">
              <i className="fab fa-facebook"></i> 페이스북
            </label>
            <input
              type="text"
              id="SNS.페이스북"
              name="SNS.페이스북"
              value={formData.SNS.페이스북}
              onChange={handleInputChange}
              placeholder="페이스북 페이지 URL"
            />
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
CenterInfo.getLayout = (page) => page;
