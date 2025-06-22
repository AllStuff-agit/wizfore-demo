import { HomeConfig } from '@/types'

export const defaultHomeConfig: HomeConfig = {
  hero: {
    enabled: true,
    autoPlay: true,
    slides: [
      {
        id: 1,
        title: '한국상담심리학회 상담심리전문가가 운영하는',
        subtitle: '공인된 사회서비스센터',
        description: '오랜 임상 경험, 엄격한 수련과정을 거친 각 분야의 전문가가 함께 합니다.',
        buttonText: '전문가 소개 보기',
        buttonLink: '/team',
        backgroundImage: '/images/hero/slide1.jpg',
        backgroundColor: 'from-amber-100 via-orange-50 to-yellow-50',
        order: 1,
        enabled: true
      },
      {
        id: 2,
        title: 'Wizfore Social Service Center',
        subtitle: '위즈포레 사회서비스센터',
        description: '체계적이고 전문적인 아동 발달 지원 서비스를 제공합니다.',
        buttonText: '센터 소개 보기',
        buttonLink: '/about',
        backgroundImage: '/images/hero/slide2.jpg',
        backgroundColor: 'from-blue-50 via-sky-50 to-cyan-50',
        order: 2,
        enabled: true
      },
      {
        id: 3,
        title: '모든 아이가 건강하게 성장하는',
        subtitle: '세상을 만듭니다',
        description: '위즈포레와 함께 아이들의 밝은 미래를 만들어갑니다.',
        buttonText: '프로그램 보기',
        buttonLink: '/programs',
        backgroundImage: '/images/hero/slide3.jpg',
        backgroundColor: 'from-green-50 via-emerald-50 to-teal-50',
        order: 3,
        enabled: true
      }
    ]
  },
  programs: {
    title: '전문 치료 프로그램',
    subtitle: '개별 맞춤형 서비스',
    description: '각 분야 전문가들이 제공하는 체계적인 치료 프로그램',
    enabled: true
  },
  experts: {
    title: '전문가 소개',
    subtitle: '경험 많은 치료사들',
    description: '풍부한 임상 경험과 전문성을 갖춘 치료사들',
    enabled: false
  },
  about: {
    title: '센터 소개',
    subtitle: '함께 어우러지는 지혜의 숲',
    description: '위즈포레 사회서비스센터를 소개합니다',
    image: '/images/about/center.jpg',
    enabled: true
  },
  news: {
    title: '센터 소식',
    subtitle: '최신 뉴스',
    description: '센터의 최신 소식과 공지사항',
    enabled: false
  },
  facilities: {
    title: '시설 안내',
    subtitle: '전문 치료 공간',
    description: '체계적인 치료를 위한 전문 시설',
    enabled: false
  },
  contact: {
    title: '상담 문의',
    subtitle: '언제든 연락주세요',
    description: '전문가와의 상담 예약 및 문의',
    image: '/images/contact/consultation.jpg',
    enabled: true
  }
}