import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminProgramManagement.module.css';

export default function AfterSchoolServices() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 방과후활동 프로그램 데이터 (나중에 Firebase에서 가져올 예정)
  const dummyPrograms = [
    {
      id: 'social-saturday',
      name: '토요방과후(사회성교실)',
      category: '방과후활동',
      description: '사회지각/인지, 의사소통, 사회감성(배려,질서 등), 사회적기술훈련, 문화예술체험 등의 사회성 향상 프로그램',
      icon: 'users',
      status: 'active',
      sessions: 32,
      clients: 18
    },
    {
      id: 'basic-learning',
      name: '평일방과후(기초학습교실)',
      category: '방과후활동',
      description: '생활/학습, 기초인지, 진로적성/직업체험 등의 기초학습 향상 프로그램',
      icon: 'book',
      status: 'active',
      sessions: 45,
      clients: 24
    },
    {
      id: 'art-culture',
      name: '예술문화활동',
      category: '방과후활동',
      description: '음악, 미술, 공예, 댄스 등의 예술 및 문화 체험 활동 프로그램',
      icon: 'paint-brush',
      status: 'active',
      sessions: 28,
      clients: 15
    },
    {
      id: 'self-independence',
      name: '자립준비활동',
      category: '방과후활동',
      description: '일상생활 기술, 지역사회 이용, 자기결정기술 등의 자립 준비 프로그램',
      icon: 'hands-helping',
      status: 'active',
      sessions: 26,
      clients: 14
    },
    {
      id: 'career-experience',
      name: '진로체험활동',
      category: '방과후활동',
      description: '직업 탐색, 직업체험, 현장 견학 등의 진로 체험 프로그램',
      icon: 'briefcase',
      status: 'active',
      sessions: 20,
      clients: 12
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
        <title>방과후활동 서비스 관리 - 위즈포레 관리자</title>
      </Head>

      <div className={styles.programContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <Link href="/admin/services" className={styles.backLink}>
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div>
              <h1>방과후활동 서비스 관리</h1>
              <p>만 6세 이상 만 18세 미만의 발달장애 학생을 위한 방과후활동 프로그램을 관리합니다.</p>
            </div>
          </div>
          <button className={styles.addButton}>
            <i className="fas fa-plus"></i> 새 프로그램 추가
          </button>
        </div>

        <div className={styles.serviceInfo}>
          <div className={styles.infoCard}>
            <h3>방과후활동 서비스 정보</h3>
            <p><strong>서비스 대상:</strong> 만 6세 이상 만 18세 미만의 발달장애 학생</p>
            <p><strong>서비스 시간:</strong> 월 66시간</p>
            <p><strong>서비스 내용:</strong> 방과후 시간을 이용하여 지역사회 다양한 장소와 기관에서 자신이 원하는 활동에 참여하는 서비스</p>
          </div>
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
                    <span className={styles.statLabel}>참여자</span>
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
                    <i className="fas fa-users"></i> 참여자
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
AfterSchoolServices.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
