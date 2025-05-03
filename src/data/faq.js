// src/data/faq.js
/**
 * 자주 묻는 질문 기본 데이터
 * 위즈포레 센터에 대한 자주 묻는 질문과 답변
 */

export const faq = [
  {
    id: 'center-usage',
    category: '센터 이용 안내',
    questions: [
      {
        id: 'operating-hours',
        question: '운영 시간은 어떻게 되나요?',
        answer: '위즈포레 사회서비스센터는 평일(월~금) 오전 9시부터 오후 6시까지, 토요일은 오전 9시부터 오후 3시까지 운영합니다. 일요일과 공휴일은 휴무입니다. 프로그램에 따라 운영 시간이 다를 수 있으니 사전에 확인해 주세요.',
        order: 1,
        isActive: true
      },
      {
        id: 'first-visit',
        question: '처음 방문할 때 준비해야 할 것이 있나요?',
        answer: '처음 방문 시에는 예약을 하시고, 아동의 건강보험증(또는 의료급여증)과 진단서(있는 경우)를 지참하시면 좋습니다. 또한 아동의 발달 상태나 특성에 대한 정보를 공유해 주시면 더 효과적인 상담이 이루어질 수 있습니다.',
        order: 2,
        isActive: true
      },
      {
        id: 'reservation',
        question: '상담 및 평가는 어떻게 예약하나요?',
        answer: '전화(051-324-0940) 또는 홈페이지 문의 양식을 통해 예약하실 수 있습니다. 예약 시 아동의 이름, 연령, 주요 어려움 등을 간략히 알려주시면 도움이 됩니다.',
        order: 3,
        isActive: true
      },
      {
        id: 'parking',
        question: '주차 시설이 있나요?',
        answer: '센터 건물 내 주차장이 마련되어 있으며, 이용 시 주차권을 발급해 드립니다. 주차 공간이 제한적이므로 가능하면 대중교통 이용을 권장합니다.',
        order: 4,
        isActive: true
      }
    ]
  },
  {
    id: 'program-info',
    category: '프로그램 안내',
    questions: [
      {
        id: 'program-types',
        question: '어떤 프로그램이 있나요?',
        answer: '위즈포레 센터에서는 언어치료, 미술치료, 감각통합치료, 놀이치료, 음악치료, 심리상담, 특수체육 등의 치료 프로그램과 방과후활동, 성인주간활동 등의 서비스를 제공하고 있습니다. 각 프로그램에 대한 자세한 내용은 프로그램 안내 페이지에서 확인하실 수 있습니다.',
        order: 1,
        isActive: true
      },
      {
        id: 'program-application',
        question: '프로그램은 어떻게 신청하나요?',
        answer: '초기 상담 및 평가 후 아동에게 적합한 프로그램을 안내해 드립니다. 프로그램 신청은 센터 방문, 전화, 또는 홈페이지 문의를 통해 가능합니다. 일부 프로그램의 경우 대기자 명단이 있을 수 있습니다.',
        order: 2,
        isActive: true
      },
      {
        id: 'program-frequency',
        question: '치료 프로그램은 얼마나 자주 받아야 하나요?',
        answer: '아동의 상태와 프로그램 종류에 따라 주 1-2회, 회당 40-50분 정도의 치료를 권장하고 있습니다. 정확한 빈도와 시간은 초기 평가 후 개별적으로 안내해 드립니다.',
        order: 3,
        isActive: true
      },
      {
        id: 'after-school',
        question: '방과후활동서비스는 어떻게 이용할 수 있나요?',
        answer: '방과후활동서비스는 만 6세 이상 만 18세 미만의 발달장애 학생을 대상으로 하며, 주민센터를 통해 서비스 신청 후 이용 가능합니다. 바우처 지원을 받으실 수 있으며, 자세한 내용은 전화로 문의해 주세요.',
        order: 4,
        isActive: true
      },
      {
        id: 'adult-day',
        question: '성인주간활동서비스는 무엇인가요?',
        answer: '성인주간활동서비스는 만 18세 이상 만 65세 미만의 성인 발달장애인을 대상으로 하는 서비스로, 낮 시간에 자립생활과 사회참여를 지원하는 다양한 활동을 제공합니다. 월 176시간(확장형) 또는 132시간(기본형) 이용 가능합니다.',
        order: 5,
        isActive: true
      }
    ]
  },
  {
    id: 'therapy-counseling',
    category: '치료/상담 관련',
    questions: [
      {
        id: 'initial-assessment',
        question: '초기 평가는 어떻게 진행되나요?',
        answer: '초기 평가는 아동의 현재 발달 상태와 필요한 서비스를 파악하기 위해 진행됩니다. 보호자 면담, 아동 관찰 및 평가도구를 통한 검사 등이 이루어지며, 약 1~2시간 정도 소요됩니다. 평가 결과를 바탕으로 적합한 프로그램을 안내해 드립니다.',
        order: 1,
        isActive: true
      },
      {
        id: 'therapy-duration',
        question: '치료는 얼마나 오래 받아야 하나요?',
        answer: '치료 기간은 아동의 상태, 목표, 프로그램 종류 등에 따라 다릅니다. 일반적으로 최소 6개월 이상의 지속적인 치료를 권장하며, 3개월마다 평가를 통해 진행 상황을 확인합니다. 정확한 치료 기간은 담당 치료사와 상담하시기 바랍니다.',
        order: 2,
        isActive: true
      },
      {
        id: 'parent-participation',
        question: '부모도 치료에 참여해야 하나요?',
        answer: '아동의 발달을 효과적으로 지원하기 위해 부모님의 참여를 권장합니다. 정기적인 부모 상담, 가정에서의 활동 안내, 교육 워크숍 등을 통해 부모님께서도 아동의 발달을 지원하실 수 있습니다. 일부 프로그램은 부모님이 직접 참관하거나 참여하실 수 있습니다.',
        order: 3,
        isActive: true
      },
      {
        id: 'therapy-effect',
        question: '치료 효과는 언제쯤 나타나나요?',
        answer: '치료 효과는 아동의 상태, 참여도, 프로그램 종류 등에 따라 다르게 나타납니다. 일반적으로 약 3개월 정도 꾸준히 참여하면 변화가 나타나기 시작하며, 지속적인 치료와 가정에서의 지원이 병행될 때 더 큰 효과를 볼 수 있습니다.',
        order: 4,
        isActive: true
      }
    ]
  },
  {
    id: 'payment-refund',
    category: '결제/환불',
    questions: [
      {
        id: 'program-cost',
        question: '프로그램 비용은 얼마인가요?',
        answer: '프로그램 비용은 종류에 따라 다르며, 정부 지원 바우처 서비스와 일반 자비 서비스로 나뉩니다. 바우처 서비스의 경우 정부 지원금을 제외한 본인부담금만 납부하시면 됩니다. 자세한 비용은 센터로 문의해 주세요.',
        order: 1,
        isActive: true
      },
      {
        id: 'voucher',
        question: '바우처 서비스는 어떻게 신청하나요?',
        answer: '발달재활서비스, 방과후활동서비스, 주간활동서비스 등의 바우처는 주민센터를 통해 신청하실 수 있습니다. 신청 자격, 필요 서류, 신청 방법 등은 센터로 문의하시면 상세히 안내해 드립니다.',
        order: 2,
        isActive: true
      },
      {
        id: 'payment-method',
        question: '결제 방법은 어떻게 되나요?',
        answer: '현금, 카드, 계좌이체 등 다양한 방법으로 결제 가능합니다. 바우처 서비스의 경우 국민행복카드로 결제하시며, 일반 자비 서비스는 매월 초 선결제 방식으로 진행됩니다.',
        order: 3,
        isActive: true
      },
      {
        id: 'refund-policy',
        question: '환불 규정은 어떻게 되나요?',
        answer: '센터 사정으로 인한 휴강 시에는 100% 환불해 드립니다. 개인 사정으로 인한 결석의 경우, 최소 하루 전에 미리 연락 주시면 보강 수업을 진행해 드립니다. 장기 결석이나 중도 퇴소 시 환불 규정은 센터로 문의해 주세요.',
        order: 4,
        isActive: true
      }
    ]
  },
  {
    id: 'others',
    category: '기타',
    questions: [
      {
        id: 'certification',
        question: '치료사들의 자격은 어떻게 되나요?',
        answer: '위즈포레 센터의 모든 치료사와 교사는 관련 분야의 자격증을 보유하고 있으며, 전문적인 교육과 훈련을 받은 전문가입니다. 각 치료사의 자격 및 경력은 전문가 소개 페이지에서 확인하실 수 있습니다.',
        order: 1,
        isActive: true
      },
      {
        id: 'covid',
        question: '코로나19 예방 조치는 어떻게 되나요?',
        answer: '센터 내 정기적인 소독, 마스크 착용, 손 소독제 비치, 발열 체크 등의 방역 지침을 준수하고 있습니다. 상황에 따라 비대면 서비스를 제공하거나 소규모 그룹으로 운영될 수 있습니다.',
        order: 2,
        isActive: true
      },
      {
        id: 'cooperation',
        question: '유치원/학교와의 연계가 가능한가요?',
        answer: '아동의 발달을 종합적으로 지원하기 위해 유치원, 학교 등 아동이 속한 기관과의 연계를 진행합니다. 부모님의 동의하에 정보 공유, 교사 상담, 현장 방문 등이 이루어질 수 있습니다.',
        order: 3,
        isActive: true
      },
      {
        id: 'volunteer',
        question: '자원봉사나 실습은 어떻게 신청하나요?',
        answer: '자원봉사나 실습을 희망하시는 분은 이메일(wizfore@daum.net)이나 전화(051-324-0940)로 문의해 주세요. 관련 분야 전공자 또는 관심 있는 분들의 참여를 환영합니다.',
        order: 4,
        isActive: true
      }
    ]
  }
];

export default faq;