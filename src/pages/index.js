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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>WizFore</h1>
            <p className={styles.tagline}>아동과 가족의 건강과 행복 동행</p>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li><Link href="/" className={styles.active}>홈</Link></li>
              <li><Link href="/about">소개</Link></li>
              <li><Link href="/services">서비스</Link></li>
              <li><Link href="/contact">문의하기</Link></li>
            </ul>
          </nav>
          <div className={styles.menuToggle}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h2>아동 발달재활 및 심리상담 전문기관, 위즈포레입니다.</h2>
              <p>위즈포레(WIZ FORE)는 '함께 어우러지는 지혜의 숲'이라는 의미를 담고 있으며, 장애인을 포함한 모든 사람들이 어우러져 더불어 살아가는 힘을 키우는데 필요한 사회서비스를 제공하는 전문기관입니다.</p>
              <Link href="/services" className={styles.btn}>서비스 알아보기</Link>
            </div>
            <div className={styles.heroImage}>
              <img src="/images/hero-image.jpg" alt="위즈포레 이미지" />
            </div>
          </div>
        </section>

        <section className={styles.services}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>주요 서비스</h2>
              <p>다양한 발달재활서비스와 심리상담 서비스를 제공합니다</p>
            </div>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <i className="fas fa-comments"></i>
                <h3>언어치료</h3>
                <p>언어발달지연, 유창성장애(말더듬), 조음음운장애, 의사소통프로그램 등</p>
              </div>
              <div className={styles.serviceCard}>
                <i className="fas fa-paint-brush"></i>
                <h3>미술치료</h3>
                <p>발달미술치료, 심리미술치료, 기초미술치료, 사회성 집단미술치료 등</p>
              </div>
              <div className={styles.serviceCard}>
                <i className="fas fa-music"></i>
                <h3>음악치료</h3>
                <p>노래부르기, 악기연주, 음악감상, 소리 지각 및 구별, 호흡 및 발성 등</p>
              </div>
              <div className={styles.serviceCard}>
                <i className="fas fa-hands-helping"></i>
                <h3>감각통합</h3>
                <p>신체지각, 운동기획, 공간지각 발달, 전정감, 고유감, 촉각, 적응반응 등</p>
              </div>
            </div>
            <div className={styles.moreServices}>
              <Link href="/services" className={styles.btnOutline}>
                모든 서비스 보기 <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.aboutContent}>
              <div className={styles.aboutImage}>
                <img src="/images/about-image.jpg" alt="위즈포레 소개" />
              </div>
              <div className={styles.aboutText}>
                <h2>위즈포레 소개</h2>
                <p>위즈포레는 안심되고, 즐겁고, 유익하고, 희망차고, 성장하는 공간입니다.</p>
                <p>2016년에 설립된 위즈포레 사회서비스센터는 부산시 사상구에 위치하고 있으며, 발달 지연 아동과 발달장애인을 위한 다양한 치료와 활동 프로그램을 제공하고 있습니다.</p>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <h3>24명</h3>
                    <p>전문 치료사</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3>8년+</h3>
                    <p>설립 이후</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3>24실</h3>
                    <p>치료실</p>
                  </div>
                </div>
                <Link href="/about" className={styles.btn}>더 알아보기</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>무료 상담 신청</h2>
            <p>아동과 가족의 건강한 미래를 위한 첫걸음, 위즈포레와 함께하세요.</p>
            <Link href="/contact" className={styles.btnLarge}>상담 신청하기</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <h2>WizFore</h2>
              <p>아동과 가족의 건강과 행복 동행</p>
            </div>
            <div className={styles.footerLinks}>
              <h3>바로가기</h3>
              <ul>
                <li><Link href="/">홈</Link></li>
                <li><Link href="/about">소개</Link></li>
                <li><Link href="/services">서비스</Link></li>
                <li><Link href="/contact">문의하기</Link></li>
              </ul>
            </div>
            <div className={styles.footerContact}>
              <h3>연락처</h3>
              <p><i className="fas fa-map-marker-alt"></i> 부산시 사상구 모라로 110번길 25 3층, 4층</p>
              <p><i className="fas fa-phone"></i> 051-324-0940</p>
              <p><i className="fas fa-envelope"></i> wizfore@daum.net</p>
            </div>
            <div className={styles.footerSocial}>
              <h3>소셜 미디어</h3>
              <div className={styles.socialIcons}>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} 위즈포레 사회서비스센터. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}