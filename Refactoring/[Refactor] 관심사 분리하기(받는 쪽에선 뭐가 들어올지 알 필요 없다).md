# Refactor

### 관심사 분리하기

```TSX
import type {
  UserStateAll,
  UserTypeAll,
} from 'markup_data/data-manager/user-manager';

interface CategoryListProps {
  id: number;
  type: UserTypeAll['type'] | UserStateAll['type'];
}

interface CategoryFilterProps {
  totalRowCount: number;
  categoryList: UserTypeAll[] | UserStateAll[];
  selectedCategory: string;
  onSelectedCategoryClick: (
    type: UserTypeAll['type'] | UserStateAll['type'],
  ) => void;
  getCategoryCount: (
    type: UserTypeAll['type'] | UserStateAll['type'],
  ) => number;
}

const CategoryFilter = ({
  totalRowCount,
  categoryList,
  selectedCategory,
  onSelectedCategoryClick,
  getCategoryCount,
}: CategoryFilterProps) => {
  const renderCategoryButton = ({ type, id }: CategoryListProps) => {
    const count = type === '전체' ? totalRowCount : getCategoryCount(type);

    return (
      <Button
        key={id}
        isSelected={type === selectedCategory}
        onClick={() => onSelectedCategoryClick(type)}
      >
        {type} ({count})
      </Button>
    );
  };

  return <Wrapper>{categoryList.map(renderCategoryButton)}</Wrapper>;
};

export default CategoryFilter;
```

- 처음엔 위와 같이 작성했다. 부모에서 Props로 내려준 값들을 CategoryFilter에서 다 받게 되는데, 부모 컴포넌트에서 분기처리를 통해 userList 또는 adminList를 내려주게 된다.
- 이때 userList, adminList를 categoryList로 받게 되는데, 타입을 유니온으로 매겨줬었다.
- 이렇게 했을 때, 관심사 분리가 되지않고, 타입으로 인해 부모와의 의존성이 생겨버린다.
- 이렇게 작성하면 지금은 adminList, userList의 배열만 내려주지만, 점차 추가되는 배열들의 타입을 계속 추가해주어야한다.

<br>

- 그래서 부모쪽에서 Props로 내려주되, 자식요소는 이 부모의 값이나 타입이 뭐가 들어올지는 `알 필요가 없다.`
- 주는 쪽에서 변경해야할 값이 있다면, 다 변경한 후 받는 쪽에선 그냥 받기만 하면 된다.

```TSX
interface CategoryListProps {
  id: number;
  type: string;
}

interface CategoryFilterProps {
  totalRowCount: number;
  categoryList: { id: number; type: string }[];
  selectedCategory: string;
  onSelectedCategoryClick: (type: string) => void;
  getCategoryCount: (type: string) => number;
}

const CategoryFilter = ({
  totalRowCount,
  categoryList,
  selectedCategory,
  onSelectedCategoryClick,
  getCategoryCount,
}: CategoryFilterProps) => {
  const renderCategoryButton = ({ type, id }: CategoryListProps) => {
    const count = type === '전체' ? totalRowCount : getCategoryCount(type);

    return (
      <Button
        key={id}
        isSelected={type === selectedCategory}
        onClick={() => onSelectedCategoryClick(type)}
      >
        {type} ({count})
      </Button>
    );
  };

  return <Wrapper>{categoryList.map(renderCategoryButton)}</Wrapper>;
};

export default CategoryFilter;
```

- 이렇게 했을 때 부모에서 무엇이 내려오던 상관 없이, 해당 값을 받은 후 render 해주면 된다.
- 타입을 따로 import 시켜서 매겨줄 필요도 없어졌다.
- 즉 컴포넌트가 관심을 둬야하는 곳에만 집중할 수 있다.
