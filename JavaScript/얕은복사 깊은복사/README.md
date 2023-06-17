<div style="max-width:750px; margin:0 auto; line-height: 27px">
# 얕은복사와 깊은복사

- 불변 객체의 정의
  메모리할당 과 데이터타입과 메모리에서 데이터의 메모리 할당과정을보면 객체의 속성에 접근해서 값을 변경하면 **_가변이 성립_** 했습니다. 반면, 객체 데이터 자체를 변경(새로운 데이터를 할당)하고자 한다면 기존 데이터는 변경되지 않습니다. 즉, **_불변하다라고_** 볼 수 있습니다.
  **불변 객체의 필요성**

  ```jsx
  var user = {
    name: "wonjang",
    gender: "male",
  };

  // 이름을 변경하는 함수, 'changeName'을 정의
  // 입력값 : 변경대상 user 객체, 변경하고자 하는 이름
  // 출력값 : 새로운 user 객체
  // 특징 : 객체의 프로퍼티(속성)에 접근해서 이름을 변경! -> 가변
  var changeName = function (user, newName) {
    var newUser = user;
    newUser.name = newName;
    return newUser;
  };

  // 변경한 user정보를 user2 변수에 할당
  // 가변이기 때문에 user1도 영향을 받는다.
  var user2 = changeName(user, "twojang");

  // 결국 아래 로직은 skip.
  if (user !== user2) {
    console.log("유저 정보가 변경되었습니다.");
  }

  console.log(user.name, user2.name); // twojang twojang
  console.log(user === user2); // true
  ```

  **위 코드를 개선방법**

  ```jsx
  // user 객체를 생성
  var user = {
    name: "wonjang",
    gender: "male",
  };

  // 이름을 변경하는 함수 정의
  // 입력값 : 변경대상 user 객체, 변경하고자 하는 이름
  // 출력값 : 새로운 user 객체
  // 특징 : 객체의 프로퍼티에 접근하는 것이 아니라, 아에 새로운 객체를 반환 -> 불변
  var changeName = function (user, newName) {
    return {
      name: newName,
      gender: user.gender,
    };
  };

  // 변경한 user정보를 user2 변수에 할당.
  // 불변이기 때문에 user1은 영향이 없음!
  var user2 = changeName(user, "twojang");

  // 결국 아래 로직이 수행.
  if (user !== user2) {
    console.log("유저 정보가 변경되었습니다.");
  }

  console.log(user.name, user2.name); // wonjang twojang
  console.log(user === user2); // false 👍
  ```

  ### 하지만 위방법이 최선일까 ?😕

  - 위에서 속성이 여러개면 ? 같은상황이 똑같이 벌어집니다.
  - 따라서 다음과같은 방법들이 있습니다.

  ```jsx
  //이런 패턴은 어떨까요?
  var copyObject = function (target) {
    var result = {};

    for (var prop in target) {
      result[prop] = target[prop];
    }
    return result;
  };

  var user = {
    name: "wonjang",
    gender: "male",
  };

  var user2 = copyObject(user); //방법 1 for in 을이용
  user2.name = "twojang";

  var user2 = Object.assign({}, user); //방법2 Object.assign
  user2.name = "twojang";

  var user2 = { ...user }; //방법 3 스프레드 연산자 사용
  user2.name = "twojang";

  if (user !== user2) {
    console.log("유저 정보가 변경되었습니다.");
  }

  console.log(user.name, user2.name);
  console.log(user === user2);
  ```

  ### 그렇다면 중첩된 객체는 ?

  - 객체안에 객체가 존재하는 중첩객체도 얕은복사가 될까
  - 안타깝게도 안됩니다. 중첩된 객체에 대해서는 완벽한 복사를 할수가 없습니다.

  ```jsx
  var user = {
    name: "wonjang",
    urls: {
      portfolio: "http://github.com/abc",
      blog: "http://blog.com",
      facebook: "http://facebook.com/abc",
    },
  };

  var user2 = copyObject(user);

  user2.name = "twojang";

  // 바로 아래 단계에 대해서는 불변성을 유지하기 때문에 값이 달라집니다.
  console.log(user.name === user2.name); // false

  user.urls.portfolio = "http://portfolio.com";
  console.log(user.urls.portfolio === user2.urls.portfolio); // true

  user2.urls.blog = "";
  console.log(user.urls.blog === user2.urls.blog); // true
  ```

  - 위와 같은 방법으로 똑같이 수행

  ```jsx
  var user = {
    name: "wonjang",
    urls: {
      portfolio: "http://github.com/abc",
      blog: "http://blog.com",
      facebook: "http://facebook.com/abc",
    },
  };

  var user2 = copyObject(user);

  user2.urls = copyObject(user.urls);

  user.urls.portfolio = "http://portfolio.com";
  console.log(user.urls.portfolio === user2.urls.portfolio);

  user2.urls.blog = "";
  console.log(user.urls.blog === user2.urls.blog);
  ```

  - 하지만 이방법은 임시방편에 불과합니다. 3차 객체 4차 객체가 나오면 똑같은 상황이 생깁니다.

  ### **재귀함수를 이용한 복사방법**

  - endpoint 가 생길때까지 **재귀함수**를 이용하여 끝까지 깊은복사를 해봅시다.

  ```jsx
  function deepCopy(obj) {
    if (typeof obj === "object" && obj !== null) {
      let copy = Array.isArray(obj) ? [] : {};

      for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          copy[key] = deepCopy(obj[key]);
        } else {
          copy[key] = obj[key];
        }
      }
      return copy;
    }
    return obj;
  }

  var user = {
    name: "wonjang",
    gender: "male",
    preferences: {
      color: "blue",
      food: "pizza",
    },
  };

  var user2 = deepCopy(user);
  user2.name = "twojang";
  user2.preferences.color = "red";

  if (user !== user2) {
    console.log("User information has been changed.");
  }

  console.log(user.name, user.preferences.color); // wonjang blue
  console.log(user2.name, user2.preferences.color); // twojang red
  console.log(user === user2); // false
  console.log(user.preferences === user2.preferences); // false
  ```

  - 위 함수는 Date , RegExp, Map , Set 등과 같은 특수 자바스크립트 개체를 올바르게 처리하지 않습니다 . 하지만 예를들어 볼때 배열이나 객체 에서서는 올바른 깊은 복사를 보여주고있습니다.

  ### JSON을 이용한 복사 방법

- JSON(=**JavaScript Object Notation)을 이용하는 방법**도 존재합니다. 하지만 완벽한 방법은 아닙니다.

  - 장점
    - JSON.stringify() 함수를 사용하여 객체를 문자열로 변환한 후, 다시 JSON.parse() 함수를 사용하여 새로운 객체를 생성하기 때문에, 원본 객체와 복사본 객체가 서로 독립적으로 존재합니다. 따라서 복사본 객체를 수정해도 원본 객체에 영향을 미치지 않습니다.
    - JSON을 이용한 깊은 복사는 다른 깊은 복사 방법에 비해 코드가 간결하고 쉽게 이해할 수 있습니다.
  - 단점
    - **JSON을 이용한 깊은 복사는 원본 객체가 가지고 있는 모든 정보를 복사하지 않습니다. 예를 들어, 함수나 undefined와 같은 속성 값은 복사되지 않습니다.**
    - JSON.stringify() 함수는 순환 참조(Recursive Reference)를 지원하지 않습니다. 따라서 객체 안에 객체가 중첩되어 있는 경우, 이 방법으로는 복사할 수 없습니다.
      따라서 JSON을 이용한 깊은 복사는 객체의 구조가 간단하고, 함수나 undefined와 같은 속성 값이 없는 경우에 적합한 방법입니다. 만약 객체의 구조가 복잡하거나 순환 참조가 있는 경우에는 다른 깊은 복사 방법을 고려해야 합니다.

  ### Lodash를 이용한 복사방법(lodash패키지)

  1. 설치

  ```bash
  npm i lodash
  ```

  2. lodash import

  ```jsx
  import _ from "lodash";
  ```

  3. 적용

  ```jsx
  import _ from "lodash";

  let user = {
    name: "wonjang",
    gender: "male",
    preferences: {
      color: "blue",
      food: "pizza",
    },
  };

  let user2 = _.cloneDeep(user);
  user2.name = "twojang";
  user2.preferences.color = "red";

  if (user !== user2) {
    console.log("User information has been changed.");
  }

  console.log(user.name, user.preferences.color); // wonjang blue
  console.log(user2.name, user2.preferences.color); // twojang red
  console.log(user === user2); // false
  console.log(user.preferences === user2.preferences); // false
  ```

  **정리**

  1. **불변객체 정의**
  2. **얕은복사 방법**
  3. **깊은복사 방법**
