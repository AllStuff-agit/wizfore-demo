import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // 여기에서 실제로는 Firebase나 다른 백엔드로 데이터를 보내는 코드를 작성합니다.
    // 현재는 예시로 1초 후에 성공으로 처리하겠습니다.
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
        service: '',
      });
    } catch (error) {
      setError('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 서비스 옵션
  const serviceOptions = [
    { value: "", label: "선택해주세요" },
    { value: "language-therapy", label: "언어치료" },
    { value: "art-therapy", label: "미술치료" },
    { value: "music-therapy", label: "음악치료" },
    { value: "sensory-integration", label: "감각통합" },
    { value: "special-pe", label: "특수체육" },
    { value: "play-therapy", label: "놀이치료" },
    { value: "psychomotor", label: "심리운동" },
    { value: "counseling", label: "심리상담" },
    { value: "day-activity", label: "주간활동서비스" },
    { value: "after-school", label: "방과후활동서비스" },
    { value: "tour", label: "센터 견학 문의" },
    { value: "other", label: "기타" }
  ];

  return (
    <>
      <Head>
        <title>문의하기 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터 문의 및 상담 신청 페이지입니다." />
      </Head>

      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>문의하기</h1>
          <p>궁금한 점이 있으시면 언제든지 문의해주세요.</p>
        </div>
      </div>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.infoBox}>
                <h2>연락처 정보</h2>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>주소</h3>
                    <p>부산시 사상구 모라로 110번길 25 3층, 4층</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>전화</h3>
                    <p>051-324-0940</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-fax"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>팩스</h3>
                    <p>051-313-0322</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>이메일</h3>
                    <p>wizfore@daum.net</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>운영시간</h3>
                    <p>월-금: 오전 9시 - 오후 6시</p>
                    <p>토요일: 오전 9시 - 오후 1시</p>
                    <p>일요일 및 공휴일: 휴무</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.mapWrapper}>
                <h3>위치</h3>
                <div className={styles.map}>
                  {/* 실제로는 여기에 네이버 지도 또는 카카오맵 API를 사용합니다 */}
                  <img src="/images/map.jpg" alt="위즈포레 지도" />
                </div>
              </div>
            </div>
            
            <div className={styles.contactForm}>
              <div className={styles.formBox}>
                <h2>문의 및 상담 신청</h2>
                
                {isSubmitted ? (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3>문의가 성공적으로 제출되었습니다!</h3>
                    <p>빠른 시일 내에 답변 드리겠습니다. 감사합니다.</p>
                    <button 
                      className={styles.btn}
                      onClick={() => setIsSubmitted(false)}
                    >
                      새로운 문의하기
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="name">이름 <span className={styles.required}>*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone">연락처 <span className={styles.required}>*</span></label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          placeholder="연락처를 입력해주세요"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="email">이메일</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          placeholder="이메일을 입력해주세요"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="service">문의 서비스</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        {serviceOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="subject">제목 <span className={styles.required}>*</span></label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="문의 제목을 입력해주세요"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="message">메시지 <span className={styles.required}>*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="문의 내용을 입력해주세요"
                      ></textarea>
                    </div>
                    
                    <div className={styles.formNotice}>
                      <p><span className={styles.required}>*</span> 필수 입력 항목입니다.</p>
                    </div>
                    
                    <div className={styles.formActions}>
                      <button 
                        type="submit" 
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? '제출 중...' : '문의하기'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}