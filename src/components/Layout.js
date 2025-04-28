import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title = '위즈포레 사회서비스센터', description = '아동 발달재활 및 심리상담 전문기관' }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // 페이지 변경 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  // 메뉴 토글
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">
              <div className={styles.logoContent}>
                <span className={styles.logoIcon}>
                  <i className="fas fa-seedling"></i>
                </span>
                <div className={styles.logoText}>
                  <h1>위즈포레</h1>
                  <p className={styles.tagline}>사회서비스센터</p>
                </div>
              </div>
            </Link>
          </div>
          
          <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
            <ul>
              <li>
                <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
                  홈
                </Link>
              </li>
              <li>
                <Link href="/about" className={router.pathname.startsWith('/about') ? styles.active : ''}>
                  센터소개
                </Link>
              </li>
              <li>
                <Link href="/services" className={router.pathname.startsWith('/services') ? styles.active : ''}>
                  서비스
                </Link>
              </li>
              <li>
                <Link href="/facilities" className={router.pathname.startsWith('/facilities') ? styles.active : ''}>
                  시설안내
                </Link>
              </li>
              <li>
                <Link href="/location" className={router.pathname.startsWith('/location') ? styles.active : ''}>
                  오시는 길
                </Link>
              </li>
              <li>
                <Link href="/contact" className={router.pathname.startsWith('/contact') ? styles.active : ''}>
                  문의하기
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className={styles.navRight}>
            <Link href="/contact" className={styles.contactBtn}>
              <i className="fas fa-phone-alt"></i>
              <span>상담문의</span>
            </Link>
            <div className={styles.menuToggle} onClick={toggleMenu}>
              <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.container}>
            <div className={styles.footerContent}>
              <div className={styles.footerLogo}>
                <h2>WizFore</h2>
                <p>함께 어우러지는 지혜의 숲</p>
                <p className={styles.tagline}>아동과 가족의 건강과 행복 동행</p>
              </div>
              
              <div className={styles.footerLinks}>
                <h3>바로가기</h3>
                <ul>
                  <li><Link href="/">홈</Link></li>
                  <li><Link href="/about">센터소개</Link></li>
                  <li><Link href="/services">서비스</Link></li>
                  <li><Link href="/facilities">시설안내</Link></li>
                  <li><Link href="/contact">문의하기</Link></li>
                </ul>
              </div>
              
              <div className={styles.footerContact}>
                <h3>연락처</h3>
                <p>
                  <i className="fas fa-map-marker-alt"></i> 
                  <span>부산시 사상구 모라로 110번길 25 3층, 4층</span>
                </p>
                <p>
                  <i className="fas fa-phone"></i>
                  <span>051-324-0940</span>
                </p>
                <p>
                  <i className="fas fa-fax"></i>
                  <span>051-313-0322</span>
                </p>
                <p>
                  <i className="fas fa-envelope"></i>
                  <span>wizfore@daum.net</span>
                </p>
              </div>
              
              <div className={styles.footerSocial}>
                <h3>소셜 미디어</h3>
                <div className={styles.socialIcons}>
                  <a href="#" aria-label="페이스북"><i className="fab fa-facebook"></i></a>
                  <a href="#" aria-label="인스타그램"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="네이버 블로그"><i className="fab fa-blogger"></i></a>
                  <a href="#" aria-label="카카오톡 채널"><i className="fas fa-comment"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.container}>
            <p>&copy; {new Date().getFullYear()} 위즈포레 사회서비스센터. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
