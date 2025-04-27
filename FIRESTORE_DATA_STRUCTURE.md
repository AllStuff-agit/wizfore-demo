# 위즈포레 사회서비스센터 웹사이트 및 Firestore 데이터 구조 분석

## 1. 웹사이트 구조 분석

### 1.1 페이지 구조
웹사이트는 다음과 같은 페이지로 구성되어 있습니다:

1. **메인 페이지 (홈)**
   - 히어로 섹션
   - 서비스 소개 섹션
   - 기관 소개 섹션
   - CTA(Call-to-Action) 섹션
   - 푸터

2. **기관 소개 페이지 (/about)**
   - 기관 비전 및 미션 소개
   - 위즈포레 강점 소개
   - 연혁 타임라인
   - 전문가 팀 소개

3. **서비스 페이지 (/services)**
   - 주요 프로그램 소개 (발달재활서비스, 주간활동서비스, 방과후활동서비스)
   - 치료 프로그램 상세 소개 (언어치료, 미술치료, 음악치료 등)
   - 시설 안내 섹션

4. **문의하기 페이지 (/contact)**
   - 연락처 정보 섹션
   - 문의 및 상담 신청 양식
   - 위치 정보 섹션

5. **관리자 페이지 (/admin)**
   - 로그인 페이지
   - 대시보드
   - 내담자 관리
   - 세션 관리
   - 치료사 관리
   - 프로그램 관리
   - 문의 관리
   - 공지사항 관리
   - 연혁 관리

### 1.2 컴포넌트 구조

1. **공통 컴포넌트**
   - 레이아웃 (Layout)
     - 헤더 (Header)
     - 메인 콘텐츠 (MainContent)
     - 푸터 (Footer)
   
   - 관리자 레이아웃 (AdminLayout)
     - 사이드바 (Sidebar)
     - 메인 콘텐츠 (MainContent)

2. **페이지별 컴포넌트**
   - 홈 페이지: HeroSection, ServicesSection, AboutSection, CTASection
   - 기관 소개 페이지: IntroSection, StrengthsSection, HistorySection, TeamSection
   - 서비스 페이지: ProgramCard, ServiceCard, FacilityGrid
   - 문의하기 페이지: ContactInfo, ContactForm
   - 관리자 페이지: 각 관리 섹션별 컴포넌트

## 2. Firestore 데이터 구조 정의

웹사이트 구조와 기능을 고려하여 다음과 같은 Firestore 컬렉션과 필드를 정의합니다:

### 2.1 clients (내담자) 컬렉션

내담자 정보를 관리하는 컬렉션입니다.

```
clients/{client_id}
```

**필드 구조:**
```javascript
{
  id: "client_id", // 문서 ID
  name: "김민준", // 이름
  birthdate: "2018-05-12", // 생년월일 (String 형식)
  gender: "male", // 성별 (male, female)
  guardianName: "김철수", // 보호자 이름
  guardianRelation: "father", // 보호자 관계 (father, mother, etc.)
  phone: "010-1234-5678", // 연락처
  email: "guardian@example.com", // 이메일 (선택)
  address: "부산시 사상구 모라동 123-45", // 주소
  diagnosis: "언어발달지연", // 진단명
  programType: ["language-therapy", "art-therapy"], // 참여 프로그램 유형 (배열)
  notes: "주 2회 언어치료 참여 중", // 특이사항
  isActive: true, // 활성 상태
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.2 therapists (치료사) 컬렉션

치료사 정보를 관리하는 컬렉션입니다.

```
therapists/{therapist_id}
```

**필드 구조:**
```javascript
{
  id: "therapist_id", // 문서 ID
  name: "이서연", // 이름
  photo: "url/to/photo.jpg", // 사진 URL
  position: "언어치료사", // 직책
  specialization: "언어재활", // 전문 분야
  certification: ["언어재활사 1급", "감각통합치료사"], // 자격증 (배열)
  bio: "OO대학교 언어치료학과 졸업, 5년 경력...", // 소개
  email: "therapist@example.com", // 이메일
  phone: "010-9876-5432", // 연락처
  programs: ["language-therapy", "sensory-integration"], // 담당 프로그램 (배열)
  workingDays: ["mon", "tue", "wed", "thu", "fri"], // 근무 요일
  workingHours: {start: "09:00", end: "18:00"}, // 근무 시간
  isActive: true, // 활성 상태
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.3 programs (프로그램) 컬렉션

제공하는 치료 및 활동 프로그램 정보를 관리하는 컬렉션입니다.

```
programs/{program_id}
```

**필드 구조:**
```javascript
{
  id: "program_id", // 문서 ID
  name: "언어치료", // 프로그램명
  category: "therapy", // 카테고리 (therapy, activity, education)
  type: "language-therapy", // 프로그램 유형 (고유 식별자)
  description: "언어발달 지연을 겪는 아동을 위한 치료 프로그램...", // 설명
  longDescription: "상세 설명 (마크다운 형식 가능)",
  thumbnail: "url/to/thumbnail.jpg", // 썸네일 이미지 URL
  images: ["url1", "url2", "url3"], // 프로그램 이미지 URL (배열)
  duration: 50, // 세션당 시간 (분)
  ageRange: {min: 3, max: 12}, // 대상 연령대
  cost: 50000, // 회당 비용 (원)
  isActive: true, // 활성 상태
  displayOrder: 1, // 표시 순서
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.4 sessions (세션/치료 일정) 컬렉션

치료 세션 일정을 관리하는 컬렉션입니다.

```
sessions/{session_id}
```

**필드 구조:**
```javascript
{
  id: "session_id", // 문서 ID
  clientId: "client_id", // 내담자 ID (참조)
  therapistId: "therapist_id", // 치료사 ID (참조)
  programId: "program_id", // 프로그램 ID (참조)
  clientName: "김민준", // 내담자 이름 (중복 저장)
  therapistName: "이서연", // 치료사 이름 (중복 저장)
  programName: "언어치료", // 프로그램 이름 (중복 저장)
  date: "2023-05-15", // 날짜 (String 형식)
  startTime: "14:00", // 시작 시간
  endTime: "15:00", // 종료 시간
  status: "scheduled", // 상태 (scheduled, completed, cancelled)
  notes: "발음 연습에 집중할 예정", // 세션 메모
  attendance: null, // 출석 정보 (attended, late, absent, null)
  feedback: "", // 피드백/세션 결과
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.5 inquiries (문의) 컬렉션

웹사이트를 통해 접수된 문의 내용을 관리하는 컬렉션입니다.

```
inquiries/{inquiry_id}
```

**필드 구조:**
```javascript
{
  id: "inquiry_id", // 문서 ID
  name: "박지영", // 이름
  phone: "010-9876-5432", // 연락처
  email: "jiyoung@example.com", // 이메일
  subject: "미술치료 프로그램 문의", // 제목
  message: "미술치료 프로그램에 대해 자세히 알고 싶습니다.", // 메시지 내용
  service: "art-therapy", // 문의 서비스
  status: "pending", // 상태 (pending, in_progress, resolved)
  assignedTo: "", // 담당자 (치료사 ID)
  response: "", // 답변 내용
  createdAt: timestamp, // 생성 일시
  resolvedAt: null // 해결 일시
}
```

### 2.6 notices (공지사항) 컬렉션

웹사이트에 게시할 공지사항을 관리하는 컬렉션입니다.

```
notices/{notice_id}
```

**필드 구조:**
```javascript
{
  id: "notice_id", // 문서 ID
  title: "5월 휴무 안내", // 제목
  content: "5월 5일 어린이날은 휴무입니다...", // 내용 (마크다운 형식 가능)
  author: "관리자", // 작성자
  importance: "normal", // 중요도 (normal, important)
  category: "announcement", // 카테고리 (announcement, event, etc.)
  attachments: [], // 첨부파일 URL (배열)
  isActive: true, // 활성 상태
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp, // 업데이트 일시
  publishedAt: timestamp // 게시 일시
}
```

### 2.7 history (연혁) 컬렉션

기관의 연혁 정보를 관리하는 컬렉션입니다.

```
history/{history_id}
```

**필드 구조:**
```javascript
{
  id: "history_id", // 문서 ID
  year: "2016", // 연도
  month: "01", // 월
  day: "01", // 일
  event: "위즈포레 설립", // 이벤트 내용
  isActive: true, // 활성 상태 (웹사이트에 표시 여부)
  order: 1, // 정렬 순서 (선택적)
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.8 facilities (시설) 컬렉션

센터 내 시설 정보를 관리하는 컬렉션입니다.

```
facilities/{facility_id}
```

**필드 구조:**
```javascript
{
  id: "facility_id", // 문서 ID
  name: "언어치료실 1", // 시설 이름
  type: "therapy_room", // 유형 (therapy_room, play_room, office, etc.)
  description: "개인 언어치료를 위한 공간...", // 설명
  images: ["url1", "url2", "url3"], // 이미지 URL (배열)
  features: ["방음", "원형 테이블", "교구 비치"], // 특징 (배열)
  capacity: 4, // 수용 인원
  isActive: true, // 활성 상태
  displayOrder: 1, // 표시 순서
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.9 users (사용자) 컬렉션

관리자 계정 및 권한 정보를 관리하는 컬렉션입니다.
※ Firebase Authentication과 함께 사용됩니다.

```
users/{user_id}
```

**필드 구조:**
```javascript
{
  id: "user_id", // 문서 ID (Firebase Auth의 UID와 일치)
  email: "admin@wizfore.com", // 이메일
  displayName: "관리자", // 표시 이름
  role: "admin", // 역할 (admin, staff, etc.)
  permissions: ["manage_clients", "manage_sessions", "manage_settings"], // 권한 (배열)
  lastLogin: timestamp, // 마지막 로그인 시간
  isActive: true, // 활성 상태
  createdAt: timestamp, // 생성 일시
  updatedAt: timestamp // 업데이트 일시
}
```

### 2.10 settings (설정) 컬렉션

웹사이트 설정 정보를 관리하는 컬렉션입니다.

```
settings/{setting_id}
```

**필드 구조:**
```javascript
{
  id: "site_info", // 설정 ID (고유 키)
  siteName: "위즈포레 사회서비스센터", // 사이트 이름
  logo: "url/to/logo.png", // 로고 URL
  address: "부산시 사상구 모라동 123-45", // 주소
  phone: "051-123-4567", // 대표 전화
  email: "contact@wizfore.com", // 대표 이메일
  operatingHours: { // 운영 시간
    weekday: {start: "09:00", end: "18:00"},
    saturday: {start: "09:00", end: "13:00"},
    sunday: "closed"
  },
  socialLinks: { // 소셜 미디어 링크
    instagram: "https://instagram.com/wizfore",
    facebook: "https://facebook.com/wizfore",
    blog: "https://blog.naver.com/wizfore"
  },
  seo: { // SEO 관련 설정
    metaTitle: "위즈포레 사회서비스센터 - 발달재활 및 심리치료",
    metaDescription: "부산 사상구 위치한 아동 청소년 발달재활 전문 사회서비스센터",
    keywords: "발달재활, 언어치료, 미술치료, 심리치료, 부산, 사상구"
  },
  mapCoordinates: { // 지도 좌표
    lat: 35.123456,
    lng: 129.123456
  },
  updatedAt: timestamp // 업데이트 일시
}
```

## 3. 관계 구조 및 데이터 흐름

### 3.1 컬렉션 간 관계

```
clients (내담자) ←→ sessions (세션) ←→ therapists (치료사)
                    ↑
                    ↓
               programs (프로그램)
```

- 내담자(clients)는 여러 세션(sessions)을 가질 수 있습니다.
- 치료사(therapists)는 여러 세션(sessions)을 담당할 수 있습니다.
- 프로그램(programs)은,여러 세션(sessions)에서 사용될 수 있습니다.
- 문의(inquiries)는 특정 프로그램(programs)과 관련될 수 있습니다.

### 3.2 보안 규칙 (예시)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 관리자만 모든 데이터에 접근 가능
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // 모든 사용자가 공지사항을 읽을 수 있음
    match /notices/{notice} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // 모든 사용자가 연혁을 읽을 수 있음
    match /history/{item} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // 인증된 사용자만 문의를 제출할 수 있음
    match /inquiries/{inquiry} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // 프로그램 정보는 모든 사용자가 읽을 수 있음
    match /programs/{program} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 4. 데이터 관리 전략

### 4.1 데이터 중복 및 정규화

- **중복 저장**: 일부 필드(예: 세션의 clientName, therapistName)는 조회 성능 향상을 위해 중복 저장합니다.
- **하위 컬렉션 vs 독립 컬렉션**: 대부분의 데이터는 독립 컬렉션으로 관리하여 유연성을 높입니다.
- **참조 방식**: 다른 문서를 참조할 때는 ID만 저장하고, 필요시 별도 쿼리로 상세 정보를 가져옵니다.

### 4.2 인덱싱 및 쿼리 최적화

- **복합 인덱스**: 여러 필드로 정렬하거나 필터링하는 경우 복합 인덱스를 생성합니다.
- **페이지네이션**: 대량의 데이터를 조회할 때는 페이지네이션을 적용합니다.
- **데이터 제한**: 한 번에 필요한 데이터만 가져오도록 쿼리를 설계합니다.

### 4.3 보안 및 접근 제어

- **Firebase Authentication**: 사용자 인증에 Firebase Authentication을 활용합니다.
- **커스텀 클레임**: 관리자 권한은 Firebase Auth의 커스텀 클레임으로 관리합니다.
- **Firestore 보안 규칙**: 각 컬렉션별로 적절한 보안 규칙을 설정합니다.

## 5. 확장성 고려사항

### 5.1 향후 확장 가능한 기능

- **예약 시스템**: 세션 예약 기능 확장
- **결제 시스템**: 온라인 결제 기능 추가
- **리포트 시스템**: 내담자별 진행 상황 및 치료 결과 리포트 기능
- **알림 시스템**: 세션 예약 알림, 공지사항 알림 등

### 5.2 성능 최적화 방안

- **인덱스 관리**: 자주 사용하는 쿼리에 대한 인덱스 생성
- **데이터 분할**: 대용량 데이터는 여러 문서로 분할 관리
- **캐싱 전략**: 자주 액세스하는 데이터는 클라이언트 측에서 캐싱
- **오프라인 지원**: 오프라인 상태에서도 작동하도록 설정
