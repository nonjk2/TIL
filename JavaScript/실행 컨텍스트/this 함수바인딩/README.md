# this 에 대해서

[실행컨텍스트 , 호이스팅](https://www.notion.so/de4d34a6a210483887f9aee893b07466?pvs=21) 에서 실행 컨텍스트에서 언급했던 바

- **this의 값은 함수가 호출되는 방식에 따라 결정**
  ✓ VariableEnvironment
  ✓ LexicalEnvironment
  **✓ ThisBindings**

## this(정의, 활용방법, 바인딩 , call ,apply, bind)

다른 객체지향 언어에서의 this는 곧 **클래스로 생성한 인스턴스**를 말합니다. 그러나 자바스크립트에서는 **this가 어디에서나** 사용될 수 있습니다.

- `this` 키워드는 모든 실행 컨텍스트(전역, 함수 또는 eval)에서 자동으로 정의되는 특수 키워드입니다.실행 컨텍스트 생성(함수 호출) 시 설정되는 개체를 참조

### **this의 값은 컨텍스트에 따라 다르다**

- **전역 실행 컨텍스트**(함수 외부)에서 `this`는 전역 객체(브라우저 환경의 `window` , 노드 환경의 `global`)를 나타냅니다.
- **함수 컨텍스트**에서 `this`의 값은 함수가 호출되는 방식에 따라 다릅니다. 객체의 메서드로 호출되는 경우 `this`는 메서드가 호출되는 객체로 설정됩니다.
- **이벤트 핸들러**에서 `this`는 이벤트를 수신한 요소를 나타냅니다.

```jsx
// 전역 컨텍스트
console.log(this); // 출력: Window {...} (브라우저 환경에서) 또는 global (노드 환경에서)

// 함수 컨텍스트
const obj = {
  method() {
    console.log(this);
  },
};

obj.method(); // 출력: { method: [Function: method] }

// 이벤트 핸들러
button.addEventListener("click", function () {
  console.log(this); // 출력: <button>...</button> (클릭된 HTML 요소)
});
```

**함수 vs 메소드**

함수와 메소드는 매우 유사해 보이지만, 분명한 차이가 있습니다. 기준은 **`독립성`**입니다. 함수는 자체적인 독립된 기능을 수행합니다.

```jsx
function name(); // 함수는 자체적인 독립된 기능을 수행
```

그러나 메소드는 호출한 객체에 대한 액션을 수행합니다.

```jsx
object.methodname();
```

- 함수 : this → 전역객체
- 메서드 : this → 호출의 주체

```jsx
// function
// 호출자를 지정할 수 없으므로 this는 전역 객체를 의미합니다.
var func = function (x) {
  console.log(this, x);
};
func(1); // Window { ... } 1

// 메소드
// 호출자를 지정할 수 있으므로 this는 객체(obj)를 의미합니다.
// obj는 { method: f }를 의미하는 것
var obj = {
  method: func,
};
obj.method(2); // { method: f } 2
```

### **그렇다면 함수로서의 호출과 메서드로서의 호출의 구분 기준은 ?**

```jsx
var obj = {
	method: function (x) { console.log(this, x) }
};
obj.method(1); // { method: f } 1
obj['method'](2); // { method: f } 2

'.' 으로 알수있다.
```

따라서 위의 내용에따라 this에는 **호출을 누가 했는지에 대한 정보가 담긴다**

```jsx
var obj = {
  name: "외부 객체",
  inner: {
    name: "내부 객체",
    method: function () {
      console.log(this.name); // this는 현재 메소드가 속한 객체를 가리킵니다.
    },
  },
  method: function () {
    console.log(this.name); // this는 현재 메소드가 속한 객체를 가리킵니다.
  },
};

obj.method(); // 출력: "외부 객체"
obj["method"](); // 출력: "외부 객체"

obj.inner.method(); // 출력: "내부 객체"
obj.inner["method"](); // 출력: "내부 객체"
obj["inner"].method(); // 출력: "내부 객체"
obj["inner"]["method"](); // 출력: "내부 객체"
```
