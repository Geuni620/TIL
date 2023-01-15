# TypeScript

## 리터럴로 타입 좁히기

> 한 블로그 글에서 Date type을 아래 코드처럼 작성했음.(블로그를 찾지 못함...)  
> 그냥 따라했을 뿐인데 알게된 것들이 있음.  
> 이를 기록하고자 한다.

```TSX
// DateFormat
export type DateFormat = `${number}-${number}-${number}`;
export interface UserInfoProps {
  birthday: DateFormat;
  signUpDate: DateFormat;
}
```

단순 String으로 작성해도 되지만 이렇게 작성했을 때 이점이 있음.

<br>

```TS

//utils/DateFormat
export const formatDate = ({format, date}: DateFormatter): FormattedDate => {
  const theDate = dayjs(date);
  const formattedDate: FormattedDate = {};

  format.forEach((key) => {
    formattedDate[key] = theDate.get(key);

    if (key === "month") {
      formattedDate[key] += 1;
    }
  });

  return formattedDate;
};

const {year, month, date} = formatDate({
    format: ['year', 'month', 'date'],
    date: new Date(),
});

// index.tsx
const today: DateFormat = `${year}-${month}-${date}`;
console.log(today); // 2023-1-15
```

<br>

- 여기서 헷갈렸던 부분이 year, month, date는 number 타입으로 지정되어 있지만, **DateFormat은 리터럴타입이다.**  
  예시로 의미를 좀 더 명확히 해보자면,

```TS
const a: DateFormat = `${2023}-${1}-${15}`; // Error X
const b: DateFormat = `${aaaa}-${1}-${15}`; // Error O (a는 number에 해당되지 않기 때문.)
const c:string = `${2023}-${1}-${15}`; // Error X
const d:string = `${aaaa}-${b}-${cc}`; // Error X
const e: DateFormat = `${a123}-${1}-${31}`; // Error O

console.log(a, b, c, d);
```

그래서 DateFormat으로 타입을 지정할 경우, IDE상에서 Error를 띄울 수 있어 좀 더 방어적으로 코드를 작성할 수 있음.

<br>

TimeFormat을 지정할 때도 같은 방법으로 적용했음.

```TSX
export type TimeFormat = `${number}:${number}`;

  const changeFormat = <T extends DateFormat | TimeFormat>({
    key,
    selectedDate,
  }: ChangeFormat): T => {

    if (key === 'time') {
      const [hour, minute] = selectedDate.split(':');
      return `${hour}:${minute}` as T;
    }
  };

  return(
    <TimeInput
    type="time"
    value={hwaSumNFTInfo.bookingTime}
    isRightNowRegistration={isRightNowRegistration}
    onChange={(e) =>
        appendHwaSumNFTInfo(
        'bookingTime',
        changeFormat<TimeFormat>({
            key: 'time',
            selectedDate: e.target.value,
        }),
        )
    }
    />
)
```

- 여기서 **selectedDate.split를 하고 난 후 map을 통해서 숫자로 변경시켜줘야한다고 생각했는데, 그렇지 않았음.**
- TimeFormat 역시 리터럴 타입이기 때문에, `${1}:${23}은 가능하지만 ${aa}-${bb}는 불가능함.`
- 그래서 TimeFormat을 그냥 String으로 해도 되지 않을까? 하는 고민도 했었는데, 같은게 아니었음.  
  (이유는 위 a,b,c,d로 들었던 예시를 적용해보며 TimeFormat과 DateFormat 타입이 String보다 더 강하게 타입을 매긴 것이기 때문.)

<br>

### 참고자료

[리터럴 타입 좁히기 (Literal Narrowing)](https://typescript-kr.github.io/pages/literal-types.html)
