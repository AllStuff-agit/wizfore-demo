import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import styles from '../styles/admin/common/Layout.module.css';

export default function AdminLayout({ children, title = '관리자 페이지 - 위즈포레 사회서비스센터' }) {
  const router = useRouter();

  // 현재 경로 디버그 로깅
  useEffect(() => {
    console.log('Current path:', router.pathname);
    console.log('Router query:', router.query);
    console.log('Router asPath:', router.asPath);
  }, [router.pathname, router.query, router.asPath]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  return (
    <div className={styles.adminLayout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="위즈포레 사회서비스센터 관리자 페이지" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <h2>WizFore Admin</h2>
        </div>
        
        <nav className={styles.navbar}>
          <ul>
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/home" 
                className={router.pathname === '/admin/home' || router.pathname.startsWith('/admin/home/') ? styles.active : ''}
              >
                <i className="fas fa-home"></i> 홈
              </Link>
              <ul className={styles.dropdown}>
                <li>
                  <Link href="/admin/home">
                    홈 대시보드
                  </Link>
                </li>
                <li>
                  <Link href="/admin/home/stats">
                    통계 정보
                  </Link>
                </li>
              </ul>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/about" 
                className={router.pathname === '/admin/about' || router.pathname.startsWith('/admin/about/') ? styles.active : ''}
              >
                <i className="fas fa-info-circle"></i> 센터 소개
              </Link>
              <ul className={styles.dropdown}>
                <li>
                  <Link href="/admin/about">
                    소개 관리
                  </Link>
                </li>
                <li>
                  <Link href="/admin/about/history">
                    연혁 관리
                  </Link>
                </li>
                <li>
                  <Link href="/admin/about/director">
                    원장 소개 관리
                  </Link>
                </li>
                <li>
                  <Link href="/admin/about/advisors">
                    자문위원 관리
                  </Link>
                </li>
              </ul>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/programs" 
                className={router.pathname === '/admin/programs' || router.pathname.startsWith('/admin/programs/') ? styles.active : ''}
              >
                <i className="fas fa-book"></i> 프로그램 안내
              </Link>
              <ul className={styles.dropdown}>
                <li>
                  <Link 
                    href="/admin/programs/therapy" 
                    className={router.pathname === '/admin/programs/therapy' ? styles.activeSubmenu : ''}
                  >
                    치료 프로그램
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin/programs/counseling" 
                    className={router.pathname === '/admin/programs/counseling' ? styles.activeSubmenu : ''}
                  >
                    상담 프로그램
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin/programs/after-school" 
                    className={router.pathname === '/admin/programs/after-school' ? styles.activeSubmenu : ''}
                  >
                    방과 후 프로그램
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin/programs/sports" 
                    className={router.pathname === '/admin/programs/sports' ? styles.activeSubmenu : ''}
                  >
                    특수 스포츠
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        
        <div className={styles.logoutWrapper}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i> 로그아웃
          </button>
        </div>
      </header>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}