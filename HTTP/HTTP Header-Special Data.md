# HTTP Header

### Host

요청한 호스트 정보(도메인)

- 요청에서 사용
- **필수**
- 하나의 서버가 여러 도메인을 처리해야 할 때
- 하나의 IP 주소에 여러 도메인이 적용되어 있을 때

<br>

### Location

리다이렉션 정보

- 웹 브라우저는 3xx 응답의 결과에 Location header가 있으면, Location 위치로 자동이동(리다이렉트)
- 201 (Created) 응답의 결과에도 Location header가 있으면, 해당 리소스가 생성된 위치를 알려줌.
- 3xx(Redirection): Location 값은 요청을 자동으로 리디렉션하기 위해 대상 리소스를 가리킴.

<br>

### Allow

허용 가능한 HTTP 메서드

- 405 (Method Not Allowed) 에서 응답에 포함해야함.
- Allow: GET, HEAD, PUT
- URL 경로는 있는데, GET, HEAD, PUT은 지원하지만 POST를 지원하지 않는다고 가정해보자
- 이때 405 에러를 내리면서, 응답으로 GET, HEAD, PUT정도만 지원한다고 보내줘야함. 그래야 클라이언트가 인식할 수 있음.

<br>

### Retry-After

유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간(초)을 알려줌.

- 503 (Service Unavailable)에서 서비스가 언제까지 불능인지 알려줄 때 사용.
- Retry-After: 날짜표기 또는 초단위 표기 가능
  - Retry-After: 120
  - Retry-After: Fri, 31 Dec 1999 23:59:59 GMT
