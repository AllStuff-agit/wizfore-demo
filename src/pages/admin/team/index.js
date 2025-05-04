import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/team/Index.module.css';

export default function TeamPage() {
  const [experts, setExperts] = useState([]);
  const [advisors, setAdvisors] = useState([]);
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

  // 전문가 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 전문가 데이터 가져오기
        const expertsQuery = query(
          collection(db, 'experts'), 
          orderBy('order', 'asc')
        );
        const expertsSnapshot = await getDocs(expertsQuery);
        
        const expertsList = expertsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setExperts(expertsList);
        
        // 자문위원 데이터 가져오기
        const advisorsCollection = collection(db, '센터정보', 'advisors', 'items');
        const advisorsQuery = query(advisorsCollection, where('isActive', '==', true));
        const advisorsSnapshot = await getDocs(advisorsQuery);
        
        const advisorsList = advisorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setAdvisors(advisorsList);
        setLoading(false);
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 전문가 유형 카운트
  const countExpertsByType = () => {
    const counts = {
      therapist: 0,
      counselor: 0,
      teacher: 0,
      all: 0
    };
    
    experts.forEach(expert => {
      if (expert.type) {
        counts[expert.type] = (counts[expert.type] || 0) + 1;
      }
      counts.all++;
    });
    
    return counts;
  };

  const expertCounts = countExpertsByType();

  // 페이지 이동 핸들러
  const navigateToTherapistCounselor = () => {
    router.push('/admin/team/therapist-counselor');
  };

  const navigateToAdvisors = () => {
    router.push('/admin/team/advisors');
  };

  const navigateToAddExpert = () => {
    router.push('/admin/team/add');
  };

  if (loading) {
    return (
      <AdminLayout title="전문가 소개 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="전문가 소개 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>전문가 소개</h1>
        <button 
          onClick={navigateToAddExpert} 
          className={styles.addButton}
        >
          <i className="fas fa-plus"></i> 새 전문가 추가
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {/* 통계 요약 카드 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-users"></i>
          </div>
          <div className={styles.statContent}>
            <h3>전체 인원</h3>
            <p className={styles.statValue}>{expertCounts.all}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-user-md"></i>
          </div>
          <div className={styles.statContent}>
            <h3>치료사</h3>
            <p className={styles.statValue}>{expertCounts.therapist || 0}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-comments"></i>
          </div>
          <div className={styles.statContent}>
            <h3>상담사</h3>
            <p className={styles.statValue}>{expertCounts.counselor || 0}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <div className={styles.statContent}>
            <h3>교사</h3>
            <p className={styles.statValue}>{expertCounts.teacher || 0}</p>
          </div>
        </div>
      </div>

      {/* 전문가 카테고리 섹션 */}
      <div className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>전문가 카테고리</h2>
        
        <div className={styles.categoryCards}>
          <div 
            className={styles.categoryCard}
            onClick={navigateToTherapistCounselor}
          >
            <div className={styles.categoryIcon}>
              <i className="fas fa-user-md"></i>
            </div>
            <h3>치료 · 상담사</h3>
            <p>치료사와 상담사 전문가 관리</p>
            <div className={styles.categoryCount}>
              {(expertCounts.therapist || 0) + (expertCounts.counselor || 0)}명
            </div>
            <div className={styles.categoryAction}>
              <span className={styles.viewButton}>관리하기</span>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
          
          <div className={styles.categoryCard}>
            <div className={styles.categoryIcon}>
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h3>교사</h3>
            <p>주간활동 및 방과후활동 교사 관리</p>
            <div className={styles.categoryCount}>
              {expertCounts.teacher || 0}명
            </div>
            <div className={styles.categoryAction}>
              <span className={styles.viewButton}>준비 중</span>
              <i className="fas fa-hourglass-half"></i>
            </div>
          </div>
          
          <div 
            className={styles.categoryCard}
            onClick={navigateToAdvisors}
          >
            <div className={styles.categoryIcon}>
              <i className="fas fa-user-tie"></i>
            </div>
            <h3>자문위원</h3>
            <p>전문 자문위원 관리</p>
            <div className={styles.categoryCount}>
              {advisors.length}명
            </div>
            <div className={styles.categoryAction}>
              <span className={styles.viewButton}>관리하기</span>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 추가된 전문가 */}
      <div className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>최근 추가된 전문가</h2>
        
        {experts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>등록된 전문가가 없습니다</h3>
            <p>새 전문가를 추가하려면 '새 전문가 추가' 버튼을 클릭하세요.</p>
            <button 
              onClick={navigateToAddExpert} 
              className={styles.addNewButton}
            >
              새 전문가 추가
            </button>
          </div>
        ) : (
          <div className={styles.recentExperts}>
            {experts.slice(0, 4).map((expert) => (
              <div key={expert.id} className={styles.expertCard}>
                <div className={styles.expertImageContainer}>
                  {expert.imageUrl ? (
                    <img
                      src={expert.imageUrl}
                      alt={`${expert.name} 사진`}
                      className={styles.expertImage}
                    />
                  ) : (
                    <div className={styles.noImage}>
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                  <span className={styles.expertType}>
                    {expert.type === 'therapist' && '치료사'}
                    {expert.type === 'counselor' && '상담사'}
                    {expert.type === 'teacher' && '교사'}
                    {!['therapist', 'counselor', 'teacher'].includes(expert.type) && '기타'}
                  </span>
                </div>
                <div className={styles.expertInfo}>
                  <h3 className={styles.expertName}>{expert.name}</h3>
                  <p className={styles.expertPosition}>{expert.position}</p>
                  {expert.specialties && (
                    <p className={styles.expertSpecialties}>
                      <i className="fas fa-star"></i> {expert.specialties}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
TeamPage.getLayout = (page) => page;