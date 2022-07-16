# TypeScript

## API 타입지정, enum 활용

```TS
enum CovidState {
  Confirmed = "confirmed",
  Recovered = "recovered",
  Deaths = "deaths",
}

function fetchCountryInfo(countryCode: string, status: CovidState) {
  // status params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryCode}/status/${status.}`;
  return axios.get(url);
```

- status로 들어오는 값은 딱 3가지로 규정되어 있었음.
  - `status params: confirmed, recovered, deaths`
  - 즉, CovidState enum으로 3개의 값을 지정해줄 수 있음.

```TS
const {data: deathResponse} = await fetchCountryInfo(selectedId, "deaths");
const {data: recoveredResponse} = await fetchCountryInfo(
    selectedId,
    "recovered"
);
const {data: confirmedResponse} = await fetchCountryInfo(
    selectedId,
    "confirmed"
);
```

- enum은 값들이 정해져있고, 이 값들의 집합이 enum.
- 위의 fetchCountryInfo 함수에 매개변수 status에 CovidState라는 enum을 지정해주면 아래 다음과 같은 사이드에러가 발생함

<br>

![사이드이펙트에러](../screen/side-effect%20error.png)

- enum을 지정해줬으니 다음과 같이 수정해줌

```TS
const {data: deathResponse} = await fetchCountryInfo(selectedId, CovidState.Deaths);
const {data: recoveredResponse} = await fetchCountryInfo(
    selectedId,
    CovidState.Recovered
);
const {data: confirmedResponse} = await fetchCountryInfo(
    selectedId,
    CovidState.Confirmed
);
```

- CovidState.enum 을 활용해서 state를 지정해줌
