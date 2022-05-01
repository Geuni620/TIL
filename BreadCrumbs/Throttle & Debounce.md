## 배운 내용

### Throttle & Debounce

> getStream API의 chatlist 기능을 구현하던 중, Debounce에 대해 알게 됨

- Throttle와 Debounce

  - Throttle 와 Debounce는 자주 사용되는 이벤트나 함수 들의 실행되는 빈도를 줄여서, 성능 상의 유리함을 가져오기 위한 개념

  - Throttle 는 입력 주기를 방해하지 않고, 일정 시간 동안의 입력을 모아서, 한번씩 출력을 제한함.

  - Debounce는 입력 주기가 끝나면 출력 함

* Throttle
  - Throttle 는 여러번 발생하는 이벤트를 일정 시간 동안, 한번만 실행 되도록 만드는 개념
* Debounce

  - Debounce 는 여러번 발생하는 이벤트에서, 가장 마지막 이벤트 만을 실행 되도록 만드는 개념

* Throttle 와 Debounce 차이점
  Throttle 와 Debounce 의 차이점은 이벤트를 언제 발생 시킬지의 시점 차이
  Debounce 는 입력이 끝날때까지 무한적으로 기다리지만, Throttle 는 입력이 시작되면, 일정 주기로 계속 실행함

<br>

ex) 대표적인 예로 자동완성

일정 주기로 자동으로 완성되는 리스트를 보여주는 것에는
사용자 측면에서 Throttle (검색 되는 경험) 가 유리할 수 있으나,
성능상에서는 Debounce (1번만 호출) 가 훨씬 유리할 수 있음

→ 쿼리를 1번 날릴 때마다 금액이 지불된다고 가정했을 때 10번 날리게 되면 금액적 손실이 큼, 이럴 경우 Debounce를 이용해서 2초간 타자입력이 없을 시 쿼리를 날리게 설정할 수 있음

<br>

### 참고자료

https://pks2974.medium.com/throttle-%EC%99%80-debounce-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-2335a9c426ff  
개념설명을 참고햇음

https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa  
예를 들어준 내용을 참고했음
