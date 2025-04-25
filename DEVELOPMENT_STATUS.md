# 위즈포레 사회서비스센터 웹사이트 개발 현황

## 1. 지금까지 완료한 작업

### 기본 구조 설계 및 구현
- Next.js 프로젝트 기본 구조 설정
- 레이아웃 컴포넌트 구현 (일반 사용자용, 관리자용)
- 페이지 라우팅 구성
- 반응형 디자인 적용

### 메인 페이지 구현
- 히어로 섹션
- 서비스 소개 섹션
- 기관 소개 섹션
- CTA(Call-to-Action) 섹션
- 푸터

### 서비스 페이지 구현
- 주요 프로그램 소개 (발달재활서비스, 주간활동서비스, 방과후활동서비스)
- 치료 프로그램 상세 소개 (언어치료, 미술치료, 음악치료 등)
- 시설 안내 섹션

### 기관 소개 페이지 구현
- 기관 비전 및 미션 소개
- 위즈포레 강점 소개
- 연혁 타임라인
- 전문가 팀 소개

### 문의하기 페이지 구현
- 연락처 정보 섹션
- 문의 및 상담 신청 양식
- 위치 정보 섹션

### 관리자 기능 기본 구조 구현
- 로그인 페이지
- 대시보드 페이지
- Firebase 인증 및 데이터베이스 연동 준비

## 2. 앞으로 진행해야 할 작업

### Firebase 연동 및 설정
- Firebase 프로젝트 생성
- 인증(Authentication) 설정
- Firestore 데이터베이스 설계 및 보안 규칙 설정
- Firebase Admin SDK 연동

### 관리자 기능 구현
- 사용자 인증 및 권한 관리 시스템 완성
- 내담자 관리 페이지 구현 (CRUD 기능)
- 세션 관리 페이지 구현 (일정 예약 시스템)
- 치료사 관리 페이지 구현
- 프로그램 관리 페이지 구현
- 문의 관리 페이지 구현
- 공지사항 관리 페이지 구현

### 사용자 기능 추가
- 상담 예약 기능
- 로그인/회원가입 기능 (필요시)
- 공지사항 조회 기능
- 프로그램 일정 확인 기능

### 최적화 및 개선
- 이미지 최적화
- 페이지 로딩 성능 향상
- 코드 리팩토링
- 접근성 개선
- 크로스 브라우저 호환성 확인

### 배포 및 운영 설정
- GitHub 저장소 설정
- Vercel 배포 설정
- 도메인 연결 (필요시)
- SEO 최적화
- 분석 도구 설정 (Google Analytics 등)

## 3. Firebase를 통해 관리할 데이터 분류

### Firebase로 관리해야 할 동적 데이터

#### Firestore 데이터베이스 컬렉션
1. **clients** (내담자 정보)
   - 이름, 생년월일, 성별, 보호자 정보, 연락처, 주소, 진단명, 참여 프로그램 등

2. **therapists** (치료사 정보)
   - 이름, 전공, 자격증, 소개, 담당 프로그램 등

3. **sessions** (세션/치료 일정)
   - 내담자, 치료사, 프로그램, 날짜, 시간, 상태(예정, 완료, 취소) 등

4. **programs** (프로그램 정보)
   - 프로그램명, 설명, 대상, 기간, 비용 등

5. **inquiries** (문의 내용)
   - 이름, 연락처, 이메일, 문의 내용, 문의 날짜, 처리 상태 등

6. **notices** (공지사항)
   - 제목, 내용, 작성일, 작성자, 중요도 등

#### Firebase Authentication
- 관리자 계정 관리
- 권한 설정 (관리자 권한, 일반 사용자 권한 등)

### 정적 데이터 (Firebase 없이 관리)

1. **기관 소개 정보**
   - 비전, 미션, 기관 소개 텍스트
   - 강점 소개

2. **기본 서비스 정보**
   - 서비스 카테고리 및 설명
   - 서비스 상세 설명

3. **연혁 데이터**
   - 중요한 연혁 및 날짜 정보
   - 이 정보는 자주 변경되지 않으므로 코드에 직접 포함 가능

4. **연락처 정보**
   - 주소, 전화번호, 이메일 등 기본 연락처
   - 운영 시간

5. **팀 소개 기본 정보**
   - 주요 팀원 정보 및 직책

6. **시설 정보**
   - 치료실 종류 및 기본 설명
   - 시설 사진

### 하이브리드 방식으로 관리할 데이터

1. **공지사항**
   - 중요 공지는 코드에 포함, 일반 공지는 Firebase로 관리

2. **팀원 정보**
   - 기본 팀 구조는 코드에 포함, 상세 프로필은 Firebase로 관리

3. **서비스 세부 정보**
   - 기본 서비스 카테고리는 코드에 포함, 세부 프로그램 정보는 Firebase로 관리

## 4. 데이터 모델 예시

### clients (내담자)
```javascript
{
  id: "client_id",
  name: "김민준",
  birthdate: "2018-05-12",
  gender: "male",
  guardianName: "김철수",
  phone: "010-1234-5678",
  address: "부산시 사상구 모라동 123-45",
  diagnosis: "언어발달지연",
  programType: "language-therapy",
  notes: "주 2회 언어치료 참여 중",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### sessions (세션)
```javascript
{
  id: "session_id",
  clientId: "client_id",
  therapistId: "therapist_id",
  programId: "program_id",
  clientName: "김민준",
  therapistName: "이서연",
  programName: "언어치료",
  date: timestamp,
  startTime: "14:00",
  endTime: "15:00",
  status: "scheduled", // completed, cancelled
  notes: "발음 연습에 집중할 예정",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### inquiries (문의)
```javascript
{
  id: "inquiry_id",
  name: "박지영",
  phone: "010-9876-5432",
  email: "jiyoung@example.com",
  subject: "미술치료 프로그램 문의",
  message: "미술치료 프로그램에 대해 자세히 알고 싶습니다.",
  service: "art-therapy",
  status: "pending", // resolved
  createdAt: timestamp,
  resolvedAt: timestamp
}
```

## 5. Firebase 보안 규칙 예시 (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 관리자만 모든 데이터에 접근 가능
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.token.isAdmin == true;
    }
    
    // 모든 사용자가 공지사항을 읽을 수 있음
    match /notices/{notice} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.isAdmin == true;
    }
    
    // 인증된 사용자만 문의를 제출할 수 있음
    match /inquiries/{inquiry} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && request.auth.token.isAdmin == true;
    }
  }
}