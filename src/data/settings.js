// src/data/settings.js
/**
 * 웹사이트 설정 데이터
 * 메타데이터, 연락처, 소셜 링크 등 기본 설정 정보
 */

export const settings = {
  site: {
    title: '위즈포레 사회서비스센터',
    shortName: '위즈포레',
    description: '아동과 가족의 건강과 행복 동행, 위즈포레 사회서비스센터',
    keywords: '특수교육, 아동치료, 언어치료, 미술치료, 감각통합, 부산, 사상구, 발달장애, 방과후활동, 주간활동',
    ogImage: '/images/og-image.jpg',
    favicon: '/favicon.ico',
    themeColor: '#2563EB',
    backgroundColor: '#F9FAFB'
  },
  contact: {
    name: '위즈포레 사회서비스센터',
    address: '부산시 사상구 모라로 110번길 25 3층, 4층',
    phone: '051-324-0940',
    fax: '051-313-0322',
    email: 'wizfore@daum.net',
    businessHours: {
      weekdays: '09:00 - 18:00',
      saturday: '09:00 - 15:00',
      sunday: '휴무',
      holiday: '휴무'
    },
    coordinates: {
      lat: 35.1646,
      lng: 128.9767
    }
  },
  social: {
    facebook: 'https://www.facebook.com/wizfore',
    instagram: 'https://www.instagram.com/wizfore',
    blog: 'https://blog.naver.com/wizfore',
    kakao: 'https://pf.kakao.com/wizfore',
    youtube: 'https://www.youtube.com/channel/wizfore'
  },
  footer: {
    aboutText: '위즈포레(WIZ FORE)는 \'함께 어우러지는 지혜의 숲\'이라는 의미를 담고 있으며, 장애인을 포함한 모든 사람들이 어우러져 더불어 살아가는 힘을 키우는데 필요한 사회서비스를 제공하는 전문기관입니다.',
    copyrightText: `© ${new Date().getFullYear()} 위즈포레 사회서비스센터. All Rights Reserved.`,
    sitemap: [
      { name: '홈', path: '/' },
      { name: '센터소개', path: '/about' },
      { name: '프로그램', path: '/programs' },
      { name: '전문가 소개', path: '/team' },
      { name: '시설안내', path: '/facilities' },
      { name: '오시는 길', path: '/location' },
      { name: '문의하기', path: '/contact' }
    ]
  },
  header: {
    logo: '/images/logo.png',
    logoText: '위즈포레',
    menuItems: [
      { name: '홈', path: '/', order: 1, isActive: true },
      { 
        name: '센터소개', 
        path: '/about', 
        order: 2, 
        isActive: true,
        subItems: [
          { name: '비전 · 인사말', path: '/about' },
          { name: '센터장 소개', path: '/about/director' },
          { name: '센터 발자취', path: '/about/history' },
          { name: '전문 자문단', path: '/about/advisors' },
          { name: '오시는 길', path: '/location' }
        ]
      },
      { 
        name: '프로그램', 
        path: '/programs', 
        order: 3, 
        isActive: true,
        subItems: [
          { name: '치료 프로그램', path: '/programs/therapy' },
          { name: '상담 프로그램', path: '/programs/counseling' },
          { name: '방과후 프로그램', path: '/programs/after-school' },
          { name: '특수 스포츠', path: '/programs/sports' },
          { name: '성인주간활동', path: '/programs/adult-day' }
        ]
      },
      { name: '전문가 소개', path: '/team', order: 4, isActive: true },
      { 
        name: '커뮤니티', 
        path: '/community', 
        order: 5, 
        isActive: true,
        subItems: [
          { name: '센터 소식', path: '/community/news' },
          { name: 'SNS 소식', path: '/community/sns' }
        ]
      },
      { name: '시설안내', path: '/facilities', order: 6, isActive: true },
      { 
        name: '고객지원', 
        path: '/support', 
        order: 7, 
        isActive: true,
        subItems: [
          { name: '1:1 문의', path: '/support/inquiry' },
          { name: '자주 묻는 질문', path: '/support/faq' }
        ]
      }
    ]
  },
  admin: {
    loginPageTitle: '위즈포레 관리자',
    dashboardTitle: '위즈포레 관리자 대시보드',
    menuItems: [
      { name: '홈', path: '/admin/home', icon: 'home', order: 1 },
      { name: '센터 소개', path: '/admin/about', icon: 'info-circle', order: 2 }
    ]
  }
};

export default settings;