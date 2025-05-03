// src/data/experts.js
/**
 * 전문가 프로필 기본 데이터
 * 위즈포레 센터의 치료사, 상담사 정보
 */

export const experts = [
  {
    id: 'director',
    name: '김원장',
    role: '센터장',
    specialties: ['언어치료', '아동발달'],
    education: [
      '○○대학교 특수교육학 박사',
      '○○대학교 언어치료학 석사'
    ],
    certifications: [
      '언어재활사 1급',
      '특수교육사 1급'
    ],
    experience: [
      '전) ○○대학교 언어치료학과 교수',
      '전) ○○아동발달센터 원장'
    ],
    introduction: '20년 이상의 언어치료 및 특수교육 경력을 바탕으로 아이들의 발달을 지원합니다.',
    imageUrl: '/images/experts/director.jpg',
    order: 1,
    isActive: true,
    category: '센터장'
  },
  {
    id: 'language-therapist1',
    name: '이언어',
    role: '언어치료사',
    specialties: ['언어발달장애', '조음장애', '유창성장애'],
    education: [
      '○○대학교 언어치료학과 석사'
    ],
    certifications: [
      '언어재활사 1급'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 언어치료사',
      '전) ○○아동발달센터 언어치료사'
    ],
    introduction: '언어발달 지연 및 의사소통 장애 아동을 위한 체계적인 언어치료 프로그램을 제공합니다.',
    imageUrl: '/images/experts/language1.jpg',
    order: 2,
    isActive: true,
    category: '치료사'
  },
  {
    id: 'art-therapist1',
    name: '박미술',
    role: '미술치료사',
    specialties: ['발달미술치료', '심리미술치료', '사회성 집단미술치료'],
    education: [
      '○○대학교 미술치료학과 석사'
    ],
    certifications: [
      '미술심리상담사 1급',
      '청소년상담사 2급'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 미술치료사',
      '전) ○○아동심리센터 미술치료사'
    ],
    introduction: '미술 매체를 통해 아동의 감정 표현과 자아 발달을 돕는 치료 프로그램을 운영합니다.',
    imageUrl: '/images/experts/art1.jpg',
    order: 3,
    isActive: true,
    category: '치료사'
  },
  {
    id: 'integration-therapist1',
    name: '최감각',
    role: '감각통합치료사',
    specialties: ['감각통합치료', '운동발달', '대근육·소근육 발달'],
    education: [
      '○○대학교 작업치료학과 석사'
    ],
    certifications: [
      '작업치료사 1급',
      'SI 감각통합 국제자격증'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 감각통합치료사',
      '전) ○○재활병원 작업치료사'
    ],
    introduction: '다양한 감각 경험을 통해 아동의 감각처리 능력과 운동 발달을 촉진합니다.',
    imageUrl: '/images/experts/integration1.jpg',
    order: 4,
    isActive: true,
    category: '치료사'
  },
  {
    id: 'counselor1',
    name: '정상담',
    role: '심리상담사',
    specialties: ['아동심리상담', '부모상담', '가족상담'],
    education: [
      '○○대학교 심리학과 석사'
    ],
    certifications: [
      '임상심리사 2급',
      '놀이치료사 1급'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 심리상담사',
      '전) ○○심리상담센터 상담사'
    ],
    introduction: '아동의 심리적 어려움과 가족 관계 개선을 위한 전문적인 상담 서비스를 제공합니다.',
    imageUrl: '/images/experts/counselor1.jpg',
    order: 5,
    isActive: true,
    category: '상담사'
  },
  {
    id: 'after-school1',
    name: '김방과',
    role: '방과후 교사',
    specialties: ['특수교육', '사회성 훈련', '학습지도'],
    education: [
      '○○대학교 특수교육학과 학사'
    ],
    certifications: [
      '특수교사 2급',
      '방과후 아동지도사'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 방과후 교사',
      '전) ○○학교 특수학급 보조교사'
    ],
    introduction: '발달장애 학생들의 학습 및 사회성 발달을 위한 체계적인 방과후 프로그램을 운영합니다.',
    imageUrl: '/images/experts/afterschool1.jpg',
    order: 6,
    isActive: true,
    category: '방과후 교사'
  },
  {
    id: 'sports-teacher1',
    name: '이체육',
    role: '특수체육교사',
    specialties: ['특수체육', '운동발달', '신체협응력'],
    education: [
      '○○대학교 특수체육학과 석사'
    ],
    certifications: [
      '특수체육지도자 1급',
      '장애인스포츠지도사'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 특수체육교사',
      '전) ○○장애인스포츠센터 지도자'
    ],
    introduction: '발달장애 아동·청소년의 신체 발달과 운동 기능 향상을 위한 맞춤형 체육 프로그램을 제공합니다.',
    imageUrl: '/images/experts/sports1.jpg',
    order: 7,
    isActive: true,
    category: '특수체육 교사'
  },
  {
    id: 'day-activity1',
    name: '한주간',
    role: '주간활동교사',
    specialties: ['성인발달장애', '자립생활', '여가활동'],
    education: [
      '○○대학교 사회복지학과 학사'
    ],
    certifications: [
      '사회복지사 1급',
      '장애인활동지원사'
    ],
    experience: [
      '현) 위즈포레 사회서비스센터 주간활동교사',
      '전) ○○장애인복지관 사회복지사'
    ],
    introduction: '성인 발달장애인의 자립생활 능력 향상과 사회참여를 위한 다양한 주간활동 프로그램을 운영합니다.',
    imageUrl: '/images/experts/dayactivity1.jpg',
    order: 8,
    isActive: true,
    category: '주간활동 교사'
  }
];

export default experts;