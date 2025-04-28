# 위즈포레 웹사이트 Firebase 데이터 연결 계획

## 1. 현황 분석

### 1.1 이미 구현된 기능
- Firebase 초기화 및 연결 코드 (`/src/firebase/firebase.js`)
- Firebase Admin 연결 코드 (`/src/firebase/firebase-admin.js`)
- 연혁(history) 데이터 관리 기능 (`/src/services/historyService.js`)
- 관리자 인증 및 로그인 기능

### 1.2 사용 중인 Firebase 서비스
- Firebase Authentication: 관리자 인증 처리
- Firestore: 핵심 데이터 저장소 (문의 데이터 포함)

## 2. Firestore 데이터 구조 요약

FIRESTORE_DATA_STRUCTURE.md 파일에서 정의된 주요 컬렉션:

1. **clients**: 내담자 정보
2. **therapists**: 치료사 정보
3. **programs**: 프로그램 정보
4. **sessions**: 세션/치료 일정
5. **inquiries**: 문의
6. **notices**: 공지사항
7. **history**: 연혁
8. **facilities**: 시설 정보
9. **users**: 관리자 계정
10. **settings**: 웹사이트 설정

## 3. 구현 필요한 서비스별 데이터 연결

### 3.1 문의하기 기능 (Firestore)
- **관련 파일**: `/src/pages/contact/index.js`, `/src/pages/admin/inquiries.js`
- **구현 사항**:
  - 문의 폼 데이터를 Firestore에 저장 (✅ 구현 완료)
  - 문의 상태 관리 (제출 중, 완료, 오류) (✅ 구현 완료)
  - 문의 내용 유효성 검사 (✅ 구현 완료)
  - 관리자 페이지에서 문의 관리 (✅ 구현 완료)
- **우선순위**: 높음 (사용자 입력을 저장하는 중요 기능)

### 3.2 프로그램 데이터 관리 (Firestore)
- **관련 파일**:
  - `/src/pages/services/index.js`
  - `/src/pages/index.js`
- **구현 사항**:
  - `programs` 컬렉션 서비스 구현
  - 하드코딩된 프로그램 데이터를 Firestore에서 동적으로 가져오도록 변경
  - 프로그램별 상세 페이지 구현
- **우선순위**: 중간

### 3.3 시설 정보 관리 (Firestore)
- **관련 파일**:
  - `/src/pages/facilities/index.js`
  - `/src/pages/index.js`
- **구현 사항**:
  - `facilities` 컬렉션 서비스 구현
  - 하드코딩된 시설 데이터를 Firestore에서 동적으로 가져오도록 변경
  - 시설별 상세 정보 및 이미지 표시
- **우선순위**: 중간

### 3.4 치료사 정보 관리 (Firestore)
- **관련 파일**:
  - `/src/pages/about/index.js`
- **구현 사항**:
  - `therapists` 컬렉션 서비스 구현
  - 하드코딩된 치료사 정보를 Firestore에서 동적으로 가져오도록 변경
  - 치료사 프로필 이미지 및 전문 분야 표시
- **우선순위**: 중간

### 3.5 내담자 관리 (Firestore)
- **관련 파일**:
  - `/src/pages/admin/clients.js` (아직 구현되지 않음)
- **구현 사항**:
  - `clients` 컬렉션 서비스 구현
  - 내담자 관리 페이지 개발
  - 내담자 검색 및 필터링 기능
- **우선순위**: 중간 (관리자 기능)

### 3.6 세션/일정 관리 (Firestore)
- **관련 파일**:
  - `/src/pages/admin/sessions.js` (아직 구현되지 않음)
- **구현 사항**:
  - `sessions` 컬렉션 서비스 구현
  - 세션 일정 관리 페이지 개발
  - 캘린더 뷰 구현
- **우선순위**: 중간 (관리자 기능)

### 3.7 공지사항 관리 (Firestore)
- **관련 파일**:
  - 공지사항 페이지 (아직 구현되지 않음)
- **구현 사항**:
  - `notices` 컬렉션 서비스 구현
  - 공지사항 페이지 개발
  - 중요 공지 강조 기능
- **우선순위**: 낮음

## 4. 서비스 구현 단계

각 기능별로 다음 단계로 구현을 진행합니다:

1. **데이터 서비스 생성**: 해당 컬렉션에 대한 CRUD 함수 구현
2. **관리자 페이지 개발**: 데이터 관리를 위한 관리자 인터페이스 구현
3. **프론트엔드 연결**: 사용자 페이지와 Firestore 데이터 연동
4. **테스트 및 최적화**: 기능 테스트 및 쿼리 최적화

## 5. 구현 완료된 문의하기 기능

### 5.1 inquiriesService 구현 완료 내용
- Firestore 연결 설정 완료
- 문의 추가 함수(`addInquiry`) 구현 완료
- 문의 목록 조회 함수(`getAllInquiries`, `getInquiriesByStatus`) 구현 완료 
- 문의 상태 업데이트 함수(`updateInquiryStatus`) 구현 완료
- 문의 삭제 함수(`deleteInquiry`) 구현 완료

### 5.2 문의하기 페이지 구현 완료 내용
- 폼 제출 로직을 inquiriesService와 연결 완료
- 제출 상태 처리 개선 완료
- 오류 처리 강화 완료
- 폼 초기화 기능 구현 완료

### 5.3 관리자 문의 관리 페이지 구현 완료 내용
- 문의 목록 표시 및 필터링 기능 구현 완료
- 문의 상태별 필터링 기능 구현 완료
- 문의 답변 및 상태 변경 기능 구현 완료
- 문의 삭제 기능 구현 완료

## 6. 다음 구현 단계

1. **프로그램 데이터 관리 구현**: Firestore의 `programs` 컬렉션과 연결
2. **시설 정보 데이터 연결**: Firestore의 `facilities` 컬렉션과 연결
3. **관리자 페이지 CRUD 기능 확장**: 내담자, 세션, 치료사 관리
4. **보안 규칙 설정**: 데이터 접근 권한 관리

## 7. 성능 및 보안 고려사항

### 7.1 성능 최적화
- 인덱스 설정으로 쿼리 성능 향상
- 데이터 페이지네이션 구현
- 오프라인 지속성 활성화

### 7.2 보안 강화
- 사용자 권한 기반 데이터 접근 제어
- 관리자 전용 기능 보호
- 민감한 정보 암호화
- 입력 데이터 검증

## 8. 백업 및 재해 복구 계획

- 정기적인 Firestore 데이터 백업
- 복구 절차 문서화
- 데이터 마이그레이션 도구 개발
