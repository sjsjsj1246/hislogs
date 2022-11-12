---
emoji: ✍️
title: 'Effective Typescript: 1. 타입스크립트 알아보기'
date: '2022-01-04'
author: sjsjsj1246
tags: Typescript
categories: Language
---

## 개요

- 타입스크립트란 무엇인가.
- 타입스크립트는 자바스크립트와 어떤 관계인가
- 타입스크립트의 타입들은 null이 가능한가, any type에서는 어떨까
- 덕 타이핑이 가능할까.

## 타입스크립트의 특징

타입스크립트는 인터프리터로 실행되지 않으며 저수준 언어로 컴파일되는 것도 아닙니다. 
타입스크립트는 또다른 고수준 언어인 자바스크립트로 컴파일되며, 실행 역시 자바스크립트로 이루어집니다.

## Item 1. 타입스크립트와 자바스크립트의 관계 이해

> Typescript는 Javascript의 superset이다.

- 자바스크립트 파일은 js, jsx를 쓰는 반면 타입스크립트 파일은 ts, tsx를 씁니다. 타입스크립트는 자바스크립트를 포함하기 때문에 main.js를 main.ts로 바꾼다고 해도 달라지는 것은 없습니다.
- 따라서 기존 코드를 그대로 유지하면서 일부분에만 타입스크립트를 적용할 수 있습니다.
- 타입스크립트의 타입 체커는 에러 핸들링에 유용합니다.
    
    ```jsx
    // javascript
    let city = "new tork city";
    console.log(city.toUppercase());
    // typeError: city.toUppercase is not a function
    ```
    
    ```tsx
    // javascript
    let city = "new tork city";
    console.log(city.toUppercase());
    // 'toUppercase' 속성이 'string' 형식에 없습니다.
    // 'toUpperCase'를 사용하시겠습니까?
    ```
    
    city 변수가 문자열이라는 것을 알려주지 않아도 타입스크립트는 초기값으로부터 타입을 추론합니다.
    
- 타입스크립트의 목표는 런타임에 오류를 발생시킬 코드를 미리 찾아내는 것입니다. 타입스크립트가 '정적' 타입시스템이라는 것은 바로 이런 특징을 말하는 것입니다.
- 오류가 발생하지는 않지만 의도와 다르게 동작하는 코드도 있습니다. 타입스크립트는 이러한 문제중 몇가지를 찾아내기도 합니다.
    
    ```jsx
    const states = [
    	{name: 'a', capital: 'b'},
    	{name: 'a', capital: 'b'},
    	{name: 'a', capital: 'b'},
    ];
    for (const state of states) {
    	console.log(state.capitol);
    }
    // undefined
    // undefined
    // undefined
    ```
    
    ```jsx
    const states = [
    	{name: 'a', capital: 'b'},
    	{name: 'a', capital: 'b'},
    	{name: 'a', capital: 'b'},
    ];
    for (const state of states) {
    	console.log(state.capitol);
    }
    // undefined
    // undefined
    // undefined
    // 'capitol' 속성이 ...형식에 없습니다.
    // 'capital'을 사용하시겠습니까?
    ```
    
- 타입스크립트는 타입 구문 없이도 오류를 잡을 수 있지만, 타입 구문을 추가한다면 훨씬 더 많은 오류를 찾아낼 수 있습니다.
- 코드의 `의도`가 무엇인지 타입 구문을 통해 타입스크립트에게 알려줄 수 있기 때문에 코드의 동작과 의도가 다른 부분을 찾을 수 있습니다.
- 따라서 명시적으로 states를 선언하여 의도를 분명하게 하는 것이 좋습니다.
    
    ```tsx
    interface State {
    	name: string;
    	capital: string,
    }
    const states: State[] = [
    	{name: 'a', capitol: 'b'},
    	{name: 'a', capitol: 'b'},
    	{name: 'a', capitol: 'b'},
    							// 개체 리터럴은 알려진 속성만 지정할 수 있지만 'State' 형식에 'capitol'이 없습니다. 'capital'을 쓰려고 했습니까?
    ]
    for (const state of states) {
    	console.log(state.capitol);
    }
    ```
    
- 따라서 타입스크립트의 영역에는 자바스크립트 프로그램, 타입 체커를 통과한 자바스크립트 프로그램이 있습니다.
    - 모든 자바스크립트는 타입스크립트이지만, 일부 자바스크립트만 타입 체크를 통과합니다.
- 타입스크립트는 자바스크립트 런타임 동작을 모델링하는 타입 시스템을 가지고 있기 떄문에 런타임 오류를 발생시키는 코드를 찾아내려고 합니다.
- 타입시스템이 정적 타입의 정확성을 보장해 줄 것 같지만 그렇지 않습니다. 타입 시스템의 목적은 오류를 발생시키는 코드를 미리 찾아내서 오류가 적은 코드를 작성하는 것입니다.

## Item 2. 타입스크립트 설정 이해하기

- 타입스크립트 컴파일러는 매우 많은 설정을 가지고 있습니다. 이 설정들은 커맨드라인을 사용해 할 수 있습니다.
    
    ```tsx
    $ tsc --noImplictAny program.ts
    ```
    
    하지만 tsconfig.json 설정 파일을 사용하는 것이 유지보수와 협업 관점에서 더 좋습니다.
    
    tsc —init을 실행하여 설정 파일을 만듭니다.
    
    ```json
    {
    	"compoilerOptions": {
    		"noImplicitAny": true
    	}
    }
    ```
    
- 타입스크립트의 설정들은 어디서 소스파일을 찾을지, 어떤 종류의 출력을 생성할지 제어하는 내용들과 언어 자체의 핵심 요소들을 제어하는 설정도 있습니다.
- 타입스크립트는 어떻게 설정하느냐에 따라 완전히 다른 언어처럼 느껴질 수 있으니 설정을 제대로 사용하려면 noImplicitAny와 strictNullChecks를 이해해야 합니다.
- noImplicitAny: 암시적인 any타입을 금지합니다.
    - 타입스크립트가 문제를 발견하기 수월해지고, 코드의 가독성이 좋아지며, 개발자의 생산성이 향상됩니다.
    - 이 속성을 해제할 때는 자바스크립트로 되어 있는 기존 프로젝트를 타입스크립트로 전환하는 상황에만 필요합니다.
- strictNullChecks: null과 undefined가 모든 타입에서 허용되는지 확인합니다.
    - 타입에 null을 허용하기 위해 명시적으로 드러내야 합니다.
    
    ```tsx
    const x: number | null = null;
    ```
    
    - null을 허용하지 않으려면 이 값이 어디서부터 왔는지 찾아야 하고, null을 체크하는 코드나 단언문을 추가해야 합니다.
    
    ```tsx
    if(el) el.textContent = 'Ready'
    el!.textContent = 'Ready'
    ```
    
    - strictNullChecks는 null과 undefined 관련된 오류를 잡아내는 데 많은 도움이 되지만 코드 작성을 어렵게 합니다.
    

## Item 3. 코드 생성과 타입이 관계없음을 이해하기

- 큰 그림에서 보면, 타입스크립트 컴파일러는 두가지 역할을 수행합니다.
    - 최신 타입스크립트/자바스크립트를 브라우저에서 동작할 수 있도록 구버전의 자바스크립트로 트랜스파일 합니다.
    - 코드의 타입 오류를 체크합니다.
- 놀라운 점은 이 두가지가 서로 완벽히 독립적이라는 것입니다. 다시말해 타입스크립트가 자바스크립트로 변환될 때 코드 내의 타입에는 영향을 주지 않습니다. 또한 그 자바스크립트의 실행 시점에도 타입은 영향을 미치지 않습니다.
- 이를통해 타입스크립트가 할 수 있는 일과 할 수 없는 일을 짐작할 수 있습니다.

### 타입 오류가 있는 코드도 컴파일이 가능합니다.

> 컴파일은 타입 체크와 독립적으로 동작하기 떄문에, 타입 오류가 있는 코드도 컴파일이 가능합니다.
- 타입스크립트 오류는 C나 자바같은 언어들의 경고와 비슷합니다. 문제가 될 만한 부분을 알려주지만, 그렇다고 빌드를 멈추지는 않습니다.

> 코드에 오류가 있을 때 "컴파일에 문제가 있다"고 말하는 경우를 보았을겁니다. 그러나 이는 기술적으로 틀린 말입니다. 엄밀히 말하면 오직 코드 생성만이 컴파일이라고 할 수 있기 때문입니다. 작성한 타입스크립트가 유효한 자바스크립트라면 타입스크립트 컴파일러는 컴파일을 해냅니다. 그러므로 코드에 오류가 있을 때 "타입 체크에 문제가 있다"고 말하는 것이 더 정확한 표현입니다.
- 코드에 오류가 있더라도 컴파일된 산출물이 나오는 것은 실제로 도움이 됩니다. 웹 애플리케이션을 만들면서 어떤 부분에 문제가 발생한다고 가정해보겠습니다. 타입스크립트는 여전히 컴파일된 산출물을 생성하기 때문에, 문제가 된 오류를 수정하지 않더라도 애플리케이션의 다른 부분을 테스트할 수 있습니다.

### 런타임에는 타입 체크가 불가능합니다.

```tsx
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
                    // ~~~~~~~~~ 'Rectangle'은 형식만 참조하지만
                    //           여기서는 값으로 사용되고 있습니다.
    return shape.width * shape.height;
                    //         ~~~~~~ 'Shape' 형식에 'height' 속성이 없습니다.
  } else {
    return shape.width * shape.width;
  }
}
```

instanceof 체크는 런타임에 일어나지만, **Rectangle은 타입이기 떄문에 런타임 시점에 아무런 역할을 할 수 없습니다.** 타입스크립트의 타입은 '제거가능'합니다. 실제로 자바스립트로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 구문은 그냥 제거되어버립니다.

Shape 타입을 명확하게 하려면, 런타임에 타입 정보를 유지하는 방법이 필요합니다. 하나의 방법은 height 속성이 존재하는지 체크해보는 것입니다.

```tsx
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if ('height' in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

속성 체크는 런타입에 접근 가능한 값에만 관련되지만, 타입 체커 역시도 shape의 타입을 Ractangle로 보정해 주기 떄문에 오류가 사라집니다.

또다른 방봅으로는 런타임에 접근 가능한 타입 정보를 명시적으로 저장하는 '태그' 기법이 있습니다.

```tsx
interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

여기서 Shape 타입은 '태그된 유니온(tagged union)'의 한 예입니다. 이 기법은 런타임에 타입 정보를 손쉽게 유지할 수 있기 때문에, 타입스크립트에서 흔하게 볼 수 있습니다.

타입(런타임 접근 불가)과 값(런타임 접근 가능)을 둘다 사용하는 기법도 있습니다. 타입을 클래스로 만들면 됩니다. Square와 Rectangle을 클래스로 만들면 오류를 해결할 수 있습니다.

```tsx
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;  // OK
  }
}
```

인터페이스는 타입으로만 사용 가능하지만, Rectangle을 클래스로 선언하면 타입과 값으로 모두 사용할 수 있으므로 오류가 없습니다.

type Shape = Square | Rectangle 부분에서 Rectangle은 타입으로 참조되지만, shape instanceof Rectangle 부분에서는 값으로 참조됩니다.

### 타입 연산은 런타임에 영향을 주지 않습니다.

string 또는 nuber 타입인 값을 항상 number로 정제하는 경우를 가정해 보겠습니다. 다음 코드는 타입 체커를 통과하지만 잘못된 방법을 썼습니다.

```tsx
function asNumber(val: number | string): number {
  return val as number;
}
```

이 코드는 다음 자바스크립트 코드로 변환됩니다.

```tsx
function asNumber(val) {
  return val;
}
```

코드에 아무런 정제 과정이 없습니다. as number는 타입 연산이고 런타임 동작에는 아무런 영향을 미치지 않습니다. 값을 정제하기 위해서는 런타임의 타입을 체크하고 자바스크립트 연산을 통해 변환을 수행해야 합니다.

```tsx
function asNumber(val: number | string): number {
  return typeof(val) === 'string' ? Number(val) : val;
}
```

### 런타임 타입은 선언된 타입과 다를 수 있습니다.

다음 함수를 보고 마지막의 console.log문이 실행될 수 있을까요?

```tsx
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log(`I'm afraid I can't do that.`);
  }
}
```

타입스크립트는 일반적으로 실행되지 못하는 dead코드를 찾아내지만 위 코드에서는 찾아내지 못합니다.

위 코드의 value: boolean에서 : boolean은 타입 선언문입니다. 만약 value가 문자열이라면 default 케이스가 실행될 수도 있습니다.

타입 체킹을 했으므로 그럴 일 없다고 생각하실 수 있겠지만 네트워크 호출로부터 받아온 값으로 함수를 실행하는 경우 데이터가 문자열일 수 있습니다.

타입스크립트에서는 런타임 타입과 선언된 타입이 맞지 않을 수 있습니다.

### 타입스크립트 타입으로는 함수를 오버로드 할 수 없습니다.

타입스크립트는 타입과 런타임의 동작이 무관하기 때문에 함수 오버로딩은 불가능합니다.

```tsx
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a, b) {
	return a + b;
}
```

add에 대한 처음 두 개의 선언문은 타입 정보를 제공할 뿐입니다. 이 두선언문은 타입스크립트가 자바스크립트로 변환되면서 제거되며, 구현체만 남게 됩니다.

### 타입스크립트 타입은 런타임 성능에 영향을 주지 않습니다.

타입과 타입 연산자는 자바스크립트 변환 시점에 제거되기 때문에 런타임의 성능에 아무런 영향을 주지 않습니다.

타입스크립트의 정적 타입은 실제로 비용이 전혀 들지 않습니다.

대신 다음 주의사항이 있습니다.

- 런타임 오버헤드가 없는 대신, 타입스크립트 컴파일러는 “빌드타임"오버헤드가 있습니다. 타입스크립트 팀은 컴파일러 성능을 매우 중요하게 생각합니다. 따라서 컴파일은 일반적으로 상당히 빠른 편이며 특히 증분 빌드시에 더욱 체감됩니다. 오버헤드가 커지면, 빌드 도구에서 트랜스파일만(transpile only)을 선택하여 타입 체크를 건너뛸 수 있습니다.
- 타입스크립트가 컴파일하는 코드는 오래된 런타임 환경을 지원하기 위해 호환성을 높이고 성능 오버헤들르 감안할지, 호환성을 포기하고 성능중심의 네이티브 구현체를 선택할지의 문제에 맞닥뜨릴 수도 있습니다.예를 들어 제네레이터 함수가 ES5타깃으로 컴파일되려면, 타입스크립트 컴파일러는 호환성을 위한 특정 헬퍼 코드를 추가할 것입니다. 이런 경우가 제네레이터의 호환성을 위한 오버헤드 또는 성능을 위한 네이티브 구현체 선택의 문제입니다. 어떤 경우든지 호환서오가 성능 사이의 선택은 컴파일 타기소가 언어 레벨의 문제이며 여전히 타입과는 무관합니다.

## Item 4. 구조적 타이핑에 익숙해지기

자바스크립트는 본질적으로 덕 타이핑 기반입니다.

Duck Typing이란 객체가 어떤 타입에 걸맞은 변수와 메소드를 지니면 객체를 해당 타입에 속하는 것으로 간주하는 것입니다.

만약 어떤 함수의 매개변수 값이 모두 제대로 주어진다면, 그 값이 어떻게 만들어졌는지 신경 쓰지 않고 사용합니다.

```tsx
interface Vector2D {
  x: number;
  y: number;
}
interface NamedVector {
  name: string;
  x: number;
  y: number;
}
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
const v1: Vector2D = { x: 3, y: 4 };
const v2: NamedVector = { x: 3, y: 4, name: 'Zee' };
calculateLength(v1); // 5
calculateLength(v2); // 5
```

Vector2D와 NamedVector에 대한 관계를 전혀 선언하지 않았는데도 정상적으로 동작합니다.

NamedVactor의 구조가 Vector2D와 호환되기 때문입니다. 이를 구조적 타이핑이라고 합니다.

구조적 타이핑 떄문에 문제가 발생하기도 합니다.

3D 벡터와 벡터의 길이를 1로 만드는 정규화 함수를 작성합니다.

```tsx
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}
nomalize({x: 3, y: 4, z:5}) // { x: 0.6, y: 0.8, z: 1}
```

그러나 이 함수는 1보다 더 긴 길이를 가지는 벡터를 반환합니다.

타입스크립트는 오류를 발견하지 못했습니다.

calculateLength는 2D 벡터를 기반으로 연산하는 함수이지만 Vector3D가 2D Vector와 호환되기 때문에 발생한 문제입니다.

함수를 작성할 때 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만을 가질거라 생각하기 쉽습니다. 이러한 타입은 봉인된(sealed)또는 정확한(precise)타입이라고 불리면 타입스크립트 타입 시스템에서는 표현할 수 없습니다. 좋든 실든 타입은 열려 있습니다.

이러한 특성 때문에 가끔 당황스러운 결과가 발생합니다.

```tsx
function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
               // ~~~~~~~ 'string'은 'Vecetor3D'의 인덱스를 사용할 수 없기에
               //         엘리먼트는 암시적으로 any입니다.
    length += Math.abs(coord);
  }
  return length;
}
```

axis는 Vector3D 타입인 v의 키 중 하나이기 떄문에 ‘x’, ‘y’, ‘z’중 하나여야 합니다. 그리고 이들은 모두 number이므로 coord의 타입이 number가 되어야 할 것으로 예상됩니다.

그러나 다음과 같이 작성할 수도 있습니다.

```tsx
const vec3D = {x: 3, y: 4, z: 1, address: '123 Broadway'};
calculateLengthL1(vec3D);  // NaN
```

구조적 타이핑때문에 address 속성을 가지는 vec3D가 인자로 전달되었고 axis타입은 어떤 타입도 될 수 있는것입니다.

이런 경우에는 루프보다는 모든 속성을 각각 더하는 구현이 더 낫습니다.

```tsx
function calculateLengthL1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}
```

구조적 타이핑은 클래스와 관련된 할당문에서도 당황스러운 결과를 보여줍니다.

```tsx
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

const c = new C('instance of C');
const d: C = { foo: 'object literal' };  // OK!
```

d가 C타입에 할당되는 이유는 d가 string타입의 foo 속성을 가지며 Object.prototype으로부터 비롯된 매개변수가 하나인 생성자를 가지므로 C타입에 할당이 가능한 것입니다.

만약 C의 생성자에 단순 할당이 아닌 연산 로직이 존재한다면 d의 경우는 생성자를 실행하지 않으므로 문제가 발생합니다.

이러한 부분이 C타입의 매개변수를 선언하여 C 또는 서브클래스임을 보장하는 C++이나 자바 같은 언어와 매우 다른 특징입니다.

테스트를 작성할 때는 구조적 타이핑이 유리합니다.

```tsx
interface Author {
  first: strng;
  last: string;
}
function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```

getAuthors 함수를 테스트하기 위해서는 모킹한 postgresDB를 생성해야 합니다. 그러나 구조적 타이핑을 활용하여 더 구체적인 인터페이스를 정의하는 것이 더 나은 방법입니다.

```tsx
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```

이와 같이 추상화를 함으로써 로직과 테스트를 특정한 구현으로부터 분리할 수 있습니다.

## Item 5. any 타입 지양하기

타입스크립트의 타입 시스템은 코드에 타입을 조금씩 추가할 수 있기 때문에 **점진적**이며 ****언제든지 타입 체커를 해제할 수 있기 때문에 **선택적**입니다**. 이 기능들의 핵심은 any타입입니다.**

```tsx
let age: number;
age = '12';
// ~~~ Type '"12"' is not assignable to type 'number'
age = '12' as any;  // OK
```

타입 선언을 추가하는 데에 시간을 쏟고 싶지 않아서, any 타입이나 타입 단언문(as any)을 사용하고 싶기도 할 겁니다. 그러나 일부 특별한 경우를 제외하고는 any를 사용하면 타입스크립트의 수많은 장점을 누릴 수 없게 됩니다.

### any 타입에는 타입 안정성이 없습니다.

앞선 예제에서 age는 number타입으로 선언되었습니다. 그러나 as any를 사용하여 string 타입을 할당할 수 있게 됩니다. 타입 체커는 선언에 따라 number타입으로 판단할 것이고 혼돈은 걷잡을 수 없게 됩니다.

```tsx
age += 1;  // "121"
```

### any는 함수 시그니처를 무시해버립니다.

함수를 작성할 때는 시그니처를 명시해야 합니다. 호출하는 쪽은 약속된 타입의 입력을 제공하고, 함수는 약속된 타입의 출력을 반환합니다. 그러나 any 타입을 사용하면 이런 약속을 어길 수 있습니다.

```tsx
function calculateAge(birthDate: Date): number {
  // COMPRESS
  return 0;
  // END
}

let birthDate: any = '1990-01-19';
calculateAge(birthDate);  // OK
```

birthData 매개변수는 string이 아닌 Date타입이어야 합니다. any 타입을 사용하면 calculateAge의 시그니처를 무시하게 됩니다. 자바스크립트에서는 종종 암시적으로 타입이 변환되기 때문에 이런 경우 특히 문제가 될 수 있습니다.

### any 타입에는 언어 서비스가 적용되지 않습니다.

어떤 심벌에 타입이 있다면 타입스크립트 언어 서비스는 자동완성 기능과 적걸한 도움말을 제공합니다. 그러나 any 타입인 심벌을 사용하면 아무런 도움을 받지 못합니다.

타입스크립트의 모토는 확장 가능한 자바스크립트입니다. 확장의 중요한 부분은 바로 타입스크립트 경험의 핵심 요소인 언어 서비스입니다. 언어 서비스를 제대로 누려야 독자 여러분과 동료의 생산성이 향상됩니다.

### any 타입은 코드 리펙터링 때 버그를 감춥니다.

어떤 아이템을 선택할 수 있는 웹 애플리케이션을 만든다고 가정해 보겠습니다. 애플리케이션에는 onSelectItem 콜벡이 있는 컴포넌트가 있을겁니다.

```tsx
interface ComponentProps {
  onSelectItem: (item: any) => void;
}

function renderSelector(props: ComponentProps) { /* ... */ }

let selectedId: number = 0;
function handleSelectItem(item: any) {
  selectedId = item.id;
}

renderSelector({onSelectItem: handleSelectItem});
```

여기서 onSelectItem에 아이템 객체를 필요한 부분만 전달하도록 컴포넌트를 개선해보겠습니다. 여기서는 id만 필요합니다.

```tsx
interface ComponentProps {
  onSelectItem: (id: number) => void;
}
```

컴포넌트를 수정하고 타입 체크를 모두 통과했습니다. 하지만 handleSelectItem은 any 매개변수를 받습니다. 따라서 id를 전달받아도 무넺가 없다고 나옵니다. 그러나 id를 전달받으면 타입 체커를 통과함에도 불구하고 런타입에는 오류가 발생합니다.

### any는 타입 설계를 감춰버립니다.

애플리케이션 상태 같은 객체를 정의하려면 꽤 복잡합니다. 상태 객체 안에 있는 수많은 속성의 타입을 일일이 작성해야 하는데, any타입을 사용하면 간단히 끝내버릴 수 있습니다.

하지만 이때도 any를 사용하면 안됩니다. 상태 객체의 설계를 감춰버리기 때문입니다. 만약 동료가 코드를 검토해야 한다면 동료는 애플리케이션의 상태를 어떻게 변경했는지 코드부터 재구성해 봐야 합니다. 그러므로 설계가 명확히 보이도록 타입을 일일이 작성하는 것이 좋습니다.

### any는 타입시스템의 신뢰도를 떨어뜨립니다.

사람은 항상 실수를 합니다. 보통은 타입 체커가 실수를 잡아주고 코드의 신뢰도가 높아집니다. 그러나 런타임에 타입 오류를 발견하게 된다면 타입 체커를 신뢰할 수 없을 겁니다. 대규모 팀에 타입스크립트를 도입하려는 상황이라면 타입 체커를 신뢰할 수 없는 상황이 큰 문제가 될 겁니다. any타입을 쓰지 않으면 런타입에 발견될 오류를 미리 잡을 수 있고 신뢰도를 높일 수 있습니다.

코드 내에 존재하는 수많은 any타입은 일을 더 어렵게 만듦니다. 타입 오류를 고쳐야 하고 여전히 머리속에는 실제 타입을 기억해 둘 필요가 있기 때문입니다. 타입이 실제 값과 일치한다면 타입 정보를 기억해 둘 필요가 없습니다. 타입스크립트가 타입 정보를 기억해 주기 때문입니다.

## 참고자료

<이펙티브 타입스크립트> [Dan Vanderkam](https://github.com/danvk), 프로그래밍 인사이트 (2021)

```toc

```
