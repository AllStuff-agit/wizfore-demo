import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/community/CenterNews.module.css';

export default function CenterNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
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

  // 센터 소식 가져오기
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsQuery = query(
          collection(db, 'centerNews'), 
          orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(newsQuery);
        
        const newsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate?.() || new Date(doc.data().date)
        }));
        
        setNews(newsList);
        setLoading(false);
      } catch (error) {
        console.error('센터 소식 불러오기 오류:', error);
        setError('센터 소식을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 필터링 및 페이지네이션
  useEffect(() => {
    if (news.length > 0) {
      let filtered = [...news];
      
      // 검색어 필터링
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(item => 
          item.title?.toLowerCase().includes(term) || 
          item.content?.toLowerCase().includes(term)
        );
      }
      
      setFilteredNews(filtered);
    }
  }, [news, searchTerm]);

  // 검색어 입력 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentItems = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 새 소식 추가 페이지로 이동
  const handleAddNews = () => {
    setSaving(true);
    try {
      router.push('/admin/community/center-news/add');
    } catch (error) {
      console.error('페이지 이동 오류:', error);
      setError('페이지 이동 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  // 소식 편집 페이지로 이동
  const handleEditNews = (id) => {
    router.push(`/admin/community/center-news/edit/${id}`);
  };

  // 소식 삭제
  const handleDeleteNews = async (id, imageUrl) => {
    if (window.confirm('이 소식을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        // 이미지가 있는 경우 스토리지에서 삭제
        if (imageUrl) {
          try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            console.log('이미지 삭제 완료');
          } catch (error) {
            console.warn('이미지 삭제 실패:', error);
          }
        }

        // Firestore에서 문서 삭제
        await deleteDoc(doc(db, 'centerNews', id));
        setNews(news.filter(item => item.id !== id));
        alert('소식이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('소식 삭제 오류:', error);
        alert('소식 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) return '날짜 없음';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '날짜 오류';
    
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout title="센터 소식 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="센터 소식 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>센터 소식</h1>
        <button 
          onClick={handleAddNews} 
          className={styles.addButton}
          disabled={saving}
        >
          <i className="fas fa-plus"></i> {saving ? '이동 중...' : '새 소식 추가'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {/* 검색 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="제목 또는 내용 검색..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className={styles.totalCount}>
          총 <strong>{filteredNews.length}</strong>개의 소식
        </div>
      </div>

      {news.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-newspaper"></i>
          </div>
          <h2>등록된 소식이 없습니다</h2>
          <p>새 소식을 추가하려면 '새 소식 추가' 버튼을 클릭하세요.</p>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-search"></i>
          </div>
          <h2>검색 결과가 없습니다</h2>
          <p>다른 검색어를 입력해보세요.</p>
        </div>
      ) : (
        <>
          <div className={styles.newsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.colNumber}>번호</div>
              <div className={styles.colTitle}>제목</div>
              <div className={styles.colDate}>등록일</div>
              <div className={styles.colViews}>조회수</div>
              <div className={styles.colActions}>관리</div>
            </div>
            
            {currentItems.map((item, index) => (
              <div key={item.id} className={styles.tableRow}>
                <div className={styles.colNumber}>
                  {filteredNews.length - ((currentPage - 1) * itemsPerPage + index)}
                </div>
                <div className={styles.colTitle}>
                  <div className={styles.newsTitle}>
                    {item.title}
                    {item.imageUrl && <i className="fas fa-image" title="이미지 포함"></i>}
                  </div>
                </div>
                <div className={styles.colDate}>{formatDate(item.date)}</div>
                <div className={styles.colViews}>{item.views || 0}</div>
                <div className={styles.colActions}>
                  <button 
                    onClick={() => handleEditNews(item.id)} 
                    className={styles.editButton}
                    title="편집"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => handleDeleteNews(item.id, item.imageUrl)} 
                    className={styles.deleteButton}
                    title="삭제"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                <i className="fas fa-angle-left"></i>
              </button>
              
              <div className={styles.pageNumbers}>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    pageNum > 0 && pageNum <= totalPages && (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`${styles.pageNumber} ${currentPage === pageNum ? styles.activePage : ''}`}
                      >
                        {pageNum}
                      </button>
                    )
                  );
                })}
              </div>
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                <i className="fas fa-angle-right"></i>
              </button>
              <button 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages}
                className={styles.pageButton}
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
CenterNewsPage.getLayout = (page) => page