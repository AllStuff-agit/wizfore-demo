# 관리자 페이지 구현 계획

## 폴더 구조

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.js            # 관리자 레이아웃
│   │   ├── page.js              # 대시보드
│   │   ├── login/
│   │   │   └── page.js          # 로그인 페이지
│   │   ├── center/
│   │   │   ├── page.js          # 센터 정보 목록
│   │   │   ├── info/
│   │   │   │   └── page.js      # 기본 정보 관리
│   │   │   ├── history/
│   │   │   │   └── page.js      # 연혁 관리
│   │   │   ├── advisors/
│   │   │   │   └── page.js      # 자문위원 관리
│   │   │   └── location/
│   │   │       └── page.js      # 위치 정보 관리
│   │   ├── programs/
│   │   │   ├── page.js          # 프로그램 목록
│   │   │   ├── [id]/
│   │   │   │   └── page.js      # 프로그램 추가/수정
│   │   │   └── categories/
│   │   │       └── page.js      # 카테고리 관리
│   │   ├── experts/
│   │   │   ├── page.js          # 전문가 목록
│   │   │   ├── [id]/
│   │   │   │   └── page.js      # 전문가 추가/수정
│   │   │   └── specialties/
│   │   │       └── page.js      # 전문 분야 관리
│   │   ├── posts/
│   │   │   ├── page.js          # 게시글 목록
│   │   │   ├── [id]/
│   │   │   │   └── page.js      # 게시글 추가/수정
│   │   │   └── categories/
│   │   │       └── page.js      # 카테고리 관리
│   │   ├── facilities/
│   │   │   ├── page.js          # 시설 목록
│   │   │   ├── [id]/
│   │   │   │   └── page.js      # 시설 추가/수정
│   │   │   └── categories/
│   │   │       └── page.js      # 카테고리 관리
│   │   ├── inquiries/
│   │   │   ├── page.js          # 문의 목록
│   │   │   ├── [id]/
│   │   │   │   └── page.js      # 문의 상세/답변
│   │   │   └── stats/
│   │   │       └── page.js      # 문의 통계
│   │   ├── users/
│   │   │   ├── page.js          # 사용자 목록
│   │   │   ├── [id]/
│   │   │   │   └── page.js      # 사용자 추가/수정
│   │   │   └── logs/
│   │   │       └── page.js      # 활동 로그
│   │   └── settings/
│   │       ├── page.js          # 설정 메인
│   │       ├── general/
│   │       │   └── page.js      # 일반 설정
│   │       ├── notifications/
│   │       │   └── page.js      # 알림 설정
│   │       ├── backup/
│   │       │   └── page.js      # 데이터 백업
│   │       └── logs/
│   │           └── page.js      # 시스템 로그
│   └── ...
├── components/
│   ├── admin/
│   │   ├── Sidebar.js           # 사이드바 컴포넌트
│   │   ├── Header.js            # 헤더 컴포넌트
│   │   ├── DataTable.js         # 데이터 테이블 컴포넌트
│   │   ├── FormComponents.js    # 폼 컴포넌트
│   │   ├── RichTextEditor.js    # 리치 텍스트 에디터
│   │   ├── ImageUploader.js     # 이미지 업로더
│   │   ├── ConfirmDialog.js     # 확인 대화상자
│   │   └── Notification.js      # 알림 컴포넌트
│   └── ...
└── ...
```

## 라우팅 구조

- `/admin` - 대시보드
- `/admin/login` - 로그인 페이지

### 센터 정보 관리
- `/admin/center` - 센터 정보 목록
- `/admin/center/info` - 기본 정보 관리
- `/admin/center/history` - 연혁 관리
- `/admin/center/advisors` - 자문위원 관리
- `/admin/center/location` - 위치 정보 관리

### 프로그램 관리
- `/admin/programs` - 프로그램 목록
- `/admin/programs/new` - 새 프로그램 추가
- `/admin/programs/[id]` - 프로그램 수정
- `/admin/programs/categories` - 카테고리 관리

### 전문가 관리
- `/admin/experts` - 전문가 목록
- `/admin/experts/new` - 새 전문가 추가
- `/admin/experts/[id]` - 전문가 수정
- `/admin/experts/specialties` - 전문 분야 관리

### 게시글 관리
- `/admin/posts` - 게시글 목록
- `/admin/posts/new` - 새 게시글 추가
- `/admin/posts/[id]` - 게시글 수정
- `/admin/posts/categories` - 카테고리 관리

### 시설 관리
- `/admin/facilities` - 시설 목록
- `/admin/facilities/new` - 새 시설 추가
- `/admin/facilities/[id]` - 시설 수정
- `/admin/facilities/categories` - 카테고리 관리

### 문의 관리
- `/admin/inquiries` - 문의 목록
- `/admin/inquiries/[id]` - 문의 상세/답변
- `/admin/inquiries/stats` - 문의 통계

### 사용자 관리
- `/admin/users` - 사용자 목록
- `/admin/users/new` - 새 사용자 추가
- `/admin/users/[id]` - 사용자 수정
- `/admin/users/logs` - 활동 로그

### 설정
- `/admin/settings` - 설정 메인
- `/admin/settings/general` - 일반 설정
- `/admin/settings/notifications` - 알림 설정
- `/admin/settings/backup` - 데이터 백업
- `/admin/settings/logs` - 시스템 로그

## 페이지별 주요 기능

### 대시보드 (admin/page.js)
- 주요 통계 요약 (문의 수, 게시글 수 등)
- 최근 활동 로그
- 빠른 링크 바로가기

### 로그인 (admin/login/page.js)
- 관리자 로그인 폼
- 비밀번호 재설정 링크

### 목록 페이지 (programs, experts, posts 등)
- 데이터 테이블 형태로 표시
- 검색, 필터링, 정렬 기능
- 새 항목 추가 버튼
- 편집, 삭제 액션 버튼

### 추가/수정 페이지 ([id] 경로)
- 데이터 입력 폼
- 저장, 취소 버튼
- 미리보기 기능 (해당하는 경우)

### 카테고리 관리 페이지 (categories 경로)
- 카테고리 목록
- 카테고리 추가, 수정, 삭제 기능
- 드래그 앤 드롭으로 순서 변경
