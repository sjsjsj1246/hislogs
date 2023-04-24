---
emoji: 🍪
title: '쿠키와 세션.. (세션?)'
date: '2023-04-19'
author: sjsjsj1246
tags: 네트워크
categories: 네트워크
---

쿠키와 세션 자주 들었는데 이번 기회로 명확히 알아봅시다.

먼저 이 기술이 등장한 배경을 이해해야 합니다.

HTTP 프로토콜은 stateless(무상태), connectionless(비연결지향) 특성을 가지고 있기 떄문에 클라이언트의 요청에 대해 어떤 클라이언트인지 식별할 수 없습니다.

> Stateless: 커넥션이 종료되는 순간 상태정보를 유지하지 않는 특성
> 

> Connectionless: 클라이언트가 요청을 보내고 서버의 응답을 주면 연결을 끊는다.
> 

초기에는 클라이언트의 IP 주소를 이용하여 식별하려 했으나 몇개의 문제점이 존재했습니다.

- 여러 사용자가 한 대의 컴퓨터를 사용한다면 하나의 IP로 어떤 사용자인지 식별할 수 없다.
- 인터넷 서비스 제공자(ISP)는 사용자가 로그인하면 동적으로 IP 주소를 할당한다. 매번 다른 주소를 받으므로 식별할 수 없다.
- 네트워크 주소 변환(Network Address Translation, NAT) 방화벽을 통해 인터넷을 사용할 경우, NAT 장비는 실제 IP 주소를 방화벽 뒤로 숨기고, 내부에서 사용하는 하나의 방화벽 IP 주소(다른 포트번호)로 변환한다.
- HTTP 프락시와 게이트웨이는 원 서버에 새로운 TCP 연결을 한다. 웹 서버는 클라이언트의 IP 대신 프락시 서버의 IP 주소를 보게된다.

이외에 여러 시도가 있었으나 간단히 소개드리겠습니다.

- 사이트에 접속할때 마다 로그인을 요구하고 식별정보를 Authorization 헤더에 담아 요청할 것
    - 사이트를 옮겨다닐 때 마다 매번 로그인을 해야 한다.
- 뚱뚱한 URL
    - URL에 버전과 식별번호를 붙여 보내 식별하려 했다.
        - URL이 못생김, 공유하지 못하는 URL, 캐시 사용 불가, 서버 부하 가중, URL 이탈

배경에 대해 길게 이야기해봤습니다. 이제 이러한 문제를 해결하고 지금까지도 쓰고 있는 `쿠키`를 살펴보겠습니다.

## 쿠키

쿠키는 클라이언트(브라우저)에 저장되는 작은 데이터 조각입니다.

![](https://user-images.githubusercontent.com/24623403/233010665-8e366b4f-7341-4eea-8bf2-53c91a180192.png)

(크롬 개발자도구의 애플리케이션 탭에서 확인해볼 수 있습니다.)

크롬의 경우 쿠키를 SQLite파일로 관리하고 있으며 Mac의 경우 `~/Library/Application Support/Google/Chrome/Default/Cookies`에서 확인해볼 수 있습니다.

주요 필드의 의미는 다음과 같습니다.

`creation_utc:` 쿠키가 생성된 시점을 초 단위로 기술
`host_key:` 쿠키의 도메인
`name:` 쿠키의 이름
`value:` 쿠키의 값
`path:` 쿠키와 관련된 도메인에 있는 경로
`expires_utc:` 쿠키의 파기 시점을 초 단위로 기술
`is_secure:` 이 쿠키를 SSL 커넥션일 경우에만 보낼지 여부

RFC 6265 표준 6.1에 따르면 브라우저의 저장 공간에 제한이 있겠으나 최소 다음은 만족해야 한다고 합니다.

- 쿠키당 최소 4096Byte 이상(쿠키 이름, 값 및 속성의 길이 합계로 측정) 가능
- 도메인당 최소 50개 이상의 쿠키 저장 가능
- 총 3000개 최소 이상의 쿠키 저장 가능

그러나 브라우저별로 구현사항이 미묘하게 다릅니다.

### 쿠키의 목적

`세션 관리`(Session management)

- 서버에 저장해야 할 로그인, 장바구니, 게임 스코어 등의 정보 관리

`개인화`(Personalization)

- 사용자 선호, 테마 등의 세팅

`트래킹`(Tracking)

- 사용자 행동을 기록하고 분석하는 용도

과거에는 클라이언트 측에 정보를 저장할 떄 쿠키를 주로 사용하곤 했으나 웹 스토리지가 등장하고 점점 사용하지 않는 추세입니다.

### 쿠키의 타입

세션 쿠키(session cookie)와 지속 쿠키(persistent cookie) 두 가지 타입으로 나뉩니다.

- `세션 쿠키`(session cookie)
    - 사용자가 사이트를 탐색할 때, 관련한 설정과 선호 사항들을 저장하는 임시쿠키
    - 브라우저를 닫으면(세션이 종료되면) 삭제됨
- `지속 쿠키`(persistent cookie)
    - 삭제되지 않고 더 길게 유지(세션이 종료되도 유지)
    - 디스크에 저장되어, 브라우저를 닫거나 컴퓨터를 재시작해도 남아있음
    - 주기적으로 방문하는 사이트 정보나 로그인 이름을 유지

둘의 다른 점은 `파기되는 시점`입니다. 파기되는 시점을 가리키는 Expires 혹은 Max-Age 파라미터가 없으면 세션쿠키입니다.

### 쿠키의 사용

클라이언트 요청에 대해 서버는 Response Header에 Set-Cookie 속성을 사용하여 클라이언트에 쿠키를 저장할 수 있습니다.

| Set-Cookie 속성 | 설명 및 용례 |
| --- | --- |
| name=value | (필수) 큰 따옴표로 감싸지 않고 세미콜론, 쉼표, 등호, 공백을 포함하지 않는 문자열 |
| Expires | (선택) 쿠키의 생명주기를 가리키는 날짜 문자열. 사용할 수 있는 타임존은 GMT. Expires가 없다면 세션쿠키 |
| Domain | (선택) 이 속성에 기술된 도메인을 사용하는 서버로만 쿠키를 전송. 도메인 명시되어있지 않으면, Set-Cookie 응답을 생성한 서버의 호스트 명이 기본값으로 사용됨 |
| Path | (선택) 서버에 있는 특정 경로만 쿠키를 할당. 경로가 명시되어있지 않으면, Set-Cookie 응답을 전달하는 URL의 경로가 사용됨 |
| Secure | (선택) 이 속성이 포함되면, 쿠키는 HTTP가 SSL 보안 연결 사용할 때만 전달 |

클라이언트가 서버에 요청을 보낼 때는 Domain, Path, Secure 필터들이 현재 요청하려는 사이트에 적합하면 파기되지 않은 쿠키들을 `자동`으로 보냅니다. 모든 쿠키는 Cookie 헤더에 세미콜론으로 구분하여 붙여 보냅니다.

`Cookie: session-id=002-123341-4444444; session-id-time=1007884800`

위의 사양은 **Version 0(넷스케이프)**이며 Version 1은 현재 널리 사용되고 있지는 않지만 Set-Cookie2, Cookie2헤더를 사용하며 복잡한 정의가 포함되어 있습니다. 이 글의 주제와는 벗어나는 것 같아 기회가 되면 다시 정리해보겠습니다.

### 요약

브라우저는 서버의 식별값을 쿠키에 저장하고 다시 요청을 보낼 때 자동으로 그 값을 보낸다.

### 참고자료

RFC 6265 표준 [https://www.rfc-editor.org/rfc/rfc6265](https://www.rfc-editor.org/rfc/rfc6265)

MDN Cookie: [https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)

## 세션

이쯤에서 하고싶은 말이 있는데, 세션이라는 단어가 너무 일반적으로 사용되는 단어라 혼용되기 쉬운 것 같습니다.

- HTTP session: HTTP 통신이 맺어지고 끝어지는 과정
- browser session: 브라우저가 사이트에 접속하고 탭이나 창을 닫기까지의 과정
- 등등등 수많은 곳에서 세션이라는 단어가 사용될 수 있음..

흔히들 쿠키와 세션을 비교하곤 하는데 여기서 말하는 세션이란 서버에서 클라언트 식별값을 관리하는 기법을 말합니다.

쿠키를 통해 클라이언트 식별값을 저장하면 쿠키의 내용이 노출되는 보안 문제가 발생할 수 있습니다.(Cookie 헤더에 그 값이 담기기도 하고, 브라우저에 저장됨)

따라서 클라이언트 식별값을 서버측에서 저장하고 있고 그것에 해당하는 id를 쿠키에 저장합니다. 이렇게 하면 다음 과정이 가능합니다.

1. 클라이언트 **>** 서버 Request 요청(Session ID 미존재)
2. 서버 **>** 클라이언트로 Session ID 쿠키 값 체크 후, 없을경우 새로 생성해서 응답
3. 클라이언트는 전달받은 Session ID 값을 매 요청마다 Header 쿠키에 담아서 전달
4. 서버는 Session ID로 사용자 식별
5. 클라이언트가 로그인 요청 시 서버에서는 session을 로그인한 사용자 정보로 갱신하고 새로운 Session ID를 발급하여 응답
6. 클라이언트가 이후에 사용자의 Session ID 쿠키를 요청과 함께 전달하고 서버에서도 해당 로그인 사용자로 식별
7. 클라이언트 종료(브라우저 종료) 시 Session ID 제거, 서버에서도 Session 제거

### 요약

- 따라서 이는 쿠키와 동떨어진 개념이 아니며 쿠키를 보안 문제를 보완하기 위해 사용된 기법이라고 할 수 있습니다.
- 쿠키의 내용을 서버에 저장하고 쿠키에는 그 id만 담아서 관리하는 것입니다.

저는 이러한 기법을 단순 session이 아니라 `Server Session`이라고 부르고 싶습니다. 서버측에서 session을 관리해주고 있기 때문이죠.

추가로 서버 세션은 값을 저장하고 유지하고 있어야 하기 때문에 서버가 상태를 가지게 됩니다. 보통 캐시에 저장하기 떄문에 서버가 재실행하면 클라이언트를 식별하던 값이 모두 삭제될 수 있습니다. 이러한 문제를 해결하고자 `JWT`가 등장하였습니다.(추후 작성해보려 합니다)

### 참고자료

MDN-HTTP 세션: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Session](https://developer.mozilla.org/en-US/docs/Web/HTTP/Session)

```toc

```