import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/community/Index.module.css';

export default function CommunityPage() {
  const [centerNews, setCenterNews] = useState([]);
  const [snsPosts, setSnsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 센터 소식 가져오기 (최근 5개)
        const newsQuery = query(
          collection(db, 'centerNews'), 
          orderBy('date', 'desc'),
          limit(5)
        );
        const newsSnapshot = await getDocs(newsQuery);
        
        const newsList = newsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate?.() || new Date(doc.data().date)
        }));
        
        setCenterNews(newsList);
        
        // SNS 게시물 가져오기 (최근 6개)
        const postsQuery = query(
          collection(db, 'snsPosts'), 
          orderBy('postDate', 'desc'),
          limit(6)
        );
        const postsSnapshot = await getDocs(postsQuery);
        
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          postDate: doc.data().postDate?.toDate?.() || new Date(doc.data().postDate)
        }));
        
        setSnsPosts(postsList);
        setLoading(false);
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // 페이지 이동 핸들러
  const navigateToCenterNews = () => {
    router.push('/admin/community/center-news');
  };

  const navigateToSnsNews = () => {
    router.push('/admin/community/sns-news');
  };

  // 플랫폼 아이콘
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
      <AdminLayout title="커뮤니티 관리 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="커뮤니티 관리 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>커뮤니티 관리</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.dashboardGrid}>
        {/* 센터 소식 섹션 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>센터 소식</h2>
            <button 
              onClick={navigateToCenterNews}
              className={styles.viewMoreButton}
            >
              모두 보기 <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {centerNews.length === 0 ? (
            <div className={styles.emptyState}>
              <p>등록된 센터 소식이 없습니다.</p>
              <button 
                onClick={navigateToCenterNews} 
                className={styles.addNewButton}
              >
                센터 소식 추가하기
              </button>
            </div>
          ) : (
            <div className={styles.newsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.colTitle}>제목</div>
                <div className={styles.colDate}>등록일</div>
                <div className={styles.colViews}>조회수</div>
              </div>
              
              {centerNews.map((item) => (
                <div key={item.id} className={styles.tableRow}>
                  <div className={styles.colTitle}>{item.title}</div>
                  <div className={styles.colDate}>{formatDate(item.date)}</div>
                  <div className={styles.colViews}>{item.views || 0}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SNS 소식 섹션 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>SNS 소식</h2>
            <button 
              onClick={navigateToSnsNews}
              className={styles.viewMoreButton}
            >
              모두 보기 <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {snsPosts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>등록된 SNS 게시물이 없습니다.</p>
              <button 
                onClick={navigateToSnsNews} 
                className={styles.addNewButton}
              >
                SNS 게시물 추가하기
              </button>
            </div>
          ) : (
            <div className={styles.snsGrid}>
              {snsPosts.map((post) => (
                <div key={post.id} className={styles.snsCard}>
                  <div className={styles.platformBadge}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  
                  {post.thumbnailUrl ? (
                    <div className={styles.thumbnailContainer}>
                      <img 
                        src={post.thumbnailUrl} 
                        alt={post.title} 
                        className={styles.thumbnail}
                      />
                    </div>
                  ) : (
                    <div className={styles.noThumbnail}>
                      <i className="far fa-image"></i>
                    </div>
                  )}
                  
                  <div className={styles.snsContent}>
                    <h3 className={styles.snsTitle}>{post.title}</h3>
                    <p className={styles.snsDate}>{formatDate(post.postDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 통계 요약 */}
      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>커뮤니티 통계</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fas fa-newspaper"></i>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>총 소식</h3>
              <p className={styles.statValue}>{centerNews.length}</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fas fa-share-alt"></i>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>총 SNS 게시물</h3>
              <p className={styles.statValue}>{snsPosts.length}</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fas fa-eye"></i>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>총 조회수</h3>
              <p className={styles.statValue}>
                {centerNews.reduce((sum, item) => sum + (item.views || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
CommunityPage.getLayout = (page) => page;