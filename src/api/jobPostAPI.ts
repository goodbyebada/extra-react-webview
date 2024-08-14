// jobPostAPI.js
import { BASE_URL } from "@api/interface";
import {
  requestGetFetch,
  // requestDeleteFetch,
  // requestPutFetch,
  // requestPostFetch,
} from "@api/utils";
// import { JobPostRequest } from "@api/interface";

const jobPostURL = `${BASE_URL}/jobposts`;

const jobPostAPI = {
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

  async getAllJobPost() {
    const response = await requestGetFetch(jobPostURL);
    return await this.handleResponse(response);
  },

  async getJobPostById(jobPostId: number) {
    const response = await requestGetFetch(`${jobPostURL}/${jobPostId}`);
    return await this.handleResponse(response);
  },

  // async deleteJobPostById(jobPostId: number) {
  //   const response = await requestDeleteFetch(`${jobPostURL}/${jobPostId}`);
  //   return await this.handleResponse(response);
  // },

  // async putJobPostById(jobPostId: number, data: JobPostRequest) {
  //   const response = await requestPutFetch(`${jobPostURL}/${jobPostId}`, data);
  //   return await this.handleResponse(response);
  // },

  // async postJobPost(data: JobPostRequest) {
  //   const response = await requestPostFetch(jobPostURL, data);
  //   return await this.handleResponse(response);
  // },
};

export default jobPostAPI;
