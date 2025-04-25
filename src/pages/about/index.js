import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/About.module.css';

export default function About() {
  // 연혁 데이터
  const history = [
    { year: '2016', month: '01', event: '위즈포레 설립' },
    { year: '2016', month: '02', event: '아동청소년 심리지원서비스 및 발달재활치료서비스 제공기관 등록' },
    { year: '2016', month: '03', event: '발달장애인 주간활동 활동서비스 제공기관 지정' },
    { year: '2021', month: '07', event: '특수교육대상자 치료지원서비스 제공기관 지정' },
    { year: '2021', month: '10', event: '사상구드림스타트센터 업무협약(심리지원 교육 협력기관)' },
    { year: '2021', month: '11', event: '경애학교 발달재활서비스 제공기관 지정' },
    { year: '2022', month: '02', event: '부산장애인복지시설협회 업무협약(심리지원서비스 지원사업)' },
    { year: '2022', month: '06', event: '부산가톨릭대학교 언어재활학과와 산학협력' },
    { year: '2022', month: '10', event: '성심모자원학교 코칭프로그램 우수강사 선정(부산언어지원학습센터)' },
    { year: '2022', month: '11', event: '용해놀이마을 입주업체 선정협력' },
    { year: '2023', month: '03', event: '사상구장애인체육회 생활체육지원사업 업무협약' },
    { year: '2023', month: '04', event: '한국사회복지상담학회(신라대 사회복지학과) 산학협력' },
    { year: '2023', month: '11', event: '고용부 청년일경험지원사업(신구로전장충활총회) 업무협약' },
    { year: '2023', month: '11', event: '신라장애인대학교 실업자훈련과 산학협력' },
    { year: '2024', month: '02', event: '길상시아버대학교 심리운동학과와 산학협력(실습인증기관)' },
    { year: '2024', month: '03', event: '대구시아버대학교 산학협력(언어치료,놀이치료학과)' },
    { year: '2024', month: '05', event: '부산장애인종합복지관 산학협력(사회복지상담전공,언어심리치료사)' },
    { year: '2024', month: '06', event: '사상구청센터 업무협약' }
  ];

  // 강점 데이터
  const strengths = [
    {
      title: '안심되고',
      description: '아이와 가족이 안전하고 편안한 환경에서 치료 및 프로그램을 제공합니다.',
      icon: 'fas fa-shield-alt'
    },
    {
      title: '즐겁고',
      description: '아이들이 즐겁게 참여할 수 있는 다양한 활동과 프로그램을 개발하고 제공합니다.',
      icon: 'fas fa-smile'
    },
    {
      title: '유익하고',
      description: '개인에게 맞춘 전문적인 프로그램으로 실질적인 발달과 성장을 돕습니다.',
      icon: 'fas fa-lightbulb'
    },
    {
      title: '희망차고',
      description: '아이와 가족에게 긍정적인 미래를 향한 희망을 심어드립니다.',
      icon: 'fas fa-heart'
    },
    {
      title: '성장하는',
      description: '지속적인 연구와 교육을 통해 항상 발전하는 서비스를 제공합니다.',
      icon: 'fas fa-seedling'
    }
  ];

  // 전문가 팀 데이터
  const team = [
    {
      name: '김지원',
      position: '센터장',
      specialty: '언어치료',
      image: '/images/team/therapist1.jpg'
    },
    {
      name: '이서연',
      position: '팀장',
      specialty: '심리상담',
      image: '/images/team/therapist2.jpg'
    },
    {
      name: '박민준',
      position: '치료사',
      specialty: '감각통합',
      image: '/images/team/therapist3.jpg'
    },
    {
      name: '정예준',
      position: '치료사',
      specialty: '미술치료',
      image: '/images/team/therapist4.jpg'
    }
  ];

  return (
    <>
      <Head>
        <title>기관 소개 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터 소개 페이지입니다. 우리의 비전, 미션, 연혁을 확인하세요." />
      </Head>

      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>기관 소개</h1>
          <p>위즈포레 사회서비스센터의 이야기를 소개합니다.</p>
        </div>
      </div>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2>위즈포레는 무엇인가요?</h2>
              <p>위즈포레(WIZ FORE)는 '함께 어우러지는 지혜의 숲(Wisdom Forest)'이라는 의미를 담고 있으며, 장애인을 포함한 모든 사람들이 어우러져 더불어 살아가는 힘을 키우는데 필요한 사회서비스를 제공하는 전문기관입니다.</p>
              <p>2016년 설립 이후, 위즈포레는 다양한 치료 및 활동 프로그램을 통해 아동과 가족의 건강과 행복을 지원해왔습니다. 전문성 있는 치료사들이 함께 최상의 서비스를 제공하기 위해 노력하고 있습니다.</p>
              
              <div className={styles.visionMission}>
                <div className={styles.visionBox}>
                  <h3>비전</h3>
                  <p>아동과 가족이 건강하고 행복한 삶을 영위할 수 있도록 최상의 사회서비스를 제공하는 전문기관</p>
                </div>
                <div className={styles.missionBox}>
                  <h3>미션</h3>
                  <p>개인의 특성과 환경을 고려한 맞춤형 서비스로 모든 아동과 가족의 삶의 질 향상에 기여</p>
                </div>
              </div>
            </div>
            <div className={styles.introImage}>
              <img src="/images/about/center-image.jpg" alt="위즈포레 사회서비스센터" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.strengthsSection}>
        <div className={styles.container}>
          <h2>위즈포레의 강점</h2>
          <div className={styles.strengthsGrid}>
            {strengths.map((strength, index) => (
              <div key={index} className={styles.strengthItem}>
                <div className={styles.strengthIcon}>
                  <i className={strength.icon}></i>
                </div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.historySection}>
        <div className={styles.container}>
          <h2>연혁</h2>
          <div className={styles.timeline}>
            {history.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDate}>
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.month}>{item.month}</span>
                </div>
                <div className={styles.timelineContent}>
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2>전문가 팀</h2>
          <p className={styles.teamIntro}>위즈포레는 각 분야의 전문가들로 구성된 팀이 함께합니다.</p>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.position}>{member.position}</p>
                  <p className={styles.specialty}>{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.teamStats}>
            <div className={styles.statItem}>
              <h3>24명</h3>
              <p>전문 치료사</p>
            </div>
            <div className={styles.statItem}>
              <h3>8년+</h3>
              <p>치료 경험</p>
            </div>
            <div className={styles.statItem}>
              <h3>24실</h3>
              <p>치료실</p>
            </div>
            <div className={styles.statItem}>
              <h3>15+</h3>
              <p>협력 기관</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>함께하고 싶으신가요?</h2>
            <p>위즈포레 사회서비스센터의 프로그램에 관심이 있으시다면 언제든지 문의해주세요.</p>
            <Link href="/contact" className={styles.btn}>
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}