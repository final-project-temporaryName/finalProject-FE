# 🗓️ ArtTalkTalk

작품 공유, 열람 및 사회에 첫 발을 내딛는 신진 작가의 작품 구매/판매를 위한 온라인 플랫폼, ArtTalkTalk!

🌍 배포 링크: https://youth-frontend-steel.vercel.app/

> 개발 기간: 2024. 01. 20 ~ 2024. 02. 28 <br/>
> 팀: YOUTH (청춘예찬)

## 👨‍👩‍👧‍👧 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Ssong-Q" target="_blank">
      <img width=200px src="/public/assets/images/README/송규경.png" alt="송규경"/><br />
      <sub><b>[FE] 송규경</b></sub></a>👑<br /></td>
      <td align="center"><a href="https://github.com/BeMatthewsong" target="_blank">
      <img width=200px src="/public/assets/images/README/송민혁.png" alt="송민혁"/><br />
      <sub><b>[FE] 송민혁</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/leegyuho-programer" target="_blank">
      <img width=200px src="/public/assets/images/README/이규호.png" alt="이규호"/><br />
      <sub><b>[FE] 이규호</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/K-Y-Hoo" target="_blank">
      <img width=200px src="/public/assets/images/README/김윤후.png" alt=""/><br />
      <sub><b>[FE] 김윤후</b></sub></a><br /></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/arsgsg1" target="_blank">
      <img width=200px src="/public/assets/images/README/윤좌홍.png" alt=""/><br />
      <sub><b>[BE] 윤좌홍</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/thisishwan2" target="_blank">
      <img width=200px src="/public/assets/images/README/최필환.png" alt=""/><br />
      <sub><b>[BE] 최필환</b></sub></a><br /></td>
      <td align="center">
      <img width=200px src="/public/assets/images/README/허현지.png" alt=""/><br />
      <sub><b>[DE] 허현지</b></sub><br /></td>
    </tr>
  </tbody>
</table>

## 💁🏻‍♀️ 프로젝트 소개

- ArtTalkTalk은 대학생들의 졸업 작품에 대한 평가 및 의견을 자유롭게 나누는 웹 기반 플랫폼입니다.
- 미래의 신진 작가들이 재학생활 중 만드는 다양한 작품들을 본인 피드에 올림으로써 자신의 작품에 대한 방향성 및 의도를 설명할 수 있는 자신만의 전시장을 만들 수 있습니다.
- 다양한 작가들의 작품을 보고 직접 구매할 수 있도록 1:1 채팅 서비스를 지원하며 재능 기부의 형태로 무료 나눔 및 기부도 가능합니다.

## ⚙️ 기술스택

**Front End**

- React
- TypeScript
- Github actions

**React Used**

- Next.js (App router)
- tailwind css
- react-query
- react-hook-form
- zustand
- native fetch api
- axios

**Back End**

- Java 17
- Spring 3.x
- AWS
  - ECS
  - ECR
  - CloudWatch
  - S3
  - ElastiCache
  - RDS(MySQL)

## 🤲 협업 툴

- Jira<br/>
  ↳ 스케줄링, 진행상황 파악, 스프린트 관리
- Notion<br/>
  ↳ 협업 규칙(Git-Flow 전략, commit & PR & Merge 규칙, 코드 컨벤션), 회의록, 일일 회고 등 팀 활동 전반 기록
- Discord<br/>
  ↳ 공지 사항, 논의 내용에 대한 커뮤니케이션 및 PR/merge/Discussion Github web hook 연결, 데일리 스크럼 진행
- Github<br/>
  - [레포지토리 바로가기](https://github.com/ArtTalkTalk/ArtTalkTalk_frontend)
  - Gitub Actions - vercel ci/cd 구축
  - Wiki를 통해 프로젝트 전반의 이론 스터디
  - 브랜치 전략<br/>
    ↳ Upstream: master, dev<br/>
    ↳ Origin: feat/_ , fix/_ , refactor/_ , design/_ , chore/\_
- Figma<br/>
  ↳ [발표 자료 바로가기](https://www.figma.com/file/vedk9XqFl0yXQg6Dbwhei1/%EC%BD%94%EC%9D%B8%EB%AC%BC-%EC%9E%91%EC%97%85%EC%8B%A4?type=design&node-id=672%3A219&mode=design&t=RctJG9ojxakzV0A4-1)

## quick start guide

```jsx
$ git clone https://github.com/ArtTalkTalk/ArtTalkTalk_frontend.git
$ npm install
$ npm build
$ npm start

https://localhost:3000 접속
```

## 👥 역할 소개

### 송규경

- UI
  - 공통 컴포넌트: 모든 Modal 및 Modal Frame 구현, Modal 내 모든 컴포넌트
  - 드롭다운, 다양한 Input 컴포넌트(날짜 선택 라이브러리, 태그 피커, 이미지 업로드 등), Textarea(텍스트 에디터)
- 기능
  - 모달 Portal 구현 및 모달 관리를 타입에 따른 상태로 구현 (Zustand store & slice)
  - 모달에 들어가는 모든 기능 Inputs 구현 (React-Quill, React-datePicker, 직접 만든 tagPicker 등), 라이브러리의 css 디자인 변경
  - boardId 페이지에서 카드 조회, 생성, 수정, 삭제 기능 구현
  - 카드 모달에서 댓글 조회, 생성, 수정, 삭제 기능 구현 (댓글 무한스크롤 구현)

### 송민혁

### 이규호

### 김윤후

### 윤좌홍

### 최필환

### 허현지

## 🧩 프로젝트 구조 다이어그램

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/299a7905-68d2-4fac-b6a9-42a6256ea2e6/50e96051-40f8-44c1-9b81-d36c9e0fc260/Untitled.png)

## 📄 페이지별 기능 & 스크린샷

<img width=600px src="/public/assets/images/README/ArtTalkTalkSlide.png" alt=""/>

## 프로젝트 후기

### 🥸 송규경

>

### 🤥 송민혁

>

### 🤪 이규호

>

### 😈 김윤후

>

### 👸 윤좌홍

>

### 👸 최필환

>

### 👸 허현지

>
