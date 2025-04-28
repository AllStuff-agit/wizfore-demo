import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/AdminProgramManagement.module.css';

export default function SportsServices() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 특수스포츠교실 프로그램 데이터 (나중에 Firebase에서 가져올 예정)
  const dummyPrograms = [
    {
      id: 'special-pe',
      name: '특수체육',
      category: '특수스포츠교실',
      description: '신체 활동을 통해 대근육 및 소근육 발달을 촉진하고 협응력과 균형감각을 향상시키는 프로그램',
      icon: 'running',
      status: 'active',
      sessions: 48,
      clients: 25
    },
    {
      id: 'sports-integration',
      name: '통합스포츠',
      category: '특수스포츠교실',
      description: '일반 아동과 장애 아동이 함께 참여하는 통합형 스포츠 활동 프로그램',
      icon: 'users',
      status: 'active',
      sessions: 36,
      clients: 20
    },
    {
      id: 'adaptive-sports',
      name: '적응형 스포츠',
      category: '특수스포츠교실',
      description: '개인의 특성과 능력에 맞게 조정된 적응형 스포츠 활동 프로그램',
      icon: 'medal',
      status: 'active',
      sessions: 42,
      clients: 22
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
        <title>특수스포츠교실 서비스 관리 - 위즈포레 관리자</title>
      </Head>

      <div className={styles.programContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <Link href="/admin/services" className={styles.backLink}>
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div>
              <h1>특수스포츠교실 서비스 관리</h1>
              <p>신체 활동과 스포츠를 통한 발달 지원 프로그램을 관리합니다.</p>
            </div>
          </div>
          <button className={styles.addButton}>
            <i className="fas fa-plus"></i> 새 프로그램 추가
          </button>
        </div>

        <div className={styles.serviceInfo}>
          <div className={styles.infoCard}>
            <h3>특수스포츠교실 서비스 정보</h3>
            <p><strong>서비스 대상:</strong> 아동 및 청소년, 성인 발달장애인</p>
            <p><strong>서비스 내용:</strong> 인지영역(이해, 적용, 분석, 종합), 신체적 영역(반사, 기초기능, 신체능력), 정의적 영역(수용화, 가치화, 조직화) 발달 지원</p>
            <p><strong>프로그램 특징:</strong> 맞춤형 탬포 트레이닝, 근력운동, 사회성 통합 스포츠 등</p>
          </div>
        </div>

        <div className={styles.sportsFacilities}>
          <h3>특수스포츠교실 시설 정보</h3>
          <div className={styles.facilitiesGrid}>
            <div className={styles.facilityCard}>
              <div className={styles.facilityIcon}>
                <i className="fas fa-dumbbell"></i>
              </div>
              <h4>체육실 1호</h4>
              <p>면적: 75㎡ (약 23평)</p>
              <p>최대 수용인원: 15명</p>
            </div>
            <div className={styles.facilityCard}>
              <div className={styles.facilityIcon}>
                <i className="fas fa-volleyball-ball"></i>
              </div>
              <h4>체육실 2호</h4>
              <p>면적: 82㎡ (약 25평)</p>
              <p>최대 수용인원: 18명</p>
            </div>
            <div className={styles.facilityCard}>
              <div className={styles.facilityIcon}>
                <i className="fas fa-basketball-ball"></i>
              </div>
              <h4>다목적 체육실</h4>
              <p>면적: 132㎡ (약 40평)</p>
              <p>최대 수용인원: 25명</p>
            </div>
            <div className={styles.facilityCard}>
              <div className={styles.facilityIcon}>
                <i className="fas fa-shoe-prints"></i>
              </div>
              <h4>평형감각실</h4>
              <p>면적: 66㎡ (약 20평)</p>
              <p>최대 수용인원: 12명</p>
            </div>
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
SportsServices.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
