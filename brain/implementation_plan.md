# 팝업 광고 시스템 구현 계획

사이트 진입 시 모든 방문자에게 표시되는 팝업 광고 시스템을 구현합니다. 관리자 모드에서 팝업 내용을 자유롭게 관리할 수 있으며, "오늘 하루 보지 않기" 기능을 포함합니다.

## 주요 기능 요구사항

- ✅ 모든 방문자에게 팝업 표시
- ✅ 여러 팝업 순차적 표시
- ✅ "오늘 하루 보지 않기" 기능 (24시간 기준)
- ✅ 이미지 여러 개 삽입 가능 (위치, 크기 조절 자유)
- ✅ 링크 삽입 가능
- ✅ 유효기간 설정 (시작일/종료일)
- ✅ 반응형 디자인 (모바일 가독성)
- ✅ 관리자 모드에서 팝업 생성/수정/삭제

## Proposed Changes

### Database Schema

#### [NEW] Popup Model

`Popup` 모델을 Prisma 스키마에 추가하여 팝업 정보를 저장합니다.

**필드:**
- `id`: 고유 식별자
- `title`: 팝업 제목
- `content`: 팝업 내용 (HTML 형식, 리치 텍스트 에디터 사용)
- `isActive`: 활성화 여부
- `startDate`: 표시 시작일 (nullable)
- `endDate`: 표시 종료일 (nullable)
- `order`: 표시 우선순위 (낮을수록 먼저 표시)
- `createdAt`: 생성일
- `updatedAt`: 수정일

---

### Backend API

#### [NEW] [route.ts](file:///c:/Users/kms32/workspace/ktdi_web/src/app/api/popups/route.ts)

활성 팝업 목록을 조회하는 공개 API 엔드포인트입니다.
- 현재 날짜 기준으로 유효한 팝업만 반환
- `order` 필드 기준 정렬

#### [NEW] [route.ts](file:///c:/Users/kms32/workspace/ktdi_web/src/app/api/admin/popups/route.ts)

관리자용 팝업 전체 목록 조회 및 생성 API입니다.
- GET: 모든 팝업 조회
- POST: 새 팝업 생성

#### [NEW] [route.ts](file:///c:/Users/kms32/workspace/ktdi_web/src/app/api/admin/popups/[id]/route.ts)

특정 팝업 수정 및 삭제 API입니다.
- PUT: 팝업 정보 수정
- DELETE: 팝업 삭제

---

### Frontend Components

#### [NEW] [PopupModal.tsx](file:///c:/Users/kms32/workspace/ktdi_web/src/components/ui/PopupModal.tsx)

개별 팝업을 표시하는 모달 컴포넌트입니다.

**기능:**
- 반응형 디자인 (모바일/데스크톱 최적화)
- HTML 콘텐츠 렌더링
- 하단에 "오늘 하루 보지 않기" / "닫기" 버튼 배치
- 중앙 위치, 배경 딤 처리
- 애니메이션 효과 (페이드인)

#### [NEW] [PopupManager.tsx](file:///c:/Users/kms32/workspace/ktdi_web/src/components/PopupManager.tsx)

여러 팝업을 순차적으로 관리하는 컴포넌트입니다.

**기능:**
- 활성 팝업 목록 가져오기
- 로컬스토리지에서 "오늘 하루 보지 않기" 상태 확인
- 팝업 순차적 표시 (하나 닫으면 다음 팝업 표시)
- 24시간 기준 만료 처리

**로컬스토리지 키 형식:**
```
popup_hidden_{popupId} = timestamp
```

---

### Admin Panel

#### [NEW] [page.tsx](file:///c:/Users/kms32/workspace/ktdi_web/src/app/admin/popups/page.tsx)

관리자 팝업 관리 페이지입니다.

**기능:**
- 팝업 목록 표시 (테이블 형식)
- 활성화/비활성화 토글
- 생성/수정/삭제 버튼
- 우선순위 조정

#### [NEW] [PopupForm.tsx](file:///c:/Users/kms32/workspace/ktdi_web/src/components/admin/PopupForm.tsx)

팝업 생성/수정 폼 컴포넌트입니다.

**기능:**
- 제목 입력
- 리치 텍스트 에디터 (기존 `RichTextEditor` 재사용)
- 이미지 업로드 및 삽입
- 유효기간 설정 (날짜 선택기)
- 활성화 여부 체크박스
- 우선순위 설정
- 미리보기 기능

---

### Layout Integration

#### [MODIFY] [layout.tsx](file:///c:/Users/kms32/workspace/ktdi_web/src/app/layout.tsx)

메인 레이아웃에 `PopupManager` 컴포넌트를 추가하여 모든 페이지에서 팝업이 표시되도록 합니다.

## Verification Plan

### Automated Tests

```bash
# 데이터베이스 마이그레이션
npx prisma migrate dev --name add_popup_model

# 개발 서버 실행
npm run dev
```

### Manual Verification

1. **팝업 표시 테스트**
   - 브라우저에서 `http://localhost:3000` 접속
   - 활성 팝업이 순차적으로 표시되는지 확인

2. **"오늘 하루 보지 않기" 기능 테스트**
   - 팝업에서 "오늘 하루 보지 않기" 클릭
   - 페이지 새로고침 시 해당 팝업이 표시되지 않는지 확인
   - 로컬스토리지에서 타임스탬프 확인
   - 24시간 후 다시 표시되는지 확인 (또는 타임스탬프 수동 조작)

3. **관리자 페이지 테스트**
   - `http://localhost:3000/admin/popups` 접속
   - 팝업 생성/수정/삭제 기능 테스트
   - 이미지 업로드 및 삽입 테스트
   - 유효기간 설정 테스트
   - 활성화/비활성화 토글 테스트

4. **반응형 디자인 테스트**
   - 모바일 화면에서 팝업 가독성 확인
   - 다양한 화면 크기에서 레이아웃 확인

5. **예시 팝업 생성**
   - 보드게임지도사 이벤트 내용으로 샘플 팝업 생성
   - 이미지, 텍스트 포맷팅, 링크 등 모든 기능 활용
