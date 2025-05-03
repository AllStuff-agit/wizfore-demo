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

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>WizFore Admin</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link 
                href="/admin/home" 
                className={router.pathname === '/admin/home' || router.pathname.startsWith('/admin/home/') ? styles.active : ''}
              >
                <i className="fas fa-home"></i> 홈
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/about" 
                className={router.pathname === '/admin/about' || router.pathname.startsWith('/admin/about/') ? styles.active : ''}
              >
                <i className="fas fa-info-circle"></i> 센터 소개(About Us)
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i> 로그아웃
          </button>
        </div>
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}