import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import styles from '../../../styles/admin/programs/Programs.module.css';

export default function ProgramsPage() {
  const categories = [
    {
      id: 'therapy',
      name: '치료 프로그램',
      description: '아동의 발달을 지원하는 다양한 치료 프로그램',
      icon: 'heartbeat',
      path: '/admin/programs/therapy'
    },
    {
      id: 'counseling',
      name: '상담 프로그램',
      description: '아동 및 가족의 심리적 안정을 지원하는 상담 프로그램',
      icon: 'comments',
      path: '/admin/programs/counseling'
    },
    {
      id: 'after-school',
      name: '방과 후 프로그램',
      description: '학령기 아동을 위한 방과 후 특별 활동 프로그램',
      icon: 'school',
      path: '/admin/programs/after-school'
    },
    {
      id: 'sports',
      name: '특수 스포츠',
      description: '신체 발달과 건강을 위한 특별 체육 프로그램',
      icon: 'running',
      path: '/admin/programs/sports'
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>프로그램 안내 관리</h1>
        <p>위즈포레 사회서비스센터에서 제공하는 프로그램을 관리합니다.</p>
      </header>

      <section className={styles.programCategories}>
        <h2>프로그램 카테고리</h2>
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

ProgramsPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout title="프로그램 안내 관리 - 위즈포레 사회서비스센터">
      {page}
    </AdminLayout>
  );
};