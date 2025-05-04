import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, update } from 'firebase/database';
import { auth } from '../../../firebase/firebase';
import { getDatabase } from 'firebase/database';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/inquiries/Inquiries.module.css';

// Realtime Database의 인스턴스를 가져옵니다
const realtimeDb = getDatabase();

export default function InquiryDetailPage() {
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const { id } = router.query;

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 문의 상세 데이터 불러오기
  useEffect(() => {
    const fetchInquiryDetail = async () => {
      // id가 없으면 실행하지 않음
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Realtime Database에서 해당 문의 데이터 가져오기
        const inquiryRef = ref(realtimeDb, `inquiries/${id}`);
        const snapshot = await get(inquiryRef);
        
        if (snapshot.exists()) {
          const inquiryData = snapshot.val();
          setInquiry({
            id: id,
            ...inquiryData
          });
          
          // 기존 응답이 있다면 응답 필드에 설정
          if (inquiryData.response) {
            setResponse(inquiryData.response);
          }
          
          setLoading(false);
        } else {
          setError('해당 문의를 찾을 수 없습니다.');
          setLoading(false);
        }
      } catch (err) {
        console.error('문의 상세 데이터 불러오기 오류:', err);
        setError('문의 상세 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchInquiryDetail();
  }, [id]);

  // 포맷팅 함수들
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 응답 제출 핸들러
  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    
    if (!response.trim()) {
      alert('응답 내용을 입력해주세요.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // 현재 시간을 응답 시간으로 기록
      const now = Date.now();
      
      // 응답 데이터 업데이트
      const inquiryRef = ref(realtimeDb, `inquiries/${id}`);
      await update(inquiryRef, {
        isResponded: true,
        response: response,
        responseDate: now
      });
      
      // 상태 업데이트
      setInquiry({
        ...inquiry,
        isResponded: true,
        response: response,
        responseDate: now
      });
      
      // 편집 모드 종료
      setIsEditing(false);
      setIsSubmitting(false);
      
      alert('응답이 등록되었습니다.');
    } catch (err) {
      console.error('응답 등록 오류:', err);
      alert('응답 등록 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  // 편집 모드 전환 핸들러
  const handleEditResponse = () => {
    setIsEditing(true);
  };

  // 취소 핸들러
  const handleCancel = () => {
    // 기존 응답이 있으면 원래 응답으로 되돌림
    if (inquiry && inquiry.response) {
      setResponse(inquiry.response);
    } else {
      setResponse('');
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <AdminLayout title="문의 상세 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>문의 데이터를 불러오는 중...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !inquiry) {
    return (
      <AdminLayout title="문의 상세 - 위즈포레 관리자">
        <div className="error">{error || '문의 데이터를 불러올 수 없습니다.'}</div>
        <Link href="/admin/inquiries" className={styles.backButton}>
          <i className="fas fa-arrow-left"></i> 목록으로 돌아가기
        </Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="문의 상세 - 위즈포레 관리자">
      <Link href="/admin/inquiries" className={styles.backButton}>
        <i className="fas fa-arrow-left"></i> 목록으로 돌아가기
      </Link>
      
      <div className={styles.detailContainer}>
        <div className={styles.inquiryHeader}>
          <h1 className={styles.inquiryTitle}>{inquiry.subject || '제목 없음'}</h1>
          
          <div className={styles.inquiryMeta}>
            <div className={styles.metaItem}>
              <i className="fas fa-user"></i>
              <span>{inquiry.name || '이름 없음'}</span>
            </div>
            
            <div className={styles.metaItem}>
              <i className="fas fa-envelope"></i>
              <span>{inquiry.email || '이메일 없음'}</span>
            </div>
            
            <div className={styles.metaItem}>
              <i className="fas fa-phone"></i>
              <span>{inquiry.phone || '연락처 없음'}</span>
            </div>
            
            <div className={styles.metaItem}>
              <i className="fas fa-calendar"></i>
              <span>{formatDate(inquiry.createdAt)}</span>
            </div>
            
            <div className={styles.metaItem}>
              <i className="fas fa-tag"></i>
              <span>{inquiry.category || '분류 없음'}</span>
            </div>
          </div>
          
          <div className={styles.statusLabel + ' ' + (inquiry.isResponded ? styles.statusCompleted : styles.statusPending)}>
            {inquiry.isResponded ? '처리완료' : '대기중'}
          </div>
        </div>
        
        <div className={styles.inquiryContent}>
          <h3>문의 내용</h3>
          <p>{inquiry.message || '내용 없음'}</p>
        </div>
        
        <div className={styles.responseSection}>
          <div className={styles.responseHeader}>
            <h3>답변</h3>
          </div>
          
          {inquiry.isResponded && !isEditing ? (
            <div className={styles.existingResponse}>
              <p className={styles.responseContent}>{inquiry.response}</p>
              <div className={styles.responseInfo}>
                <span>답변일: {formatDate(inquiry.responseDate)}</span>
              </div>
              <button 
                onClick={handleEditResponse}
                className={styles.editButton}
                title="답변 수정"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitResponse}>
              <textarea
                className={styles.textArea}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="답변 내용을 입력하세요..."
                disabled={isSubmitting}
              ></textarea>
              
              <div className={styles.formActions}>
                {isEditing && (
                  <button 
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    취소
                  </button>
                )}
                
                <button 
                  type="submit"
                  className={styles.saveButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> 저장 중...
                    </>
                  ) : (
                    inquiry.isResponded ? '답변 수정하기' : '답변 등록하기'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
InquiryDetailPage.getLayout = (page) => page;