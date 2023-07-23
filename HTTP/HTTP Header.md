# HTTP Header

## 일반헤더

### 헤더의 개요

- HTTP전송에 필요한 모든 부가 정보
  - 메세지 바디의 내용, 메세지 바디의 크기, 압축, 인증, 요청클라이언트, 서버정보, 캐시관련정보 등등
- 표준 헤더가 너무 많음
- 필요시 임의의 헤더 추가가능

<br>

### Entity 헤더

- Content-Type : text/html, Content-Length : 3423
- 메세지 본문은 엔티티 본문을 전달하는데 사용됨.
- 엔티티본문은 요청이나 응답에서 전달할 실제 데이터
- 엔티티 헤더는 엔티티본문의 데이터를 해석할 수 있는 정보제공
  - 데이터 유형(HTML, Json), 데이터 길이, 압출정보 등등

<br>

그런데,

HTTP 표준 스펙이 바뀜, 위에 내용은 이전 스펙.

- 엔티티 → 표현 (완전히 1:1 대응되는건 아니지만,)
- 표현 = 표현 메타데이터 + 표현 데이터

### 최신 HTTP 스펙

- 메세지본문을 통해 표현데이터 전달
- 메세지 본문 = 페이로드
- 표현은 요청이나 응답에서 전달할 실제 데이터
- 표현헤더는 표현데이터를 해석할 수 있는 정보 제공
  - 데이터 유형(http/json), 데이터 길이, 압축 정보 등등

<br>

### 표현에 관련된 헤더들

- Content-Type: 표현 데이터의 형식(json?, XML?, html?)
- Content-Encoding: 표현 데이터의 압축 방식
- Content-Language: 표현 데이터의 자연 언어(한국어인지, 영어인지 등등)
- Content-Length: 표현 데이터의 길이

<br>

- 표현 헤더는 전송, 응답 둘다 사용

**Content-Type**

- Content body에 들어가는 내용이 뭐야?
- 예를 들어 html이 들어갔다고 가정하면 → `text/html`
- json이 들어갔다고 가정하면 → `application/json`
- image/png 등등

<br>

**Content-Encoding**

- 표현데이터를 압축하기 위해 사용
- 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
  - ex: `content-encoding: gzip`
- 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제

<br>

**Content-Language**

- 표현 언어의 자연 언어를 표현
- ko, en, en-US

<br>

**Content-Length**

- 표현데이터의 길이
- 바이트 단위
- Transfer-encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨
  - 내용이 중복되기 때문, Transfer-encoding을 사용하면 Content-Length의 내용이 다 들어있음.

<br>
