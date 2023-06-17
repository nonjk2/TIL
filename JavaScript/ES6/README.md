<div style="max-width:800px; margin:0 auto">

> ECMAScript 6 (ES6)는 JavaScript의 버전 중 하나로, 2015년에 발표가 되었다.. ES6는 이전 버전인 ES5에서 새로운 문법과 기능을 도입하여 JavaScript 개발자들이 보다 쉽고 효율적으로 코드를 작성할 수 있도록 개선.

## 목차

1. [let, const](#let--const)
2. [화살표 함수](#화살표함수-arrow-func)
3. [삼항연산자](#삼항-연산자)
4. [구조분해할당](#구조-분해할당)
5. [단축속성명](#단축-속성명property-shorthand)
6. [전개구문](#전개-구문spread)
7. [나머지매개변수](#나머지-매개변수)
8. [템플릿 리터럴](#템플릿-리터럴template-literals)

### **let , const**

---

기존에 변수 선언을 위해 존재하던 `var` 를 대체해서 나온 변수 선언에 사용 되는 키워드.

var , const , let의 차이를 알 수 있기 위해서는 선언과 할당의 의미를 아주 정확히 알고있어야함

- 선언 : 변수명을 자바스크립트 엔진에 알리는 것
- 할당: 변수에 값을 저장하는 것(= 할당연산자)

### **화살표함수 (Arrow Func)**

---

`function` 이나 `return` 키워드 없이 함수를 만드는 방법.

```jsx
// ES5
function func() {
	return true
}

//ES6
const func = () => true
const func = () => {
	return true
}

() => {}
parm => {}
(parm1, parm2, ...parms) -> {}

// 익명 화살표 함수
() => {}
```

### **this**

`function` 은 호출을 할 때 `this`가 정해지지만, 화살표 함수는 선언할 때 `this`가 정해진다

### **삼항 연산자**

---

condition ? ture인경우 : false인경우

### 구조 분해할당

---

배열 `[]` 이나 객체 `{}` 의 속성을 분해해서 그 값을 변수에 담을 수 있게 해주는 문법

```jsx
// 배열의 경우
let [value1, value2] = [1, "new"];
console.log(value1); // 1
console.log(value2); // "new"

let arr = ["value1", "value2", "value3"];
let [a, b, c] = arr;
console.log(a, b, c); // value1 value2 value3

// let [a,b,c] = arr; 은 아래와 동일!
// let a = arr[0];
// let b = arr[1];
// let c = arr[2];

let [a, b, c, d] = arr;
console.log(d); // undefined

let [a, b, c, d = 4] = arr;
console.log(d); // 4
//객체의 경우
let user = { name: "nbc", age: 30 };
let { name, age } = user;

// let name = user.name;
// let age = user.age;

console.log(name, age); // nbc 30

// 새로운 이름으로 할당
let { name: newName, age: newAge } = user;
console.log(name, age); // ReferenceError: name is not defined
console.log(newName, newAge); //nbc 30

let { name, age, birthDay } = user;
console.log(birthDay); // undefined

let { name, age, birthDay = "today" } = user;
console.log(birthDay); // today
```

### 단축 속성명(property shorthand)

---

객체의 key와 value 값이 같다면 , 생략 가능

```jsx
const name = "nbc";
const age = "30";

const obj = {
  name,
  age: newAge,
};

const obj = {
  name,
  age,
};
```

### 전개 구문(Spread)

---

배열이나 객체를 전개하는 문법. 구조분해할당과 함께 많이 사용.

```jsx
// 배열
let arr = [1, 2, 3];

let newArr = [...arr, 4];
console.log(newArr); // [1,2,3,4]

// 객체
let user = { name: "nbc", age: 30 };
let user2 = { ...user };

user2.name = "nbc2";

console.log(user.name); // nbc
console.log(user2.name); // nbc2
```

### 나머지 매개변수

---

```jsx
function func(a, b, ...args) {
  console.log(...args);
}

func(1, 2, 3); // 3
func(1, 2, 3, 4, 5, 6, 7); // 3 4 5 6 7
```

### 템플릿 리터럴(Template literals)

---

여러 줄로 이뤄진 문자열과 문자 보간기능을 사용하게 만들어 주는 문자열 리터럴 표현식.

백틱(```) 과 `${}` 로 표현

```jsx
`string text 
string text line2``string text ${value} text`;
```

</div>
