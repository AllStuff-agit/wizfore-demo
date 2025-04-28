# 위즈포레 사회서비스센터 웹사이트 개발 현황

## 1. 지금까지 완료한 작업

### 기본 구조 설계 및 구현
- Next.js 프로젝트 기본 구조 설정 완료
- 레이아웃 컴포넌트 구현 (일반 사용자용, 관리자용)
- 페이지 라우팅 구성
- 반응형 디자인 적용 및 테스트
- 전역 스타일 및 모듈 CSS 구조화

### 메인 페이지 구현
- 히어로 섹션 (반응형 이미지 및 텍스트)
- 서비스 소개 섹션 (카드형 UI)
- 치료 프로그램 소개 섹션 (그리드 레이아웃)
- 기관 소개 섹션 (통계 데이터 포함)
- 시설 안내 섹션 (갤러리 형태)
- 위치 정보 섹션 (지도 및 연락처)
- CTA(Call-to-Action) 섹션
- 푸터 (링크 및 소셜 미디어 아이콘)

### 서비스 페이지 구현
- 주요 프로그램 상세 소개 (발달재활서비스, 주간활동서비스, 방과후활동서비스)
- 치료 프로그램 상세 소개 (언어치료, 미술치료, 음악치료 등 8개 프로그램)
- 대상별 서비스 내용 설명
- 프로그램별 아이콘 및 시각적 요소 구현
- CTA 섹션 추가

### 기관 소개 페이지 구현
- 기관 비전 및 미션 소개
- 위즈포레 강점 소개
- 연혁 타임라인
- 전문가 팀 소개
- 시설 현황 소개

### 문의하기 페이지 구현
- 연락처 정보 섹션
- 문의 및 상담 신청 양식 (유효성 검사 포함)
- 위치 정보 섹션 (지도 포함)
- 자주 묻는 질문 섹션

### 관리자 기능 기본 구조 구현
- 로그인 페이지 (Firebase Authentication 연동)
- 대시보드 페이지 기본 구조
- Firebase 인증 및 데이터베이스 연결 설정 완료

## 2. 진행 중인 작업

### Firebase 연동 및 설정
- Firebase 프로젝트 생성 및 기본 설정 완료
- 인증(Authentication) 설정 완료 (이메일/비밀번호 방식)
- Firestore 데이터베이스 스키마 설계 완료
- 보안 규칙 설정 진행 중
- Firebase Admin SDK 연동 진행 중

### 관리자 기능 구현
- 관리자 로그인 기능 구현 완료
- 대시보드 UI 레이아웃 구현 중
- 내담자 관리 페이지 기본 구조 개발 중
- 문의 관리 페이지 기본 구조 개발 중
- 프로그램 정보 관리 페이지 설계 중

### 사용자 경험 개선
- 이미지 최적화 작업 진행 중
- 애니메이션 및 트랜지션 효과 구현 중
- 모바일 사용자 경험 개선 작업 진행 중
- 웹 접근성 개선 작업 진행 중

## 3. 앞으로 진행해야 할 작업

### 관리자 기능 완성
- 내담자 관리 페이지 구현 완료 (CRUD 기능)
- 세션 관리 페이지 구현 (일정 예약 시스템)
- 치료사 관리 페이지 구현
- 프로그램 관리 페이지 구현 완료
- 문의 관리 페이지 구현 완료
- 공지사항 관리 페이지 구현
- 대시보드 데이터 시각화 구현

### 사용자 기능 추가
- 상담 예약 기능 구현
- 문의하기 기능에 알림 시스템 추가
- 공지사항 조회 기능 구현
- 프로그램 일정 확인 기능 구현

### 최적화 및 개선
- 페이지 로딩 성능 최적화
- 코드 리팩토링 및 모듈화
- 크로스 브라우저 호환성 확인 및 수정
- SEO 최적화

### 배포 및 운영 설정
- GitHub Actions를 활용한 CI/CD 파이프라인 구축
- Vercel 배포 설정 및 환경 변수 구성
- 도메인 연결 및 DNS 설정
- 성능 모니터링 및 분석 도구 설정 (Google Analytics 등)
- 보안 설정 및 HTTPS 인증서 설정

## 4. Firebase 구현 상태

### 완료된 사항
- Firebase 프로젝트 생성 및 구성
- 웹 앱 등록 및 SDK 연동 완료
- Authentication 설정 (이메일/비밀번호 방식)
- Firestore 데이터베이스 생성
- 기본 보안 규칙 설정
- 오프라인 지속성 설정 (enableIndexedDbPersistence)

### 구현 중인 사항
- Firebase Admin SDK 연동 및 커스텀 클레임 설정
- Firestore 데이터 모델 구현 및 테스트
- Realtime Database 문의 데이터 저장 기능
- 스토리지 규칙 및 구조 설정

### Firebase 데이터 모델 현황

#### 컬렉션 구조 (설계 완료)
1. **clients** (내담자 정보)
   - 기본 스키마 설계 완료
   - 샘플 데이터 추가 완료
   - CRUD 기능 개발 중

2. **therapists** (치료사 정보)
   - 기본 스키마 설계 완료
   - 샘플 데이터 추가 중
   - 관리 페이지 UI 개발 중

3. **sessions** (세션/치료 일정)
   - 스키마 설계 완료
   - 관리 기능 개발 예정

4. **programs** (프로그램 정보)
   - 기본 스키마 설계 완료
   - 샘플 데이터 추가 완료
   - 관리 페이지 개발 중

5. **inquiries** (문의 내용)
   - Realtime Database로 설계 변경
   - 기본 스키마 구현 완료
   - 문의 폼 연동 중

6. **notices** (공지사항)
   - 스키마 설계 완료
   - CRUD 기능 개발 예정
   - 프론트엔드 표시 기능 개발 예정

7. **settings** (사이트 설정)
   - 새로 추가된 컬렉션
   - 운영 시간, 연락처 등 기본 정보 관리
   - 관리자 페이지에서 수정 가능하도록 설계 중

8. **history** (센터 연혁)
   - 새로 추가된 컬렉션
   - 연도별 주요 이벤트 관리
   - 타임라인 형태로 표시 기능 개발 예정

## 5. 테스트 및 품질 관리 계획

### 테스트 계획
- 컴포넌트 단위 테스트 작성 예정
- 통합 테스트 수행 계획 마련
- 사용자 테스트 세션 준비 중
- 접근성 테스트 도구 선정 중

### 품질 관리
- Lighthouse를 사용한 성능, 접근성, SEO 점수 모니터링 계획
- 코드 리뷰 프로세스 수립
- 디자인 일관성 검토
- 반응형 디자인 테스트 진행 중

## 6. 상세 개발 일정 (수정됨)

| 단계 | 작업 내용 | 예상 완료일 |
|------|----------|------------|
| 1-1 | 페이지 기본 구조 및 UI 개발 | 완료 |
| 1-2 | Firebase 연동 및 설정 | 2024-05-10 |
| 2-1 | 관리자 기능 개발 | 2024-05-20 |
| 2-2 | 사용자 기능 강화 | 2024-05-25 |
| 3-1 | 성능 최적화 및 코드 개선 | 2024-06-01 |
| 3-2 | 테스트 및 버그 수정 | 2024-06-10 |
| 4-1 | 배포 및 운영 설정 | 2024-06-15 |
| 4-2 | 최종 검토 및 배포 | 2024-06-20 |
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