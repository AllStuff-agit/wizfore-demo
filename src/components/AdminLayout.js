import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import styles from '../styles/AdminLayout.module.css';

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
                href="/admin/dashboard" 
                className={router.pathname === '/admin/dashboard' ? styles.active : ''}
              >
                <i className="fas fa-tachometer-alt"></i> 대시보드
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/experts" 
                className={router.pathname.startsWith('/admin/experts') ? styles.active : ''}
              >
                <i className="fas fa-user-md"></i> 전문가 관리
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/services" 
                className={router.pathname.startsWith('/admin/services') ? styles.active : ''}
              >
                <i className="fas fa-hands-helping"></i> 서비스 관리
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/programs" 
                className={router.pathname === '/admin/programs' ? styles.active : ''}
              >
                <i className="fas fa-clipboard-list"></i> 프로그램 관리
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/inquiries" 
                className={router.pathname === '/admin/inquiries' ? styles.active : ''}
              >
                <i className="fas fa-envelope"></i> 문의 관리
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/notices" 
                className={router.pathname === '/admin/notices' ? styles.active : ''}
              >
                <i className="fas fa-bullhorn"></i> 공지사항 관리
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/history" 
                className={router.pathname === '/admin/history' ? styles.active : ''}
                onClick={(e) => {
                  e.preventDefault();
                  console.log('History link clicked');
                  router.push('/admin/history');
                }}
              >
                <i className="fas fa-history"></i> 연혁 관리
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/facilities" 
                className={router.pathname.startsWith('/admin/facilities') ? styles.active : ''}
              >
                <i className="fas fa-building"></i> 시설 관리
              </Link>
            </li>
            <li>
              <Link href="/admin/settings">
                <i className="fas fa-cog"></i>
                <span>센터 설정</span>
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