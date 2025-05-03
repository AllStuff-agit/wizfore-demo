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
                      href="/admin/about/vision" 
                      className={router.pathname === '/admin/about/vision' ? styles.activeSubmenu : ''}
                    >
                      비전 · 인사말
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/director" 
                      className={router.pathname === '/admin/about/director' ? styles.activeSubmenu : ''}
                    >
                      센터장 소개
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/history" 
                      className={router.pathname === '/admin/about/history' ? styles.activeSubmenu : ''}
                    >
                      센터 발자취
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/advisors" 
                      className={router.pathname === '/admin/about/advisors' ? styles.activeSubmenu : ''}
                    >
                      전문 자문단
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/facilities" 
                      className={router.pathname === '/admin/about/facilities' ? styles.activeSubmenu : ''}
                    >
                      시설 안내
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/about/location" 
                      className={router.pathname === '/admin/about/location' ? styles.activeSubmenu : ''}
                    >
                      오시는 길
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
            
            <li>
              <Link 
                href="/admin/business" 
                className={router.pathname === '/admin/business' || router.pathname.startsWith('/admin/business/') ? styles.active : ''}
              >
                <i className="fas fa-briefcase"></i> 사업 안내
              </Link>
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
                      href="/admin/team/therapist-counselor" 
                      className={router.pathname === '/admin/team/therapist-counselor' ? styles.activeSubmenu : ''}
                    >
                      치료 · 상담사
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            
            <li className={styles.hasDropdown}>
              <Link 
                href="/admin/community" 
                className={router.pathname === '/admin/community' || router.pathname.startsWith('/admin/community/') ? styles.active : ''}
              >
                <i className="fas fa-newspaper"></i> 커뮤니티
              </Link>
              <div className={styles.dropdownContainer}>
                <ul className={styles.dropdown}>
                  <li>
                    <Link 
                      href="/admin/community/center-news" 
                      className={router.pathname === '/admin/community/center-news' ? styles.activeSubmenu : ''}
                    >
                      센터 소식
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/community/sns-news" 
                      className={router.pathname === '/admin/community/sns-news' ? styles.activeSubmenu : ''}
                    >
                      SNS 소식
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