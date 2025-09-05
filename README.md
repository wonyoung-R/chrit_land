# Chrit Landing Page

AI로 지식을 스마트하게 관리하는 차세대 서비스 Chrit의 랜딩페이지입니다.

## 🚀 기능

- **다크 테마 디자인**: Modern dark UI with glassmorphism effects
- **이메일 수집**: Google Sheets와 연동된 이메일 수집 시스템
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **애니메이션**: 부드러운 전환 효과와 hover 애니메이션

## 📋 서비스 소개

Chrit은 유튜브 영상과 기사 링크만으로 AI가 자동으로 요약하고 분류해주는 지식 관리 서비스입니다.

### 주요 특징
- 월 7,900원으로 약 100개의 지식을 요약
- 유튜브 영상 자동 요약
- 기사 링크 요약
- 키워드 추출 및 분류
- 노션, 아이폰 메모와는 다른 전문적인 요약 기능

## 🛠️ 설치 및 설정

### 1. Google Sheets 설정

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 스프레드시트 이름을 "Chrit Email Collection"으로 설정
3. `확장 프로그램` > `Apps Script` 클릭
4. `google-apps-script.js` 파일의 내용을 복사하여 붙여넣기
5. `프로젝트 이름`을 "Chrit Email Handler"로 변경
6. `저장` 버튼 클릭

### 2. 웹 앱 배포

1. Apps Script 편집기에서 `배포` > `새 배포` 클릭
2. `유형`을 "웹 앱"으로 선택
3. `실행`을 "나"로 설정
4. `액세스 권한`을 "모든 사용자"로 설정
5. `배포` 버튼 클릭
6. 생성된 웹 앱 URL을 복사

### 3. HTML 파일 업데이트

1. `index.html` 파일을 열기
2. 다음 라인을 찾기:
   ```javascript
   const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
   ```
3. `YOUR_SCRIPT_ID`를 실제 웹 앱 URL로 교체

### 4. 초기 설정 실행

1. Apps Script 편집기에서 `setupSpreadsheet()` 함수 실행
2. 스프레드시트에 헤더가 생성되었는지 확인

## 📁 파일 구조

```
chrit_landing/
├── index.html              # 메인 랜딩페이지
├── google-apps-script.js   # Google Apps Script 코드
└── README.md              # 이 파일
```

## 🎨 디자인 시스템

### 색상 팔레트
- **배경**: `#000000` (검은색)
- **주요 그라데이션**: `from-purple-600 to-blue-600`
- **텍스트**: `#ffffff` (흰색), `#9ca3af` (회색)

### 컴포넌트
- **글래스모피즘 카드**: `bg-gray-900/50 backdrop-blur-sm border border-gray-800`
- **그라데이션 버튼**: `bg-gradient-to-r from-purple-600 to-blue-600`
- **입력 필드**: `bg-gray-900/90 backdrop-blur-sm border border-gray-800`

## 📊 이메일 수집 데이터

수집된 이메일은 Google Sheets의 B열부터 저장되며, 다음 정보가 포함됩니다:

| 열 | 내용 | 설명 |
|---|---|---|
| A | 순번 | 자동 증가 번호 |
| B | 이메일 | 사용자 이메일 주소 |
| C | 등록일시 | 수집된 날짜와 시간 |
| D | 상태 | 기본값: "대기중" |

## 🔧 커스터마이징

### 색상 변경
`index.html`의 Tailwind CSS 클래스를 수정하여 색상을 변경할 수 있습니다.

### 텍스트 수정
HTML 파일에서 직접 텍스트를 수정할 수 있습니다.

### 기능 추가
`google-apps-script.js`에 새로운 함수를 추가하여 추가 기능을 구현할 수 있습니다.

## 📱 반응형 지원

- **모바일**: 320px 이상
- **태블릿**: 768px 이상
- **데스크톱**: 1024px 이상

## 🚀 배포

1. 웹 서버에 파일 업로드
2. Google Apps Script 웹 앱 URL 업데이트
3. 도메인 설정 (선택사항)

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
