import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { addService } from '../../../../services/serviceDataService';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminProgramForm.module.css';

export default function NewTherapyService() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    category: '발달재활서비스',
    description: '',
    icon: '',
    status: 'active',
    sessions: 0,
    clients: 0
  });
  
  // 폼 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // 숫자 입력 필드 처리
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name.trim()) {
      setFormError('프로그램 이름은 필수입니다.');
      return;
    }
    
    if (!formData.icon.trim()) {
      setFormError('아이콘은 필수입니다.');
      return;
    }
    
    if (!formData.description.trim()) {
      setFormError('프로그램 설명은 필수입니다.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      // Firestore에 새 서비스 추가
      await addService(formData);
      
      // 성공 시 목록 페이지로 이동
      router.push('/admin/services/therapy');
    } catch (error) {
      console.error('서비스 추가 오류:', error);
      setFormError(`서비스 추가 중 오류가 발생했습니다: ${error.message}`);
      setIsSubmitting(false);
    }
  };
  
  // 사용 가능한 아이콘 목록
  const availableIcons = [
    { value: 'comments', label: '언어/말하기' },
    { value: 'paint-brush', label: '미술' },
    { value: 'music', label: '음악' },
    { value: 'hand-holding', label: '감각통합' },
    { value: 'puzzle-piece', label: '놀이' },
    { value: 'child', label: '아동/발달' },
    { value: 'heart', label: '심리/정서' },
    { value: 'users', label: '그룹/가족' },
    { value: 'brain', label: '인지' },
    { value: 'hands-helping', label: '도움/치료' }
  ];
  
  return (
    <>
      <Head>
        <title>새 치료·상담 프로그램 추가 - 위즈포레 관리자</title>
      </Head>
      
      <div className={styles.formContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <Link href="/admin/services/therapy" className={styles.backLink}>
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div>
              <h1>새 치료·상담 프로그램 추가</h1>
              <p>치료·상담 서비스에 새 프로그램을 추가합니다.</p>
            </div>
          </div>
        </div>
        
        {formError && (
          <div className={styles.errorMessage}>
            <i className="fas fa-exclamation-circle"></i>
            <span>{formError}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">프로그램 이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="예: 언어치료"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="status">상태</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="icon">아이콘 *</label>
              <select
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">아이콘 선택</option>
                {availableIcons.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.label}
                  </option>
                ))}
              </select>
              
              {formData.icon && (
                <div className={styles.iconPreview}>
                  <i className={`fas fa-${formData.icon}`}></i>
                  <span>아이콘 미리보기</span>
                </div>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="sessions">세션 수</label>
              <input
                type="number"
                id="sessions"
                name="sessions"
                value={formData.sessions}
                onChange={handleChange}
                disabled={isSubmitting}
                min="0"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="clients">내담자 수</label>
              <input
                type="number"
                id="clients"
                name="clients"
                value={formData.clients}
                onChange={handleChange}
                disabled={isSubmitting}
                min="0"
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">프로그램 설명 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows="5"
              placeholder="프로그램에 대한 설명을 입력하세요."
            ></textarea>
          </div>
          
          <div className={styles.formActions}>
            <Link 
              href="/admin/services/therapy" 
              className={styles.cancelButton}
              onClick={(e) => {
                if (Object.values(formData).some(val => val) && !confirm('작성 중인 내용이 있습니다. 정말로 취소하시겠습니까?')) {
                  e.preventDefault();
                }
              }}
            >
              취소
            </Link>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> 저장 중...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> 저장하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// 관리자 레이아웃 적용
NewTherapyService.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
