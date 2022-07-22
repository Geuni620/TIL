# TypeScript

## axios 라이브러리 타입 적용
> axios로 불러온 데이터의 타입도 같이 매겨보자.

```TSX
interface CovidSummaryResponse{
  Countries: any[];
  Date: string;
  Global: any;
  ID: string;
  Message: string;
}

// api
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  const url = "https://api.covid19api.com/summary";
  return axios.get(url);
}
```

- axios를 import시켜주고 fetchCovidSummary라는 함수를 만듦

  - 여기서 fetchCovidSummart는 axios.get()을 리턴함
  - 타입으로 `Promise<AxiosResponse<CovidSummaryResponse>>`로 매겨줌

- CovidSummaryResponse의 interface에 작성한 타입은 다음과 같이 확인 할 수 있음.

<br>

![interface매기기](/screen/api%20data%20interface%20%EB%A7%A4%EA%B8%B0%EA%B8%B0.png)

1. chrome network 창을 열어줌
2. filter에서 fetch/XHR 클릭
3. 불러와진 데이터(summary) 클릭
4. Header에서 status 200떴는지 확인 후 preview 클릭
5. preview를 그대로 복사 붙여넣기 하고 하나씩 보면서 타입매기기

- axios의 `AxiosResponse`는 import시 가져오기
  - `import axios,{AxiosResponse} from 'axios'`
