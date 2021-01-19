﻿


# 4장 커넥션 관리

 
## 4.1 &nbsp;&nbsp; TCP 커넥션 💨

>전세계의 HTTP 통신은 패킷 교환 네트워크 프로토콜들의 계층화된 집합인 TCP/IP를 통해 이루어진다.

<br/>
1. 다음은 웹서버가 TCP 커넥션을 통해 웹 서버에게 요청을 보내는 개략적인 과정이다.   <br/>

	1. 브라우저가 URL로부터 호스트명을 추출한다.
	2. 브라우저가 호스트명에 대한 ______를 찾는다.
	3. 브라우저가 ______를 얻는다.
	4. 브라우저가 IP주소의 포트번호로 ___ 커넥션을 생성한다.
	5. 브라우저가 서버로 HTTP ______를 전송한다.
	6. 브라우저는 서버에서 온 _______를 읽는다.
	7. 브라우저가 커넥션을 _____.

<br/>
2. 다음은 HTTP 네트워크 프로토콜 스택이다. 빈칸을 채우시오.   

| _____ | 애플리케이션 계층 |
|:----------:|----------|
| _____ | 전송 계층 |
| _____| 네트워크 계층 |
| Network Interfaces| 데이터 링크 계층 |

 +) 2-1. HTTPS는 HTTP와 TCP 사이에  TLS or SSL이란 보안 기능을 더한 암호화 계층이 더 있는 것이다. (O/X) <br/><br/>
 3. TCP는 ______이라고 불리는 작은 조각을 통해 데이터를 전송한다. <br/><br/>
4. TCP 커넥션은 `발신지 IP 주소`, `발신지 포트`,`수신지 IP 주소`,`수신지 포트`로  식별한다. (O/X)<br/><br/>
5. 다음은 클라이언트와 서버가 HTTP 트랜잭션을 수행하기 위해 소켓 API를 사용하는 과정이다. 역할의 대상을 알맞게 채우시오. <br/>

| [ _____ ] | [ _____ ] |
|---------|---------|
||새로운 소켓을 만든다.(socket)|
||포트와 소켓을 묶는다.|
||소켓 커넥션을 허가한다.(listen)|
||커넥션을 기다린다.(accept)|
|IP주소와 포트를 얻는다.||
|새로운 소켓을 생성한다.||
|서버의 IP와 포트로 연결한다.||
||애플리케이션 커넥션 통지한다.|
||요청을 읽기 시작한다.(read)|
|성공적 연결 확인||
|HTTP 요청을 보내고 응답을 기다린다.(write, read)||
||HTTP 요청 메시지를 처리하고 HTTP 응답을 보낸다.(write)|
|HTTP 응답을 처리한다.||
|커넥션을 닫는다.|커넥션을 닫는다.|
<br/>
<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. ip 주소, 포트번호, TCP, 요청 메시지, 응답 메시지, 끊는다
	    2. HTTP , TCP, IP  (2-1 : O)
	    3. IP 패킷
	    4. O, 네가지 중 하나라도 다르면 다르 커넥션
	    5. client, server ;TCP/IP 소켓 통신의 전반적인 흐름을 기억하고자 낸 문제
	    
</details>

## 4.2 &nbsp;&nbsp; TCP의 성능에 대한 고려 💭
1. HTTP 트랜잭션의 성능은 IP 성능에 영향을 받는다. (O/X) 

2. 대부분의 HTTP 지연은 TCP 네트워크 지연 때문에 발생한다. (O/X)

3. 다음 중 HTTP 트랜잭션을 지연시키는 원인으로 옳은 것을 모두 고르시오.<br/>
&nbsp;&nbsp;(ㄱ) DNS 이름 분석 인프라를 사용해 URI에서 IP 주소로 변환하는 과정에서의 시간 소요<br/>
&nbsp;&nbsp;(ㄴ) TCP 커넥션 요청을 서버에게 보내고, 서버로부터 커넥션 허가 응답 회신을 기다리는 과정에서의 시간 소요<br/>
&nbsp;&nbsp;(ㄷ) 요청 메시지가 전달되고, 서버에 의해서 처리되는데까지의 시간 소요<br/>
&nbsp;&nbsp;(ㄹ) 웹 서버가 HTTP 응답을 보내는데의 시간 소요<br/>
	<details>
	    <summary> TCP 네트워크의 지연</summary>
	    <div markdown="1">
	    
	    TCP 네트워크 지연 정도는 하드웨어 성능, 네트워크와 서버의 전송속도, 요청 및 응답 메시지의 크기,
	    클라이언트와 서버 간의 거리, TCP 프로토콜의 기술적 복잡성에 따라 크게 달라질 수 있습니다.
	    
	</details>

####  - TCP 관련 지연
> + TCP 커넥션의 핸드셰이크 설정<br/>
> + TCP의 느린 시작<br/>
> + 네이글 알고리즘<br/>
> + TCP의 편승 확인응답 지연 알고리즘<br/>
> + TIME_WAIT 지연과 포트 고갈<br/>

4. 크기가 작은 HTTP 트랜잭션은 50%의 이상의 시간을 TCP를 구성하는데 쓴다. (O/X)
	<details>
	    <summary> TCP  커넥션 핸드셰이크 지연</summary>
	    <div markdown="1">
	    
	    TCP는 데이터를 전송하기 전에 TCP 커넥션 설정을 위해 SYN과 ACK 플래그를 포함한 TCP 패킷들을 사전에 주고 받습니다.
	    그리고 이러한 시간이 작은 데이터를 교환하는 경우라면 트랜잭션의 50% 이상의 시간을 차지할 수도 있게 되는 것입니다.
	    
	</details>
5. 확인응답 지연 알고리즘이란 확인 응답이 편승되어 버리는 경우를 줄이기 위해 일정 시간동안 확인응답을 버퍼에 저장해두는 것을 의미한다. (O/X)
6. 확인응답 지연 기능을 수정하거나 비활성화할 수 있다. (O/X)
7. 새로 만든 TCP 커넥션은 이미 만들어진지 오래되어 데이터를 주고받은 커넥션보다 빠르다. (O/X)
	<details>
		    <summary> TCP  느린 시작</summary>
		    <div markdown="1">
		    
		    TCP 커넥션은 처음에는 최대 속도와 한 번에 전송할 수 있는 패킷의 수를 제한하지만
		    시간이 지나면서 자체적으로 튜닝되어 속도를 높여갑니다.
		    이처럼 인터넷의 갑작스러운 부하와 혼잡을 방지하는 방식을 `느린 시작`이라 합니다.
		    
	</details>
8. 네이글 알고리즘은, 네트워크의 효율을 위해 패킷을 전송하기 전에 많은 양의 TCP 데이터를 한 개의 덩어리로 합치는 것을 말한다. (O/X) <br/>
9. 네이글 알고리즘의 단점을 보완하기 위해서 확인응답 지연 알고리즘이 사용된다. (O/X) <br/><br/>
<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. X ;HTTP 트랜잭션은 바로 아래 계층인 TCP 영향을 받는다.
	    2. O ;트랜잭션 처리 시간은 TCP 커넥션 설정, 요청, 응답 보내고 기다리는거에 비해 굉장히 짧음
	    3. 모두 맞음.
	    4. O ;문제 하단에 설명.
	    5. X ;같은 방향으로의 편승을 '증가'시키기 위해 일정 시간 기다리는 것.
	    6. O ;운영체제에 따라 다르지만, 지연의 원인이 되는 확인응답 지연 관련 기능을 수정하거나 비활성화할 수 있다. (p.95)
	    7. X ;TCP 커넥션은 시간이 지나면서 자체적으로 튜닝되어 
	          커넥션의 최대속도와 한번에 보낼 수 있는 패킷의 수가 점점 증가한다.
	          따라서 생긴지 오래되어 데이터를 주고받은 커넥션일수록 빠르다.
	    8. O
	    9. X ;네이글 알고리즘은 확인응답 지연과 함께 쓰일 경우 형편없이 동작한다.(p.97)
	    
</details>
<br/>

## 4.3 &nbsp;&nbsp; HTTP 커넥션 관리 🤝🏻
1. 다음은 HTTP Connection 헤더에 대한 설명이다. 잘못된 부분을 제대로 고치시오.

```
HTTP Connection 헤더에는 `HTTP 헤더 필드 명`,`임시적 토큰 값`,`close 값`이 전달될 수 있으며,
Connection 헤더를 통해 해당 옵션을 목적지까지 무사히 전달할 수 있다. 
```

<br/>
<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. '목적지까지 무사히 전달'이 수정되어야 한다.
	    ; 목적지가 아니라 홉별로, 목적지가 아니라 현재 커넥션만을 위한 정보라
	      다음 커넥션에 전달하면 안됨, 다음 홉에 전달하기 전에 삭제
	    
</details>

<br/>

## 4.4 &nbsp;&nbsp; 병렬 커넥션 🔎
> 이어서는 순차적인 단일 커넥션이 지니는 단점을 극복하고, HTTP 커넥션의 성능을 향상시킬 수 있는 최신 기술들을 나열하고 있다.

1. HTTP는 여러 개의 커넥션을 맺음으로써 여러 HTTP 트랜잭션을 병렬로 처리할 수 있고, 이로 인해 단일 커넥션보다 항상 빠르다. (O/X)   

2.  브라우저는 (많은/적은) 수의 병렬 커넥션을 허용한다.

<br/>
<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. X ;병렬 커넥션을 이용하면 대역폭 제한과 대기시간을 줄일 수 있어
	          더 빠르게 페이지를 내려 받을 수 있어 일반적으로 더 빠르지만,
	          클라이언트의 네트워크 대역폭이 좁거나 많은 커넥션을 형성 시 여러 개의 커넥션을 
	          생성하면서 생기는 부하 때문에 객체들을 순차적으로 내려받는게 더 빠를 수도 있다.
	    2. 적은 ;다수의 커넥션은 서버의 성능을 떨어뜨리기 때문에 실제로는 적은 수의 병렬 커넥션만을 허용한다.
	    
</details>
<br/>

## 4.5 &nbsp;&nbsp; 지속 커넥션 ➰
1.  지속 커넥션을 재사용하여 커넥션을 맺기 위한 준비작업에 따르는 시간을 절약할 수 있다.  (O/X)<br/>

2. 다음은 병렬 커넥션과 지속 커넥션을 정리한 표이다. 표를 채우시오.

| -  | 병렬 커넥션 | 지속 커넥션 |
|---|:-------------:|:---------------:|
| 장점 | a |b |
| 단점 |c | d|
<br/>

`(ㄱ) 튜닝된 커넥션을 유지하여 사전 작업과 지연을 줄여줌`<br/>
`(ㄴ) 여러 객체가 있는 페이지의 빠른 로딩`

`(1) 각 트랜잭션마다 새로운 커넥션을 맺고 끊으며 시간과 대역폭이 소요된다.`<br/>
`(2) 연결 상태의 커넥션 누적으로 불필요한 소모 발생`<br/>
`(3) 각각의 새로운 커넥션은 TCP 느린 시작 때문에 성능이 떨어진다`
<br/><br/>

> 지속 커넥션 타입에는 HTTP/1.0+의 'keep-alive' 커넥션과 HTTP/1.1의 '지속' 커넥션이 있다.
3. 멍청한 프락시는 Connection:Keep-Alive  헤더를 이해하지 못하고 다음으로 그대로 전달한다. (O/X)
4. 다음 문장에서 틀린 점을 찾아 고치시오.

```
멍청한 프락시 문제를 해결하기 위해 Proxy-Connection 비표준 확장 헤더를 사용하며,
영리한 프락시는 Proxy-Connection을 Connection 헤더로 바꾸어 원하는 효과를 얻는다. 
따라서 Proxy-Connection을 통해 멍청한 프락시와 영리한 프락시가 양 옆에 있을 때에도 
문제없이 동작할 수 있는 것이다.
```

5. HTTP/1.1에서는 별도의 설정을 하지 않는 한, 모든 커넥션을 지속 커넥션으로 취급한다. (O/X)
<br/>
<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. O
	    2. ㄴ/ㄱ
	       1,3/2
	    3. O ;'멍청'한 프락시는 Connection:Keep-Alive 헤더를 그대로 전달하기 때문에
	         클라이언트와 서버는 Keep-Alive인줄 아는데 프락시 혼자 종료를 기다리게 되어
	         다음 요청 메시지를 제대로 처리하지 못하게 되는 문제가 생김.
	    4. '양 옆에 있을 때에도 문제없이 동작'하지 못한다. p.112의 그림 4-17을 참고하면,
	        영리한 프락시가 있어도 여전히 잘못된 헤더를 만들어낸다. 우리의 '멍청'한 프락시.
	    5. O

	    
</details>
<br/>

## 4.6 &nbsp;&nbsp; 파이프라인 커넥션 🧊
1. HTTP 클라이언트는 POST와 같은 비멱등 요청은 파이프라인을 통해 보내면 안된다. (O/X)
<br/>
<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. O ;HTTP 클라이언트는 POST 요청같이 수행했을 때마다 결과가 달라질 수 있는 
	          요청은 파이프라인으로 보내면 안된다.
	          에러가 발생하면 파이프라인을 통한 요청 중 어떤 것들이 서버에서 처리되었는지 클라이언트가
	          알방법이 없기 때문이다.
	    
</details>
<br/>

## 4.7 &nbsp;&nbsp; 커넥션 끊기에 대한 미스터리 💦
1. 다음 중 커넥션 끊기에 대한 설명으로 옳은 것을 모두 고르시오.<br/>
	(ㄱ) 어떠한 클라이언트나 서버, 프락시도 함부로 TCP 전송 커넥션을 끊을 수 없다.<br/>
	(ㄴ) 서버는 아직 처리되지 않은 요청을 남겨둔 채 커넥션을 끊을 수 없다.<br/>
	(ㄷ) '우아하게' 커넥션을 끊는 것은 자신의 출력채널을 먼저 절반 끊기 한 다음, 다른 쪽의 출력 채널이 끊기는 것을 기다리는 것이다.<br/>
	(ㄹ) `전체 끊기` :  TCP 커넥션의 입력과 출력 채널의 커넥션을 모두 끊기 위해 close()를 사용한다.<br/>
	(ㅁ) `절반 끊기` : 입력 채널이나 출력 채널 중 하나만을 개별적으로 끊기 위해 shutup()을 사용한다.<br/>

<details>
	    <summary> 정답</summary>
	    <div markdown="1">
	    
	    1. (ㄴ), (ㄷ), (ㄹ)
	    (ㄱ) 언제나 TCP 커넥션을 끊을 수 있다.
	    (ㅁ) 아쉽게도 shutup은 없다. 절반끊기를 위해서는 shutdown()을 사용한다.
	    
</details>
<br/>