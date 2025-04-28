"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/About.module.css';
import { getActiveHistory } from '../../services/historyService';

export default function About() {
  const [history, setHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);

  // 연혁 데이터 불러오기
  useEffect(() => {
    async function fetchHistory() {
      try {
        console.log('About 페이지: 연혁 데이터 로딩 시작');
        setIsHistoryLoading(true);
        const historyData = await getActiveHistory();
        console.log('About 페이지: 받은 연혁 데이터:', historyData);
        
        // 데이터가 비어있으면 로그 추가
        if (!historyData || historyData.length === 0) {
          console.log('About 페이지: 연혁 데이터가 비어있습니다');
        }
        
        setHistory(historyData);
      } catch (error) {
        console.error('About 페이지: 연혁 데이터를 불러오는데 실패했습니다:', error);
        console.error('오류 상세 정보:', error.message);
        setHistoryError('연혁 정보를 불러올 수 없습니다.');
      } finally {
        setIsHistoryLoading(false);
        console.log('About 페이지: 연혁 데이터 로딩 완료');
      }
    }

    fetchHistory();
  }, []);

  // 강점 데이터
  const strengths = [
    {
      title: '안심되고',
      description: '아이와 가족이 안전하고 편안한 환경에서 치료 및 프로그램을 제공합니다.',
      icon: 'fas fa-shield-alt'
    },
    {
      title: '즐겁고',
      description: '아이들이 즐겁게 참여할 수 있는 다양한 활동과 프로그램을 개발하고 제공합니다.',
      icon: 'fas fa-smile'
    },
    {
      title: '유익하고',
      description: '개인에게 맞춘 전문적인 프로그램으로 실질적인 발달과 성장을 돕습니다.',
      icon: 'fas fa-lightbulb'
    },
    {
      title: '희망차고',
      description: '아이와 가족에게 긍정적인 미래를 향한 희망을 심어드립니다.',
      icon: 'fas fa-heart'
    },
    {
      title: '성장하는',
      description: '지속적인 연구와 교육을 통해 항상 발전하는 서비스를 제공합니다.',
      icon: 'fas fa-seedling'
    }
  ];

  // 전문가 팀 데이터
  const team = [
    {
      name: '김지원',
      position: '센터장',
      specialty: '언어치료',
      image: '/images/team/therapist1.jpg'
    },
    {
      name: '이서연',
      position: '팀장',
      specialty: '심리상담',
      image: '/images/team/therapist2.jpg'
    },
    {
      name: '박민준',
      position: '치료사',
      specialty: '감각통합',
      image: '/images/team/therapist3.jpg'
    },
    {
      name: '정예준',
      position: '치료사',
      specialty: '미술치료',
      image: '/images/team/therapist4.jpg'
    }
  ];

  return (
    <>
      <Head>
        <title>기관 소개 - 위즈포레 사회서비스센터</title>
        <meta name="description" content="위즈포레 사회서비스센터 소개 페이지입니다. 우리의 비전, 미션, 연혁을 확인하세요." />
      </Head>

      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>기관 소개</h1>
          <p>위즈포레 사회서비스센터의 이야기를 소개합니다.</p>
        </div>
      </div>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2>위즈포레는 무엇인가요?</h2>
              <p>위즈포레(WIZ FORE)는 '함께 어우러지는 지혜의 숲(Wisdom Forest)'이라는 의미를 담고 있으며, 장애인을 포함한 모든 사람들이 어우러져 더불어 살아가는 힘을 키우는데 필요한 사회서비스를 제공하는 전문기관입니다.</p>
              <p>2016년 설립 이후, 위즈포레는 다양한 치료 및 활동 프로그램을 통해 아동과 가족의 건강과 행복을 지원해왔습니다. 전문성 있는 치료사들이 함께 최상의 서비스를 제공하기 위해 노력하고 있습니다.</p>
              
              <div className={styles.visionMission}>
                <div className={styles.visionBox}>
                  <h3>비전</h3>
                  <p>아동과 가족이 건강하고 행복한 삶을 영위할 수 있도록 최상의 사회서비스를 제공하는 전문기관</p>
                </div>
                <div className={styles.missionBox}>
                  <h3>미션</h3>
                  <p>개인의 특성과 환경을 고려한 맞춤형 서비스로 모든 아동과 가족의 삶의 질 향상에 기여</p>
                </div>
              </div>
            </div>
            <div className={styles.introImage}>
              <img src="/images/about/center-image.jpg" alt="위즈포레 사회서비스센터" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.strengthsSection}>
        <div className={styles.container}>
          <h2>위즈포레의 강점</h2>
          <div className={styles.strengthsGrid}>
            {strengths.map((strength, index) => (
              <div key={index} className={styles.strengthItem}>
                <div className={styles.strengthIcon}>
                  <i className={strength.icon}></i>
                </div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.historySection}>
        <div className={styles.container}>
          <h2>연혁</h2>
          {isHistoryLoading ? (
            <div className={styles.loadingContainer}>
              <p>연혁 정보를 불러오는 중...</p>
            </div>
          ) : historyError ? (
            <div className={styles.errorContainer}>
              <p>{historyError}</p>
            </div>
          ) : history.length === 0 ? (
            <div className={styles.emptyContainer}>
              <p>등록된 연혁 정보가 없습니다.</p>
            </div>
          ) : (
            <div className={styles.timeline}>
              {history.map((item) => (
                <div key={item.id} className={styles.timelineItem}>
                  <div className={styles.timelineDate}>
                    <span className={styles.fullDate}>{item.year}.{item.month}.{item.day}.</span>
                  </div>
                  <div className={styles.timelineContent}>
                    <p>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2>전문가 팀</h2>
          <p className={styles.teamIntro}>위즈포레는 각 분야의 전문가들로 구성된 팀이 함께합니다.</p>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.position}>{member.position}</p>
                  <p className={styles.specialty}>{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.teamStats}>
            <div className={styles.statItem}>
              <h3>24명</h3>
              <p>전문 치료사</p>
            </div>
            <div className={styles.statItem}>
              <h3>8년+</h3>
              <p>치료 경험</p>
            </div>
            <div className={styles.statItem}>
              <h3>24실</h3>
              <p>치료실</p>
            </div>
            <div className={styles.statItem}>
              <h3>15+</h3>
              <p>협력 기관</p>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 및 위치 정보 섹션 추가 */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2>연락처 및 위치</h2>
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
                <img src="/images/map.jpg" alt="위즈포레 지도" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>함께하고 싶으신가요?</h2>
            <p>위즈포레 사회서비스센터의 프로그램에 관심이 있으시다면 언제든지 문의해주세요.</p>
            <Link href="/contact" className={styles.btn}>
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}