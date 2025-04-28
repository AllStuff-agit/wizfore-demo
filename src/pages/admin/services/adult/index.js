import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminProgramManagement.module.css';

export default function AdultDayServices() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 성인주간활동 프로그램 데이터 (나중에 Firebase에서 가져올 예정)
  const dummyPrograms = [
    {
      id: 'daily-life',
      name: '일상생활기술훈련',
      category: '성인주간활동',
      description: '신변자립생활, 자기관리생활, 청결/위생/안전/이동생활 등의 일상생활 기술 향상을 위한 프로그램',
      icon: 'home',
      status: 'active',
      sessions: 48,
      clients: 25
    },
    {
      id: 'social-adaptation',
      name: '사회적응기술훈련',
      category: '성인주간활동',
      description: '사회정서생활, 공동체적응생활, 공감/협동/배려/질서, 사회적기술 등의 사회적응 능력 향상을 위한 프로그램',
      icon: 'users',
      status: 'active',
      sessions: 42,
      clients: 22
    },
    {
      id: 'healing',
      name: '쉼(힐링)프로그램',
      category: '성인주간활동',
      description: '숲체험, 숲치유, 원예치료활동, 음악/영화/댄스, 문화예술교육 등 심리적 안정과 휴식을 제공하는 프로그램',
      icon: 'tree',
      status: 'active',
      sessions: 36,
      clients: 28
    },
    {
      id: 'leisure',
      name: '재미(여가)프로그램',
      category: '성인주간활동',
      description: '음악/미술/원예/레크레이션, 보드게임/컴퓨터/요리/운동 등 여가 활동 프로그램',
      icon: 'gamepad',
      status: 'active',
      sessions: 32,
      clients: 26
    },
    {
      id: 'community',
      name: '지역사회활용훈련',
      category: '성인주간활동',
      description: '공공/편의시설/문화시설 이용, 바리스타/난타/체육시설 이용 등 지역사회 자원 활용 능력 향상을 위한 프로그램',
      icon: 'city',
      status: 'active',
      sessions: 28,
      clients: 20
    },
    {
      id: 'health',
      name: '건강생활관리',
      category: '성인주간활동',
      description: '맞춤형 피트니스, 신체운동활동, 뇌파프로그램, 정신건강활동 등 건강 관리 프로그램',
      icon: 'heartbeat',
      status: 'active',
      sessions: 38,
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
        <title>성인주간활동 서비스 관리 - 위즈포레 관리자</title>
      </Head>

      <div className={styles.programContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <Link href="/admin/services" className={styles.backLink}>
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div>
              <h1>성인주간활동 서비스 관리</h1>
              <p>만 18세 이상 만 65세 미만 성인 발달장애인을 위한 주간활동 프로그램을 관리합니다.</p>
            </div>
          </div>
          <button className={styles.addButton}>
            <i className="fas fa-plus"></i> 새 프로그램 추가
          </button>
        </div>

        <div className={styles.serviceInfo}>
          <div className={styles.infoCard}>
            <h3>성인주간활동 서비스 정보</h3>
            <p><strong>서비스 대상:</strong> 만 18세 이상 만 65세 미만 성인 발달장애인</p>
            <p><strong>서비스 시간:</strong> 월 176시간(확장형) / 132시간(기본형)</p>
            <p><strong>서비스 내용:</strong> 자립생활, 사회적응, 여가활동, 건강관리 등</p>
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
AdultDayServices.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
