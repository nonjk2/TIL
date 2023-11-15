- [Security](#security)
  - [**웹 어플리케이션 기본 개념**](#웹-어플리케이션-기본-개념)
    - [HTTP/HTTPS 프로토콜](#httphttps-프로토콜)
    - [웹 어플리케이션 아키텍처](#웹-어플리케이션-아키텍처)
  - [**웹 어플리케이션 취약점 분류**](#웹-어플리케이션-취약점-분류)
    - [인젝션 공격 (SQL Injection, XSS, CSRF)](#인젝션-공격-sql-injection-xss-csrf)
      - [SQL Injection (SQLi)](#sql-injection-sqli)
      - [Cross-Site Scripting (XSS)](#cross-site-scripting-xss)
      - [Cross-Site Request Forgery (CSRF)](#cross-site-request-forgery-csrf)
    - [**디도스 공격**](#디도스-공격)

# Security

## **웹 어플리케이션 기본 개념**

### HTTP/HTTPS 프로토콜

- HTTP (Hypertext Transfer Protocol): 웹 브라우저와 웹 서버 간에 정보를 주고받는 데 사용되는 프로토콜.
- HTTPS (Hypertext Transfer Protocol Secure): HTTP의 보안 버전으로, 데이터를 암호화하여 안전한 통신을 제공.

### 웹 어플리케이션 아키텍처

- 클라이언트-서버 아키텍처: 사용자 인터페이스와 데이터 처리를 분리하여 각각의 역할을 수행하는 아키텍처.
- 모델-뷰-컨트롤러 (MVC): 소프트웨어 디자인 패턴으로, 어플리케이션을 모델(데이터), 뷰(사용자 인터페이스), 컨트롤러(로직)로 분리한다.

## **웹 어플리케이션 취약점 분류**

### 인젝션 공격 (SQL Injection, XSS, CSRF)

##### SQL Injection (SQLi)

개념: 악의적인 SQL 쿼리를 주입하여 데이터베이스를 조작하는 공격이다.
예시: 사용자 입력을 통한 쿼리에 악의적인 코드를 삽입하여 데이터베이스를 조작하는 시나리오.

<details>
  <summary>예시</summary>

**1. 일반적인 로그인 시나리오:**

가장 흔한 예시 중 하나는 로그인 폼에서의 **SQL Injection**이다. 가령, 사용자의 입력을 통해 아이디와 패스워드를 검증하는 SQL 쿼리가 다음과 같다고 가정해보자

```sql
SELECT * FROM users WHERE username = '입력한_아이디' AND password = '입력한_패스워드';
```

일반적으로는 사용자가 아이디와 패스워드를 입력하면 위와 같은 형태의 SQL 쿼리가 실행된다. 그러나 사용자의 입력이 충분히 검증되지 않는다면, 공격자는 아래와 같이 입력할 수 있다

```plaintext
아이디: ' OR '1'='1' --
패스워드: 아무거나
```

위와 같이 입력하면 SQL 쿼리가 다음과 같이 되어, 항상 참이 되는 조건이 된다

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' --' AND password = '아무거나';
```

이 경우, 데이터베이스는 '1'='1' 조건을 만족시키는 모든 사용자의 정보를 반환하게 된다. 공격자는 이를 통해 시스템에 무단으로 접근할 수 있다.

**2. UNION 기반의 SQL Injection:**

만약 웹 어플리케이션에서 동적으로 SQL 쿼리를 생성하고 있고, 입력값을 충분히 검증하지 않는다면 UNION 기반의 SQL Injection도 가능하다. 예를 들어, 다음과 같은 쿼리가 있다고 가정

```sql
SELECT name, email FROM users WHERE id = '입력한_ID';
```

공격자는 다음과 같이 입력하여 여러 테이블을 조합할 수 있다

```plaintext
ID: ' UNION SELECT password, null FROM admin_users --
```

이 경우 쿼리는 다음과 같이 되어, admin_users 테이블의 패스워드까지 가져올 수 있다

```sql
SELECT name, email FROM users WHERE id = '' UNION SELECT password, null FROM admin_users --';
```

이렇게 SQL Injection은 적절한 입력 검증이 이루어지지 않는 경우, 공격자가 의도하지 않은 쿼리를 실행시켜 데이터베이스를 조작하거나 중요한 정보를 빼내는데 사용될 수 있다. 따라서 웹 어플리케이션에서는 입력값을 적절히 검증하고, `prepared statement`나 `parameterized query`와 같은 방법을 사용하여 SQL Injection 공격을 방어해야 한다.

- `prepared statement` (준비된 상태,쿼리)

```java
// Java에서의 Prepared Statement 사용 예시
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
PreparedStatement pstmt = connection.prepareStatement(sql);

// 사용자 입력값을 파라미터로 설정
pstmt.setString(1, 입력한_아이디);
pstmt.setString(2, 입력한_패스워드);

// 쿼리 실행
ResultSet result = pstmt.executeQuery();

```

- `parameterized query`(파라미터화된 쿼리)

```py
import sqlite3

# 파라미터화된 쿼리 사용 예시
username = 입력한_아이디
password = 입력한_패스워드

# 쿼리에 직접 사용자 입력을 삽입하지 않음
sql = "SELECT * FROM users WHERE username = ? AND password = ?"

# 쿼리 실행
cursor.execute(sql, (username, password))

```

</details>

##### Cross-Site Scripting (XSS)

개념: 사용자에게 악의적인 스크립트를 주입하여 해당 스크립트를 다른 사용자의 브라우저에서 실행시키는 공격.
예시: 웹 페이지에 게시된 댓글이나 포럼 글에 악의적인 스크립트를 삽입하여 다른 사용자에게 전파되는 경우.

<details>
    <summary>XSS예시</summary>

**1. 저장된 (Stored) XSS:**

이 경우, 악의적인 스크립트가 웹 어플리케이션의 데이터베이스에 저장되어, 나중에 해당 스크립트가 다른 사용자에게 제공된다.

**예시:**
사용자들이 블로그에 댓글을 작성할 수 있는 상황에서, 공격자가 다음과 같은 악의적인 스크립트를 댓글에 삽입한다.

```html
<script>
  alert("안녕하세요, 공격자입니다!");
  // 사용자의 쿠키를 탈취하거나 다른 악의적인 동작 수행
</script>
```

이 댓글이 데이터베이스에 저장되면, 해당 블로그를 방문한 다른 사용자들은 악의적인 스크립트를 실행하게 된다.

**2. 반사된 (Reflected) XSS:**

이 경우, 악의적인 스크립트가 특정 요청에 포함되어 서버로 전송되고, 서버는 해당 스크립트를 응답으로 다시 클라이언트에게 보낸다.

**예시:**
검색 기능이 있는 웹 어플리케이션에서, 사용자가 검색어를 입력하는 경우를 가정한다. 공격자가 다음과 같은 URL을 생성하여 특정 사용자에게 전송한다.

```plaintext
https://vulnerable-website.com/search?query=<script>alert('안녕하세요, 공격자입니다!')</script>
```

이 경우, 서버는 검색 결과 페이지를 생성할 때, 사용자의 입력된 검색어를 그대로 HTML에 삽입하게 되면서 악의적인 스크립트가 실행된다.

**3. DOM 기반 (DOM-based) XSS:**

이 경우, 악의적인 스크립트가 클라이언트 측에서 실행되는 JavaScript 코드 내에서 발생.

**예시:**
웹 어플리케이션이 사용자의 언어 설정을 JavaScript로 처리하는 경우를 가정. 사용자의 언어 설정이 URL 파라미터에 의해 결정되고, 해당 설정을 바탕으로 다국어 지원이 이루어진다고 가정. 공격자가 다음과 같은 URL을 전송한다.

```plaintext
https://vulnerable-website.com/?lang=<script>alert('안녕하세요, 공격자입니다!')</script>
```

이 경우, 웹 어플리케이션이 사용자의 언어 설정을 JavaScript로 처리하면서 악의적인 스크립트가 실행되어 페이지가 로드될 때 경고창이 뜨게 됨.

**방어 방법:**

1. **입력 검증 및 필터링:** 사용자의 입력을 검증하고, 필터링하여 악의적인 스크립트가 삽입되지 않도록 한다.
2. **출력 인코딩:** 모든 사용자 입력 데이터를 출력할 때, HTML 이스케이핑을 통해 태그들을 무효화시키고, 사용자가 입력한 스크립트가 실행되지 않도록 한다.
3. **HTTP Only 쿠키:** 중요한 정보를 담고 있는 쿠키를 HTTP Only 속성으로 설정하여 JavaScript에서 접근하지 못하도록 한다.
4. **콘텐츠 보안 정책 (Content Security Policy - CSP):** 안전한 콘텐츠만 로드할 수 있도록 정책을 설정하여 XSS 공격을 방지한다.

</details>

#### Cross-Site Request Forgery (CSRF)

개념: 사용자가 의도하지 않은 요청을 서버에 보내도록 하는 공격.
예시: 피해자가 이미 로그인한 상태에서 악의적인 웹 페이지를 방문하면서 의도하지 않은 동작을 수행하게 하는 경우.

<details>
    <summary>CSRF예시</summary>

**1. 계좌 이체 요청 공격:**

가장 전형적인 CSRF 공격 예시 중 하나로, 사용자가 은행 웹 사이트에 로그인한 상태에서 공격자가 작성한 웹 페이지를 방문하는 경우.

**예시:**

1. 피해자는 은행 웹 사이트에 로그인한 상태.
2. 공격자는 피해자에게 보이지 않는 형태로 다음과 같은 HTML 코드를 가진 웹 페이지를 생성.

```html
<!-- 악의적인 웹 페이지 -->
<html>
  <body>
    <form action="https://bank.com/transfer" method="post">
      <input type="hidden" name="toAccount" value="공격자의 계좌 번호" />
      <input type="hidden" name="amount" value="1000000" />
      <input type="submit" value="클릭하세요" />
    </form>
  </body>
</html>
```

3. 피해자가 공격자가 만든 웹 페이지를 방문하면, 자동으로은행 웹 사이트에 특정 금액을 공격자의 계좌로 이체하는 요청이 전송된다.

**2. 계정 비밀번호 변경 요청 공격:**

다른 예시로는 사용자의 계정 비밀번호를 변경하는 요청을 CSRF를 이용하여 악용하는 경우가 있다.

**예시:**

1. 피해자는 로그인한 상태에서 은행 웹 사이트에 접속.
2. 피해자의 계정 비밀번호 변경 폼은 다음과 같다.

```html
<!-- 계정 비밀번호 변경 폼 -->
<form action="https://bank.com/change-password" method="post">
  <input type="password" name="newPassword" placeholder="새로운 비밀번호" />
  <input type="password" name="confirmPassword" placeholder="비밀번호 확인" />
  <input type="submit" value="비밀번호 변경" />
</form>
```

1. 공격자는 피해자에게 보이지 않는 형태로 다음과 같은 HTML 코드를 가진 웹 페이지를 생성.

```html
<!-- 악의적인 웹 페이지 -->
<html>
  <body>
    <img
      src="https://bank.com/change-password?newPassword=악의적인_비밀번호&confirmPassword=악의적인_비밀번호"
    />
  </body>
</html>
```

4. 피해자가 공격자가 만든 웹 페이지를 방문하면, 자동으로은행 웹 사이트에 비밀번호를 변경하는 요청이 전송된다.

**방어 방법:**

1. **Anti-CSRF 토큰 사용:** 웹 어플리케이션에서는 사용자가 로그인할 때마다 고유한 Anti-CSRF 토큰을 생성하고, 이를 모든 폼 요청에 삽입하여 검증.

```html
<!-- HTML 폼 요소 -->
<form id="myForm" action="/submit" method="post">
  <!-- 폼 필드들 -->
  <input type="text" name="username" placeholder="사용자명" />
  <input type="password" name="password" placeholder="비밀번호" />

  <!-- Anti-CSRF 토큰 필드 -->
  <input type="hidden" name="csrf_token" id="csrf_token" value="" />

  <!-- 제출 버튼 -->
  <button type="button" onclick="submitForm()">제출</button>
</form>

<script>
  // Anti-CSRF 토큰을 서버에서 받아와 폼에 삽입
  fetch("/get-csrf-token")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("csrf_token").value = data.csrf_token;
    })
    .catch((error) => console.error("CSRF 토큰을 가져오는 중 오류:", error));

  // 폼 제출 함수
  function submitForm() {
    // 사용자 입력 유효성 검증 등 다른 로직 수행

    // 폼 제출
    document.getElementById("myForm").submit();
  }
</script>
```

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // 서버에서 CSRF 토큰을 가져오는 비동기 함수
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("/api/csrf-token");
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("CSRF 토큰을 가져오는 중 오류:", error);
      }
    };

    // 페이지 로드 시 CSRF 토큰 가져오기
    fetchCsrfToken();
  }, []);

  const handleFormSubmit = async () => {
    try {
      // CSRF 토큰을 요청 헤더에 추가하여 서버에 데이터 전송
      await axios.post(
        "/api/submit",
        { data: "example" },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
      console.log("데이터 전송 성공!");
    } catch (error) {
      console.error("데이터 전송 중 오류:", error);
    }
  };

  return (
    <div>
      <h1>리액트 CSRF 방어 예시</h1>
      <button onClick={handleFormSubmit}>폼 제출</button>
    </div>
  );
};

export default MyComponent;
```

2. **SameSite 쿠키 속성 사용:** SameSite 쿠키 속성을 Strict 또는 Lax로 설정하여 외부 사이트에서의 요청을 방지.(Lax가 디폴트임)
3. **Referrer 검증:** 서버에서 Referer 헤더를 검증하여 허용되지 않은 요청을 거부한다.
4. **사용자 인증 요구:** 민감한 작업을 수행하는 경우에는 사용자의 추가적인 인증을 요구하여 공격을 방어합니다.

```js
// 서버에 사용자 인증 상태를 확인하는 예시
fetch("/check-authentication")
  .then((response) => {
    if (!response.ok) {
      // 사용자가 인증되지 않았음
      alert("로그인이 필요합니다.");
    } else {
      // 사용자가 인증되었음
      performSecureOperation();
    }
  })
  .catch((error) => console.error("인증 상태 확인 중 오류:", error));

function performSecureOperation() {
  // 안전한 작업 수행 로직
  console.log("안전한 작업을 수행합니다.");
}
```

</details>

### **디도스 공격**

1. **대규모 트래픽 공격:** 디도스 공격은 대부분 대량의 트래픽을 목표 서버에 방향성 있게 전송하여 서버 자원을 고갈시킨다.

2. **분산된 공격:** 디도스 공격은 종종 여러 소스에서 동시에 발생하며, 공격자는 여러 기기 또는 봇넷(Botnet)을 사용하여 트래픽을 생성.

3. **서비스 거부:** 주된 목적은 서비스 거부(Denial of Service)로, 정상적인 사용자들도 서버에 접근하기 어렵게 만든다.

**디도스 공격의 방어 방법**

1. **CDN (Content Delivery Network) 사용:** CDN은 전 세계에 분산된 서버를 통해 트래픽을 관리하고, 악성 트래픽을 차단하여 서버를 보호한다.

2. **웹 방화벽 활용:** 웹 방화벽은 트래픽을 분석하고 악의적인 트래픽을 차단하는 역할을 한다.

3. **클라우드 기반의 서비스 사용:** 클라우드 기반의 서비스는 트래픽을 분산시키고, 필요한 경우 트래픽을 처리할 수 있는 자원을 동적으로 할당하여 디도스 공격에 대응.

4. **흐름 제어 및 트래픽 모니터링** 흐름 제어 시스템을 구축하고, 트래픽을 지속적으로 모니터링하여 이상 행동을 감지하고 대응.

5. **악성 트래픽 필터링:** 트래픽을 분석하여 악의적인 패턴을 감지하고 차단하는 시스템을 도입하여 공격을 막는다.

**디도스 공격의 예방을 위한 일반적인 원칙:**

1. **보안 강화:** 시스템 보안을 강화하여 악성 트래픽에 대한 저항력을 높인다.

2. **시스템 및 네트워크 감시:** 트래픽을 지속적으로 감시하여 이상 행동을 조기에 감지하고 대응합니다.

3. **이중화 및 백업 시스템 구축:** 시스템에 장애가 발생했을 때 대비하여 이중화 및 백업 시스템을 구축합니다.

4. **사용자 교육:** 사용자에게 적절한 보안 교육을 제공하여, 피싱이나 다양한 형태의 사회 공학적인 디도스 공격으로부터 보호합니다.

5. **최신 보안 업데이트 적용:** 시스템 및 소프트웨어를 최신으로 유지하여 알려진 보안 취약점에 대응.

- [스터디채원](https://coding-s2-chaewon.tistory.com/214)
- [스터디도원](https://velog.io/@theon2/%EC%9B%B9-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98%EC%9D%84-%EC%A0%9C%EC%9E%91%ED%95%A0-%EB%95%8C-%EA%B3%A0%EB%A0%A4%ED%95%B4%EC%95%BC-%ED%95%A0-%EB%B3%B4%EC%95%88)
