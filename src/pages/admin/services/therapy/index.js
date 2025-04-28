import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminProgramManagement.module.css';

export default function TherapyServices() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 치료·상담 프로그램 데이터 (나중에 Firebase에서 가져올 예정)
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

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 Firebase에서 데이터를 가져옴
    // 현재는 더미 데이터 사용
    setPrograms(dummyPrograms);
    setLoading(false);
  }, []);

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
          <button className={styles.addButton}>
            <i className="fas fa-plus"></i> 새 프로그램 추가
          </button>
        </div>

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
