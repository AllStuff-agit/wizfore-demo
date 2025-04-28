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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.1234567890123!2d128.9917!3d35.1796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEwJzQ2LjYiTiAxMjDCsDU5JzM0LjEiRQ!5e0!3m2!1sko!2skr!4v1234567890!5m2!1sko!2skr"
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