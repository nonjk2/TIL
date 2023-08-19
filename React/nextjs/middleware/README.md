# Nextjs 미들웨어에서 Auth 처리

```jsx
import axios from "axios";

const checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization || req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "No tokens provided" });
  }

  try {
    // 액세스 토큰 유효성 검사
    const validationResponse = await axios.post(
      "YOUR_SPRING_BOOT_ENDPOINT/validateAccessToken",
      {
        token: accessToken,
      }
    );

    if (validationResponse.data.isValid) {
      next();
    } else if (refreshToken) {
      // 리프래시 토큰으로 새 액세스 토큰 획득
      const tokenResponse = await axios.post(
        "YOUR_SPRING_BOOT_ENDPOINT/refreshAccessToken",
        {
          refreshToken,
        }
      );

      if (tokenResponse.data.accessToken) {
        res.setHeader("Set-Cookie", [
          `accessToken=${tokenResponse.data.accessToken}; HttpOnly`,
        ]);
        next();
      } else {
        res.status(401).json({ message: "Tokens are invalid" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default checkToken;
```
