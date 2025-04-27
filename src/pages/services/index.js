import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Services.module.css';

export default function Services() {
  // 서비스 데이터
  const mainServices = [
    {
      id: 'day-activity',
      title: '주간활동서비스',
      subtitle: '(성인 발달장애인)',
      icon: 'fas fa-calendar-day',
      description: '만 18세 이상 만 65세 미만 성인 발달장애인을 대상으로 낮 시간에 자신의 욕구를 반영한 지역사회 기반 활동에 참여함으로써 자립생활을 지원하는 사업입니다.',
      target: '만 18세 이상 만 65세 미만 성인 발달장애인',
      hours: '월 176시간(확장형) / 132시간(기본형)',
      details: [
        '일상생활기술훈련: 신변자립생활, 자기관리생활, 청결/위생/안전/이동생활',
        '사회적응기술훈련: 사회정서생활, 공동체적응생활, 공감/협동/배려/질서, 사회적기술',
        '쉼(힐링)프로그램: 숲체험, 숲치유, 원예치료활동, 음악/영화/댄스, 문화예술교육',
        '재미(여가)프로그램: 음악/미술/원예/레크레이션, 보드게임/컴퓨터/요리/운동',
        '지역사회활용훈련: 공공/편의시설/문화시설 이용, 바리스타/난타/체육시설 이용',
        '건강생활관리: 맞춤형 피트니스, 신체운동활동, 뇌파프로그램, 정신건강활동'
      ]
    },
    {
      id: 'after-school',
      title: '방과후활동서비스',
      subtitle: '(청소년 발달장애인)',
      icon: 'fas fa-school',
      description: '발달장애 학생이 방과후 시간을 이용하여 지역사회 다양한 장소와 기관에서 자신이 원하는 활동에 참여하며 동료들과 어울릴 수 있도록 지원하는 서비스입니다.',
      target: '만 6세 이상 만 18세 미만의 발달장애 학생',
      hours: '월 66시간',
      details: [
        '토요방과후(사회성교실): 사회지각/인지, 의사소통, 사회감성(배려,질서 등), 사회적기술훈련, 문화예술체험',
        '평일방과후(기초학습교실): 생활/학습, 기초인지, 진로적성/직업체험'
      ]
    },
    {
      id: 'therapy',
      title: '치료/상담서비스',
      subtitle: '(아동 발달재활서비스)',
      icon: 'fas fa-hands-helping',
      description: '발달장애나 발달지연이 있는 아동의 재활을 지원하는 서비스입니다.',
      target: '언어발달지연으로 의사소통에 어려움이 있는 아동, 인지 발달지연으로 전반적인 학습능력에 지연된 아동, 사회성 발달지연으로 또래관계에 어려움이 있는 아동 등',
      details: [
        '복지부 발달재활서비스',
        '복지부 아동청소년심리지원서비스',
        '복지부 가족마음이음서비스',
        '복지부 발달장애인 부모상담서비스',
        '교육청 치료지원서비스(바우처)',
        '드림스타트 치료지원서비스'
      ]
    }
  ];

  // 치료 프로그램 데이터
  const therapyPrograms = [
    {
      id: 'language-therapy',
      title: '언어치료',
      icon: 'fas fa-comments',
      bgColor: 'var(--color-primary-light)',
      description: '언어발달지연, 유창성장애(말더듬), 조음음운장애 등 의사소통에 어려움이 있는 아동을 위한 치료 프로그램입니다.',
      details: [
        '언어발달지연',
        '유창성장애(말더듬)',
        '조음음운장애',
        '중복언어장애',
        '의사소통프로그램(소그룹)'
      ]
    },
    {
      id: 'art-therapy',
      title: '미술치료',
      icon: 'fas fa-paint-brush',
      bgColor: 'var(--color-secondary-yellow)',
      description: '미술 활동을 통해 심리적 안정을 도모하고 자기표현력과 창의성을 향상시키는 치료 프로그램입니다.',
      details: [
        '발달미술치료',
        '심리미술치료',
        '기초미술치료',
        '사회성 집단미술치료',
        '퍼포먼스 오감 미술치료'
      ]
    },
    {
      id: 'music-therapy',
      title: '음악치료',
      icon: 'fas fa-music',
      bgColor: 'var(--color-secondary-orange)',
      description: '음악 활동을 통해 정서적 안정과 사회성 발달을 도모하고 의사소통 능력을 향상시키는 치료 프로그램입니다.',
      details: [
        '노래부르기',
        '악기연주',
        '음악감상',
        '소리 지각 및 구별',
        '호흡 및 발성',
        '상호작용 향상',
        '사회기술 발달'
      ]
    },
    {
      id: 'sensory-integration',
      title: '감각통합',
      icon: 'fas fa-hand-holding',
      bgColor: 'var(--color-secondary-green)',
      description: '다양한 감각 경험을 통해 뇌의 통합적인 처리 능력을 향상시키는 치료 프로그램입니다.',
      details: [
        '신체지각',
        '운동기획',
        '공간지각 발달',
        '전정감',
        '고유감',
        '촉각',
        '적응반응',
        '신체협응',
        '운동협응 발달 촉진'
      ]
    },
    {
      id: 'play-therapy',
      title: '놀이치료',
      icon: 'fas fa-puzzle-piece',
      bgColor: 'var(--color-primary-light)',
      description: '놀이 활동을 통해 아동의 정서적 안정과 자기표현, 문제해결 능력을 향상시키는 프로그램입니다.',
      details: [
        '발달놀이치료',
        '정서놀이치료',
        '사회성놀이치료',
        '모래놀이치료',
        '아동의 내면적 세계 표현',
        '문제해결능력 및 자기조절력',
        '공감적 상호작용',
        '부정적 인지 사고 재개념화'
      ]
    },
    {
      id: 'special-pe',
      title: '특수체육',
      icon: 'fas fa-running',
      bgColor: 'var(--color-secondary-yellow)',
      description: '신체 활동을 통해 대근육 및 소근육 발달을 촉진하고 협응력과 균형감각을 향상시키는 프로그램입니다.',
      details: [
        '인지영역: 이해, 적용, 분석, 종합',
        '신체적 영역: 반사, 기초기능, 신체능력',
        '정의적 영역: 수용화, 가치화, 조직화',
        '맞춤형 탬포 트레이닝',
        '근력운동',
        '사회성 통합 스포츠'
      ]
    },
    {
      id: 'psychomotor',
      title: '심리운동',
      icon: 'fas fa-child',
      bgColor: 'var(--color-secondary-orange)',
      description: '움직임을 통해 자기를 인식하고 표현하며 주변 환경과 상호작용하는 능력을 향상시키는 프로그램입니다.',
      details: [
        '신체경험: 신체지각, 운동조절 및 기획',
        '물질경험: 물질의 지각, 환경경험, 탐색과 놀이',
        '사회경험: 사회지각 및 인지, 사회적 정서 발달'
      ]
    },
    {
      id: 'counseling',
      title: '심리상담',
      icon: 'fas fa-heart',
      bgColor: 'var(--color-secondary-green)',
      description: '아동과 가족의 심리적 어려움을 해결하고 적응을 돕는 상담 프로그램입니다.',
      details: [
        '지능양육코칭',
        '효율적 양육기술',
        '감정코칭',
        '우울/불안/분노조절',
        '기록상담',
        '종합심리검사'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>서비스 안내 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터의 다양한 서비스 안내 페이지입니다." />
      </Head>

      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>서비스 안내</h1>
          <p>위즈포레 사회서비스센터에서 제공하는 다양한 서비스를 소개합니다.</p>
        </div>
      </div>

      <section className={styles.mainServicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>주요 프로그램</h2>
            <p>위즈포레 사회서비스센터의 주요 프로그램을 소개합니다.</p>
          </div>
          
          <div className={styles.servicesGrid}>
            {mainServices.map((service) => (
              <div key={service.id} id={service.id} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIcon}>
                    <i className={service.icon}></i>
                  </div>
                  <div className={styles.serviceTitle}>
                    <h3>{service.title}</h3>
                    {service.subtitle && (
                      <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                    )}
                  </div>
                </div>
                
                <div className={styles.serviceDescription}>
                  <p>{service.description}</p>
                </div>
                
                <div className={styles.serviceDetails}>
                  {service.target && (
                    <div className={styles.detailItem}>
                      <h4>대상</h4>
                      <p>{service.target}</p>
                    </div>
                  )}
                  
                  {service.hours && (
                    <div className={styles.detailItem}>
                      <h4>제공시간</h4>
                      <p>{service.hours}</p>
                    </div>
                  )}
                  
                  <div className={styles.detailItem}>
                    <h4>서비스 내용</h4>
                    <ul className={styles.serviceList}>
                      {service.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.therapySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>치료 프로그램</h2>
            <p>위즈포레 사회서비스센터의 다양한 치료 프로그램을 소개합니다.</p>
          </div>
          
          <div className={styles.therapyGrid}>
            {therapyPrograms.map((program) => (
              <div key={program.id} id={program.id} className={styles.therapyCard}>
                <div 
                  className={styles.therapyIconWrapper}
                  style={{ backgroundColor: program.bgColor }}
                >
                  <i className={`${program.icon} ${styles.therapyIcon}`}></i>
                </div>
                
                <h3>{program.title}</h3>
                <p className={styles.therapyDescription}>{program.description}</p>
                
                <div className={styles.therapyDetails}>
                  <h4>제공 프로그램</h4>
                  <ul>
                    {program.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>무료 상담 및 체험 신청</h2>
            <p>위즈포레 사회서비스센터의 프로그램에 관심이 있으신가요?<br />
               무료 상담 및 체험 신청을 통해 자세한 안내를 받아보세요.</p>
            <Link href="/contact" className={styles.ctaButton}>
              상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}