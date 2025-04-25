import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title = '위즈포레 사회서비스센터', description = '아동과 가족의 건강과 행복 동행' }) {
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
      </Head>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">
              <h1>WizFore</h1>
              <p className={styles.tagline}>아동과 가족의 건강과 행복 동행</p>
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
                  소개
                </Link>
              </li>
              <li>
                <Link href="/services" className={router.pathname.startsWith('/services') ? styles.active : ''}>
                  서비스
                </Link>
              </li>
              <li>
                <Link href="/contact" className={router.pathname.startsWith('/contact') ? styles.active : ''}>
                  문의하기
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.menuToggle} onClick={toggleMenu}>
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

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