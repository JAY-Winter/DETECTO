<div align="center">

![Header](./exec/assets/reademe_header.PNG)

</div>

# DETECTO

---

### 목차

1. [**서비스 소개**](#1)
2. [**기술 스택**](#2)
3. [**주요 기능**](#3)
4. [**프로젝트 구성도**](#4)
5. [**데모 영상**](#5)
6. [**팀 소개**](#6)
7. [**실행 방법**](#7)

---

## 1. 서비스 소개

TrainBot은 누구나 삼성 TV에 탑재 가능한 온디바이스 챗봇을 만들 수 있게 도와주는 노코드(No code) 챗봇 개발 서비스입니다.

웹사이트 상에서 사용자 질문과 챗봇 응답만 입력하면, 삼성 TV에 설치할 수 있는 챗봇 파일을 다운 받을 수 있습니다. 물론, 챗봇을 다운 받기 전 웹사이트 상에서 내가 만든 챗봇과 직접 대화를 나눠볼 수도 있죠!

𝙽𝚘 𝚌𝚘𝚍𝚒𝚗𝚐, 𝚗𝚘 𝚙𝚛𝚘𝚋𝚕𝚎𝚖 — 𝚝𝚛𝚊𝚒𝚗 𝚢𝚘𝚞𝚛 𝚘𝚠𝚗 𝚂𝚊𝚖𝚜𝚞𝚗𝚐 𝚃𝚅 𝚌𝚑𝚊𝚝𝚋𝚘𝚝 𝚠𝚒𝚝𝚑 𝚃𝚛𝚊𝚒𝚗𝙱𝚘𝚝!

## 2. 기술 스택

<table align="center">
  <tr>
    <td align="center" width="165"><strong>Frontend</strong></td>
    <td>
      <div>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?&logo=typescript&logoColor=white"/>
        <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white"/>
        <img src="https://img.shields.io/badge/Recoil-212121?logo=Recoil&logoColor=white"/>
        <br/>
        <img src="https://img.shields.io/badge/threejs-black?logo=three.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/Axios-5A29E4?style=&logo=Axios&logoColor=white"/>
      </div>
    </td>
  </tr>
  <tr>
    <td align="center" width="165"><strong>Backend</strong></td>
    <td>
        <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=  &logo=springboot&logoColor=white"/>
        <img src="https://img.shields.io/badge/flask-%23000.svg?logo=flask&logoColor=white"/>
        <br/>
        <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white"/>
        <img src="https://img.shields.io/badge/redis-%23DD0031.svg?logo=redis&logoColor=white"/>
        <img src="https://img.shields.io/badge/JPA-212121?logo=jpa&logoColor=white"/>
        <br/>
        <img src="https://img.shields.io/badge/Spring_Security-6DB33F?&logo=springsecurity&logoColor=white"/>
        <img src="https://img.shields.io/badge/Spring_Cloud-6DB33F?logoColor=white"/>
    </td>
  </tr>
  <tr>
    <td align="center" width="165"><strong>Deep Learning</strong></td>
    <td>
        <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?logo=TensorFlow&logoColor=white"/>
        <img src="https://img.shields.io/badge/TensorFlow_Lite-%23FF6F00.svg?logo=TensorFlow&logoColor=white"/>
        <br/>
        <img src="https://img.shields.io/badge/CMake-%23008FBA.svg?logo=cmake&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <td align="center" width="165"><strong>Infra</strong></td>
    <td>
        <img src="https://img.shields.io/badge/NGINX-009639?logo=nginx&logoColor=white"/>
        <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white"/>
        <img src="https://img.shields.io/badge/Jenkins-D24939?logo=jenkins&logoColor=white"/>
        <br/>
        <img src="https://img.shields.io/badge/Amazon_EC2-orange?logo=amazonec2&logoColor=white"/>
        <img src="https://img.shields.io/badge/Amazon_S3-red?logo=amazons3&logoColor=white"/>
    </div>
  </tr>
<table>

## 3. 주요 기능

### 1. 챗봇 빌더 사이트

- 사용자 발화 입력 (프로젝트 생성 및 대화 생성)
  - 실시간 미리 보기
  - 드래그 & 드롭 기반 발화 순서 변경
    ![4_Chat_Intent.gif](./exec/assets/4_Chat_Intent.gif)
    ![4_chat_response.gif](./exec/assets/4_chat_response.gif)
- 버튼 클릭 기반 빌드 및 테스트

  - `빌드하기` 클릭 시 사전 생성된 발화 기반 학습 모델 생성
  - `테스트` 클릭 시 우측에서 학습된 모델이 장착된 챗봇 화면 출력
  - 실시간 챗봇 테스트 가능
    ![6_build_test.gif](./exec/assets/6_build_test.gif)

- 챗봇 모델 다운로드
  - `다운로드` 클릭 시 TV 탑재 가능한 TensorflowLite 챗봇 모델 다운로드
  - `.rpm` 빌드에 필요한 추가 c++ 라이브러리 및 데이터를 `.zip` 로 제공
    ![6_download.gif](./exec/assets/6_download.gif)

### 2. TV 환경 챗봇 구동

- TV 연결 환경 세팅
  - Samsung TV 와 serial 통신으로 연결
  - 이후 ssh key 등록을 통해 동일 네트워크 상에서 ssh 기반 통신 진행
- TV 환경 챗봇 구동 과정

  ```
  # ssh 로 tv에 접속
  local$ssh tv
  Welcome Tizen!

  # tizen 에서 chatbot 이 설치된 경로로 이동
  tizenTV$ cd /usr/apps/.../chatbot/bin

  # 해당 경로에서 chatbot 실행 파일 실행
  /usr/apps/.../chatbot/bin$ ./chatbot
  TrainBot: Hello sir, How can I help you?
  Client: ... # 이 부분에서 학습에 사용한 사용자 발화 입력
  ```

## 4. 프로젝트 구성도

### 시스템 아키텍처 (System Architecture)

![System Architecture](./exec/assets/readme_sa.png)

### 개체-관계 모델 (ERD)

![ERD](./exec/assets/readme_erd.png)

## 5. 데모 영상

[![UCC](./exec/assets/readme_ucc.png)](https://youtu.be/Py6KjuMIWNc)

## 6. 팀 소개

|  이름  |                역할                 | <div align="center">개발 내용</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :----: | :---------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 강희연 | 팀장<br/> Backend<br/>Deep Learning | **Backend**<br/>- DB 및 아키텍처 구조 설계 및 구현 <br/>- CI/CD 환경 구성 및 관리 <br/>- Spring Security를 활용한 회원관리 API 구현 <br/> - Spring Cloud를 활용한 gateway API 구현 <br/>- 대화 관련 API 구현 <br/> **Deep Learning**<br/>- 자연어 모델 C++ 전/후처리 구현 <br/> - Tizen OS 샐행 위한 rpm 생성 관련 구현                                                                                                                                                                              |
| 윤소현 |              Frontend               | **Frontend**<br/>- 메인 홈 페이지 (Interactive Web)<br/>- 회원가입, 로그인, 비밀번호 찾기 페이지<br/>- JWT 토큰을 이용한 로그인 상태관리<br/>- 헤더/사이드바 컴포넌트 작성<br/>- 드롭다운 컴포넌트 커스텀 제작<br/>- 대화 페이지<br/>- 사용자 발화, 응답 컴포넌트<br/>- 이미지 업로드 컴포넌트 제작<br/>- 드래그 앤 드롭 컴포넌트 제작<br/>- 'Recoil'을 이용한 상태 관리<br/>- 정규식을 사용하여 input validation 제어<br/>- styled-component를 이용한 UI 제작<br/>- 와이어프레임 및 프로토타입 설계 |
| 이현진 |        Backend<br/>Frontend         | **Backend** <br/> - web API 구현 <br /> - flask 서버 통신 API 구현 <br /> - s3 기반 파일 전송 API 구현 <br /> - DB 데이터 json파일 변환 구현 <br /> **Frontend** <br /> - 사용자 함수 페이지 제작 <br />                                                                                                                                                                                                                                                                                             |
| 이동형 |      Deep Learning<br/>Backend      | **Deep Learning**<br /> - 챗봇 학습 파이프라인 구축 <br /> - s3 기반 파일 전송 시스템 구현 <br /> - 자연어 모델 c++ 변환 및 추론 <br/>**Backend**<br />- Flask build/test api 구현<br />- Flask 모델 서빙 및 추론 파이프라인 구축<br />                                                                                                                                                                                                                                                              |
| 김나연 |      Deep Learning<br/>Backend      | **Deep Learning**<br /> - 챗봇 모델 구현 <br /> - 챗봇 학습 및 추론 파이프라인 구축 <br /> **Backend**<br />- Flask test/download api 구현 <br />- Flask 모델 추론 파이프라인 구축<br />                                                                                                                                                                                                                                                                                                             |
| 김지현 |               Backend               | **Backend**<br/>- 챗봇 API 작성<br/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## 7. 실행 방법

- 프로젝트의 exec 폴더 내 포팅 매뉴얼 참조
