import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/programs/Programs.module.css';

export default function AboutPage() {
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

  const categories = [
    {
      id: 'vision',
      name: '비전 · 인사말',
      description: '센터의 설립 목적과 교육 철학, 장기적 비전을 관리합니다.',
      icon: 'eye',
      path: '/admin/about/vision'
    },
    {
      id: 'director',
      name: '센터장 소개',
      description: '센터장의 프로필 정보와 소개글을 관리합니다.',
      icon: 'user-tie',
      path: '/admin/about/director'
    },
    {
      id: 'history',
      name: '센터 발자취',
      description: '센터 설립부터 현재까지의 주요 이벤트와 성과를 관리합니다.',
      icon: 'history',
      path: '/admin/about/history'
    },
    {
      id: 'advisors',
      name: '전문 자문단',
      description: '센터의 전문 자문위원 정보를 관리합니다.',
      icon: 'users',
      path: '/admin/about/advisors'
    },
    {
      id: 'facilities',
      name: '시설 안내',
      description: '센터의 다양한 치료실, 상담실, 활동공간 등의 정보를 관리합니다.',
      icon: 'building',
      path: '/admin/about/facilities'
    },
    {
      id: 'location',
      name: '오시는 길',
      description: '센터의 위치 정보와 오시는 방법을 관리합니다.',
      icon: 'map-marker-alt',
      path: '/admin/about/location'
    }
  ];

  if (loading) {
    return (
      <AdminLayout title="센터 소개 - 위즈포레 관리자">
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>센터 소개 관리</h1>
        <p>위즈포레 사회서비스센터의 소개 관련 정보를 관리합니다.</p>
      </header>

      <section className={styles.programCategories}>
        <h2>센터 소개 카테고리</h2>
        <div className={styles.cards}>
          {categories.map((category) => (
            <Link key={category.id} href={category.path} className={styles.card}>
              <div className={styles.cardIcon}>
                <i className={`fas fa-${category.icon}`}></i>
              </div>
              <div className={styles.cardContent}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <div className={styles.cardAction}>
                <span className={styles.viewButton}>
                  관리하기 <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout title="센터 소개 관리 - 위즈포레 사회서비스센터">
      {page}
    </AdminLayout>
  );
};