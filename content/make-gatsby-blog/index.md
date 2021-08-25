---
emoji: 🗃
title: Gatsby 테마로 블로그 만들기
date: '2021-08-24 18:30:00'
author: sjsjsj1246
tags: gatsby
categories: 블로그
---

평소 공부하며 깨달은 내용과 프로젝트를 하며 겪는 문제와 해결방법을 정리하고 싶어 블로그를 개설하게 됐습니다.
이 블로그는 Gatsby프레임워크로 개발되었으며 [zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog)테마를 기반으로 커스텀 되었습니다.

첫 포스팅으로 테마를 이용해 블로그를 개설하는 방법을 작성해보겠습니다.

## 1. gatsby로 블로그를 만든 이유

가끔 개발을 하다보면 머리가 깨질 것 같이 아프곤 합니다. 뇌가 새로운 정보를 받아들이길 거부하는 느낌.. 뇌의 용량은 한정적이므로.. 습득한 정보를 압축하고 정리할 필요가 있었습니다.

처음엔 Jekyll을 사용하여 블로그를 만들었습니다. 사실 때깔이 뭐가 중요하겠냐만.. 저는 제 마음대로 블로그를 커스텀해보고 싶었습니다. 하지만 Jekyll은 루비로 작성되어 커스텀하기가 어려웠습니다.

그러다 React 기반의 정적 페이지 개발 프레임워크를 발견했습니다. 평소 리액트를 주력으로 사용하고 있기 때문에 바로 만들어 보기로 했습니다.

> 정적 웹사이트란.. HTML, CSS, JavaScript로만 구성된 웹사이트이며 바로 브라우저를 통해 보여질 수 있는 사이트입니다.
> 반대로 동적 웹사이트는 웹 어플리케이션을 통해 동적으로 생성된 페이지가 브라우저에 전달되어 보여지게 됩니다.
> 동적 웹사이트로 블로그를 만들 경우 따로 웹 어플리케이션을 실행할 서버가 필요하고 그 서버를 배포해야 하니 정적 웹사이트가 배포하기도 쉽고 속도가 빠릅니다.
> React도 npm run build를 통해 정적 파일을 만들수는 있지만 Gatsby에 비해 기능이 많이 없습니다.

## 2. Gatsby 템플릿 사용하기

Gatsby는 Jekyll과 같은 정적 사이트 개발 프레임워크입니다. 뷰는 React로 구성하고 GraphQL을 통해 데이터를 처리하며 SEO, Lazy-Loading 그외 많은 플러그인들이 있습니다.

### Gatsby 설치

먼저 gatsby를 설치해봅시다.

```bash
npm install -g gatsby-cli
```

### Gatsby 프로젝트 만들기

개츠비는 프로젝트를 생성할 때 템플릿를 적용할 수 있습니다.

저는 [zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog)템플릿을 사용했습니다. git clone과 비슷한 것이라고 생각하면 될 것 같습니다.

[이곳](https://www.gatsbyjs.com/starters)에서 더 많은 템플릿을 볼 수 있습니다. 블로그 뿐만 아니라 다양한 주제의 사이트들이 있습니다.

```bash
gatsby new [프로젝트 이름] [적용할 템플릿의 주소]
```

## 3. Repository 만들기

![Untitled](img/3-1.png)

먼저 깃허브에 Repogitory를 생성합니다.

![Untitled](img/3-2.png)

그리고 Gatsby 프로젝트 디렉토리에서 위 명령어를 입력해 저장소로 푸쉬합니다.

## 4. Gatsby Blog 커스텀하기

이제 복사해온 사이트의 정보를 자신에게 맞게 수정해주어야 하는데요. 이 부분은 템플릿마다 상당히 다를 수 있습니다. 각자 구현한 방식이 다를 수 있기 때문입니다.

### package.json

먼저 프로젝트의 정보를 수정해줍니다.

![Untitled](img/4-1.png)

### gatsby-meta-config.js

Gatsby에서 사용하는 메타 데이터를 수정해줍니다. 템플릿마다 다르겠지만 사이트 제목, 썸네일 주소, 깃허브 주소, 이메일, 포트폴리오 등등 기존에 써져있는 데이터를 자신에게 맞게 변경하거나 템플릿의 repository에 안내된 방법대로 수정해주시면 되겠습니다.

![Untitled](img/4-2.png)

## 5. 포스팅하기

이부분도 템플릿별로 다르지만 보통 root 디렉토리에 blog 또는 content라는 디렉토리가 있을 겁니다.

![Untitled](img/5-1.png)

![Untitled](img/5-2.png)

그곳에 형식에 맞게, 템플릿의 안내에 따라 마크다운으로 글을 작성해주시면 됩니다.

## 6. 배포하기

이 단계에서 가장 고생을 많이 했습니다. 저는 커스텀 도메인을 적용해야 했기에..

### 로컬에서 실행해보기

먼저 로컬에서 잘 작동하는지 실행해봅시다.

```bash
yarn gatsby develop
```

만약 실행했을 때 이미지가 깨져있다거나 오작동이 있을 경우

```bash
yarn gatsby clean
```

위 명령어를 통해 빌드 파일을 지운 후 다시 실행해봅시다.

### github-pages 사용하기

```bash
yarn add gh-pages
```

github pages를 설치해줍니다.

### 커스텀 도메인을 이용하고 싶을 때

![Untitled](img/6-1.png)

![Untitled](img/6-2.png)

DNS 세팅을 위와 같이 해줍니다.

![Untitled](img/6-3.png)

프로젝트 루트에 CNAME이라는 파일을 만들어 주고 커스텀 도메인의 주소를 넣습니다.

Package.json에 다음 명령어를 작성해줍니다.

```json
"scripts": {
	...
	"predeploy": "gatsby build && cp CNAME ./public",
	"deploy": "gh-pages -d public",
	...
}
```

배포해줍시다!

```bash
yarn deploy
```

![Untitled](img/6-4.png)

Enforce HTTPS를 활성화시켜 보안을 강화하세요!

repository settings에서 이런식으로 세팅이 되었다면 성공입니다!

> 배포라는 것이 원래 시간이 좀 걸립니다.. DNS 서버에 전파되는 시간이 걸리기 때문입니다. 그리고 사용자의 브라우저까지 도착하는데에도 시간이 걸리며 오류가 발생한 사이트를 배포했을 경우 그 오류까지 브라우저가 캐싱하여 사이트의 오류를 고쳐 다시 배포한다 해도 즉시 반영되지 않을 수도 있습니다.

### 커스텀 도메인이 없을 때

```json
"predeploy": "gatsby build",
"deploy": "gh-pages -d public",
```

![Untitled](img/6-4.png)

커스텀 도메인이 없을 경우는 깃허브에서 알아서 https://{username}.github.io/{repositoryname}의 주소로 배포될겁니다.

---

`❗️작성중입니다!`

## Github Action을 통한 배포 자동화

## 구글 서치 콘솔 등록

## 구글 애널리틱스 등록

```toc

```
