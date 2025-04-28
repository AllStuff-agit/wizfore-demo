"use client";

import Head from 'next/head';
import styles from '../../styles/Location.module.css';

export default function Location() {
  return (
    <>
      <Head>
        <title>오시는 길 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터 위치 및 연락처 정보입니다." />
      </Head>

      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>오시는 길</h1>
          <p>위즈포레 사회서비스센터를 찾아오시는 방법입니다.</p>
        </div>
      </div>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.infoBox}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>주소</h3>
                    <p>부산시 사상구 모라로 110번길 25 3층, 4층</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>전화</h3>
                    <p>051-324-0940</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-fax"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>팩스</h3>
                    <p>051-313-0322</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>이메일</h3>
                    <p>wizfore@daum.net</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>운영시간</h3>
                    <p>월-금: 오전 9시 - 오후 6시</p>
                    <p>토요일: 오전 9시 - 오후 1시</p>
                    <p>일요일 및 공휴일: 휴무</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.mapWrapper}>
              <div className={styles.map}>
                <iframe
                  src="https://www.google.co.kr/maps/place/%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C+%EC%82%AC%EC%83%81%EA%B5%AC+%EB%AA%A8%EB%9D%BC%EB%A1%9C110%EB%B2%88%EA%B8%B8+25/data=!4m6!3m5!1s0x3568ea9ea90ac5a9:0x170fb73b2e0fe64c!8m2!3d35.1853147!4d128.9924509!16s%2Fg%2F11bzkfjl_r?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 