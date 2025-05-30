# 위즈포레 사회서비스센터 웹사이트

## 🚀 새롭게 리뉴얼된 위즈포레 웹사이트

Next.js 14의 App Router와 TypeScript, Tailwind CSS를 사용하여 완전히 새롭게 구축된 위즈포레 사회서비스센터 웹사이트입니다.

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Deployment**: Vercel
- **Version Control**: GitHub

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (site)/            # 사용자용 페이지
│   │   ├── about/         # 센터 소개
│   │   ├── programs/      # 프로그램 안내
│   │   ├── team/          # 전문가 소개
│   │   ├── community/     # 커뮤니티
│   │   ├── contact/       # 1:1 문의
│   │   └── page.tsx       # 메인 페이지
│   ├── admin/             # 관리자용 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # 글로벌 스타일
├── components/            # 재사용 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── home/             # 홈페이지 섹션
│   └── ui/               # UI 컴포넌트
├── lib/                  # 유틸리티 & 설정
│   ├── firebase.ts       # Firebase 설정
│   ├── firebase-admin.ts # Firebase Admin 설정
│   ├── withAdminAuth.ts  # 인증 미들웨어
│   └── utils.ts          # 유틸리티 함수
└── types/                # TypeScript 타입 정의
    └── index.ts
```

## 🔥 주요 기능

### 📱 사용자 기능
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **매끄러운 애니메이션**: Framer Motion을 활용한 부드러운 인터랙션
- **프로그램 소개**: 4대 치료 프로그램 상세 정보
- **전문가 소개**: 치료사 프로필 및 자격증 정보
- **센터 소개**: 연혁, 시설, 오시는 길
- **커뮤니티**: 공지사항, SNS 연동
- **1:1 문의**: 실시간 문의 시스템

### 🔐 관리자 기능
- **Firebase Auth**: 안전한 인증 시스템
- **컨텐츠 관리**: 프로그램, 전문가, 공지사항 관리
- **문의 관리**: 고객 문의 응답 및 관리
- **권한 관리**: 역할 기반 접근 제어

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 설정

Firebase 프로젝트를 설정하고 `.env.local` 파일을 생성하세요:

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

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000에서 개발 서버가 실행됩니다.

### 4. 타입 검사

```bash
npm run type-check
```

### 5. 빌드

```bash
npm run build
```

## 🔧 주요 변경사항

### 이전 구조 → 새로운 구조

- **Pages Router** → **App Router**: Next.js 14의 최신 라우팅 시스템
- **JavaScript** → **TypeScript**: 타입 안정성 향상
- **CSS Modules** → **Tailwind CSS**: 일관된 디자인 시스템
- **정적 컴포넌트** → **애니메이션**: Framer Motion으로 향상된 UX
- **분산된 구조** → **체계적 구조**: 컴포넌트 기반 아키텍처

### 보존된 기능

- **Firebase 인증 및 데이터베이스**: 기존 설정 유지
- **관리자 권한 시스템**: 기존 미들웨어 업그레이드
- **데이터 구조**: Firestore 스키마 호환성 유지

## 📋 할 일 목록

- [ ] 나머지 페이지 구현 (about, programs, team, community, contact)
- [ ] 관리자 페이지 구현
- [ ] Firebase 연동 완성
- [ ] 이미지 최적화
- [ ] SEO 최적화
- [ ] 테스트 작성
- [ ] Vercel 배포 설정

## 🌐 배포

### Vercel 배포

1. GitHub에 푸시
2. Vercel에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포 완료

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정하세요:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

## 🤝 기여

1. 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
2. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
3. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
4. Pull Request 생성

## 📞 연락처

위즈포레 사회서비스센터
- 📧 Email: info@wizfore.com
- 📱 Phone: 051-123-4567
- 🌐 Website: https://wizfore.vercel.app

---

© 2025 위즈포레 사회서비스센터. All rights reserved.
