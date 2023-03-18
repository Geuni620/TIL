# Test

### 피라미드 테스트화하기

```TSX
// utils.ts
export const calcRatio = (...args: number[]): number[] => {
  const total = args.reduce((acc, val) => acc + val, 0);

  if (total === 0) {
    return Array(args.length).fill(0);
  }

  return args.map((value) => Math.round((value / total) * 100));
};


// calcRatio.test.ts
import { calcRatio } from 'utils';

describe('calcRatio', () => {
  it('두 개의 인수를 사용하여 절대값을 백분율로 바꾼다', () => {
    const rations = calcRatio(2, 2);
    expect(rations).toEqual([50, 50]);
  });

  it('세 개의 인수를 사용하여 절대값을 백분율로 바꾼다', () => {
    const rations = calcRatio(5, 3, 2);
    expect(rations).toEqual([50, 30, 20]);
  });

  it('네 개의 인수를 사용하여 절대값을 백분율로 바꾼다', () => {
    const ratios = calcRatio(1, 2, 3, 4);
    expect(ratios).toEqual([10, 20, 30, 40]);
  });

  it('인수가 0일 경우 0을 리턴한다.', () => {
    const ratios = calcRatio(0, 0, 0, 0);
    expect(ratios).toEqual([0, 0, 0, 0]);
  });

  it('인수가 전달되지 않으면 0을 리턴한다.', () => {
    const ratios = calcRatio();
    expect(ratios).toEqual([]);
  });
});
```

- 위와 같은 작업을 하며, '테스트코드는 반복문이 없을까?' 고민했었는데, 있었다.
- 그 전에 최근 개발세션에서 크게 깨닫게 된 점이 있다.

<br>

> 더 이상 테스트를 할 필요가 있는가?

```TSX
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageHeader from 'components/common/PageHeader';

test('Title 컴포넌트를 hover했을 때 상세 설명 popover를 유저가 볼 수 있다.', async () => {
  const title = '방문 통계';
  const questionBoxText = '섬별 방문자 및 상세데이터를 확인할 수 있습니다.';
  render(<PageHeader title={title} questionBoxText={questionBoxText} />);

  const IconBoxButton = screen.queryByRole('button');
  await userEvent.hover(IconBoxButton);

  const popover = screen.getByText(
    '섬별 방문자 및 상세데이터를 확인할 수 있습니다.',
  );
  expect(popover).toBeInTheDocument();
});
```

- 위와 같은 PageHeader 컴포넌트가 있다.
- IconBoxButton을 hover하면 questionBoxText가 뜨는 것을 테스트하려고 했다.
- 하지만, 이 PageHeader는 내가 만들고 있는 모든 Page에 적용된다. 단, Props로 내려주는 메시지만 **다르게 구성된다.**
- 그럼 모든 곳에 `__tests__`폴더를 생성하고 테스트해야할까?
- 즉, 비슷한 UI는 컴포넌트 재사용으로 공통되게 사용하고 있는데, Test Code는 반복되게 사용할 수 있는가? 아니라면 UI가 조금만 변경될 때마다 이 테스트 코드를 각각 생성해주어야할까?
- 조금 생각을 다르게 할 필요가 있다.

<br>

> 테스트하고 싶은건 어떤 코드인가?

- PageHeader의 관심사만 테스트해야한다. 즉, message가 어떤 것이 내려오던, 그 message에 해당하는 UI가 잘 랜더링되는지만 테스트하면 되는 것이었다.
- 그럼 테스트는 PageHeader의 관심사 하나만 테스트하면 된다. 아이콘에 hover해서 message가 잘 랜더링된다면, 어떤 message가 내려오던 그 해당 "기능", 즉 관심사는 잘 동작하게 될 것이다.

<br>

- 결과적으로 테스트할 부분만 테스트하면 된다. 추가로 모듈화가 할 필요가 있는 부분, (=반복/자동화가 필요한 부분이 있다면), 그 해당 부분을 함수로 분리하고 그 함수만 테스트하면 된다. (관심사 분리하고 관심사만 테스트하기)
- 이렇게 하기 위해 PageHeader를 만든 것.
  → 똑같은 코드를 어드민의 모든 페이지에 복붙하지 않고 잘 동작하는 것을 보장하기 위해.

<br>

다시 피라미드 테스트로 돌아와서,

- 이 부분은 인자 값을 변경시키면, 인자 값을 토대로 원하는 결괏값이 나오는지를 테스트하려고 했다.
- 단, 인자의 개수에 따라 결괏값이 다르다보니 (2개의 인자 넣으면 2개의 결괏값, 3개 넣으면 3개) describe로 큰 제목을 달고 it으로 각각을 테스트 해야했다.

<br>

- 하지만 `test.each()`를 사용하면 다음과 같이 테스트할 수 있다.

```TSX
import { calcRatio } from 'utils';

describe('calcRatio', () => {
  const testCases = [
    { args: [2, 2], expected: [50, 50] },
    { args: [5, 3, 2], expected: [50, 30, 20] },
    { args: [1, 2, 3, 4], expected: [10, 20, 30, 40] },
    { args: [0, 0, 0, 0], expected: [0, 0, 0, 0] },
    { args: [], expected: [] },
  ];

  test.each(testCases)('절대값을 백분율로 바꾼다.', ({ args, expected }) => {
    expect(calcRatio(...args)).toEqual(expected);
  });
});
```
