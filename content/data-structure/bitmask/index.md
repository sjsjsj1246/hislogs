---
emoji: 🤿
title: '비트마스크'
date: '2021-10-15 19:00:00'
author: sjsjsj1246
tags: 자료구조
categories: 자료구조
---

안녕하세요. 이번 글에선 비트마스크의 개념과 사용법, 그리고 간단한 예제를 알아보도록 하겠습니다.

시작하기 전에 비트마스크의 개념을 이해하기 위해서 비트의 표현법과 비트 연산, 보수연산 등을 알면 좋습니다.


## 1. 비트마스크란?

현대의 모든 CPU는 이진수를 이용해 모든 자료를 표현합니다. 따라서 컴퓨터들은 이진법과 관련된 연산들을 아주 빠르게 할 수 있습니다. 이와 같은 특성을 이용해 이진수 표현을 자료구조(특히 집합)로 쓰는 기법을 비트마스크(bitmask)라고 합니다. 엄밀히 말하면 비트마스크는 자료구조의 한 종류라기보단 이진수 표현을 이용해 집합을 표현하는 하나의 테크닉이라고 할 수 있습니다.

## 2. 비트마스크를 쓰면 좋은 점

**(1) 빠른 수행시간** : 비트마스크 연산은 O(1)에 구현되는 것이 많기 때문에, 적절히 사용 할 경우 다른 자료구조를 사용하는 것보다 훨씬 빨리 동작합니다.

**(2) 간결한 코드** : 다양한 집합 연산들을 반목문등을 쓰지 않고 비트 연산의 특성을 이용해 한줄에 쓸 수 있기 때문에 짧은 코드를 작성할 수 있습니다.

**(3) 적은 메모리 사용** : 비트마스크를 이용하면 같은 데이터를 더 적은 메모리를 사용해 표현할 수 있습니다. 이것이 사실 비트마스크를 사용하는 가장 큰 이유이며 공간 복잡도를 많이 줄일 수 있습니다.

## 3. 정수의 이진수 표현

컴퓨터는 모든 정수형 변수를 이진수로 표현합니다. 이진수의 한 자리를 비트(bit)라고 부르며 0또는 1의 값을 가질 수 있습니다.

예를 들어 C언어의 unsigned short 형을 봅시다.

이는 16비트의 크기를 가지고 있으며 최소 0000 0000 0000 0000(2) = 0 부터 1111 1111 1111 1111(2) = 65535 까지 값을 가질 수 있습니다. 하지만 이대로는 음수를 표현할 수 없습니다.

![img](https://t1.daumcdn.net/cfile/tistory/99621C4C5B3FDB6102)

컴퓨터는 부호있는 정수형을 표현하기 위해 맨 왼쪽 비트(최상위 비트)를 부호를 나타내는 값으로 사용합니다. 0이면 양수 1이면 음수를 나타냅니다.

예를들어 부호있는 8비트 정수형 자료형이 있다고 치면 0000 1010(2) = 10 이렇게 나타낼 수 있고 음수는 2의 보수라는 것을 이용해 표현합니다. 이에 대한 자세한 내용은 생략하겠습니다. -10은 모든 비트를 반전시킨 후 1을 더하면 됩니다. 그러면 1111 0110(2) = -10 입니다. 실제 이 두 이진수를 더하면 1 0000 0000(2)이 나오고 비트수는 8개 이므로 0을 표현하게 됩니다.

![img](https://t1.daumcdn.net/cfile/tistory/996669455B3FDBF20B)

## 4. 비트 연산자

이 글에선 비트 연산의 종류와 간단한 예만 살펴보도록 하겠습니다.

![img](https://t1.daumcdn.net/cfile/tistory/9979F0385B41116121)

![img](https://t1.daumcdn.net/cfile/tistory/996CD1385B41116122)

## 5. 비트마스크를 이용한 집합의 구현

비트마스크는 원소의 유무를 0과 1 로 표현함으로써 집합을 표현할 수 있도록 합니다.

예를 들어 집합

![img](https://t1.daumcdn.net/cfile/tistory/99F8FA4D5B41132528)이 있다고 해봅시다. 10의자리 이진수로는 0부터 9번째 원소의 존재유무를 다음과 같이 표현할 수 있습니다.

![img](https://t1.daumcdn.net/cfile/tistory/99C9584C5B4113E728)

이와 같이 원소의 자리에 해당하는 비트의 값을 통해 집합을 표현할 수 있습니다.

본격적으로 C언어로 비트마스크를 활용해 봅시다. 20개의 원소가 있는 집합을 생각해 봅시다.

### (1) 꽉 찬 집합 구하기

먼저 모든 원소가 존재하는 경우를 표현하면 다음과 같습니다.

```c++
int set = (1 << 20) - 1;
```

1<<20을 하면 상위의 1뒤에 20개의 0이 존재하고 1을 빼면 20개의 비트가 1의 값을 가지게 되고 모든 원소가 존재함을 표현합니다.

### (2) 원소 추가

원소를 추가한다는 것은 그 원소에 해당하는 비트를 1로 만든다는 것과 같습니다.

p번째 원소를 추가하고 싶다고 하면 다음과 같이 표현할 수 있습니다.

```c++
set |= ( 1 << p );
```

### (3) 원소의 포함 여부 확인

해당 원소에 해당하는 비트값이 1이면 되므로 찾고자 하는 원소의 위치가 p일때, 집합과 (1<<p)를 AND연산해서 0이면 해당 원소가 없는 것입니다. 주의할 점은 원소가 있을경우 값이 1이 아니라 1<<p라는 것입니다.

```c++
if (set & (1 << p)) printf("OK");
```

### (4) 원소의 삭제

단순히 해당 비트에 1을 빼주면 될 것 같지만 해당 비트가 원래 0이었다면 문제가 생기게 됩니다. 따라서 다음과 같이 해봅시다.

```c++
set &= ~(1 << p);
```

p번째 자리를 제외한 모든 원소를 1로만들고 AND해주면 p번째 자리만 0이 됩니다.

이렇게 하면 문제없이 제거할 수 있습니다.

### (5) 원소의 토글

토글이란 해당 비트가 꺼져 있으면 켜고 켜져 있으면 끄는 것입니다. 이는 XOR연산을 이용하면 될 것 같습니다. 둘다 1이면 0을 반환하고 둘의 값이 다르면 1을 반환하는 것을 생각해 보세요.

```c++
set ^= (1 << p);
```

### (6) 집합간의 연산

비트마스크를 이용해 집합간의 연산을 간단히 할 수 있습니다. a와 b에대해 연산을 하는 경우를 봅시다.

```c++
int added = (a | b);        //a와 b의 합집합
int intersection = (a & b); //a와 b의 교집합
int removed = (a & ~b);     //a에서 b를 뺀 차집합
int toggled = (a ^ b);      //a와 b중 하나에만 포함된 원소들의 집합
```

### (7) 집합의 크기 구하기

비트마스크를 이용해 집합을 구현할 때 원소의 수를 구하는 간단한 방법은 딱히 없습니다. 따라서 모든 원소를 순회하면서 비트가 켜져있는지 확힌해야 합니다.

```c++
int bitCount(int x)
{
    if(x == 0) return 0;
    return x%2 + bitCount(x/2);
}
```

### (8) 최소 원소 찾기

집합의 최소 비트를 구해봅시다. 예를들어 1010 1000 에서 최소원소의 값인 1000을 구하는 방법입니다. 이는 2의 보수라는 컴퓨터 특성을 이용하면 편리합니다. 일단 한번 봅시다.

```c++
int first = (set & -set);
```

1010 1000에 -를 붙이게 되면 2의 보수를 취하게 됩니다. 0101 1000이 됩니다. 2의 보수의 특성상 최하위인 켜진 비트부터 끝까지는 유지된 채 나머지 비트는 반전되어 있습니다. 이특성을 이용하여 해당 원소의 값을 바로 얻을 수 있는 것입니다.

### (9) 최소원소 지우기

먼저 코드를 봅시다.

```c++
set &= (set -1);
```

집합에 1을 빼주면 켜져있는 최하위 비트가 0이 되고 그 뒤는 전부 1이 됩니다. 0101 1000 을 예로들면 0101 0111이 됩니다.

이상태에서 AND연산을 해주면 0101 0000이 되고 최소 원소가 지워진 것을 알 수 있습니다.

## 6. 예제 문제

비트마스크는 알고리즘 관련 문제를 풀 때는 주로 공간복잡도를 줄이는 용도로 사용되며 동적계획법등과 같이 사용되는 경우가 많습니다.

본문에서는 주로 집합으로 사용하였으나 단순히 공간복잡도를 줄이거나 비트연산의 장점을 이용하기 위해 사용하기도 합니다.

문제를 직접 풀면서 공부해 보시기 바랍니다.

(1) 알고스팟 - 졸업학기 : https://algospot.com/judge/problem/read/GRADUATION

(2) 백준 - 외판원 순회 : https://www.acmicpc.net/problem/2098

질문 환영합니다. 오류가 있다면 말해주세요.

```toc

```