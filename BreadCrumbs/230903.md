### predev → dev

```
npm run dev
```

- dev를 실행할 때 보통 위와같이 입력한다.
- 이때 predev를 지정해주면, dev를 실행하기 이전에 predev가 실행된다.

```JSON
{
    "scripts": {
    "predev": "npm run build",
    "dev": "NODE_ENV=development concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"",
  },
}
```

- 위와 같이 지정해주면, dev가 실행되기 전에, build가 새롭게 진행된다.
