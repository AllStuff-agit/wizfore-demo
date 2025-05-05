# Firestore 데이터베이스 구조

Firestore의 컬렉션-문서-하위컬렉션 패턴에 맞춘 위즈포레 웹사이트의 데이터베이스 구조입니다.

## 컬렉션: settings
- **문서: siteConfig**
  - 필드:
    - siteName: "위즈포레사회서비스센터"
    - logo: "https://firebasestorage.googleapis.com/..."
    - favicon: "https://firebasestorage.googleapis.com/..."
    - contact: { phone, email, address, operatingHours }
    - socialLinks: { instagram, facebook, blog, kakao }

- **문서: homeConfig**
  - 필드:
    - hero: { title, subtitle, backgroundImageURL, buttonText, buttonLink, enabled }
    - programs: { title, subtitle, description, enabled }
    - experts: { title, subtitle, description, enabled }
    - about: { title, subtitle, description, image, enabled }
    - news: { title, subtitle, description, enabled }
    - facilities: { title, subtitle, description, enabled }
    - contact: { title, subtitle, description, image, enabled }

## 컬렉션: programs
- **문서: language-therapy**
  - 필드:
    - id: "language-therapy"
    - title: "언어치료"
    - shortDescription: "언어발달, 발음교정, 의사소통 능력 향상"
    - fullDescription: "언어발달이 지연되거나 의사소통에 어려움이 있는 아동을 대상으로 언어능력, 조음능력, 의사소통능력 향상을 위한 전문적인 치료를 제공합니다."
    - image: "https://firebasestorage.googleapis.com/..."
    - icon: "language_icon"
    - category: "치료"
    - featured: true
    - order: 1
  - **하위컬렉션: sessions**
    - **문서: session1**
      - 필드:
        - id: "session1"
        - name: "유아 언어발달 세션"
        - ageRange: "만 3~5세"
        - duration: 40
        - capacity: 1
        - description: "유아의 언어발달을 지원하는 1:1 치료 세션"
    - **문서: session2**
      - 필드:
        - id: "session2" 
        - name: "학령기 언어치료 세션"
        - ageRange: "만 6~12세"
        - duration: 50
        - capacity: 1
        - description: "학령기 아동의 언어능력 향상을 위한 1:1 치료 세션"
  - **하위컬렉션: materials**
    - **문서: material1**
      - 필드:
        - id: "material1"
        - title: "언어발달 지원 교구"
        - description: "언어치료에 사용되는 주요 교구 소개"
        - imageUrl: "https://firebasestorage.googleapis.com/..."

- **문서: cognitive-therapy**
  - 필드:
    - id: "cognitive-therapy"
    - title: "인지치료"
    - shortDescription: "주의집중력, 기억력, 문제해결능력 향상"
    - fullDescription: "주의력결핍, 학습장애 등 인지적 어려움이 있는 아동을 대상으로 주의집중력, 기억력, 문제해결능력 등 인지적 기능 향상을 위한 치료 프로그램을 제공합니다."
    - image: "https://firebasestorage.googleapis.com/..."
    - icon: "cognition_icon"
    - category: "치료"
    - featured: true
    - order: 2
  - **하위컬렉션: sessions**
    - **문서: session1**
      - 필드:
        - id: "session1"
        - name: "주의집중력 향상 세션"
        - ageRange: "만 5~12세"
        - duration: 40
        - capacity: 1
        - description: "주의집중력 향상을 위한 1:1 치료 세션"

## 컬렉션: experts
- **문서: director**
  - 필드:
    - id: "director"
    - name: "홍길동"
    - position: "원장 / 언어치료사"
    - image: "https://firebasestorage.googleapis.com/..."
    - introduction: "10년 이상의 언어치료 경력을 가진 전문가입니다."
    - education: ["OO대학교 OO학과 학사", "OO대학교 OO학과 석사"]
    - certificates: ["언어재활사 1급", "임상심리사 2급"]
    - category: "원장"
    - featured: true
    - order: 1
  - **하위컬렉션: certifications**
    - **문서: cert1**
      - 필드:
        - id: "cert1"
        - name: "언어재활사 1급"
        - issueDate: "2015-05-20"
        - issuer: "한국보건의료인국가시험원"
        - expiryDate: null
        - imageUrl: "https://firebasestorage.googleapis.com/..."
    - **문서: cert2**
      - 필드:
        - id: "cert2"
        - name: "임상심리사 2급"
        - issueDate: "2016-03-15"
        - issuer: "한국상담심리학회"
        - expiryDate: "2026-03-15"
        - imageUrl: "https://firebasestorage.googleapis.com/..."
  - **하위컬렉션: schedules**
    - **문서: monday**
      - 필드:
        - id: "monday"
        - dayOfWeek: "monday"
        - availableHours: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"]
        - isAvailable: true
    - **문서: tuesday**
      - 필드:
        - id: "tuesday"
        - dayOfWeek: "tuesday"
        - availableHours: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"]
        - isAvailable: true

- **문서: therapist1**
  - 필드:
    - id: "therapist1"
    - name: "김철수"
    - position: "언어치료사"
    - image: "https://firebasestorage.googleapis.com/..."
    - introduction: "언어발달 및 의사소통에 어려움이 있는 아동들을 위한 맞춤형 언어치료를 제공합니다."
    - education: ["OO대학교 언어치료학과 학사"]
    - certificates: ["언어재활사 2급"]
    - category: "치료사"
    - featured: false
    - order: 2
  - **하위컬렉션: certifications**
    - **문서: cert1**
      - 필드:
        - id: "cert1"
        - name: "언어재활사 2급"
        - issueDate: "2018-06-10"
        - issuer: "한국보건의료인국가시험원"
        - expiryDate: null
        - imageUrl: "https://firebasestorage.googleapis.com/..."
  - **하위컬렉션: schedules**
    - **문서: monday**
      - 필드:
        - id: "monday"
        - dayOfWeek: "monday"
        - availableHours: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00"]
        - isAvailable: true

## 컬렉션: facilities
- **문서: language-therapy-room**
  - 필드:
    - id: "language-therapy-room"
    - title: "언어치료실"
    - description: "언어발달 및 의사소통 능력 향상을 위한 치료가 이루어지는 공간입니다."
    - images: ["https://firebasestorage.googleapis.com/...", "https://firebasestorage.googleapis.com/..."]
    - category: "치료실"
    - featured: true
    - order: 1
  - **하위컬렉션: equipment**
    - **문서: equipment1**
      - 필드:
        - id: "equipment1"
        - name: "언어치료 교구세트"
        - description: "다양한 언어 발달 촉진 교구가 구비되어 있습니다."
        - imageUrl: "https://firebasestorage.googleapis.com/..."
    - **문서: equipment2**
      - 필드:
        - id: "equipment2"
        - name: "조음훈련 거울"
        - description: "정확한 발음 훈련을 위한 대형 거울이 설치되어 있습니다."
        - imageUrl: "https://firebasestorage.googleapis.com/..."

- **문서: counseling-room**
  - 필드:
    - id: "counseling-room"
    - title: "심리상담실"
    - description: "편안하고 안전한 환경에서 심리상담이 이루어지는 공간입니다."
    - images: ["https://firebasestorage.googleapis.com/...", "https://firebasestorage.googleapis.com/..."]
    - category: "상담실"
    - featured: true
    - order: 2
  - **하위컬렉션: features**
    - **문서: feature1**
      - 필드:
        - id: "feature1"
        - name: "방음 시설"
        - description: "상담 내용의 비밀 보장을 위한 완벽한 방음 시설이 갖춰져 있습니다."

## 컬렉션: notices
- **문서: notice-001**
  - 필드:
    - id: "notice-001"
    - title: "5월 휴무 안내"
    - content: "5월 1일은 근로자의 날로 휴무입니다."
    - publishDate: "2025-04-25T09:00:00Z"
    - author: "관리자"
    - featured: true
    - status: "published"
  - **하위컬렉션: attachments**
    - **문서: attachment1**
      - 필드:
        - id: "attachment1"
        - fileName: "5월_휴일_안내문.pdf"
        - fileUrl: "https://firebasestorage.googleapis.com/..."
        - fileSize: 256000
        - uploadDate: "2025-04-25T08:30:00Z"

- **문서: notice-002**
  - 필드:
    - id: "notice-002"
    - title: "여름방학 특별 프로그램 안내"
    - content: "위즈포레에서는 여름방학을 맞아 특별 프로그램을 운영합니다..."
    - publishDate: "2025-04-20T09:00:00Z"
    - author: "관리자"
    - featured: false
    - status: "published"
  - **하위컬렉션: comments**
    - **문서: comment1**
      - 필드:
        - id: "comment1"
        - author: "학부모1"
        - content: "프로그램에 대한 자세한 일정이 궁금합니다."
        - date: "2025-04-21T14:30:00Z"
        - isVisible: true
    - **문서: comment2**
      - 필드:
        - id: "comment2"
        - author: "관리자"
        - content: "안녕하세요. 자세한 일정은 공지사항 첨부파일을 확인해주세요."
        - date: "2025-04-21T15:45:00Z"
        - isVisible: true

## 컬렉션: inquiries
- **문서: inquiry-20250505001**
  - 필드:
    - id: "inquiry-20250505001"
    - name: "홍길동"
    - phone: "010-1234-5678"
    - email: "hong@example.com"
    - category: "프로그램 문의"
    - message: "언어치료 프로그램에 대해 자세히 알고 싶습니다."
    - createdAt: "2025-05-05T10:30:45.123Z"
    - status: "unread"
    - adminNote: ""
    - replyContent: ""
    - repliedAt: null
  - **하위컬렉션: replies**
    - **문서: reply1**
      - 필드:
        - id: "reply1"
        - content: "안녕하세요. 언어치료 프로그램에 관심 가져주셔서 감사합니다."
        - replyDate: "2025-05-05T14:20:30.456Z"
        - repliedBy: "관리자"
        - isVisible: true

- **문서: inquiry-20250504001**
  - 필드:
    - id: "inquiry-20250504001"
    - name: "김영수"
    - phone: "010-9876-5432"
    - email: "kim@example.com"
    - category: "상담 예약"
    - message: "아이 심리상담 예약을 하고 싶습니다."
    - createdAt: "2025-05-04T15:20:30.456Z"
    - status: "replied"
    - adminNote: "5월 10일 오후 2시 예약 완료"
    - replyContent: "상담 예약이 확정되었습니다. 자세한 사항은 전화로 안내해 드리겠습니다."
    - repliedAt: "2025-05-04T16:45:10.789Z"

## 컬렉션: users
- **문서: admin-user-1**
  - 필드:
    - uid: "firebase_auth_uid_1"
    - email: "admin@wizfore.com"
    - displayName: "관리자"
    - role: "admin"
    - lastLogin: "2025-05-05T09:15:30.123Z"
    - createdAt: "2025-01-01T00:00:00.000Z"
  - **하위컬렉션: permissions**
    - **문서: permission1**
      - 필드:
        - id: "permission1"
        - resource: "all"
        - actions: ["create", "read", "update", "delete"]
  - **하위컬렉션: activities**
    - **문서: activity1**
      - 필드:
        - id: "activity1"
        - action: "login"
        - timestamp: "2025-05-05T09:15:30.123Z"
        - ipAddress: "192.168.1.1"
    - **문서: activity2**
      - 필드:
        - id: "activity2"
        - action: "update_program"
        - timestamp: "2025-05-05T10:20:15.456Z"
        - details: "언어치료 프로그램 정보 업데이트"
        - ipAddress: "192.168.1.1"

- **문서: staff-user-1**
  - 필드:
    - uid: "firebase_auth_uid_2"
    - email: "staff@wizfore.com"
    - displayName: "직원"
    - role: "staff"
    - lastLogin: "2025-05-04T16:45:20.456Z"
    - createdAt: "2025-01-15T00:00:00.000Z"
  - **하위컬렉션: permissions**
    - **문서: permission1**
      - 필드:
        - id: "permission1"
        - resource: "inquiries"
        - actions: ["read", "update"]
    - **문서: permission2**
      - 필드:
        - id: "permission2"
        - resource: "notices"
        - actions: ["create", "read", "update"]

## 컬렉션: about
- **문서: history**
  - 필드:
    - title: "센터 연혁"
    - milestones: [
      { year: "2020", month: "3", event: "위즈포레사회서비스센터 설립" },
      { year: "2020", month: "5", event: "발달재활서비스 제공기관 지정" },
      { year: "2021", month: "3", event: "심리상담 프로그램 확장" }
    ]
  - **하위컬렉션: photos**
    - **문서: photo1**
      - 필드:
        - id: "photo1"
        - title: "센터 설립일"
        - imageUrl: "https://firebasestorage.googleapis.com/..."
        - description: "2020년 3월, 위즈포레 개원식 현장"
        - date: "2020-03-15"

- **문서: vision**
  - 필드:
    - title: "비전 및 미션"
    - vision: "모든 아이가 건강하게 성장하는 사회를 만듭니다."
    - mission: "전문적이고 체계적인 치료와 상담을 통해 아동과 가족의 행복을 지원합니다."
    - coreValues: [
      "전문성: 각 분야의 전문가들이 최선의 서비스를 제공합니다.",
      "신뢰: 내담자와의 신뢰를 바탕으로 진정한 변화를 이끌어냅니다.",
      "성장: 지속적인 성장과 발전을 통해 더 나은 서비스를 제공합니다."
    ]

- **문서: location**
  - 필드:
    - title: "오시는 길"
    - address: "부산시 ..."
    - coordinates: { lat: 35.1795543, lng: 129.0756416 }
    - transportationInfo: [
      { type: "지하철", description: "OO역 O번 출구에서 도보 5분" },
      { type: "버스", description: "OO번, OO번 버스 이용 시 OO정류장 하차" }
    ]
    - parkingInfo: "건물 내 주차장 이용 가능"
  - **하위컬렉션: images**
    - **문서: image1**
      - 필드:
        - id: "image1" 
        - title: "센터 외관"
        - imageUrl: "https://firebasestorage.googleapis.com/..."
    - **문서: image2**
      - 필드:
        - id: "image2"
        - title: "주변 지도"
        - imageUrl: "https://firebasestorage.googleapis.com/..."
