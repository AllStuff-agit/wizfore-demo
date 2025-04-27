import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/About.module.css';

export default function About() {
  // 연혁 데이터
  const history = [
    { year: '2016', month: '01', day: '01', event: '위즈포레 설립' },
    { year: '2016', month: '02', day: '03', event: '아동청소년 심리치유서비스 및 학부모코칭서비스 제공기관 등록' },
    { year: '2020', month: '12', day: '03', event: '발달장애인 주간/방과후 활동서비스 제공기관 지정' },
    { year: '2021', month: '07', day: '01', event: '특수교육대상자 치료지원서비스 제공기관 지정' },
    { year: '2021', month: '10', day: '12', event: '사상구드림스타트센터 업무협약 (취약계층 아동 심리치료 전문기관)' },
    { year: '2021', month: '10', day: '28', event: '부산시여성가족개발원 업무협약 (성인지 교육 협력기관)' },
    { year: '2021', month: '11', day: '25', event: '장애아동 발달재활서비스 제공기관 지정' },
    { year: '2022', month: '02', day: '18', event: '사상여성인력개발센터 업무협약 (청년 채용 지원사업)' },
    { year: '2022', month: '06', day: '17', event: '부산가톨릭대학교 언어청각치료학과 산학협력' },
    { year: '2022', month: '07', day: '19', event: '성평등 사례발굴 공모전 우수상 수상 (부산여성가족개발원)' },
    { year: '2022', month: '11', day: '29', event: '춘해보건대학교 언어치료학과 산학협력' },
    { year: '2023', month: '03', day: '10', event: '사상구장애인체육회 생활체육지원사업 업무협약' },
    { year: '2023', month: '03', day: '14', event: '사상구장애인복지관 업무협약' },
    { year: '2023', month: '04', day: '27', event: '한국사회복지상담학회(신라대 사회복지학과) 산학협력' },
    { year: '2023', month: '11', day: '01', event: '고용부 청년일경험지원사업 (사)부산경영자총협회 업무협약' },
    { year: '2023', month: '11', day: '22', event: '신라대학교 특수체육학과 산학협력' },
    { year: '2023', month: '11', day: '25', event: '경남정보대학교 작업치료과 산학협력' },
    { year: '2023', month: '11', day: '28', event: '장애인스포츠 및 일반스포츠 이용권 제공기관 지정' },
    { year: '2024', month: '02', day: '07', event: '건양사이버대학교 심리운동치료학과 산학협력 (실습인증기관)' },
    { year: '2024', month: '03', day: '08', event: '대구사이버대학교 산학협력 (언어치료·놀이치료학과)' },
    { year: '2024', month: '05', day: '27', event: '부산과학기술대학교 산학협력 (사회복지상담과·스마트도시농업과)' },
    { year: '2024', month: '06', day: '10', event: '사상구가족센터 업무협약' }
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
                  <span className={styles.fullDate}>{item.year}.{item.month}.{item.day}.</span>
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