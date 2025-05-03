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
          <ul className={styles.mainMenu}>
            <li>
              <Link 
                href="/admin/home" 
                className={router.pathname === '/admin/home' || router.pathname.startsWith('/admin/home/') ? styles.active : ''}
              >
                <i className="fas fa-home"></i> 홈
              </Link>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/about" 
                className={router.pathname === '/admin/about' || router.pathname.startsWith('/admin/about/') ? styles.active : ''}
              >
                <i className="fas fa-info-circle"></i> 센터 소개
              </Link>
              <div className={styles.dropdownContainer}>
                <ul className={styles.dropdown}>
                  <li>
                    <Link 
                      href="/admin/about" 
                      className={router.pathname === '/admin/about' && !router.pathname.includes('/admin/about/') ? styles.activeSubmenu : ''}
                    >
                      소개 관리
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/history" 
                      className={router.pathname === '/admin/about/history' ? styles.activeSubmenu : ''}
                    >
                      연혁 관리
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/director" 
                      className={router.pathname === '/admin/about/director' ? styles.activeSubmenu : ''}
                    >
                      원장 소개 관리
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/advisors" 
                      className={router.pathname === '/admin/about/advisors' ? styles.activeSubmenu : ''}
                    >
                      자문위원 관리
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/programs" 
                className={router.pathname === '/admin/programs' || router.pathname.startsWith('/admin/programs/') ? styles.active : ''}
              >
                <i className="fas fa-book"></i> 프로그램 안내
              </Link>
              <div className={styles.dropdownContainer}>
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
              </div>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/facilities" 
                className={router.pathname === '/admin/facilities' || router.pathname.startsWith('/admin/facilities/') ? styles.active : ''}
              >
                <i className="fas fa-building"></i> 시설 안내
              </Link>
              <div className={styles.dropdownContainer}>
                <ul className={styles.dropdown}>
                  <li>
                    <Link 
                      href="/admin/facilities" 
                      className={router.pathname === '/admin/facilities' && !router.pathname.includes('/admin/facilities/') ? styles.activeSubmenu : ''}
                    >
                      시설 목록 관리
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/facilities/gallery" 
                      className={router.pathname === '/admin/facilities/gallery' ? styles.activeSubmenu : ''}
                    >
                      시설 갤러리 관리
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/team" 
                className={router.pathname === '/admin/team' || router.pathname.startsWith('/admin/team/') ? styles.active : ''}
              >
                <i className="fas fa-user-friends"></i> 전문가 소개
              </Link>
              <div className={styles.dropdownContainer}>
                <ul className={styles.dropdown}>
                  <li>
                    <Link 
                      href="/admin/team/therapists" 
                      className={router.pathname === '/admin/team/therapists' ? styles.activeSubmenu : ''}
                    >
                      치료사 관리
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/team/counselors" 
                      className={router.pathname === '/admin/team/counselors' ? styles.activeSubmenu : ''}
                    >
                      상담사 관리
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/team/teachers" 
                      className={router.pathname === '/admin/team/teachers' ? styles.activeSubmenu : ''}
                    >
                      교사 관리
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/inquiries" 
                className={router.pathname === '/admin/inquiries' || router.pathname.startsWith('/admin/inquiries/') ? styles.active : ''}
              >
                <i className="fas fa-envelope"></i> 문의 관리
              </Link>
              <div className={styles.dropdownContainer}>
                <ul className={styles.dropdown}>
                  <li>
                    <Link 
                      href="/admin/inquiries" 
                      className={router.pathname === '/admin/inquiries' && !router.pathname.includes('/admin/inquiries/') ? styles.activeSubmenu : ''}
                    >
                      전체 문의 보기
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/inquiries/pending" 
                      className={router.pathname === '/admin/inquiries/pending' ? styles.activeSubmenu : ''}
                    >
                      대기중 문의
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/inquiries/completed" 
                      className={router.pathname === '/admin/inquiries/completed' ? styles.activeSubmenu : ''}
                    >
                      처리완료 문의
                    </Link>
                  </li>
                </ul>
              </div>
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