import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import AdminLayout from '../../components/AdminLayout';
import styles from '../../styles/AdminDashboard.module.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 인증 상태 확인
  useEffect(() => {
    console.log('Dashboard - Checking auth state');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Dashboard - User is logged in:', user.email);
        setUser(user);
      } else {
        console.log('Dashboard - No authenticated user, redirecting to login');
        router.push('/admin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <AdminLayout title="로딩 중 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  // 샘플 데이터 (실제로는 Firebase에서 가져올 예정)
  const stats = [
    { label: '내담자', count: 124, icon: 'fas fa-users' },
    { label: '세션', count: 78, icon: 'fas fa-calendar-check' },
    { label: '치료사', count: 24, icon: 'fas fa-user-md' },
    { label: '프로그램', count: 8, icon: 'fas fa-clipboard-list' },
  ];

  const recentSessions = [
    { id: 1, date: '2023-05-01', time: '10:00 - 11:00', client: '김민준', therapist: '이서연', program: '언어치료', status: 'completed' },
    { id: 2, date: '2023-05-01', time: '11:00 - 12:00', client: '박서준', therapist: '최지원', program: '미술치료', status: 'completed' },
    { id: 3, date: '2023-05-02', time: '14:00 - 15:00', client: '정예준', therapist: '이서연', program: '언어치료', status: 'scheduled' },
    { id: 4, date: '2023-05-02', time: '15:00 - 16:00', client: '윤도현', therapist: '박민지', program: '감각통합', status: 'scheduled' },
    { id: 5, date: '2023-05-03', time: '10:00 - 11:00', client: '이지우', therapist: '최지원', program: '미술치료', status: 'scheduled' },
  ];

  return (
    <AdminLayout title="대시보드 - 위즈포레 관리자">
      <div className={styles.dashboardHeader}>
        <h1>관리자 대시보드</h1>
        <p>안녕하세요, {user?.email}! 오늘의 현황을 확인하세요.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className={stat.icon}></i>
            </div>
            <div className={styles.statInfo}>
              <h3>{stat.count}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardSections}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>오늘의 세션</h2>
            <a href="/admin/sessions" className={styles.viewAll}>모두 보기</a>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>시간</th>
                  <th>내담자</th>
                  <th>치료사</th>
                  <th>프로그램</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.date}</td>
                    <td>{session.time}</td>
                    <td>{session.client}</td>
                    <td>{session.therapist}</td>
                    <td>{session.program}</td>
                    <td>
                      <span className={`${styles.status} ${styles[session.status]}`}>
                        {session.status === 'completed' ? '완료' : '예정'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>빠른 링크</h2>
          </div>
          <div className={styles.quickLinks}>
            <a href="/admin/clients/add" className={styles.quickLink}>
              <i className="fas fa-user-plus"></i>
              <span>내담자 추가</span>
            </a>
            <a href="/admin/sessions/add" className={styles.quickLink}>
              <i className="fas fa-calendar-plus"></i>
              <span>세션 추가</span>
            </a>
            <a href="/admin/therapists/add" className={styles.quickLink}>
              <i className="fas fa-user-md"></i>
              <span>치료사 추가</span>
            </a>
            <a href="/admin/programs/add" className={styles.quickLink}>
              <i className="fas fa-plus-circle"></i>
              <span>프로그램 추가</span>
            </a>
            <a href="/admin/reports" className={styles.quickLink}>
              <i className="fas fa-chart-bar"></i>
              <span>보고서</span>
            </a>
            <a href="/admin/settings" className={styles.quickLink}>
              <i className="fas fa-cog"></i>
              <span>설정</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
Dashboard.getLayout = (page) => page;