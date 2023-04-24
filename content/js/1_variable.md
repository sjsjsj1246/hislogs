---
emoji: 🖐️
title: 'Javascript: 1. 변수와 스코프 (Web 개발자라면 이정도는 알아야지)'
date: '2022-10-15'
author: sjsjsj1246
tags: Javascript
categories: Javascript
---

## 1-1. 변수

### 1-1. 변수란 무엇인가? 왜 필요한가?

> `변수(variable)`는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 말한다.

다음과 같은 자바스크립트 코드를 살펴보자

```jsx
10 + 20;
```

자바스크립트 엔진은 위 코드를 평가(evaluation)하기 위해 10, 20, + 라는 기호(리터럴literal과 연산자operator)의 의미를 알고 있어야 하며, 10 + 20이라는 표현식(expression)의 의미도 해석(파싱parsing)할 수 있어야 한다.

자바스크립트 엔진이 + 연산을 수행하기 위해 먼저 피연산자(operand) 10, 20을 기억해야 한다. 컴퓨터는 이를 메모리에 저장하고 읽는다. CPU는 메모리에 있는 피연산자를 읽어 + 연산을 수행한 뒤 30이라는 값을 다른 메모리 공간에 저장한다.

하지만 이대로는 30이라는 메모리 주소에 직접 접근하는 것 말고는 값을 재사용할 수 없다. 자바스크립트는 개발자가 메모리에 직접 접근하도록 허용하지 않으므로 30이라는 값에 접근할 수 없다.

이를 해결하기 위해 변수라는 개념이 존재한다.

```jsx
var result = 10 + 20;
```

10 + 20을 통한 연산의 결과를 result라는 메모리 공간에 붙여진 이름을 통해 저장하여 재사용할 수 있게 됐다.

변수에 값을 저장하는 것을 할당이라 하고, 변수에 저장된 값을 읽어 들이는 것을 참조라 한다.

### 1-2. 변수 선언

> `변수 선언(declaration)`이란 값을 저장하기 위한 메모리 공간을 확보(allocate)하고 변수 이름과 확보된 메모리 공간의 주소를 연결(name binding)해서 값을 저장할 수 있게 준비하는 것이다.

변수를 사용하려면 반드시 선언이 필요하다. 변수를 선언할 떄는 var, let, const 키워드를 사용한다.

let, const 키워드는 ES6에서 도입되었다.

> `키워드`는 자바스크립트 코드를 해석하고 실행하는 자바스크립트 엔진이 수행할 동작을 규정한 일종의 명령어이다.

> **ES5** vs **ES6**
> var 키워드는 여러 단점이 있다. block-level-scope를 지원하지 않고 function-level-scope를 지원한다는 것이다.
> ES6는 ES5의 superset이며 ES5 환경에서도 트랜스파일러를 이용해 ES6를 컴파일 할 수 있다. (babel과 polyfill)

```jsx
var score;
```

변수 선언에 의해 확보된 `메모리 공간`은 비어 있을 것으로 생각할 수 있으나 `확보된 메모리 공간`에는 자바스크립트 엔진에 의해 `undefined`라는 값이 암묵적으로 `할당`되어 `초기화`된다.(이것은 자바스크립트의 독특한 특징이다.)

> `초기화(initialization)`는변수가 선언된 이후 최초로 값을 할당하는 것을 말한다.

자바스크립트 엔진은 변수 선언을 다음과 같은 2단계에 거쳐 수행한다.

- **선언 단계** - 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.
- **초기화 단계** - 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화한다.

초기화 단계를 거치지 않으면 확보된 메모리 공간에는 이전에 다른 애플리케이션이 사용했던 값이 남아있을 수 있다. 이러한 값을 `쓰레기 값(garbage value)`이라 한다. 하지만 자바스크립트는 암묵적으로 초기화를 수행하므로 이런 위험이 없다.

선언하지 않은 식별자에 접근하면 `ReferenceError(참조에러)`가 발생한다.

> 자바스크립트는 컴파일 언어이다.
> Javascript는 실행되기 전에 마이크로초(또는 그 이하) 시간동안 컴파일 된다.
> (JIT, with lazy compile and even hot re-compile 등 기술 참고)
> Tokenizing/Lexing → Parsing → Code-Generation

var a = 2;를 만나면

1. 컴파일러는 var 키워드를 보고 Scope에 해당 변수 선언을 요청한다. 그 후 엔진이 실행할 수 있는 코드를 생성한다 a = 2
2. 프로그램 실행 후 a = 2를 만난 엔진은 Scope에서 해당 a를 찾고 값을 할당하는 일을 한다. (LHS look-up)

### 1-3. 변수 선언의 실행 시점과 변수 호이스팅

```jsx
console.log(score); //undefined

var score;
```

위 코드에서 참조에러가 발생하지 않고 `undefined`가 출력이 되는 이유는 변수 선언이 소스코드가 한 줄씩 순차적으로 실행되는 시점, 즉 런타임이 아니라 그 이전 단계에서 먼저 실행되기 때문이다.

자바스크립트 엔진은 소스코드를 한 줄씩 순차적으로 실행하기에 앞서 먼저 소스코드의 평가 과정을 거치면서 소스코드를 실행하기 위한 준비를 한다.

이때, 소스코드 실행을 위한 준비 단계인 소스코드의 평가 과정에서 자바스크립트 엔진은 변수 선언을 포함한 모든 선언문(변수 선언문, 함수 선언문등)을 소스코드에서 찾아내 먼저 실행한다.

그리고, 소스코드의 평가 과정이 끝나면 비로소 변수 선언을 포함한 모든 선언문을 제외하고 소스코드를 한 줄식 순차적으로 실행한다.

즉, 자바스크립트 엔진은 변수 선언이 어디에 있든 상관없이 다른 코드보다 먼저 실행한다.

이처럼 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징을 변수 `호이스팅`이라 한다.

### 1-4. 값의 할당

변수에 값을 할당할 때는 `할당(assignment) 연산자 =`를 사용한다. 할당 연산자는 우변의 값을 좌변의 변수에 할당한다.

변수 선언은 소스코드가 순차적으로 실행되는 시점인 런타임 이전에 먼저 실행되지만 `값의 할당`은 소스코드가 순차적으로 실행되는 시점인 런타임에 실행된다.

```jsx
console.log(score); // undefined

var score;
score = 80;

console.log(score); // 80
```

변수에 값을 할당할 때는 이전 값 `undefined`가 저장되어 있는 메모리 공간을 지우고 그 메모리 공간에 할당 값 80을 새롭게 저장하는 것이 아니라 새로운 메모리 공간을 확보하고 그곳에 할당 값 80을 저장한다.

### 1-5. 값의 재할당

`재할당`이란 이미 값이 할당되어 있는 변수에 새로운 값을 또다시 `할당`하는 것을 말한다.

var 키워드로 선언한 변수는 선언과 동시에 `undefined`로 초기화되기 때문에 엄밀히 말하자면 변수에 처음으로 값을 할당하는 것도 사실은 `재할당`이다.

값을 재할당할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아니라 `상수`다.

`상수`는 단 `한 번만` 할당할 수 있는 `변수`다.

`변수에 값을 재할당`할때는 처음에 변수에 값을 할당할 때처럼 이전 값이 저장되어 있던 메모리 공간에 새로운 값을 저장하는 것이 아니라 `새로운 메모리 공간`을 확보하고 그 `메모리 공간에 새로운 값을 저장하는 것`이다.

이후, 어떤 식별자와도 연결되어 있지 않은 불필요한 값들은 `가비지 컬렉터`에 의해 메모리에서 자동 해제된다. 단, 메모리에서 언제 해제될지는 예측할 수 없다.

> 자바스크립트에서 재할당을 할 때는 기존에 있던 메모리 공간에 값을 할당하지 않습니다.
> 만약 기존에 있던 메모리 공간의 크기가 할당할 값보다 작다면 그 메모리를 늘려주는 작업도 해야 할 겁니다. 비용이 많이 들죠 그렇지 않고 다른 메모리 공간에 값을 저장해놓고 식별자 foo는 그 메모리 공간을 가리키기만 하면 되겠죠
> 즉 메모리의 효율적인 처리를 위해 이런 동작을 하고 재할당이 일어날 때 마다 새로운 메모리 공간을 할당하며 기존에 있던 메모리 공간은 가비지 컬렝터의 대상이 됩니다

## 2. 스코프

### 2-1. 스코프란?
> `스코프(Scope)`는 식별자가 유효한 범위를 말한다.

- 자바스크립트의 스코프는 다른 언어의 스코프와 구별되는 특징이 있다.
- var 키워드로 선언한 변수와 let 또는 const 키워드로 선언한 변수의 스코프도 다르게 동작한다.

```jsx
var var1 = 1; //코드 가장 바깥 영역에서 선언한 변수

function foo() {
  var var2 = 2; // 함수 내에서 선언한 변수
}

console.log(var1); // 1
console.log(var2); // ReferenceError : var4 is not defined
```

모든 식별자 (변수이름, 함수이름, 클래스 이름 등)는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효범위, 즉 스코프가 결정된다.

**식별자결정** : 자바스크립트 엔진은 이름이 같은 두 변수 중 어떤 변수를 참조해야 할 것인지를 결정

따라서 `스코프란 자바스크립트 엔진이 식별자를 검색할 때 사용하는 규칙`이라고도할 수 있다.

> 💡 코드의 문맥은 렉시컬환경으로 이뤄진다. 이를 구현한 것이 실행컨텍스트이며, 모든 코드는 실행컨텍스트에서 평가되고 실행된다.

#### 2-1-1. 스코프는 네임스페이스다.

스코프 내에서 식별자는 유일해야 하지만, 다른 스코프에는 같은 이름의 식별자를 사용할 수 있다.

#### 2-1-2. var 키워드로 선언한 변수의 중복선언

var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언이 허용된다. 이는 의도치 않게 변수 값이 재할당되어 변경되는 부작용을 발생시킨다.

```jsx
function foo() {
  var x = 1;
  // var로 선언된 변수는 같은 스코프 내에서 중복선언이 허용된다.
  // 아래 변수 선언문은 자바스크립트 엔진에 의해서 var 키워드가 없는 것처럼 동작한다.
  var x = 2;

  console.log(x);
}

foo(); // 2
```

let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.

```jsx
function bar() {
  let x = 1;
  let x = 2;
}

bar(); //SyntaxError: Identifier 'x' has already been declared
```

### 2-2. 스코프 종류

코드는 전역과 지역으로 구분할 수 있다.

| 구분 | 설명                  | 스코프      | 변수     |
| ---- | --------------------- | ----------- | -------- |
| 전역 | 코드의 가장 바깥 영역 | 전역 스코프 | 전역변수 |
| 지역 | 함수 몸체 내부        | 지역 스코프 | 지역변수 |

변수는 자신이 전언된 위치(전역/지역)에 의해 자신이 유효한 범위인 스코프(전역 스코프/지역 스코프)가 결정된다.

#### 2-2-1. 전역
- 코드의 가장 바깥 영역, 전역에 변수를 선언하면 전역 스코프를 갖는 **전역 변수**가 된다,
- 전역변수는 어디서든 참조 가능하다.

#### 2-2-2. 지역
- 함수 몸체 내부를 말한다. 지역에 변수를 선언하면 지역 스코프를 갖는 **지역변수**가 된다,
- 지역 변수는 자신의 지역 스코프와, 하위 지역스코프에서 유효하다.

```jsx
var x = "global";

function foo() {
  var x = "local";
  console.log(x); // local
}
foo();
console.log(x); //global
```

foo 함수 내부에서 선언된 x는 지역변수다. 지역변수 x는 자신이 선언된 foo 내부에서만 참조 가능하다. 하지만 이 지역변수 x를 전역 또는 foo 함수 내부 이외의 지역에서 참조하면 참조 에러가 발생한다.

그런데 foo 함수 외부에도 전역변수 x가 선언되어있다. 이 경우에 foo함수 내에서 x 변수를 참조하면 전역변수 x를 참조하는 것이 아니라 foo 함수 내부에 있는 x를 참조한다. 이는 자바스크립트 엔진이 **스코프 체인**을 통해 참조할 변수를 검색(identifier resolution)했기 때문이다.

### 2-3. 스코프 체인

- 함수의 중첩 : 함수 몸체 내부에서 함수가 정의된 것
- 중첩 함수 : 함수 몸체 내부에서 정의한 함수
- 외부함수 : 중첩 함수를 포함하는 함수

함수가 중첩될 수 있기 때문에 지역 스코프도 중첩될 수 있다. 이는 **스코프가** 함수의 중첩에 의해 **계층적 구조**를 갖는다는 것을 의미한다.

중첩함수의 지역 스코프는 중첩 함수를 포함하는 외부 함수의 지역 스코프와 `계층적 구조`를 갖는다. 이때 **외부 함수의 지역 스코프**를 **중첩 함수의 상위 스코프**라고 한다.

> 💡 모든 스코프가 계층적으로 연결된 것을 스코프 체인이라고 한다. 모든 지역 스코프의 최상위 스코프는 전역 스코프이다.

- **스코프 체인은 물리적인 실체로 존재한다.**
  - 자바스크립트 엔진은 코드실행에 앞서 **렉시컬 환경**을 실제로 **생성**한다.
  - **변수 선언**이 되면 변수 식별자가 이 렉시컬 환경에 키로 등록된다.
  - **변수할당**이 일어나면 렉시컬 환경의 변수 식별자에 해당하는 값을 변경한다.
  - **변수 검색**도 이 렉시컬 환경 상에서 일어난다.
  - **변수를 참조할 때** 자바스크립트 엔진은 **스코프 체인**을 통해 변수를 참조하는 코드의 스코프에서 시작하여 **상위 스코프 방향으로 이동하며** 선언된 변수를 **검색**한다. 이를 통해 `상위 스코프에서 선언한 변수를 하위 스코프에서도 참조 가능하다.`
- **스코프 체인은 렉시컬 환경을 단방향으로 연결한 것이다.**
  - 전역 렉시컬 환경은 코드가 로드되면 곧바로 생성된다.
  - 함수의 렉시컬 환경은 함수가 호출되면 곧바로 생성된다.

#### 2-3-1. 스코프 체인에 의한 변수 검색

- 상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있다.
- 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없다.
- 스코프의 계층적 구조는 부자 관계로 이뤄진 상속과 유사하다. ( 상속 : 상속을 통해 부모의 자산을 자식이 자유롭게 사용할 수 있지만 자식의 자산을 부모가 사용할 순 없다.)

#### 2-3-2. 스코프 체인에 의한 함수 검색

- 함수도 식별자에 할당되기 때문에 스코프를 갖는다. 사실 함수는 식별자에 함수 객체가 할당된 것 외에는 일반 변수와 다를 바가 없다.
- 따라서 스코프를 **식별자를 검색하는 규칙**이라고 표현하는 편이 좀 더 적합하다.

### 2-4. 함수 레벨 스코프

지역은 함수 몸체 내부를 말하고 지역은 지역 스코프를 만든다. 이는 코드 블록이 아닌 **`함수에 의해서만 지역 스코프가 생성된다`**는 의미다.

- **블록 레벨 스코프(block level scope)**
  모든 코드 블록(if, for, while, try/catch 등)은 지역 스코프를 만든다.
- **함수 레벨 스코프(function level scope)**
  **var 키워드**로 선언된 변수는 오로지 함수의 **코드 블록(함수 몸체)** 만을 **지역 스코프**로 인정한다.

```jsx
var x = 1;

if (true) {
  var x = 10; // x는 전역 변수.
}

console.log(x); // 10, 값이 재할당됨
```

var 키워드로 선언된 변수는 함수 레벨 스코프만 인정하기 때문에 `함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언`되었다고 하더라도 **전역변수**이다.

> 따라서 전역변수 x는 중복 선언되고, 그 결과 전역변수의 재할당이 일어난다.

### 2-5. 렉시컬 스코프

- **동적 스코프(dynamic scope)**
  - **함수를 어디서 호출했는지**에 따라 함수의 상위 스코프를 결정한다.
- **렉시컬 스코프(lexical scope) 또는 정적 스코프(static scope)**
  - **함수를 어디서 정의했는지에 따라** 함수의 상위 스코프를 결정한다.

자바스크립트를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따른다.

즉 함수의 상위 스코프는 언제나 자신이 정의된 스코프이다.

```jsx
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

결론적으로 var 키워드를 사용하여 변수를 정의하면
- 함수 레벨 스코프를 따라 스코프가 결정된다.
- 렉시컬 스코프에 의해 상위 스코프를 결정한다.

## 3. 전역 변수의 문제점

### 3-1. 변수의 생명 주기

#### 3-1-1. 지역 변수의 생명 주기

```javascript
  var x = 'global'
  function foo(){
    console.log(x); undefined
    var x = 'local';
  }

  foo();
  console.log(x);//global
```   

> 지역 변수의 생명 주기는 함수의 생명 주기와 일치한다


-  함수 내부에서 선언된 지역 변수는 함수가 생성한 스코프에 등록된다. 따라서 **변수는 자신이 등록된 스코프가 소멸될 때 (메모리가 해제될 때)까지 유효하다**
- 할당된 메모리 공간은 더이상 그 누구도 참조하지 않을 때 가비지 콜렉터에 의해 메모리 풀에 반환된다.

**지역 변수가 함수보다 오래 생존하는 경우도 있다**   

**누군가 메모리 공간을 참조한다면,** 해제되지 않고 확보된 상태로 남아있게 된다.  
스코프 또한 마찬가지로 **누군가 스코프를 참조하고 있다면** 스코프는 소멸하지 않고 생존하게 된다.  
일반적으로 함수가 종료하면 함수가 생성한 스코프도 소멸하지만, **누군가 스코프를 참조한다면** 스코프는 해제되지 않고 생존한다

#### 3-1-2.전역 변수의 생명 주기
함수와 달리 전역변수는 명시적 호출 없이 실행된다   
특별한 진입점 없이 코드가 로드되자마자 해석되고 실행된다
전역 코드는 반환문을 사용할 수 없으므로, 마지막 문이 실행되어 실행할 문이 없을때 종료한다   

**var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다**

- 전역 변수의 생명 주기는 전역 객체의 생명주기와 일치한다   
전역객체란 코드가 실행되기 이전에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이다

클라이언트 사이드 환경에서는(브라우저) window, 서버사이드 환경에서는(node.js)gloabl 객체를 의미한다

전역 객체는 표준 빌트인 객체(Object, String, Number, Function, Array ... )와 환경에 따른 호스트 객체(Web API, node.js의 호스트API), 그리고 var 키워드로 선언한 전역변수와 전역 함수를 프로퍼티로 갖는다

- 브라우저 환경의 전역 객체는 window이고, var 키워드로 선언한 변수는 전역 객체 window의 프로퍼티이다
  - 전역 객체 window는 웹페이지를 닫기 전까지 유효하므로, var 키워드로 선언한 전역 변수의 생명 주기는 전역객체의 생명주기와 일치한다

### 3-2. 전역 변수의 문제점
문제점 **1. 암묵적 결합**   
전역 변수를 선언하면, 모든 코드가 전역변수를 참조하고, 변경할 수 있는 암묵적 결합을 허용하는것이다   
-> 변수의 유효 범위가 크면 클수록 코드의 가독성이 나빠지고, 의도치 않게 상태가 변경될 수 있는 위험성이 높아진다

문제점 **2. 긴 생명주기**   
긴 생명주기를 가짐으로써 생기는 문제는   
-> 메모리 리소스를 오랜기간 소비한다
-> 상태 변경에 의한 오류가 발생할 확률이 크다

문제점 **3. 스코프 체인 상에서 종점에 존재**   
-> 변수 검색 시, 가장 마지막에 검색되어 검색속도가 가장 느리다, 검색속도의 차이가 크지는 않지만 속도의 차이는 분명히 있다

문제점 **4. 네임스페이스 오염**
js의 문제점은 파일이 분리되어 있다고 해도 하나의 전역 스코프를 공유한다는 것,
-> 다른 파일 내에 동일한 이름으로 변수를 사용할 경우, 예상치 못한 결과를 가져올 수 있다.

### 3-3. 전역 변수의 사용을 억제하는 방법
> 전역변수를 반드시 사용해야 할 이유가 없다면 지역변수를 사용해야 한다,   
> 변수의 스코프는 좁을수록 좋다

#### 3-3-1. 즉시 실행 함수
```javascript
(function (){
  var foo = 10;
})()

console.log(foo); // 에러!!
```
모든 코드를 즉시실행함수로 감싸면 모든 변수는 즉시실행함수의 지역변수가 된다   
-> 전역 변수의 사용을 제한할 수 있다

#### 3-3-2. 네임스페이스 객체
```javascript
var MYAPP = {}; // 전역 네임스페이스 객체
MYAPP.name = 'Lee';
console.log(MYAPP.name);// Lee
```

```javascript

var MYAPP = {};
MYAPP.person = {  //네임스페이스를 계층적으로 구성할 수도 있다.
  name:"Lee",
  address:"Seoul"
};
console.log(MYAPP.person.name); //Lee

```

전역에 네임스페이스 역할을 담당할 객체를 생성하고, 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가한다   
네임스페이스 분리로 식별자 충돌을 방지할 수는 있으나, 객체 자체가 전역변수에 할당되므로 그닥 유용하진 않다

#### 3-3-3. 모듈 패턴
모듈 패턴은 클래스를 모방한다, 관련이 있는 변수와 함수를 모아 즉시 실행함수로 감싸 하나의 모듈을 만든다  
-  자바스크립트의 클로저를 기반으로 동작함
-  전역변수 억제 및 캡슐화 구현 가능

```javascript

  //즉시실행 함수의 반환값을 Counter 변수에 할당
  var Counter = (function () {
    
    //private 변수, 캡슐화, 정보은닉,
    var num = 0;

    // 외부로 공개할 데이터, 메서드를 프로퍼티로 추가한 객체를 반환한다
    return {
      increse(){
        return ++num;
      }
      decrease(){
        return --num;
      }
    }
  })()

  console.log(Counter.num) //undefined;
  console.log(Counter.increase()) // 1
  console.log(Counter.decrease()) // 0

```

#### 3-3-4. ES6 모듈
ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공한다    
  -> 모듈 내의 var 키워드로 선언한 변수는 더이상 전역변수가 아니며, window의 객체 프로퍼티도 아니다

* script 태그에 type="module" 어트리뷰트를 추가하면, 로드된 자바스크립트 파일은 모듈로서 동작한다.   
* 모듈의 파일 확장자는 mjs를 권장

```HTML
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
```

* ES6는 IE 포함 구형 브라우저에서 동작하지 않는다   
* ES6의 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하기 때문에 아직까지 브라우저의 ES6 모듈보다는 Webpack등의 모듈 번들러를 사용한다


```toc

```