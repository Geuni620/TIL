# TypeScript

## 타입의 매칭이 되지 않을 때

> innerText는 string이고, reduce는 total값을 구하기위한 배열 메서드임 즉, Number인데 둘의 타입이 상이해서 에러가 발생함

![toString으로 타입변환](/screen/innerText.toString%EC%A0%81%EC%9A%A9.png)

```TSX
function setTotalConfirmedNumber(data: CovidSummaryResponse) {
  confirmedTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalConfirmed),
    0
  ).toString();
}
```

- number로 매겨져있으면 .toString()으로 변경시켜주면 됨.

<br>

## MouseEvent vs const onMaskClick = (e: React.MouseEvent<HTMLElement>) => {
