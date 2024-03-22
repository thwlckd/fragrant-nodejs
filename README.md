## 🌸 Fragrant: 향기로운

- 향기로운 하루의 시작

## 🌻 프로젝트 가이드 <a href="https://github.com/thwlckd/fragrant-nodejs/files/12522204/14.pdf">PPT 발표 자료</a>

- 목적
  - 향수를 빠르고 쉽게 구매 및 판매할 수 있는 온라인 쇼핑몰 서비스 구현
- 목표
  - 향수 카테고라이징 및 추천
  - 관리자, 회원, 비회원 역할 분리
    - 관리자 페이지를 통한 상품, 회원, 주문 정보 관리
    - 상품, 회원, 주문 정보 CRUD
    - 비 회원 장바구니 기능

## 🌼 기술 스택

![image](https://github.com/thwlckd/fragrant-nodejs/assets/101177511/ea7d891c-0bd5-42e2-8f4b-78c1d43a6176)

## 🌹담당 역할

### ✔️ FE

- 왕지은
  - 상품 상세 페이지
  - 상품별 리뷰 기능
- 우윤하
  - 관리자 페이지
  - 회원정보, 주문정보 CRUD
  - 브랜드, 상품 CRUD
  - 무한 스크롤
- 이수민
  - 마이 페이지
  - 개인 주문 정보 CRUD
  - 개인 정보 CRUD
- 임소정
  - 로그인 페이지
- 정충래
  - 메인 페이지
  - 상품 리스트 페이지
  - 헤더 푸터 공통화

### ✔️ BE

- 박창협
  - auth, user, order api 작업
  - passport를 이용한 사용자 인증 및 jwt 관리
  - kakao, google OAuth
  - node mailer를 이용한 email 인증
- 정충래
  - brand, note, product, review api 작업
  - multer를 이용한 이미지 업로더 구현

## 🎯 Git Flow 전략

```
master
├── develop
│   ├── feature-fe/main
│   ├── feature-be/userMVC
│___│___refactor/user
```

(브랜치역할-fe/be)/(기능명) 브랜치 생성, 작업 후 dev에 PR

## 🎨 협업 툴

- [Figma](https://www.figma.com/file/IPolbDxvgjWzAL8ww0jZBH): 와이어프레임, 디자인
- [Notion](https://hyub.notion.site/Fragrant-d186546be61348379ea1b836332792e9?pvs=4) : 팀 페이지, 프로젝트 일정/현황 관리, 스크럼/문서 정리
- [Gitlab](https://kdt-gitlab.elice.io/sw_track/class_05/web_project/team14/fragrant/-/tree/master) : Project Repository
- Gather, Discord: 팀 커뮤니케이션
- Elice 강의실(Zoom 대용): 담당 코치님들의 오피스아워(코칭)
