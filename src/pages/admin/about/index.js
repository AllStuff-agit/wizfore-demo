import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/AdminAbout.module.css';

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

  if (loading) {
    return (
      <AdminLayout title="센터 소개 - 위즈포레 관리자">
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </AdminLayout>
    );
  }

  const menuItems = [
    {
      title: '비전 · 인사말',
      description: '센터의 설립 목적과 교육 철학, 장기적 비전을 관리합니다.',
      icon: 'fas fa-eye',
      link: '/admin/about/vision'
    },
    {
      title: '센터장 소개',
      description: '센터장의 프로필 정보와 소개글을 관리합니다.',
      icon: 'fas fa-user-tie',
      link: '/admin/about/director'
    },
    {
      title: '센터 발자취',
      description: '센터 설립부터 현재까지의 주요 이벤트와 성과를 관리합니다.',
      icon: 'fas fa-history',
      link: '/admin/about/history'
    },
    {
      title: '전문 자문단',
      description: '센터의 전문 자문위원 정보를 관리합니다.',
      icon: 'fas fa-users',
      link: '/admin/about/advisors'
    },
    {
      title: '시설 안내',
      description: '센터의 다양한 치료실, 상담실, 활동공간 등의 정보를 관리합니다.',
      icon: 'fas fa-building',
      link: '/admin/about/facilities'
    },
    {
      title: '오시는 길',
      description: '센터의 위치 정보와 오시는 방법을 관리합니다.',
      icon: 'fas fa-map-marker-alt',
      link: '/admin/about/location'
    }
  ];

  return (
    <AdminLayout title="센터 소개 - 위즈포레 관리자">
      <div className="page-header">
        <h1>센터 소개(About Us)</h1>
        <p>센터 소개와 관련된 정보를 관리합니다.</p>
      </div>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index} className="menu-card">
            <div className="card-icon">
              <i className={item.icon}></i>
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="card-arrow">
              <i className="fas fa-chevron-right"></i>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
        
        .page-header h1 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .page-header p {
          color: #666;
        }
        
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .menu-card {
          display: flex;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          padding: 1.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          border: 1px solid #eaeaea;
        }
        
        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          border-color: #2563EB;
        }
        
        .card-icon {
          flex: 0 0 50px;
          height: 50px;
          background-color: #EBF5FF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          color: #2563EB;
          font-size: 1.5rem;
        }
        
        .card-content {
          flex: 1;
        }
        
        .card-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #1F2937;
        }
        
        .card-content p {
          color: #6B7280;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .card-arrow {
          display: flex;
          align-items: center;
          color: #2563EB;
        }
        
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #2563EB;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  );
}

// 관리자 페이지 레이아웃 적용
AboutPage.getLayout = (page) => page;