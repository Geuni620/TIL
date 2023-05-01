# nextJs

### Instagram blog image error

- local에서 잘 뜨던 이미지가 배포이후에 안뜨기 시작

```
INVALID_IMAGE_OPTIMIZE_REQUEST
```

<br>

```JS
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'scontent-ssn1-1.cdninstagram.com',
      'scontent-iad3-1.cdninstagram.com',
      'scontent-iad3-2.cdninstagram.com',
    ],
  },

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
```

- 해당 domains 이미지를 추가해주니 해결되었다.
- 하지만, 이미지 domain이 계속 변경될 때마다 추가해줘야할까,,,?

<br>

```
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      'www.notion.so',
      //...
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
```

[remote patterns](https://nextjs.org/docs/api-reference/next/image#remote-patterns)를 추가해주었다.
