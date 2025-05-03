import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/admin/community/SnsNews.module.css';

export default function SnsNewsPage() {
  const [snsPosts, setSnsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const itemsPerPage = 9;
  
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

  // SNS 게시물 가져오기
  useEffect(() => {
    const fetchSnsPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, 'snsPosts'), 
          orderBy('postDate', 'desc')
        );
        const querySnapshot = await getDocs(postsQuery);
        
        const postsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          postDate: doc.data().postDate?.toDate?.() || new Date(doc.data().postDate)
        }));
        
        setSnsPosts(postsList);
        setLoading(false);
      } catch (error) {
        console.error('SNS 게시물 불러오기 오류:', error);
        setError('SNS 게시물을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchSnsPosts();
  }, []);

  // 필터링 및 페이지네이션
  useEffect(() => {
    if (snsPosts.length > 0) {
      let filtered = [...snsPosts];
      
      // 타입 필터링
      if (filterType !== 'all') {
        filtered = filtered.filter(post => post.platform === filterType);
      }
      
      // 검색어 필터링
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(post => 
          post.title?.toLowerCase().includes(term) || 
          post.content?.toLowerCase().includes(term)
        );
      }
      
      setFilteredPosts(filtered);
      setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
    }
  }, [snsPosts, filterType, searchTerm]);

  // 검색어 입력 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 플랫폼 필터 변경 처리
  const handleFilterChange = (platform) => {
    setFilterType(platform);
  };

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentItems = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 새 SNS 게시물 추가 페이지로 이동
  const handleAddPost = () => {
    setSaving(true);
    try {
      router.push('/admin/community/sns-news/add');
    } catch (error) {
      console.error('페이지 이동 오류:', error);
      setError('페이지 이동 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  // SNS 게시물 편집 페이지로 이동
  const handleEditPost = (id) => {
    router.push(`/admin/community/sns-news/edit/${id}`);
  };

  // SNS 게시물 삭제
  const handleDeletePost = async (id) => {
    if (window.confirm('이 SNS 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        // Firestore에서 문서 삭제
        await deleteDoc(doc(db, 'snsPosts', id));
        setSnsPosts(snsPosts.filter(post => post.id !== id));
        alert('SNS 게시물이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('SNS 게시물 삭제 오류:', error);
        alert('SNS 게시물 삭제 중 오류가 발생했습니다.');
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

  // 플랫폼 아이콘 및 스타일
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return <i className="fab fa-instagram"></i>;
      case 'facebook':
        return <i className="fab fa-facebook"></i>;
      case 'youtube':
        return <i className="fab fa-youtube"></i>;
      case 'blog':
        return <i className="fab fa-blogger"></i>;
      case 'news':
        return <i className="far fa-newspaper"></i>;
      default:
        return <i className="fas fa-share-alt"></i>;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="SNS 소식 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="SNS 소식 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>SNS 소식</h1>
        <button 
          onClick={handleAddPost} 
          className={styles.addButton}
          disabled={saving}
        >
          <i className="fas fa-plus"></i> {saving ? '이동 중...' : '새 게시물 추가'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {/* 필터 및 검색 */}
      <div className={styles.filterContainer}>
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.filterTab} ${filterType === 'all' ? styles.active : ''}`} 
            onClick={() => handleFilterChange('all')}
          >
            전체
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'instagram' ? styles.active : ''}`} 
            onClick={() => handleFilterChange('instagram')}
          >
            <i className="fab fa-instagram"></i> 인스타그램
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'facebook' ? styles.active : ''}`} 
            onClick={() => handleFilterChange('facebook')}
          >
            <i className="fab fa-facebook"></i> 페이스북
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'youtube' ? styles.active : ''}`} 
            onClick={() => handleFilterChange('youtube')}
          >
            <i className="fab fa-youtube"></i> 유튜브
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'blog' ? styles.active : ''}`} 
            onClick={() => handleFilterChange('blog')}
          >
            <i className="fab fa-blogger"></i> 블로그
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'news' ? styles.active : ''}`} 
            onClick={() => handleFilterChange('news')}
          >
            <i className="far fa-newspaper"></i> 뉴스
          </button>
        </div>
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
      </div>

      {snsPosts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-share-alt"></i>
          </div>
          <h2>등록된 SNS 게시물이 없습니다</h2>
          <p>새 게시물을 추가하려면 '새 게시물 추가' 버튼을 클릭하세요.</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-search"></i>
          </div>
          <h2>검색 결과가 없습니다</h2>
          <p>다른 검색어를 입력하거나 다른 플랫폼을 선택해보세요.</p>
        </div>
      ) : (
        <>
          <div className={styles.totalCount}>
            총 <strong>{filteredPosts.length}</strong>개의 게시물
          </div>
          
          <div className={styles.postsGrid}>
            {currentItems.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postPlatform}>
                  {getPlatformIcon(post.platform)}
                  <span className={styles.platformName}>
                    {post.platform === 'instagram' && '인스타그램'}
                    {post.platform === 'facebook' && '페이스북'}
                    {post.platform === 'youtube' && '유튜브'}
                    {post.platform === 'blog' && '블로그'}
                    {post.platform === 'news' && '뉴스'}
                    {!['instagram', 'facebook', 'youtube', 'blog', 'news'].includes(post.platform) && '기타'}
                  </span>
                </div>
                
                <div className={styles.postImage}>
                  {post.thumbnailUrl ? (
                    <img src={post.thumbnailUrl} alt={post.title} />
                  ) : (
                    <div className={styles.noImage}>
                      <i className="far fa-image"></i>
                      <span>이미지 없음</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDate}>{formatDate(post.postDate)}</p>
                  {post.originalUrl && (
                    <a 
                      href={post.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.postLink}
                    >
                      원본 보기 <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
                
                <div className={styles.postActions}>
                  <button 
                    onClick={() => handleEditPost(post.id)} 
                    className={styles.editButton}
                    title="편집"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => handleDeletePost(post.id)} 
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
SnsNewsPage.getLayout = (page) => page;