// jobPostAPI.js
import { GetToken } from "@api/GetToken";
import { BASE_URL } from "@api/interface";
import { requestGetFetch, requestPostFetch } from "@api/utils";

const memberRolesURL = `${BASE_URL}/application-request/member/roles`;

const memberRolesAPI = {
  async handleResponse(response: Response | null) {
    if (!response) {
      throw new Error("No response from server");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unknown error occurred");
    }

    return await response.json();
  },

  // 역할 전체 조회
  async getAllmemberRoles() {
    const response = await requestGetFetch(memberRolesURL);
    return await this.handleResponse(response);
  },

  // 역할에 지원 요청
  async postMemberRoles(roleId: number) {
    const requestHeaders: HeadersInit = new Headers();

    if (!localStorage.getItem("token")) {
      GetToken(0);
    }
    const token = localStorage.getItem("token");

    requestHeaders.set("Authorization", `Bearer ${token}`);
    requestHeaders.set("Accept", "*/*");
    requestHeaders.set("Content-Type", "application/json");

    const response = await fetch(`${memberRolesURL}/${roleId}`, {
      method: "POST",
      headers: requestHeaders,
    });

    return await this.handleResponse(response);
  },
};

export default memberRolesAPI;
