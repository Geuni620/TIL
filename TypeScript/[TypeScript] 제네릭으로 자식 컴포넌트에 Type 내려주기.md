# TypeScript

### 제네릭으로 자식 컴포넌트에 Type 내려주기

```TSX
export interface AdminListTableProps {
  id: number;
  profileImage: {
    src: string;
    height: number;
    width: number;
  };
  loginId: string;
  nickName: string;
  userType: VisaType['type'];
  createdAt: string;
}

export interface UserListProps {
  id: number;
  loginId: string;
  nickName: string;
  userType: VisaType['type'];
  userState: 'active' | 'inactive' | 'blocked';
  signRoute: '제조도' | '카카오' | '네이버' | '구글';
  profileImage: {
    src: string;
    height: number;
    width: number;
  };
  createdAt: string;
}
```

- 둘은 같은 것 같지만, 완전히 같지는 않은 타입이다.
- 원했던 방향은 SelectableDataTable이라는 컴포넌트를 만들고, 해당 컴포넌트에 data, columns, title을 Props로 내려주면, 부모에 의존하지 않는 Table 컴포넌트를 만들고 싶었다.
- 이렇게 했을 때 부모에서 data, columns만 만들어서 Props로 내려주면 되니, 유연하게 재사용가능하다고 생각했다.
- 근데 문제는 Type이었다.

<br>

- 이렇게 부모에서 내려주는 data 타입이 다를 경우 어떻게 자식 컴포넌트의 Props 타입을 매겨줄 수 있을까?  
  답은 제네릭이었다.

```TSX
    <SelectableDataTable<AdminListTableProps>
        title="관리자 데이터"
        data={adminData}
        columns={adminColumns}
    />

    <SelectableDataTable<UserListProps>
        title="유저 데이터"
        data={userData}
        columns={userColumns}
    />
```

Props 타입으로 AdminListTableProps를 내려주나 UserListProps를 내려주었다.

<br>

```TSX
interface SelectableDataTableProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T>[];
}

const SelectableDataTable = <T extends object>({
  title,
  data,
  columns,
}: SelectableDataTableProps<T>) => {

// ...
};
```

- Props type을 매겨줄 땐 제네릭을 활용했다.
  `<T>`를 이용해 Props로 내려주는 Type을 각각 받을 수 있었다.

```TSX
// admin일 때
  data: AdminListTableProps[]

// user일 때
  data: UserListProps[]
```

<br>

```TSX
const SelectableDataTable = dynamic(
  () => import('components/Datatable/SelectableDatatable/'),
  { ssr: false },
);


```

단 dynamic import를 사용했을 경우, 제네릭으로 내려줄 때 에러가 떴다.

- `// 0개의 인수가 필요한데 1개를 가져왔습니다.ts(2554).`

<br>

이 부분부터 정확하지 않음(정확히 모름, 기록용)

- dynamic import일 경우 껍데기로 무언가를 감싸는 듯하다. 즉, Props로 타입을 내려주면, 그 껍데기에서 받게 되니 SeletableDataTable에선 받지못하게 된다.
- 이 때 ssr을 false로 줄 수 있는 방법은 다양하게 존재하는 듯하다.
- 나의 경우엔 따로 ssr을 더이상 false로 둘 필요가 없어서 import 문으로 수정했다.
  - ssr을 false로 뒀던 이유는, faker라는 랜덤으로 mock데이터를 생성해주는 라이브러리가 있는데, ssr을 켜놓은 상태에서 faker로 생성된 데이터를 받았을 때 hydration하는 과정에서 랜덤 값이 변경되어 데이터가 일치하지 않는 상황이 발생했었다(정확하지 않음.)
