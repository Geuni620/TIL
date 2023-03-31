# nextjs

### next/image

```TSX
    // 전
    <ProfileImageCircle>
        <Image
        width={60}
        height={60}
        src={defaultProfile}
        alt="profile image"
        />
    </ProfileImageCircle>

    // 후
    <ProfileImageCircle>
        <Image fill src={defaultProfile} alt="profile image" />
    </ProfileImageCircle>
```

- ProfileImageCircle의 크기에 맞게 Image의 width와 height를 설정하고 싶을 땐 fill이라는 Image의 props를 사용하면 된다.

<br>

[next/image, fill](https://nextjs.org/docs/api-reference/next/image#fill)
