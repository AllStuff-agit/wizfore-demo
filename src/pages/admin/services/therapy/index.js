import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { writeBatch } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { 
  getServicesByCategory, 
  checkServiceExistsByCategory, 
  addServicesBatch 
} from '../../../../services/serviceDataService';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminProgramManagement.module.css';

export default function TherapyServices() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isAddingData, setIsAddingData] = useState(false);
  const [addDataMessage, setAddDataMessage] = useState(null);

  // 치료·상담 프로그램 기본 데이터
  const dummyPrograms = [
    {
      id: 'lang-therapy',
      name: '언어치료',
      category: '발달재활서비스',
      description: '언어발달지연, 유창성장애(말더듬), 조음음운장애 등 의사소통에 어려움이 있는 아동을 위한 치료 프로그램',
      icon: 'comments',
      status: 'active',
      sessions: 56,
      clients: 32
    },
    {
      id: 'art-therapy',
      name: '미술치료',
      category: '발달재활서비스',
      description: '미술 활동을 통해 심리적 안정을 도모하고 자기표현력과 창의성을 향상시키는 치료 프로그램',
      icon: 'paint-brush',
      status: 'active',
      sessions: 42,
      clients: 28
    },
    {
      id: 'music-therapy',
      name: '음악치료',
      category: '발달재활서비스',
      description: '음악 활동을 통해 정서적 안정과 사회성 발달을 도모하고 의사소통 능력을 향상시키는 치료 프로그램',
      icon: 'music',
      status: 'active',
      sessions: 38,
      clients: 23
    },
    {
      id: 'sensory-integration',
      name: '감각통합',
      category: '발달재활서비스',
      description: '다양한 감각 경험을 통해 뇌의 통합적인 처리 능력을 향상시키는 치료 프로그램',
      icon: 'hand-holding',
      status: 'active',
      sessions: 64,
      clients: 35
    },
    {
      id: 'play-therapy',
      name: '놀이치료',
      category: '발달재활서비스',
      description: '놀이 활동을 통해 아동의 정서적 안정과 자기표현, 문제해결 능력을 향상시키는 프로그램',
      icon: 'puzzle-piece',
      status: 'active',
      sessions: 48,
      clients: 26
    },
    {
      id: 'psychomotor',
      name: '심리운동',
      category: '발달재활서비스',
      description: '움직임을 통해 자기를 인식하고 표현하며 주변 환경과 상호작용하는 능력을 향상시키는 프로그램',
      icon: 'child',
      status: 'active',
      sessions: 36,
      clients: 20
    },
    {
      id: 'counseling',
      name: '심리상담',
      category: '발달재활서비스',
      description: '아동과 가족의 심리적 어려움을 해결하고 적응을 돕는 상담 프로그램',
      icon: 'heart',
      status: 'active',
      sessions: 32,
      clients: 22
    },
    {
      id: 'parent-counseling',
      name: '부모상담',
      category: '발달재활서비스',
      description: '자녀 양육 및 발달 지원을 위한 부모 대상 상담 프로그램',
      icon: 'users',
      status: 'active',
      sessions: 28,
      clients: 24
    }
  ];

  // Firestore에서 데이터 로드
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // 발달재활서비스 카테고리의 데이터 가져오기
        const fetchedPrograms = await getServicesByCategory("발달재활서비스");
        
        if (fetchedPrograms.length > 0) {
          setPrograms(fetchedPrograms);
        } else {
          // Firestore에 데이터가 없으면 더미 데이터 사용
          setPrograms(dummyPrograms);
        }
      } catch (error) {
        console.error("프로그램 데이터 로드 오류:", error);
        // 에러가 발생하면 더미 데이터 사용
        setPrograms(dummyPrograms);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // 기존 데이터를 Firestore에 추가하는 함수
  const addDataToFirestore = async () => {
    try {
      setIsAddingData(true);
      setAddDataMessage({ type: 'info', text: '데이터를 Firestore에 추가하는 중...' });
      
      // 이미 데이터가 있는지 확인
      const dataExists = await checkServiceExistsByCategory("발달재활서비스");
      
      if (dataExists) {
        setAddDataMessage({ 
          type: 'warning', 
          text: '이미 Firestore에 치료·상담 서비스 데이터가 존재합니다. 중복 추가를 방지하기 위해 작업이 취소되었습니다.' 
        });
        setIsAddingData(false);
        return;
      }
      
      // 배치 작업으로 여러 문서를 한번에 추가
      const batch = writeBatch(db);
      
      // 데이터 준비 및 배치 설정
      addServicesBatch(dummyPrograms, batch);
      
      // 배치 작업 커밋
      await batch.commit();
      
      // 성공 메시지 설정
      setAddDataMessage({ 
        type: 'success', 
        text: '기존 치료·상담 데이터가 Firestore에 성공적으로 추가되었습니다.' 
      });
      
      // 업데이트된 데이터 다시 로드
      const updatedPrograms = await getServicesByCategory("발달재활서비스");
      setPrograms(updatedPrograms);
      
    } catch (error) {
      console.error("Firestore 데이터 추가 오류:", error);
      setAddDataMessage({ 
        type: 'error', 
        text: `데이터 추가 중 오류가 발생했습니다: ${error.message}` 
      });
    } finally {
      setIsAddingData(false);
      
      // 5초 후 메시지 숨기기
      setTimeout(() => {
        setAddDataMessage(null);
      }, 5000);
    }
  };

  // 필터링 처리
  const filteredPrograms = filter === 'all' 
    ? programs 
    : programs.filter(program => program.status === filter);

  // 필터 변경 핸들러
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
      <Head>
        <title>치료·상담 서비스 관리 - 위즈포레 관리자</title>
      </Head>

      <div className={styles.programContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <Link href="/admin/services" className={styles.backLink}>
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div>
              <h1>치료·상담 서비스 관리</h1>
              <p>발달재활서비스 및 상담 프로그램을 관리합니다.</p>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.addButton}
              onClick={() => router.push('/admin/services/therapy/new')}
            >
              <i className="fas fa-plus"></i> 새 프로그램 추가
            </button>
            <button 
              className={`${styles.importButton} ${isAddingData ? styles.disabled : ''}`}
              onClick={addDataToFirestore}
              disabled={isAddingData}
            >
              <i className="fas fa-database"></i> 기존 치료·상담 데이터 추가
            </button>
          </div>
        </div>

        {addDataMessage && (
          <div className={`${styles.messageBox} ${styles[addDataMessage.type]}`}>
            <i className={`fas ${
              addDataMessage.type === 'success' ? 'fa-check-circle' : 
              addDataMessage.type === 'error' ? 'fa-exclamation-circle' :
              addDataMessage.type === 'warning' ? 'fa-exclamation-triangle' : 
              'fa-info-circle'
            }`}></i>
            <span>{addDataMessage.text}</span>
          </div>
        )}

        <div className={styles.filterTabs}>
          <button 
            className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            전체
          </button>
          <button 
            className={`${styles.filterTab} ${filter === 'active' ? styles.active : ''}`}
            onClick={() => handleFilterChange('active')}
          >
            활성
          </button>
          <button 
            className={`${styles.filterTab} ${filter === 'inactive' ? styles.active : ''}`}
            onClick={() => handleFilterChange('inactive')}
          >
            비활성
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <i className="fas fa-spinner fa-spin"></i> 로딩 중...
          </div>
        ) : (
          <div className={styles.programGrid}>
            {filteredPrograms.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.programIcon}>
                    <i className={`fas fa-${program.icon}`}></i>
                  </div>
                  <div className={styles.programStatus}>
                    <span className={program.status === 'active' ? styles.statusActive : styles.statusInactive}>
                      {program.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </div>
                </div>
                
                <h2 className={styles.programName}>{program.name}</h2>
                <p className={styles.programCategory}>{program.category}</p>
                <p className={styles.programDescription}>{program.description}</p>
                
                <div className={styles.programStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{program.sessions}</span>
                    <span className={styles.statLabel}>세션</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{program.clients}</span>
                    <span className={styles.statLabel}>내담자</span>
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <button className={styles.actionButton}>
                    <i className="fas fa-edit"></i> 수정
                  </button>
                  <button className={styles.actionButton}>
                    <i className="fas fa-calendar-alt"></i> 일정
                  </button>
                  <button className={styles.actionButton}>
                    <i className="fas fa-users"></i> 내담자
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// 관리자 레이아웃 적용
TherapyServices.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
