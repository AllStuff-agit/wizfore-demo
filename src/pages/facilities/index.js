import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Facilities.module.css';

export default function Facilities() {
  // 시설 데이터
  const facilities = [
    {
      id: 'language-room',
      title: '언어치료실',
      icon: 'fas fa-comments',
      description: '언어 발달 및 의사소통 능력 향상을 위한 맞춤형 언어치료가 이루어지는 공간입니다.',
      images: [
        '/images/facility/language-room.jpg',
        '/images/facility/language-room-2.jpg'
      ],
      features: [
        '개인 언어치료 및 그룹 언어치료 가능',
        '다양한 언어 발달 촉진 교구 구비',
        '친환경 소재의 안전한 치료 환경',
        '방음 시설로 집중력 있는 치료 가능'
      ]
    },
    {
      id: 'art-room',
      title: '미술치료실',
      icon: 'fas fa-paint-brush',
      description: '다양한 미술 활동을 통해 감정 표현과 창의력을 기를 수 있는 미술치료 전용 공간입니다.',
      images: [
        '/images/facility/art-room.jpg',
        '/images/facility/art-room-2.jpg'
      ],
      features: [
        '다양한 미술 재료와 도구 구비',
        '넓은 작업 공간과 편안한 환경',
        '개인 및 그룹 미술치료 가능',
        '작품 전시 및 보관 공간 마련'
      ]
    },
    {
      id: 'music-room',
      title: '음악치료실',
      icon: 'fas fa-music',
      description: '다양한 악기와 음악 활동을 통해 정서적 안정과 사회성을 기를 수 있는 공간입니다.',
      images: [
        '/images/facility/music-room.jpg',
        '/images/facility/music-room-2.jpg'
      ],
      features: [
        '다양한 악기(피아노, 기타, 드럼, 타악기 등) 구비',
        '방음 시설로 소음 걱정 없는 활동 가능',
        '그룹 음악활동 및 개인 음악치료 가능',
        '녹음 및 음향 시스템 완비'
      ]
    },
    {
      id: 'play-room',
      title: '놀이치료실',
      icon: 'fas fa-puzzle-piece',
      description: '아동의 자유로운 놀이를 통해 심리적 안정과 자기표현을 도와주는 공간입니다.',
      images: [
        '/images/facility/play-room.jpg',
        '/images/facility/play-room-2.jpg'
      ],
      features: [
        '다양한 놀이 도구와 교구 구비',
        '안전한 바닥재와 벽면 시공',
        '아늑하고 편안한 치료 환경',
        '개인 놀이치료 및 모래놀이치료 가능'
      ]
    },
    {
      id: 'sensory-room',
      title: '감각통합실',
      icon: 'fas fa-hand-holding',
      description: '다양한 감각 자극과 운동 활동을 통해 감각 통합 능력을 향상시키는 공간입니다.',
      images: [
        '/images/facility/sensory-room.jpg',
        '/images/facility/sensory-room-2.jpg'
      ],
      features: [
        '그네, 볼풀, 균형판 등 다양한 감각 장비 구비',
        '넓은 활동 공간과 안전한 바닥재',
        '다감각 자극 도구와 교구 구비',
        '전문 감각통합 치료사의 1:1 지도'
      ]
    },
    {
      id: 'pe-room',
      title: '특수체육실',
      icon: 'fas fa-running',
      description: '대소근육 발달과 신체 조절력 향상을 위한 다양한 체육 활동이 이루어지는 공간입니다.',
      images: [
        '/images/facility/special-pe-room.jpg',
        '/images/facility/special-pe-room-2.jpg'
      ],
      features: [
        '넓은 실내 체육 공간',
        '다양한 스포츠 기구 및 장비 구비',
        '안전한 매트와 바닥재 시공',
        '개인 및 그룹 체육활동 가능'
      ]
    },
    {
      id: 'counseling-room',
      title: '심리상담실',
      icon: 'fas fa-heart',
      description: '아동과 부모님을 위한 심리상담 및 심리검사가 이루어지는 안락한 공간입니다.',
      images: [
        '/images/facility/counseling-room.jpg',
        '/images/facility/counseling-room-2.jpg'
      ],
      features: [
        '편안하고 아늑한 상담 환경',
        '다양한 심리검사 도구 구비',
        '상담 내용의 비밀 보장',
        '가족상담 및 부모상담 가능'
      ]
    },
    {
      id: 'group-room',
      title: '그룹활동실',
      icon: 'fas fa-users',
      description: '또래와의 사회성 증진 및 다양한 그룹 활동이 이루어지는 넓은 공간입니다.',
      images: [
        '/images/facility/group-room.jpg',
        '/images/facility/group-room-2.jpg'
      ],
      features: [
        '넓은 그룹활동 공간',
        '다양한 교구와 학습 자료 구비',
        '편안한 분위기의 인테리어',
        '사회성 그룹, 학습 그룹 등 다양한 활동 가능'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>시설 안내 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터의 시설 안내 페이지입니다." />
      </Head>

      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>시설 안내</h1>
          <p>위즈포레 사회서비스센터의 다양한 치료실과 시설을 소개합니다.</p>
        </div>
      </div>

      <section className={styles.facilitiesIntro}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>최적의 치료환경</h2>
            <p>아이들의 발달과 성장을 돕는 전문 시설과 설비를 갖추고 있습니다.</p>
          </div>
          
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <p>위즈포레 사회서비스센터는 아동과 가족의 건강과 행복을 위해 최적의 치료환경을 제공하고 있습니다. 각 치료실은 전문적인 프로그램 진행에 필요한 설비와 교구들을 갖추고 있으며, 안전하고 편안한 환경에서 치료가 이루어질 수 있도록 설계되었습니다.</p>
              
              <ul className={styles.facilityStats}>
                <li>
                  <span className={styles.statNumber}>24</span>
                  <span className={styles.statLabel}>총 치료실</span>
                </li>
                <li>
                  <span className={styles.statNumber}>5</span>
                  <span className={styles.statLabel}>언어치료실</span>
                </li>
                <li>
                  <span className={styles.statNumber}>3</span>
                  <span className={styles.statLabel}>미술치료실</span>
                </li>
                <li>
                  <span className={styles.statNumber}>3</span>
                  <span className={styles.statLabel}>감각통합실</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.introImage}>
              <img src="/images/facility/center-overview.jpg" alt="위즈포레 센터 전경" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.facilitiesGrid}>
        <div className={styles.container}>
          <div className={styles.gridHeader}>
            <h2>치료실 안내</h2>
          </div>
          
          <div className={styles.grid}>
            {facilities.map((facility) => (
              <div key={facility.id} id={facility.id} className={styles.facilityCard}>
                <div className={styles.facilityImages}>
                  <img src={facility.images[0]} alt={facility.title} />
                </div>
                
                <div className={styles.facilityContent}>
                  <div className={styles.facilityIcon}>
                    <i className={facility.icon}></i>
                  </div>
                  
                  <h3>{facility.title}</h3>
                  <p className={styles.facilityDescription}>{facility.description}</p>
                  
                  <div className={styles.facilityFeatures}>
                    <h4>주요 특징</h4>
                    <ul>
                      {facility.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>센터 견학 및 무료 체험</h2>
            <p>위즈포레 사회서비스센터의 시설이 궁금하신가요?<br />센터 견학 및 무료 체험 신청이 가능합니다.</p>
            <Link href="/contact" className={styles.ctaButton}>
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}