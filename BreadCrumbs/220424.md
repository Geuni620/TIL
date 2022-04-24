## 배운 내용

### flutter & Android studio 설치

> 기업협업에서 사용하는 기술스택이 달라서 flutter를 설치하였음

- 글자위젯 & 아이콘위젯

```Dart
 (`글내용작성`)

Icon(`Icon.star`)
Icon(`Icon.shop`)
-> 아이콘 이름 같은 건 flutter 홈페이지에 나와 있음
```

- 이미지위젯

```Dart
  Widget build(BuildContext context) {
    return MaterialApp (
      home: Image.asset('airport.jpeg')
    );
```

이렇게 넣기 전에 사전 준비과정이 필요함

`pubspec.yaml`이 있음, 여기로가서

```
flutter:
  assets:
    - assets/
```

이렇게 넣어주면, assets라는 파일을 모두 참조하겠다는 뜻!

- 박스넣는 법

```Dart
 return MaterialApp (
      home: Container(width: 50, height: 50, color: Colors.blue)
    );
```

- SizedBox() 도 가능함, Container와 동일
- 숫자의 단위는 LP, 50LP는 1.2cm정도

  - LP는 실제 우리가 보여지는 크기, 1cm는 38LP정도 됨

### MaterialApp

- 이것도 위젯의 한 종류
- `Scaffold`
  - 내가 작성만들고 있는 앱의 레이아웃을 상, 중, 하로 나눠줌

```Dart
    return MaterialApp (
        home: Scaffold(
          appBar: AppBar(),  //상단
          body: Container(),  // 중단
          bottomNavigationBar: BottomAppBar(),
        )  // 하단
      );
```

- 가로로 정렬하는 방법

* Row를 이용하면 됨
  - Row 아래는 children을 사용하고 const 붙여주기

```Dart
return MaterialApp (
        home: Scaffold(
          body: Row(
            children: const [
              Icon(Icons.star),
              Icon(Icons.star),
              Icon(Icons.star),
            ],
          ),
        )
      );
```

- 만약 반대로 세로로 정렬하고 싶다면 Row → Column으로 변경

* 중앙정렬한다면 Center도 있지만 mainAxisAlignment가 있음

  - CSS의 display: flex와 굉장히 유사함!

* crossAxisAlignment는 가로정렬이 아닌 세로정렬임!
  - CSS의 display: flex, aligns-item과 유사

- 생각안나면 Ctrl + space 누르면 자동완성 창 뜸

```Dart
return MaterialApp (
        home: Scaffold(
          body: Row (
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: const [
              Icon(Icons.star),
              Icon(Icons.star),
              Icon(Icons.star),
            ],
          ),
        )
      );
```
