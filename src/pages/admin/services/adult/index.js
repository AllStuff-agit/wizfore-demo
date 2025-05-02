import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { db } from '../../../../firebase/firebase';
import { 
  getServiceByCategory, 
  checkServiceExists, 
  setServiceData,
  serviceDefaultData
} from '../../../../services/serviceDataService';
import AdminLayout from '../../../../components/AdminLayout';
import styles from '../../../../styles/admin/services/ProgramManagement.module.css';

export default function AdultDayServices() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isAddingData, setIsAddingData] = useState(false);
  const [addDataMessage, setAddDataMessage] = useState(null);

  // Firestore에서 데이터 로드
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        // 성인주간활동 카테고리의 데이터 가져오기
        const serviceData = await getServiceByCategory("성인주간활동");
        
        if (serviceData && serviceData.programs) {
          setPrograms(serviceData.programs);
        } else {
          // 데이터가 없는 경우 빈 배열로 설정
          setPrograms([]);
          // 데이터 없음 메시지 표시
          setAddDataMessage({ 
            type: 'info', 
            text: 'Firestore에 성인주간활동 서비스 데이터가 없습니다. "기존 성인주간활동 데이터 추가" 버튼을 클릭하여 데이터를 추가해 주세요.' 
          });
        }
      } catch (error) {
        console.error("프로그램 데이터 로드 오류:", error);
        // 에러 발생 시 빈 배열 설정
        setPrograms([]);
        // 오류 메시지 표시
        setAddDataMessage({ 
          type: 'error', 
          text: `데이터 로드 중 오류가 발생했습니다: ${error.message}` 
        });
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
      const dataExists = await checkServiceExists("성인주간활동");
      
      if (dataExists) {
        setAddDataMessage({ 
          type: 'warning', 
          text: '이미 Firestore에 성인주간활동 서비스 데이터가 존재합니다. 중복 추가를 방지하기 위해 작업이 취소되었습니다.' 
        });
        setIsAddingData(false);
        return;
      }
      
      // 서비스 데이터 추가
      await setServiceData("성인주간활동", serviceDefaultData.성인주간활동);
      
      // 성공 메시지 설정
      setAddDataMessage({ 
        type: 'success', 
        text: '기존 성인주간활동 데이터가 Firestore에 성공적으로 추가되었습니다.' 
      });
      
      // 업데이트된 데이터 다시 로드
      const updatedServiceData = await getServiceByCategory("성인주간활동");
      if (updatedServiceData && updatedServiceData.programs) {
        setPrograms(updatedServiceData.programs);
      }
      
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
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.importButton} ${isAddingData ? styles.disabled : ''}`}
              onClick={addDataToFirestore}
              disabled={isAddingData}
            >
              <i className="fas fa-database"></i> 기존 성인주간활동 데이터 추가
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
                <p className={styles.programCategory}>성인주간활동</p>
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
