import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { withAdminAuth } from '../../middlewares/withAdminAuth';
import { 
  getAllInquiries, 
  getInquiriesByStatus, 
  updateInquiryStatus, 
  updateInquiryAssignment, 
  deleteInquiry 
} from '../../services/inquiriesService';
import styles from '../../styles/AdminInquiries.module.css';

function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [responseText, setResponseText] = useState('');
  const router = useRouter();

  // 문의 데이터 로드
  useEffect(() => {
    loadInquiries();
  }, [statusFilter]);

  const loadInquiries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let data;
      if (statusFilter === 'all') {
        data = await getAllInquiries();
      } else {
        data = await getInquiriesByStatus(statusFilter);
      }
      
      console.log(`${data.length}개의 문의 데이터 로드됨`);
      setInquiries(data);
    } catch (err) {
      console.error('문의 데이터 로드 오류:', err);
      setError('문의 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 문의 선택
  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseText(inquiry.response || '');
  };

  // 문의 상태 변경
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      
      // 선택된 문의가 업데이트된 경우 선택 해제
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      
      // 데이터 다시 로드
      await loadInquiries();
    } catch (err) {
      console.error('상태 변경 오류:', err);
      alert('상태 변경에 실패했습니다.');
    }
  };

  // 문의 응답 제출
  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    
    if (!selectedInquiry) return;
    
    try {
      await updateInquiryStatus(selectedInquiry.id, 'resolved', responseText);
      alert('응답이 성공적으로 저장되었습니다.');
      
      // 선택 해제 및 데이터 다시 로드
      setSelectedInquiry(null);
      setResponseText('');
      await loadInquiries();
    } catch (err) {
      console.error('응답 저장 오류:', err);
      alert('응답 저장에 실패했습니다.');
    }
  };

  // 문의 삭제
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('정말로 이 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }
    
    try {
      await deleteInquiry(id);
      
      // 선택된 문의가 삭제된 경우 선택 해제
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
        setResponseText('');
      }
      
      // 데이터 다시 로드
      await loadInquiries();
    } catch (err) {
      console.error('삭제 오류:', err);
      alert('삭제에 실패했습니다.');
    }
  };

  // 시간 표시 포맷 함수
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Firestore 타임스탬프 처리
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  // 상태에 따른 레이블 및 색상
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return { label: '대기중', color: 'warning' };
      case 'in_progress':
        return { label: '처리중', color: 'info' };
      case 'resolved':
        return { label: '해결됨', color: 'success' };
      default:
        return { label: '알 수 없음', color: 'secondary' };
    }
  };
  
  // 서비스 옵션 매핑
  const serviceOptions = {
    "": "미선택",
    "language-therapy": "언어치료",
    "art-therapy": "미술치료",
    "music-therapy": "음악치료",
    "sensory-integration": "감각통합",
    "special-pe": "특수체육",
    "play-therapy": "놀이치료",
    "psychomotor": "심리운동",
    "counseling": "심리상담",
    "day-activity": "주간활동서비스",
    "after-school": "방과후활동서비스",
    "tour": "센터 견학 문의",
    "other": "기타"
  };
  
  // 서비스 코드를 한글 이름으로 변환
  const getServiceName = (serviceCode) => {
    return serviceOptions[serviceCode] || serviceCode || '-';
  };

  return (
    <AdminLayout title="문의 관리 - 위즈포레 사회서비스센터">
      <div className={styles.adminInquiriesPage}>
        <div className={styles.pageHeader}>
          <h1>문의 관리</h1>
          
          <div className={styles.filters}>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.statusFilter}
            >
              <option value="all">모든 문의</option>
              <option value="pending">대기중</option>
              <option value="in_progress">처리중</option>
              <option value="resolved">해결됨</option>
            </select>
          </div>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <div className={styles.contentGrid}>
          {/* 문의 목록 섹션 */}
          <section className={styles.listSection}>
            <h2>문의 목록</h2>
            
            {isLoading ? (
              <div className={styles.loading}>로딩 중...</div>
            ) : inquiries.length === 0 ? (
              <div className={styles.emptyList}>문의 내역이 없습니다.</div>
            ) : (
              <div className={styles.inquiryTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableDate}>날짜</div>
                  <div className={styles.tableName}>이름</div>
                  <div className={styles.tableSubject}>제목</div>
                  <div className={styles.tableService}>서비스</div>
                  <div className={styles.tableStatus}>상태</div>
                  <div className={styles.tableActions}>관리</div>
                </div>
                
                {inquiries.map((inquiry) => (
                  <div 
                    key={inquiry.id} 
                    className={`${styles.tableRow} ${selectedInquiry && selectedInquiry.id === inquiry.id ? styles.selectedRow : ''}`}
                    onClick={() => handleSelectInquiry(inquiry)}
                  >
                    <div className={styles.tableDate}>
                      {formatDate(inquiry.createdAt)}
                    </div>
                    <div className={styles.tableName}>
                      {inquiry.name}
                    </div>
                    <div className={styles.tableSubject}>
                      {inquiry.subject}
                    </div>
                    <div className={styles.tableService}>
                      {getServiceName(inquiry.service)}
                    </div>
                    <div className={styles.tableStatus}>
                      <span className={`${styles.statusBadge} ${styles[getStatusLabel(inquiry.status).color]}`}>
                        {getStatusLabel(inquiry.status).label}
                      </span>
                    </div>
                    <div className={styles.tableActions}>
                      <div className={styles.statusButtons}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(inquiry.id, 'pending');
                          }} 
                          className={`${styles.actionButton} ${styles.pendingButton}`}
                          disabled={inquiry.status === 'pending'}
                          title="대기중으로 변경"
                        >
                          <i className="fas fa-clock"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(inquiry.id, 'in_progress');
                          }} 
                          className={`${styles.actionButton} ${styles.processButton}`}
                          disabled={inquiry.status === 'in_progress'}
                          title="처리중으로 변경"
                        >
                          <i className="fas fa-tasks"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (inquiry.status !== 'resolved') {
                              if (window.confirm('응답 없이 해결됨으로 표시하시겠습니까?')) {
                                handleStatusChange(inquiry.id, 'resolved');
                              }
                            }
                          }} 
                          className={`${styles.actionButton} ${styles.resolveButton}`}
                          disabled={inquiry.status === 'resolved'}
                          title="해결됨으로 변경"
                        >
                          <i className="fas fa-check-circle"></i>
                        </button>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInquiry(inquiry.id);
                        }} 
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        title="삭제"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          
          {/* 문의 상세 섹션 */}
          <section className={styles.detailSection}>
            <h2>문의 상세 정보</h2>
            
            {selectedInquiry ? (
              <div className={styles.inquiryDetail}>
                <div className={styles.detailHeader}>
                  <div className={styles.detailTitle}>
                    <h3>{selectedInquiry.subject}</h3>
                    <span className={`${styles.statusBadge} ${styles[getStatusLabel(selectedInquiry.status).color]}`}>
                      {getStatusLabel(selectedInquiry.status).label}
                    </span>
                  </div>
                  <div className={styles.detailDate}>
                    <p>접수일: {formatDate(selectedInquiry.createdAt)}</p>
                    {selectedInquiry.resolvedAt && (
                      <p>해결일: {formatDate(selectedInquiry.resolvedAt)}</p>
                    )}
                  </div>
                </div>
                
                <div className={styles.detailInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>이름:</span>
                    <span className={styles.infoValue}>{selectedInquiry.name}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>연락처:</span>
                    <span className={styles.infoValue}>{selectedInquiry.phone}</span>
                  </div>
                  {selectedInquiry.email && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>이메일:</span>
                      <span className={styles.infoValue}>{selectedInquiry.email}</span>
                    </div>
                  )}
                  {selectedInquiry.service && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>문의 서비스:</span>
                      <span className={styles.infoValue}>{getServiceName(selectedInquiry.service)}</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.messageSection}>
                  <h4>문의 내용</h4>
                  <div className={styles.messageContent}>
                    {selectedInquiry.message}
                  </div>
                </div>
                
                <div className={styles.responseSection}>
                  <h4>응답</h4>
                  {selectedInquiry.status === 'resolved' && selectedInquiry.response ? (
                    <div className={styles.responseContent}>
                      {selectedInquiry.response}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitResponse} className={styles.responseForm}>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="응답 내용을 입력하세요"
                        rows={5}
                        required
                      ></textarea>
                      <button type="submit" className={styles.submitButton}>
                        응답 저장 및 해결로 표시
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.noSelection}>
                <p>문의를 선택하면 상세 정보가 표시됩니다.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

// 관리자 인증으로 컴포넌트 래핑
export default withAdminAuth(AdminInquiries);
