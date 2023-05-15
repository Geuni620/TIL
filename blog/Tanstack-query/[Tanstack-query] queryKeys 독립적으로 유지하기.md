### queryKeys 독립적으로 유지하기

```TSX
// useRevisitRateQuery
const useRevisitRateQuery = () => {
  const [selectedIsland, setSelectedIsland] = useState<string>('jejodo');
  const [selectedDate, setSelectedDate] = useState(getPreviousWeekDates());

  const fallback: null[] = [];
  const { data: revisitRate = fallback } = useQuery(
    [queryKeys.stayTime, selectedIsland],
    () =>
      getRevisitRate({
        island: selectedIsland,
        startDate: selectedDate.startOfLastWeek,
        endDate: selectedDate.endOfLastWeek,
      }),
    {
      select: (data) => snakeCaseToCamelCaseObject(data),
    },
  );

  return { revisitRate };
};

export default useRevisitRateQuery;

```

<br>

```TSX
// useStayTimeQuery
const useStayTimeQuery = () => {
  const [selectedIsland, setSelectedIsland] = useState<string>('jejodo');

  const fallback: null[] = [];
  const { data: stayTime = fallback } = useQuery(
    [queryKeys.stayTime, selectedIsland],
    () => getStayTime({ island: selectedIsland }),
    {
      select: (data) => snakeCaseToCamelCaseObject(data),
    },
  );

  return { stayTime };
};

export default useStayTimeQuery;
```

- 두 파일의 API 호출은 각각 다르게 구성되어있다.(API 호출하는 url이 각각 다름)
  - 하지만 둘은 "같은 결과값을 Return한다"
- 이유는 `queryKey`가 같기 때문이다. 배열일 경우 순서에도 영향을 받는다.
  - 순서가 다르면 각각의 API 요청에 맞게 응답으로 "다른 결과값을 Return 한다"
  - `[queryKeys.stayTime, selectedIsland]` → `[selectedIsland, queryKeys.stayTime]`
    - 순서만 바꾸어도 다르게 인식되어 정상적으로 API를 호출해준다.

<br>

- 회사에서 queryKeys를 객체로 관리하고 있는데, 분명 다른 API를 호출하였으나, 같은 결과값이 리턴되었다.
- 알고보니, 쿼리키를 중복해서 사용하고 있었던 것, 개별적으로 queryKey를 지정해주니 정상적인 API 호출이 가능해짐.

<br>

### 참고자료

[tanstack-query 공식문서 query keys](https://tanstack.com/query/latest/docs/react/guides/query-keys)  
[React Query Key 관리](https://www.zigae.com/react-query-key/)
