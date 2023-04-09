# tanstack-query

### client-state vs server-state

[React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)

> 위 글을 읽고 고민했던 내용 기록

<br>

- react-query로 받아온 데이터를 state에 담아주는게 안티패턴일 가능성이 높으며, server-state와 client-state를 분리하는게 좋아보임.
  - 이 경우는 예외가 될 수 있을 것 같은데, 유저 상세 데이터 중, 유저의 상태를 설정하는 드롭다운바가 있었음.
  - 이때, 해당 데이터를 선택하고 업데이트를 클릭하면 server에 mutate 해주었는데, useQuery로 데이터를 받아오자마자, client-state로 관리하기 위해 state에 담아주고, onClick 이벤트로 setState 걸어줬었음.

```TSX
// userDetail data를 서버로 부터 받아오고
const { userDetail } = useUserDetailQuery({
   userId: query.id as string,
 });

// client에서 변경될 것으로 예상되는 데이터는 state에 담아줬음.
 const [currentUserType, setCurrentUserType] = useState(
   translateValue({
     value: userDetail.userType,
     formatMap: userTypeKoreanMap,
   }),
 );

 const [currentUserState, setCurrentUserState] = useState(
   translateValue({
     value: userDetail.userState,
     formatMap: userStateKoreanMap,
   }),
 );

   const onUserTypeSelect = (selectValue: string) => {
    setCurrentUserType(selectValue);
  };

  const onUserStateSelect = (selectValue: string) => {
    setCurrentUserState(selectValue);
  };
```

- 위 블로그를 토대로 명확히 구분했어야한다면, state는 null로 관리하고, 이벤트가 발생했을 때 state에 담아준 후,  
  inititalValue는 `currentUserType ?? userDetail.userType`와 같이 사용한 후, 업데이트를 할 땐, currentUserType으로 mutate 걸어주면 명확히 분리시킬 수 있는 것 같음.

- 단 이렇게까지 복잡할 일인가,,,? 싶어서 useQuery로 데이터를 받아오자마자 client-state로 관리했음.
