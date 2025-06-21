# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 프로젝트 개요

위즈포레 사회서비스센터를 위한 Next.js 14 웹사이트입니다. App Router, TypeScript, Tailwind CSS, Firebase로 구축되었으며, 일반 사용자와 관리자 모두에게 서비스를 제공하고 포괄적인 치료 프로그램 정보와 콘텐츠 관리 기능을 포함합니다.

## 개발 명령어

### 핵심 개발 명령어
- `npm run dev` - 개발 서버 시작 (http://localhost:3000)
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 시작
- `npm run lint` - ESLint 실행
- `npm run type-check` - TypeScript 타입 검사 실행

### 환경 설정
Firebase 설정이 포함된 `.env.local` 파일 생성:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

## 아키텍처

### App Router 구조
- `src/app/(site)/` - 공개 페이지 (홈페이지, 소개, 프로그램, 팀, 커뮤니티, 문의)
- `src/app/admin/` - Firebase Auth로 보호되는 관리자 대시보드
- `src/components/` - 기능별로 구성된 재사용 가능한 컴포넌트
  - `home/` - 홈페이지 섹션
  - `layout/` - 헤더, 푸터
  - `admin/` - 관리자 인터페이스 컴포넌트
  - `auth/` - 인증 컴포넌트
  - `ui/` - 기본 UI 컴포넌트

### 주요 기술 스택
- **프레임워크**: Next.js 14 with App Router
- **스타일링**: Tailwind CSS with CSS variables
- **애니메이션**: Framer Motion (페이지 전환 및 인터랙션)
- **인증**: Firebase Auth (관리자/직원 역할 기반 접근)
- **데이터베이스**: Cloud Firestore (오프라인 지속성 포함)
- **폼**: React Hook Form with Zod 검증
- **UI 컴포넌트**: Radix UI 프리미티브 + 커스텀 스타일링

### Firebase 통합
- Firebase 클라이언트 설정: `src/lib/firebase.ts`
- 인증 컨텍스트: `src/contexts/AuthContext.tsx`
- 데이터 작업을 위한 서비스 레이어: `src/lib/services/`
- 보호된 라우트를 위한 관리자 인증 미들웨어

### 데이터 모델
`src/types/index.ts`의 포괄적인 TypeScript 인터페이스:
- Program, Expert, Facility, Notice, Inquiry
- 관리자 기능을 위한 User, Permission, Activity
- 콘텐츠 관리를 위한 SiteConfig, HomeConfig, AboutInfo

## 개발 가이드라인

### 컴포넌트 패턴
- 모든 props와 데이터 구조에 TypeScript 인터페이스 사용
- Tailwind CSS 브레이크포인트로 반응형 디자인 구현
- 향상된 UX를 위한 Framer Motion 애니메이션 추가
- 기존 파일 구조와 네이밍 컨벤션 따르기

### Firebase 사용법
- 모든 Firebase 작업은 `src/lib/services/`의 서비스 사용
- Firebase 작업에 대한 적절한 에러 처리 구현
- 인증 상태를 위한 Firebase Auth 컨텍스트 사용
- 데이터 접근을 위한 Firestore 보안 규칙 준수

### 스타일링 접근법
- Tailwind CSS 유틸리티 클래스 사용
- 일관된 간격과 색상으로 디자인 시스템 구현
- 디자인 참고: http://www.mindstory.co.kr/
- 모바일 우선 반응형 디자인 보장

## 현재 상태

프로젝트 개발 진행 상황:
- ✅ 히어로 섹션과 프로그램 미리보기가 있는 홈페이지
- ✅ 관리자 인증 및 대시보드 구조
- ✅ Firebase 통합 설정
- ⏳ 나머지 페이지들 (소개, 프로그램, 팀, 커뮤니티, 문의)
- ⏳ 전체 관리자 패널 구현
- ⏳ 콘텐츠 관리 기능