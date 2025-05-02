import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/center/Index.module.css';

export default function CenterIndex() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const menuItems = [
    {
      title: '기본 정보',
      description: '센터명, 소개, 비전, 연락처 등 기본 정보를 관리합니다.',
      icon: 'fas fa-info-circle',
      link: '/admin/center/info'
    },
    {
      title: '센터장 소개',
      description: '센터장의 프로필, 학력, 경력, 전문 분야 등의 정보를 관리합니다.',
      icon: 'fas fa-user-tie',
      link: '/admin/center/director'
    },
    {
      title: '자문위원 관리',
      description: '센터의 자문위원 정보를 추가, 수정, 삭제합니다.',
      icon: 'fas fa-users',
      link: '/admin/center/advisors'
    },
    {
      title: '센터 연혁',
      description: '센터의 주요 연혁과 이벤트를 관리합니다.',
      icon: 'fas fa-history',
      link: '/admin/history'
    },
    {
      title: '오시는 길',
      description: '센터 위치, 교통편, 주차 정보 등을 관리합니다.',
      icon: 'fas fa-map-marked-alt',
      link: '/admin/center/location'
    }
  ];

  if (loading) {
    return (
      <AdminLayout title="센터 정보 관리 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="센터 정보 관리 - 위즈포레 관리자">
      <div className={styles.pageHeader}>
        <h1>센터 정보 관리</h1>
      </div>

      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={styles.menuCard}
            onClick={() => router.push(item.link)}
          >
            <div className={styles.menuIcon}>
              <i className={item.icon}></i>
            </div>
            <div className={styles.menuContent}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div className={styles.menuArrow}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
CenterIndex.getLayout = (page) => page;
