import { BASE_URL } from "@api/interface";

/**
 *
 * @param status  0 이면 accesToken 요청, 1이면 localStroage에 저장된 accessToken 가져오기
 */
export const GetToken = (status: number) => {
  if (status === 0) {
    fetch(`${BASE_URL}/members/login`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@test.com",
        password: "qwer1234",
      }),
    }).then((res) => {
      if (res.status === 200) {
        const token = res.headers.get("authorization");
        if (token && token.startsWith("Bearer ")) {
          const accesToken = token.slice(7);

          localStorage.setItem("token", accesToken);
        }
      }
    });

    return;
  }

  return localStorage.getItem("accessToken");
};
