import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/business/Index.module.css';

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  // 사업 목록 가져오기
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const businessQuery = query(collection(db, 'businesses'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(businessQuery);
        
        const businessList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setBusinesses(businessList);
        setLoading(false);
      } catch (error) {
        console.error('사업 목록 불러오기 오류:', error);
        setError('사업 목록을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  // 필터링 처리
  useEffect(() => {
    if (businesses.length > 0) {
      let filtered = [...businesses];
      
      // 상태 필터링
      if (status !== 'all') {
        filtered = filtered.filter(business => business.status === status);
      }
      
      // 검색어 필터링
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(business => 
          business.name?.toLowerCase().includes(term) || 
          business.description?.toLowerCase().includes(term)
        );
      }
      
      setFilteredBusinesses(filtered);
    }
  }, [businesses, status, searchTerm]);

  // 검색어 입력 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 사업 추가 페이지로 이동
  const handleAddBusiness = () => {
    router.push('/admin/business/add');
  };

  // 사업 상세보기 페이지로 이동
  const handleViewBusiness = (id) => {
    router.push(`/admin/business/view/${id}`);
  };

  // 사업 편집 페이지로 이동
  const handleEditBusiness = (id) => {
    router.push(`/admin/business/edit/${id}`);
  };

  // 사업 삭제
  const handleDeleteBusiness = async (id) => {
    if (window.confirm('이 사업을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await deleteDoc(doc(db, 'businesses', id));
        setBusinesses(businesses.filter(business => business.id !== id));
        alert('사업이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('사업 삭제 오류:', error);
        alert('사업 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 사업 상태에 따른 배지 스타일
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ongoing':
        return styles.badgeOngoing;
      case 'completed':
        return styles.badgeCompleted;
      case 'upcoming':
        return styles.badgeUpcoming;
      default:
        return styles.badgeDefault;
    }
  };

  // 사업 상태 한글 표시
  const getStatusText = (status) => {
    switch (status) {
      case 'ongoing':
        return '진행중';
      case 'completed':
        return '완료됨';
      case 'upcoming':
        return '예정됨';
      default:
        return '기타';
    }
  };

  return (
    <AdminLayout title="사업 안내 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>사업 안내 관리</h1>
        <button 
          onClick={handleAddBusiness} 
          className={styles.addButton}
        >
          <i className="fas fa-plus"></i> 새 사업 추가
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>사업 목록을 불러오는 중입니다...</p>
        </div>
      ) : businesses.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-briefcase"></i>
          </div>
          <h2>등록된 사업이 없습니다</h2>
          <p>새 사업을 추가하려면 '새 사업 추가' 버튼을 클릭하세요.</p>
        </div>
      ) : (
        <>
          {/* 사업 요약 정보 - 현황 카드 */}
          <div className={styles.dashboardCards}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <i className="fas fa-play-circle"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>진행중 사업</h3>
                <p className={styles.cardCount}>
                  {businesses.filter(b => b.status === 'ongoing').length}
                </p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <i className="fas fa-hourglass-end"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>완료된 사업</h3>
                <p className={styles.cardCount}>
                  {businesses.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>예정된 사업</h3>
                <p className={styles.cardCount}>
                  {businesses.filter(b => b.status === 'upcoming').length}
                </p>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <i className="fas fa-briefcase"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>전체 사업</h3>
                <p className={styles.cardCount}>
                  {businesses.length}
                </p>
              </div>
            </div>
          </div>
          
          {/* 필터 및 검색 */}
          <div className={styles.filterContainer}>
            <div className={styles.filterTabs}>
              <button 
                className={`${styles.filterTab} ${status === 'all' ? styles.active : ''}`} 
                onClick={() => setStatus('all')}
              >
                모든 사업
              </button>
              <button 
                className={`${styles.filterTab} ${status === 'ongoing' ? styles.active : ''}`} 
                onClick={() => setStatus('ongoing')}
              >
                진행중 사업
              </button>
              <button 
                className={`${styles.filterTab} ${status === 'completed' ? styles.active : ''}`} 
                onClick={() => setStatus('completed')}
              >
                완료된 사업
              </button>
              <button 
                className={`${styles.filterTab} ${status === 'upcoming' ? styles.active : ''}`} 
                onClick={() => setStatus('upcoming')}
              >
                예정된 사업
              </button>
            </div>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="사업명 검색..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className={styles.searchButton}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          {/* 사업 목록 테이블 */}
          <div className={styles.businessList}>
            <div className={styles.businessGrid}>
              <div className={styles.headerRow}>
                <div className={styles.headerCell}>사업명</div>
                <div className={styles.headerCell}>기간</div>
                <div className={styles.headerCell}>상태</div>
                <div className={styles.headerCell}>담당자</div>
                <div className={styles.headerCell}>관리</div>
              </div>
              
              {filteredBusinesses.map((business) => (
                <div key={business.id} className={styles.businessRow}>
                  <div className={styles.businessName}>
                    <h3>{business.name}</h3>
                    <p>{business.description?.substring(0, 100)}...</p>
                  </div>
                  <div className={styles.businessPeriod}>
                    {business.startDate} ~ {business.endDate}
                  </div>
                  <div className={styles.businessStatus}>
                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(business.status)}`}>
                      {getStatusText(business.status)}
                    </span>
                  </div>
                  <div className={styles.businessManager}>
                    {business.manager || '미지정'}
                  </div>
                  <div className={styles.businessActions}>
                    <button 
                      onClick={() => handleViewBusiness(business.id)} 
                      className={styles.viewButton}
                      title="상세 보기"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => handleEditBusiness(business.id)} 
                      className={styles.editButton}
                      title="편집"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDeleteBusiness(business.id)} 
                      className={styles.deleteButton}
                      title="삭제"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}