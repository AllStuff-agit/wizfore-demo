import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';

export default function LocationPage() {
  const [formData, setFormData] = useState({
    주소: {
      도로명: '',
      상세주소: '',
      우편번호: ''
    },
    전화번호: '',
    팩스번호: '',
    이메일: '',
    운영시간: {
      평일: '',
      주말: '',
      공휴일: ''
    },
    지도: {
      위도: '',
      경도: '',
      줌레벨: '15'
    },
    교통안내: {
      자가용: '',
      대중교통: ''
    },
    주차안내: ''
  });

  const [originalData, setOriginalData] = useState(null);
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

  // 위치 정보 가져오기
  useEffect(() => {
    const fetchLocationInfo = async () => {
      try {
        const locationInfoDoc = await getDoc(doc(db, '센터정보', 'location'));
        
        if (locationInfoDoc.exists()) {
          const data = locationInfoDoc.data();
          setFormData({
            주소: {
              도로명: data.주소?.도로명 || '',
              상세주소: data.주소?.상세주소 || '',
              우편번호: data.주소?.우편번호 || ''
            },
            전화번호: data.전화번호 || '',
            팩스번호: data.팩스번호 || '',
            이메일: data.이메일 || '',
            운영시간: {
              평일: data.운영시간?.평일 || '',
              주말: data.운영시간?.주말 || '',
              공휴일: data.운영시간?.공휴일 || ''
            },
            지도: {
              위도: data.지도?.위도 || '',
              경도: data.지도?.경도 || '',
              줌레벨: data.지도?.줌레벨 || '15'
            },
            교통안내: {
              자가용: data.교통안내?.자가용 || '',
              대중교통: data.교통안내?.대중교통 || ''
            },
            주차안내: data.주차안내 || ''
          });
          setOriginalData(data);
        }
      } catch (error) {
        console.error('위치 정보 가져오기 오류:', error);
        setError('위치 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 중첩된 객체 필드 처리
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      const locationInfoRef = doc(db, '센터정보', 'location');
      const data = {
        ...formData,
        수정일: serverTimestamp()
      };

      // 문서가 존재하면 업데이트, 없으면 새로 생성
      if (originalData) {
        await updateDoc(locationInfoRef, data);
      } else {
        data.생성일 = serverTimestamp();
        await setDoc(locationInfoRef, data);
      }

      setOriginalData(data);
      alert('위치 정보가 저장되었습니다.');
      setSaving(false);
    } catch (error) {
      console.error('위치 정보 저장 오류:', error);
      setError('위치 정보 저장 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  // 미리보기 지도 URL 생성
  const getMapPreviewUrl = () => {
    const { 위도, 경도, 줌레벨 } = formData.지도;
    
    if (!위도 || !경도) {
      return null;
    }
    
    return `https://maps.googleapis.com/maps/api/staticmap?center=${위도},${경도}&zoom=${줌레벨}&size=600x300&markers=color:red%7C${위도},${경도}&key=YOUR_API_KEY`;
  };

  if (loading) {
    return (
      <AdminLayout title="오시는 길 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="오시는 길 - 위즈포레 관리자">
      <div className="page-header">
        <div className="header-nav">
          <Link href="/admin/about">센터 소개</Link> &gt; 오시는 길
        </div>
        <h1>오시는 길</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="content-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-section">
            <h2>기본 정보</h2>
            <div className="form-group">
              <label htmlFor="주소.도로명">도로명 주소 *</label>
              <input
                type="text"
                id="주소.도로명"
                name="주소.도로명"
                value={formData.주소.도로명}
                onChange={handleInputChange}
                required
                placeholder="예: 부산시 사상구 OO로 123"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="주소.상세주소">상세 주소</label>
                <input
                  type="text"
                  id="주소.상세주소"
                  name="주소.상세주소"
                  value={formData.주소.상세주소}
                  onChange={handleInputChange}
                  placeholder="예: 3층 301호"
                />
              </div>
              
              <div className="form-group">
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="전화번호">전화번호 *</label>
                <input
                  type="text"
                  id="전화번호"
                  name="전화번호"
                  value={formData.전화번호}
                  onChange={handleInputChange}
                  required
                  placeholder="예: 051-123-4567"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="팩스번호">팩스번호</label>
                <input
                  type="text"
                  id="팩스번호"
                  name="팩스번호"
                  value={formData.팩스번호}
                  onChange={handleInputChange}
                  placeholder="예: 051-123-4568"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="이메일">이메일</label>
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

          <div className="form-section">
            <h2>운영 시간</h2>
            <div className="form-group">
              <label htmlFor="운영시간.평일">평일 운영시간</label>
              <input
                type="text"
                id="운영시간.평일"
                name="운영시간.평일"
                value={formData.운영시간.평일}
                onChange={handleInputChange}
                placeholder="예: 09:00 ~ 18:00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="운영시간.주말">주말 운영시간</label>
              <input
                type="text"
                id="운영시간.주말"
                name="운영시간.주말"
                value={formData.운영시간.주말}
                onChange={handleInputChange}
                placeholder="예: 09:00 ~ 13:00 (토요일만)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="운영시간.공휴일">공휴일 운영시간</label>
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

          <div className="form-section">
            <h2>지도 설정</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="지도.위도">위도 (Latitude)</label>
                <input
                  type="text"
                  id="지도.위도"
                  name="지도.위도"
                  value={formData.지도.위도}
                  onChange={handleInputChange}
                  placeholder="예: 35.1234567"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="지도.경도">경도 (Longitude)</label>
                <input
                  type="text"
                  id="지도.경도"
                  name="지도.경도"
                  value={formData.지도.경도}
                  onChange={handleInputChange}
                  placeholder="예: 129.1234567"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="지도.줌레벨">줌 레벨</label>
                <select
                  id="지도.줌레벨"
                  name="지도.줌레벨"
                  value={formData.지도.줌레벨}
                  onChange={handleInputChange}
                >
                  <option value="13">13 (넓게)</option>
                  <option value="14">14</option>
                  <option value="15">15 (기본)</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18 (상세)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>지도 미리보기</label>
              <div className="map-preview">
                {getMapPreviewUrl() ? (
                  <img 
                    src={getMapPreviewUrl()} 
                    alt="지도 미리보기" 
                    className="map-image"
                  />
                ) : (
                  <div className="map-placeholder">
                    <p>위도와 경도를 입력하면 지도 미리보기가 표시됩니다.</p>
                    <small>참고: 이 미리보기는 API 키가 필요하며 실제 서비스에서는 올바른 키를 사용해야 합니다.</small>
                  </div>
                )}
              </div>
              <small className="form-helper">
                * 위도/경도 찾기: 구글 지도에서 원하는 위치를 우클릭 후 "이 장소에 대한 정보 보기" 선택
              </small>
            </div>
          </div>

          <div className="form-section">
            <h2>교통 및 주차 안내</h2>
            <div className="form-group">
              <label htmlFor="교통안내.자가용">자가용 안내</label>
              <textarea
                id="교통안내.자가용"
                name="교통안내.자가용"
                value={formData.교통안내.자가용}
                onChange={handleInputChange}
                rows="4"
                placeholder="자가용으로 오시는 방법을 안내하세요. (예: 주요 도로에서 진입 방법 등)"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="교통안내.대중교통">대중교통 안내</label>
              <textarea
                id="교통안내.대중교통"
                name="교통안내.대중교통"
                value={formData.교통안내.대중교통}
                onChange={handleInputChange}
                rows="4"
                placeholder="버스, 지하철 등 대중교통으로 오시는 방법을 안내하세요."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="주차안내">주차 안내</label>
              <textarea
                id="주차안내"
                name="주차안내"
                value={formData.주차안내}
                onChange={handleTextareaChange}
                rows="4"
                placeholder="주차 시설 및 이용 방법에 대해 안내하세요."
              ></textarea>
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
          margin-bottom: 1.5rem;
        }
        
        .form-section h2 {
          font-size: 1.2rem;
          color: #4B5563;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        
        .form-group input[type="text"],
        .form-group input[type="email"],
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
        .form-group input[type="email"]:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #2563EB;
          outline: none;
        }
        
        .form-helper {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #6B7280;
        }
        
        .map-preview {
          margin-top: 1rem;
          border: 1px solid #E5E7EB;
          border-radius: 0.375rem;
          overflow: hidden;
          height: 300px;
          background-color: #F9FAFB;
        }
        
        .map-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .map-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          text-align: center;
          color: #6B7280;
        }
        
        .map-placeholder p {
          margin-bottom: 0.5rem;
        }
        
        .map-placeholder small {
          font-size: 0.75rem;
          color: #9CA3AF;
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
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .content-wrapper {
            padding: 1.5rem;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
LocationPage.getLayout = (page) => page;