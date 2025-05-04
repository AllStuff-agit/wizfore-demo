import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, query, orderByChild, limitToLast } from 'firebase/database';
import { auth, db as firestoreDb } from '../../../firebase/firebase';
import { getDatabase } from 'firebase/database';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/inquiries/Inquiries.module.css';

// Realtime Database의 인스턴스를 가져옵니다
const realtimeDb = getDatabase();

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('latest'); // 'latest', 'oldest'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
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

  // 문의 데이터 불러오기
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        
        // Realtime Database에서 문의 데이터 가져오기
        const inquiriesRef = ref(realtimeDb, 'inquiries');
        const inquiriesQuery = query(inquiriesRef, orderByChild('createdAt'));
        const snapshot = await get(inquiriesQuery);
        
        if (snapshot.exists()) {
          const inquiriesData = [];
          snapshot.forEach((childSnapshot) => {
            inquiriesData.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          
          // 최신순으로 정렬
          inquiriesData.reverse();
          
          setInquiries(inquiriesData);
          setLoading(false);
        } else {
          setInquiries([]);
          setLoading(false);
        }
      } catch (err) {
        console.error('문의 데이터 불러오기 오류:', err);
        setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // 필터링 및 정렬 적용
  useEffect(() => {
    let filtered = [...inquiries];
    
    // 탭 필터링
    if (activeTab === 'pending') {
      filtered = filtered.filter(item => !item.isResponded);
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(item => item.isResponded);
    }
    
    // 검색어 필터링
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        (item.name && item.name.toLowerCase().includes(search)) ||
        (item.email && item.email.toLowerCase().includes(search)) ||
        (item.subject && item.subject.toLowerCase().includes(search)) ||
        (item.message && item.message.toLowerCase().includes(search))
      );
    }
    
    // 정렬
    if (sortOption === 'oldest') {
      filtered.reverse();
    }
    
    // 페이지네이션 계산
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }
    
    setFilteredInquiries(filtered);
  }, [inquiries, activeTab, searchTerm, sortOption, currentPage]);

  // 현재 페이지에 표시할 항목들
  const currentInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 포맷팅 함수들
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return '-';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return (
      <AdminLayout title="문의 관리 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>문의 데이터를 불러오는 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="문의 관리 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>문의 관리</h1>
        <p className={styles.pageDescription}>
          고객으로부터 받은 문의사항을 관리합니다. 대기중인 문의에 답변하거나, 이전 답변을 확인할 수 있습니다.
        </p>
      </div>

      {/* 탭 메뉴 */}
      <div className={styles.tabs}>
        <div 
          className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('all')}
        >
          전체 문의
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'pending' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('pending')}
        >
          대기중 문의
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'completed' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('completed')}
        >
          처리완료 문의
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {/* 필터 및 검색 섹션 */}
      <div className={styles.filterSection}>
        <div className={styles.searchBox}>
          <i className="fas fa-search"></i>
          <input 
            type="text"
            placeholder="이름, 이메일, 제목 검색..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className={styles.filterOptions}>
          <select 
            className={styles.filterSelect}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>
      </div>

      {/* 문의 목록 */}
      {filteredInquiries.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-inbox"></i>
          </div>
          <h3>문의 내역이 없습니다</h3>
          <p>
            {activeTab === 'all' 
              ? '아직 접수된 문의가 없습니다.'
              : activeTab === 'pending' 
                ? '대기중인 문의가 없습니다.' 
                : '처리완료된 문의가 없습니다.'}
          </p>
        </div>
      ) : (
        <>
          <table className={styles.inquiriesTable}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>이름</th>
                <th>이메일</th>
                <th>제목</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {currentInquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>{formatDate(inquiry.createdAt)}</td>
                  <td>{inquiry.name || '-'}</td>
                  <td>{inquiry.email || '-'}</td>
                  <td>{truncateText(inquiry.subject)}</td>
                  <td>
                    <span className={`${styles.statusLabel} ${inquiry.isResponded ? styles.statusCompleted : styles.statusPending}`}>
                      {inquiry.isResponded ? '처리완료' : '대기중'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionCell}>
                      <Link href={`/admin/inquiries/detail?id=${inquiry.id}`} className={styles.viewButton} title="상세보기">
                        <i className="fas fa-eye"></i>
                      </Link>
                      {/* 삭제 버튼은 향후 구현 */}
                      <button className={styles.deleteButton} title="삭제">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                className={styles.pageButton}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-angle-double-left"></i>
              </button>
              
              <button 
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-angle-left"></i>
              </button>
              
              {/* 페이지 번호 */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // 현재 페이지를 중심으로 표시할 페이지 범위 계산
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + 4);
                
                if (endPage - startPage < 4) {
                  startPage = Math.max(1, endPage - 4);
                }
                
                const pageNum = startPage + i;
                if (pageNum <= endPage) {
                  return (
                    <button 
                      key={pageNum}
                      className={`${styles.pageButton} ${currentPage === pageNum ? styles.currentPage : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
              
              <button 
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-angle-right"></i>
              </button>
              
              <button 
                className={styles.pageButton}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
InquiriesPage.getLayout = (page) => page;