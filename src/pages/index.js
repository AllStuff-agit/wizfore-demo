import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터 - 아동과 가족의 건강과 행복 동행" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* 히어로 섹션 */}
        <section className={styles.hero}>
          <div className={`${styles.heroCircle} ${styles.circle1}`}></div>
          <div className={`${styles.heroCircle} ${styles.circle2}`}></div>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1>아이와 가족의 건강과 행복!</h1>
              <p className={styles.subtitle}>아동 발달재활 및 심리상담 전문기관</p>
              <p className={styles.description}>
                위즈포레(WIZ FORE)는 '함께 어우러지는 지혜의 숲'이라는 의미를 담고 있으며, 장애인을 포함한 모든 사람들이 어우러져 더불어 살아가는 힘을 키우는데 필요한 사회서비스를 제공하는 전문기관입니다.
              </p>
              <div className={styles.heroCta}>
                <Link href="/services" className={`${styles.btn} ${styles.btnPrimary}`}>
                  서비스 알아보기
                </Link>
                <Link href="/contact" className={`${styles.btn} ${styles.btnOutline}`}>
                  문의하기
                </Link>
              </div>
            </div>
            
            <div className={styles.heroImage}>
              <img 
                src="/images/hero-children.png" 
                alt="위즈포레 아이들"
                className={styles.childrenImage}
              />
            </div>
          </div>
        </section>

        {/* 주요 서비스 섹션 */}
        <section className={styles.mainServices}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>주요 서비스</h2>
              <p>위즈포레 사회서비스센터에서 제공하는 주요 서비스입니다</p>
            </div>
            
            <div className={styles.serviceCards}>
              <div className={styles.dashedCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-child"></i>
                </div>
                <h3>주간활동서비스</h3>
                <p className={styles.cardSubtitle}>(성인 발달장애인)</p>
                <div className={styles.cardContent}>
                  <p>만 18세이상 만 65세 미만 성인 발달장애인이 낮 시간에 자신의 욕구를 반영한 지역사회 기반 활동에 참여함으로써 자립생활을 지원하는 사업</p>
                  <p><strong>월 176시간(확장형) / 132시간(기본형) 제공</strong></p>
                </div>
                <Link href="/services#day-activity" className={styles.cardLink}>자세히 보기</Link>
              </div>
              
              <div className={styles.dashedCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-school"></i>
                </div>
                <h3>방과후활동서비스</h3>
                <p className={styles.cardSubtitle}>(청소년 발달장애인)</p>
                <div className={styles.cardContent}>
                  <p>만 6세이상 만 18세 미만의 발달장애 학생이 방과후 시간을 이용하여 지역사회 다양한 장소와 기관에서 자신이 원하는 활동에 참여</p>
                  <p><strong>월 66시간 제공</strong></p>
                </div>
                <Link href="/services#after-school" className={styles.cardLink}>자세히 보기</Link>
              </div>
              
              <div className={styles.dashedCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h3>치료/상담서비스</h3>
                <p className={styles.cardSubtitle}>(아동 발달재활서비스)</p>
                <div className={styles.cardContent}>
                  <p>언어발달지연, 인지 발달지연, 사회성 발달지연, 주의산만, 우울, 불안 등 심리정서적 부적응, 감각운동 발달지연 아동 지원</p>
                </div>
                <Link href="/services#therapy" className={styles.cardLink}>자세히 보기</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 치료 프로그램 섹션 */}
        <section className={styles.therapyPrograms}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>치료 프로그램</h2>
              <p>위즈포레 사회서비스센터에서 제공하는 다양한 치료 프로그램을 소개합니다</p>
            </div>
            
            <div className={styles.programGrid}>
              <div className={styles.programCard}>
                <div className={styles.programIcon}><i className="fas fa-comments"></i></div>
                <h3>언어치료</h3>
                <p>언어발달지연, 조음음운장애, 유창성장애(말더듬), 중복언어장애, 의사소통프로그램</p>
              </div>
              
              <div className={styles.programCard}>
                <div className={styles.programIcon}><i className="fas fa-paint-brush"></i></div>
                <h3>미술치료</h3>
                <p>발달미술치료, 심리미술치료, 기초미술치료, 사회성 집단미술치료, 퍼포먼스 오감 미술치료</p>
              </div>
              
              <div className={styles.programCard}>
                <div className={styles.programIcon}><i className="fas fa-music"></i></div>
                <h3>음악치료</h3>
                <p>노래부르기, 악기연주, 음악감상, 소리 지각 및 구별, 호흡 및 발성, 상호작용 향상</p>
              </div>
              
              <div className={styles.programCard}>
                <div className={styles.programIcon}><i className="fas fa-puzzle-piece"></i></div>
                <h3>놀이치료</h3>
                <p>발달놀이치료, 정서놀이치료, 사회성놀이치료, 모래놀이치료</p>
              </div>
              
              <div className={styles.programCard}>
                <div className={styles.programIcon}><i className="fas fa-hand-holding"></i></div>
                <h3>감각통합</h3>
                <p>신체지각, 운동기획, 공간지각 발달, 전정감, 고유감, 촉각, 적응반응, 신체협응</p>
              </div>
              
              <div className={styles.programCard}>
                <div className={styles.programIcon}><i className="fas fa-running"></i></div>
                <h3>특수체육</h3>
                <p>인지영역, 신체적 영역, 정의적 영역 발달, 맞춤형 탬포 트레이닝, 근력운동</p>
              </div>
            </div>
            
            <div className={styles.programsAction}>
              <Link href="/services" className={styles.btnOutlineRounded}>
                모든 프로그램 보기 <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* 소개 섹션 */}
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutImage}>
                <div className={styles.imageBorder}>
                  <img src="/images/center-photo.jpg" alt="위즈포레 센터" />
                </div>
              </div>
              
              <div className={styles.aboutContent}>
                <h2>위즈포레 소개</h2>
                <p className={styles.aboutSubtitle}>
                  안심되고, 즐겁고, 유익하고, 희망차고, 성장하는 공간
                </p>
                <p>
                  2016년에 설립된 위즈포레 사회서비스센터는 부산시 사상구에 위치하고 있으며, 
                  발달 지연 아동과 발달장애인을 위한 다양한 치료와 활동 프로그램을 제공하고 있습니다.
                </p>
                
                <div className={styles.aboutStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>24</div>
                    <div className={styles.statLabel}>전문 치료사</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>24</div>
                    <div className={styles.statLabel}>치료실</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>8</div>
                    <div className={styles.statLabel}>설립 연차</div>
                  </div>
                </div>
                
                <Link href="/about" className={`${styles.btn} ${styles.btnPrimary}`}>
                  더 알아보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 시설 섹션 */}
        <section className={styles.facilities}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>시설 안내</h2>
              <p>위즈포레 사회서비스센터의 다양한 치료실을 소개합니다</p>
            </div>
            
            <div className={styles.facilitiesGrid}>
              <div className={styles.facilityItem}>
                <div className={styles.facilityImage}>
                  <img src="/images/facility/language-room.jpg" alt="언어치료실" />
                </div>
                <h3>언어치료실</h3>
              </div>
              
              <div className={styles.facilityItem}>
                <div className={styles.facilityImage}>
                  <img src="/images/facility/art-room.jpg" alt="미술치료실" />
                </div>
                <h3>미술치료실</h3>
              </div>
              
              <div className={styles.facilityItem}>
                <div className={styles.facilityImage}>
                  <img src="/images/facility/sensory-room.jpg" alt="감각통합실" />
                </div>
                <h3>감각통합실</h3>
              </div>
              
              <div className={styles.facilityItem}>
                <div className={styles.facilityImage}>
                  <img src="/images/facility/music-room.jpg" alt="음악치료실" />
                </div>
                <h3>음악치료실</h3>
              </div>
            </div>
            
            <div className={styles.facilitiesAction}>
              <Link href="/facilities" className={styles.btnOutlineRounded}>
                모든 시설 보기 <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* 위치 섹션 */}
        <section className={styles.location}>
          <div className={styles.container}>
            <div className={styles.locationGrid}>
              <div className={styles.locationInfo}>
                <h2>오시는 길</h2>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <i className="fas fa-map-marker-alt"></i>
                    <div className={styles.contactText}>
                      <h3>주소</h3>
                      <p>부산시 사상구 모라로 110번길 25 3층, 4층</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <i className="fas fa-phone-alt"></i>
                    <div className={styles.contactText}>
                      <h3>연락처</h3>
                      <p>전화: 051-324-0940</p>
                      <p>팩스: 051-313-0322</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <i className="fas fa-envelope"></i>
                    <div className={styles.contactText}>
                      <h3>이메일</h3>
                      <p>wizfore@daum.net</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                  문의하기
                </Link>
              </div>
              
              <div className={styles.locationMap}>
                <img src="/images/map.jpg" alt="위즈포레 지도" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>무료 상담 신청</h2>
            <p>아동과 가족의 건강한 미래를 위한 첫걸음, 위즈포레와 함께하세요.</p>
            <Link href="/contact" className={styles.btnLarge}>
              상담 신청하기
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}