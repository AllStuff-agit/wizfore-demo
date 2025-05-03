import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../../../../firebase/firebase';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/admin/team/therapistCounselor.module.css';

export default function TherapistCounselorPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExperts, setFilteredExperts] = useState([]);
  
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

  // 전문가 목록 가져오기
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertQuery = query(
          collection(db, 'experts'), 
          orderBy('order', 'asc'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(expertQuery);
        
        const expertList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setExperts(expertList);
        setLoading(false);
      } catch (error) {
        console.error('전문가 목록 불러오기 오류:', error);
        setError('전문가 목록을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  // 필터링 처리
  useEffect(() => {
    if (experts.length > 0) {
      let filtered = [...experts];
      
      // 타입 필터링
      if (filterType !== 'all') {
        filtered = filtered.filter(expert => expert.type === filterType);
      }
      
      // 검색어 필터링
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(expert => 
          expert.name?.toLowerCase().includes(term) || 
          expert.position?.toLowerCase().includes(term) ||
          expert.specialties?.toLowerCase().includes(term)
        );
      }
      
      setFilteredExperts(filtered);
    }
  }, [experts, filterType, searchTerm]);

  // 검색어 입력 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 전문가 추가 페이지로 이동
  const handleAddExpert = () => {
    setSaving(true);
    try {
      router.push('/admin/team/add');
    } catch (error) {
      console.error('페이지 이동 오류:', error);
      setError('페이지 이동 중 오류가 발생했습니다.');
      setSaving(false);
    }
  };

  // 전문가 편집 페이지로 이동
  const handleEditExpert = (id) => {
    router.push(`/admin/team/edit/${id}`);
  };

  // 전문가 삭제
  const handleDeleteExpert = async (id, imageUrl) => {
    if (window.confirm('이 전문가 정보를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        // 이미지가 있는 경우 스토리지에서 삭제
        if (imageUrl) {
          try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            console.log('프로필 이미지 삭제 완료');
          } catch (error) {
            console.warn('이미지 삭제 실패:', error);
          }
        }

        // Firestore에서 문서 삭제
        await deleteDoc(doc(db, 'experts', id));
        setExperts(experts.filter(expert => expert.id !== id));
        alert('전문가 정보가 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('전문가 삭제 오류:', error);
        alert('전문가 정보 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 전문가 유형에 따른 표시 텍스트
  const getExpertTypeText = (type) => {
    switch (type) {
      case 'therapist':
        return '치료사';
      case 'counselor':
        return '상담사';
      case 'teacher':
        return '교사';
      default:
        return '기타';
    }
  };

  if (loading) {
    return (
      <AdminLayout title="치료 · 상담사 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="치료 · 상담사 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>치료 · 상담사</h1>
        <button 
          onClick={handleAddExpert} 
          className={styles.addButton}
          disabled={saving}
        >
          <i className="fas fa-plus"></i> {saving ? '이동 중...' : '새 전문가 추가'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {/* 대시보드 카드 */}
      <div className={styles.dashboardCards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <i className="fas fa-user-md"></i>
          </div>
          <div className={styles.cardContent}>
            <h3>치료사</h3>
            <p className={styles.cardCount}>
              {experts.filter(e => e.type === 'therapist').length}
            </p>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <i className="fas fa-comments"></i>
          </div>
          <div className={styles.cardContent}>
            <h3>상담사</h3>
            <p className={styles.cardCount}>
              {experts.filter(e => e.type === 'counselor').length}
            </p>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <i className="fas fa-users"></i>
          </div>
          <div className={styles.cardContent}>
            <h3>전체 인원</h3>
            <p className={styles.cardCount}>
              {experts.filter(e => e.type === 'therapist' || e.type === 'counselor').length}
            </p>
          </div>
        </div>
      </div>
      
      {/* 필터 및 검색 */}
      <div className={styles.filterContainer}>
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.filterTab} ${filterType === 'all' ? styles.active : ''}`} 
            onClick={() => setFilterType('all')}
          >
            전체 보기
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'therapist' ? styles.active : ''}`} 
            onClick={() => setFilterType('therapist')}
          >
            치료사
          </button>
          <button 
            className={`${styles.filterTab} ${filterType === 'counselor' ? styles.active : ''}`} 
            onClick={() => setFilterType('counselor')}
          >
            상담사
          </button>
        </div>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="이름 또는 분야 검색..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {experts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-user-md"></i>
          </div>
          <h2>등록된 전문가가 없습니다</h2>
          <p>새 전문가를 추가하려면 '새 전문가 추가' 버튼을 클릭하세요.</p>
        </div>
      ) : filteredExperts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <i className="fas fa-search"></i>
          </div>
          <h2>검색 결과가 없습니다</h2>
          <p>다른 검색어를 입력하거나 필터를 변경해보세요.</p>
        </div>
      ) : (
        <div className={styles.expertGrid}>
          {filteredExperts.filter(expert => expert.type === 'therapist' || expert.type === 'counselor').map((expert) => (
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
                  {getExpertTypeText(expert.type)}
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
              <div className={styles.expertActions}>
                <button 
                  onClick={() => handleEditExpert(expert.id)} 
                  className={styles.editButton}
                  title="편집"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDeleteExpert(expert.id, expert.imageUrl)} 
                  className={styles.deleteButton}
                  title="삭제"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
TherapistCounselorPage.getLayout = (page) => page;