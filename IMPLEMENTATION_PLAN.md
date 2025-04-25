# 위즈포레 사회서비스센터 웹사이트 구현 계획

## 1. 구현 단계

아래의 단계별로 구현을 진행하여 완성도 높은 웹사이트를 개발하겠습니다.

### 1.1 Firebase 설정 및 연동 (1주)

- Firebase 프로젝트 생성
- Firebase 인증(Authentication) 설정
  - 이메일/비밀번호 인증 방식 활성화
  - 관리자 계정 생성
  - 커스텀 클레임 설정 (isAdmin)
- Firestore 데이터베이스 설정
  - 컬렉션 구조 설계
  - 보안 규칙 설정
- 환경 변수 설정
  - Firebase 키 정보 안전하게 관리
  - Vercel 환경 변수 설정

### 1.2 관리자 기능 구현 (2주)

- 인증 기능 완성
  - 로그인/로그아웃 기능
  - 인증 상태 유지 및 관리
- 관리자 대시보드 기능 구현
  - 통계 데이터 시각화
  - 주요 항목 요약 표시
- 내담자 관리 페이지 구현
  - 목록 조회, 추가, 수정, 삭제 기능
  - 검색 및 필터링 기능
- 세션 관리 페이지 구현
  - 일정 예약 시스템
  - 캘린더 뷰 및 목록 뷰 제공
- 기타 관리 페이지 구현
  - 치료사 관리, 프로그램 관리, 문의 관리, 공지사항 관리

### 1.3 사용자 기능 강화 (1주)

- 공지사항 페이지 구현
  - Firestore에서 공지사항 데이터 가져오기
  - 페이지네이션 기능
- 문의하기 기능 완성
  - Firebase로 문의 데이터 저장
  - 폼 유효성 검사 강화
- 서비스 상세 페이지 구현
  - 각 서비스별 상세 페이지 생성
  - 동적 라우팅 활용

### 1.4 디자인 및 사용자 경험 개선 (1주)

- 이미지 및 미디어 최적화
  - 이미지 압축 및 적절한 크기 조정
  - 지연 로딩(lazy loading) 적용
- 애니메이션 및 전환 효과 추가
  - 페이지 전환 애니메이션
  - 스크롤 기반 애니메이션
- 접근성 개선
  - ARIA 속성 추가
  - 키보드 네비게이션 지원
  - 스크린 리더 호환성 확인

### 1.5 테스트 및 배포 (1주)

- 단위 테스트 작성 및 실행
- 통합 테스트 수행
- 크로스 브라우저 테스트
- 성능 최적화
- GitHub 저장소 설정
- Vercel 배포 설정
- 지속적 통합 및 배포(CI/CD) 파이프라인 구성

## 2. Firebase 데이터 구조 설계

### 2.1 Firestore 컬렉션 구조

#### clients (내담자)
- id: 문서 ID
- name: 이름
- birthdate: 생년월일
- gender: 성별
- guardianName: 보호자 이름
- phone: 연락처
- email: 이메일 (선택)
- address: 주소
- diagnosis: 진단명
- programType: 참여 프로그램 유형
- notes: 특이사항
- createdAt: 생성 일시
- updatedAt: 업데이트 일시

#### therapists (치료사)
- id: 문서 ID
- name: 이름
- specialization: 전문 분야
- certification: 자격증
- bio: 소개
- email: 이메일
- phone: 연락처
- programs: 담당 프로그램 배열
- workingDays: 근무 요일
- workingHours: 근무 시간
- isActive: 활성 상태
- photo: 사진 URL (선택)
- createdAt: 생성 일시
- updatedAt: 업데이트 일시

#### sessions (세션/치료 일정)
- id: 문서 ID
- clientId: 내담자 ID (참조)
- therapistId: 치료사 ID (참조)
- programId: 프로그램 ID (참조)
- clientName: 내담자 이름
- therapistName: 치료사 이름
- programName: 프로그램 이름
- date: 날짜
- startTime: 시작 시간
- endTime: 종료 시간
- status: 상태 (예정, 완료, 취소)
- notes: 세션 메모
- createdAt: 생성 일시
- updatedAt: 업데이트 일시

#### programs (프로그램)
- id: 문서 ID
- name: 프로그램명
- category: 카테고리
- description: 설명
- duration: 기간
- ageRange: 대상 연령대
- isActive: 활성 상태
- createdAt: 생성 일시
- updatedAt: 업데이트 일시

#### inquiries (문의)
- id: 문서 ID
- name: 이름
- phone: 연락처
- email: 이메일
- subject: 제목
- message: 내용
- service: 문의 서비스
- status: 상태 (대기중, 해결됨)
- createdAt: 생성 일시
- resolvedAt: 해결 일시

#### notices (공지사항)
- id: 문서 ID
- title: 제목
- content: 내용
- author: 작성자
- importance: 중요도 (일반, 중요)
- isActive: 활성 상태
- createdAt: 생성 일시
- updatedAt: 업데이트 일시

### 2.2 Firebase 보안 규칙

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
```

## 3. 컴포넌트 계층 구조

### 3.1 공통 컴포넌트

- 레이아웃 (Layout)
  - 헤더 (Header)
    - 로고 (Logo)
    - 네비게이션 (Navigation)
    - 모바일 메뉴 토글 (MobileMenuToggle)
  - 메인 콘텐츠 (MainContent)
  - 푸터 (Footer)
    - 연락처 정보 (ContactInfo)
    - 링크 목록 (LinkList)
    - 소셜 아이콘 (SocialIcons)

- 관리자 레이아웃 (AdminLayout)
  - 사이드바 (Sidebar)
    - 로고 (Logo)
    - 메뉴 항목 (MenuItem)
  - 메인 콘텐츠 (MainContent)

### 3.2 페이지별 컴포넌트

#### 홈 페이지
- 히어로 섹션 (HeroSection)
- 서비스 섹션 (ServicesSection)
  - 서비스 카드 (ServiceCard)
- 소개 섹션 (AboutSection)
- CTA 섹션 (CTASection)

#### 기관 소개 페이지
- 소개 섹션 (IntroSection)
- 강점 섹션 (StrengthsSection)
  - 강점 항목 (StrengthItem)
- 연혁 섹션 (HistorySection)
  - 타임라인 항목 (TimelineItem)
- 팀 섹션 (TeamSection)
  - 팀원 카드 (TeamMemberCard)

#### 서비스 페이지
- 프로그램 카드 (ProgramCard)
- 서비스 카드 (ServiceCard)
- 시설 그리드 (FacilityGrid)
  - 시설 항목 (FacilityItem)

#### 문의하기 페이지
- 연락처 정보 (ContactInfo)
- 문의 양식 (ContactForm)
  - 폼 필드 (FormField)
  - 제출 버튼 (SubmitButton)
- 성공 메시지 (SuccessMessage)

#### 관리자 대시보드
- 통계 카드 (StatCard)
- 최근 세션 (RecentSessions)
  - 세션 테이블 (SessionsTable)
- 빠른 링크 (QuickLinks)

## 4. 페이지 라우팅 구조

### 4.1 사용자 페이지
- `/` - 홈 페이지
- `/about` - 기관 소개 페이지
- `/services` - 서비스 목록 페이지
- `/services/[id]` - 서비스 상세 페이지
- `/contact` - 문의하기 페이지
- `/notices` - 공지사항 목록 페이지
- `/notices/[id]` - 공지사항 상세 페이지

### 4.2 관리자 페이지
- `/admin` - 관리자 로그인 페이지
- `/admin/dashboard` - 관리자 대시보드
- `/admin/clients` - 내담자 관리 페이지
- `/admin/clients/[id]` - 내담자 상세 페이지
- `/admin/sessions` - 세션 관리 페이지
- `/admin/sessions/[id]` - 세션 상세 페이지
- `/admin/therapists` - 치료사 관리 페이지
- `/admin/therapists/[id]` - 치료사 상세 페이지
- `/admin/programs` - 프로그램 관리 페이지
- `/admin/programs/[id]` - 프로그램 상세 페이지
- `/admin/inquiries` - 문의 관리 페이지
- `/admin/inquiries/[id]` - 문의 상세 페이지
- `/admin/notices` - 공지사항 관리 페이지
- `/admin/notices/[id]` - 공지사항 작성/수정 페이지

## 5. 배포 환경 설정

### 5.1 GitHub 저장소 설정
- 리포지토리 생성
- 브랜치 보호 규칙 설정
- 자동 테스트 설정

### 5.2 Vercel 배포 설정
- Vercel 프로젝트 생성
- GitHub 저장소 연결
- 환경 변수 설정
  - Firebase 키
  - 관리자 계정
  - 기타 비밀 키
- 도메인 설정 (필요시)

### 5.3 CI/CD 파이프라인
- GitHub Actions 워크플로우 설정
- 자동 테스트 실행
- 코드 품질 검사
- 빌드 자동화
- 배포 자동화