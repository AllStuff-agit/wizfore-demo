import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Contact.module.css';
import { addInquiry } from '../../services/inquiriesService';

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
    
    // 폼 데이터 유효성 검사
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      setError('필수 입력 항목을 모두 작성해주세요.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Firestore에 문의 데이터 저장
      await addInquiry(formData);
      console.log('문의가 성공적으로 제출되었습니다.');
      
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
      console.error('문의 제출 오류:', error);
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
          <div className={styles.contactForm}>
            <div className={styles.formBox}>
              <h2>문의 및 상담 신청</h2>
              
              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>문의가 성공적으로 제출되었습니다!</h3>
                  <p>빠른 시일 내에 연락드리겠습니다. 감사합니다.</p>
                  <p className={styles.contactInfo}>문의사항은 <strong>051-324-0940</strong> 으로도 연락 가능합니다.</p>
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
      </section>
    </>
  );
}