# nextjs

### 동적 라우팅

```TSX
// pages/user-manager/admin-list
// pages/user-manager/user-list
```

위와 같이 각각 만들어준 상태에서, edit 페이지로 이동시켜주려고 했을 때,

```TSX
// pages/user-manager/admin-list/editUser/[id]
// pages/user-manager/user-list/editAdmin/[id]
```

- 위와 같이 작성해주어야했음.
- 하지만, editUser와 editAdmin은 중복된 부분이 많이 존재했음, Props만 다르게 내려주면 될 듯 했음.

<br>

```
// pages/user-manager/admin-list
// pages/user-manager/user-list
// pages/user-manager/editPage
```

- 이렇게 폴더구조를 변경하려 했는데, 하지못했음
  - SideMenu Tab에선 select된 페이지가 admin-list / user-list에 따라 UI표시가 달라졌음(bold 등)
  - 그리고 user-list와 admin-list가 존재해야 SideTab이 보여지는데, 위와 같이 작성하니, editPage 파일은 하나로 줄었지만, 다른 사이드 이펙트가 너무 많이 발생했음
  - 특히 SideMenu Tab을 건드리는건 더 복잡해짐

<br>

```
// pages/user-manager/[editList]/[id]
```

- nextjs에선 동적라우팅으로 폴더, 파일 모두 지원함
- 그래서 위와 같이 작성했을 때 문제를 해결할 수 있음

<br>

- 예를 들어 위와 같이 폴더를 구성했을 떄

```
http://localhost:3000/user-manager/user-list/0
http://localhost:3000/user-manager/admin-list/0
http://localhost:3000/user-manager/test-list/0
```

test-list / user-list / admin-list 무엇이 들어오던, 해당 routing이 가능함.

```TSX
// utils/getPath.ts
export const getPath = (path: string) => {
  if (path === '') return null;
  if (!path) return null;

  return path.split('?').shift().split('/').slice(1);
};

// TableContainer.tsx
const [currentTab, currentMenu] = getPath(router.asPath);
const href = `/${currentTab}/${currentMenu}/${id}`;

    <Link
    className="no-underline cursor-pointer hover:no-underline"
    href={href}
    >
    {view}
    </Link>
```

- 이렇게 했을 때 currentTab과 currentMenu는 각각 user-manager/user-list로 가져올 수 있음.
- 그래서 메뉴탭도 active 잘 시키고, 꺼지지 않게 하면서, routing도 시켜줄 수 있음.
