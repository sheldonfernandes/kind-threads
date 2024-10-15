import axios from "axios";
import { ApiEndpoint } from "../constants/api-endpoints.constant";
import { AppConst } from "../constants/app.constant";
import { LoginData, LoginResponse, UserFeedResponse, UserStatsResponse } from "../types/user.type";

export const UserService = {

  validateUser: async (
    loginData: LoginData
  ): Promise<LoginResponse> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.LOGIN_API,
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "POST",
      data: loginData
    }).then((res) => res.data);
  },
  getUserStats: async (
    userId: string,
  ): Promise<UserStatsResponse> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.USER_STATS_API(userId),
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "GET",
    }).then((res) => res.data);
  },
  getUserFeed: async (
  ): Promise<UserFeedResponse> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.USER_FEED,
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "GET",
    }).then((res) => res.data);
  },
};
