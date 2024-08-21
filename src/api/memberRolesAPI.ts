// jobPostAPI.js
import { BASE_URL } from "@api/interface";
import { requestGetFetch } from "@api/utils";

const memberRolesURL = `${BASE_URL}/application-request/member/roles`;

const memberRolesAPI = {
  async handleResponse(response: Response | null) {
    if (!response) {
      throw new Error("No response from server");
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || "Unknown error occurred");
    }

    return await response.json();
  },

  // 역할 전체 조회
  /**
   *
   * @param year
   * @param month dateYm month로 접근해야함 실제 월 -1
   * @returns
   */
  async getAllmemberRoles(year: number, month: number) {
    const response = await requestGetFetch(
      memberRolesURL + "?" + `year=${year}&month=${month + 1}`,
    );

    return await this.handleResponse(response);
  },

  // 역할에 지원 요청
  async postMemberRoles(roleId: number) {
    const requestHeaders: HeadersInit = new Headers();

    const token = localStorage.getItem("accessToken");

    requestHeaders.set("Authorization", `Bearer ${token}`);
    requestHeaders.set("Accept", "*/*");
    requestHeaders.set("Content-Type", "application/json");

    const response = await fetch(`${memberRolesURL}/${roleId}`, {
      method: "POST",
      headers: requestHeaders,
    });

    if (!response) {
      throw new Error("No response from server");
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || "Unknown error occurred");
    }

    return { response: "good" };
  },
};

export default memberRolesAPI;
