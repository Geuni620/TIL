# Gihub Action

## github-pages 배포 후 node version Error

![node version error](./screen/node%20version%20error.png)

```BASH
name: CI
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Install Node Version Manager
        run: npm install -g n
      - name: Set N_PREFIX
        run: sudo n 18.13.0
      - name: Remove node_modules
        run: rm -rf node_modules
      - name: yarn install
        run: yarn install
      - name: build
        run: yarn run build
      - name: GitHub Pages
        if: success()
        with:
          target_branch: gh-pages
          build_dir: public
        uses: crazy-max/ghaction-github-pages@v1.2.5
        env:
          GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
          GITHUB_PAT: ${{ secrets.ACCESS_TOKEN }}
```

- node version을 보통 16.14.2로 사용하고 있었음,
- gatsby plugin 설치할 때 18이상을 요구하는 Error 문구 발생.
- node version도 올리는 법을 찾아보니 stackover flow에 잘 적혀있었음.

<br>

### 참고자료

[How to change to an older version of Node.js](https://stackoverflow.com/questions/7718313/how-to-change-to-an-older-version-of-node-js)
