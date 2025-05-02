import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/services/Index.module.css';

export default function AdminServices() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // 서비스 카테고리 데이터
  const serviceCategories = [
    {
      id: 'therapy',
      title: '치료·상담',
      description: '언어치료, 미술치료, 음악치료, 감각통합 등의 프로그램 관리',
      icon: 'fas fa-hands-helping',
      color: '#8ECAE6',
      count: 8
    },
    {
      id: 'adult',
      title: '성인주간활동',
      description: '만 18세 이상 만 65세 미만 성인 발달장애인 대상 프로그램 관리',
      icon: 'fas fa-calendar-day',
      color: '#AED9A7',
      count: 6
    },
    {
      id: 'after-school',
      title: '방과후활동',
      description: '만 6세 이상 만 18세 미만 발달장애 학생 대상 프로그램 관리',
      icon: 'fas fa-school',
      color: '#FFD166',
      count: 5
    },
    {
      id: 'sports',
      title: '특수스포츠교실',
      description: '특수체육 및 스포츠 관련 프로그램 관리',
      icon: 'fas fa-running',
      color: '#F8B195',
      count: 3
    }
  ];

  return (
    <>
      <Head>
        <title>서비스 관리 - 위즈포레 관리자</title>
      </Head>

      <div className={styles.servicesContainer}>
        <div className={styles.pageHeader}>
          <h1>서비스 관리</h1>
          <p>위즈포레 사회서비스센터의 모든 서비스를 관리합니다.</p>
        </div>

        <div className={styles.categoryCards}>
          {serviceCategories.map((category) => (
            <Link 
              href={`/admin/services/${category.id}`}
              key={category.id}
              className={styles.categoryCard}
            >
              <div 
                className={styles.cardIcon} 
                style={{ backgroundColor: category.color }}
              >
                <i className={category.icon}></i>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h2>{category.title}</h2>
                  <span className={styles.programCount}>{category.count} 프로그램</span>
                </div>
                <p className={styles.cardDescription}>{category.description}</p>
                <div className={styles.cardAction}>
                  <span>관리하기</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.statsSection}>
          <h2>서비스 통계</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>22</div>
              <div className={styles.statLabel}>총 프로그램 수</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>134</div>
              <div className={styles.statLabel}>활성 세션</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>78</div>
              <div className={styles.statLabel}>진행 중인 세션</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>45</div>
              <div className={styles.statLabel}>이번 달 신규 등록</div>
            </div>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>빠른 작업</h2>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>
              <i className="fas fa-plus"></i>
              새 프로그램 추가
            </button>
            <button className={styles.actionButton}>
              <i className="fas fa-calendar-plus"></i>
              새 세션 예약
            </button>
            <button className={styles.actionButton}>
              <i className="fas fa-file-export"></i>
              프로그램 데이터 내보내기
            </button>
            <button className={styles.actionButton}>
              <i className="fas fa-chart-line"></i>
              서비스 통계 보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// 관리자 레이아웃 적용
AdminServices.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
