import axios from "axios";
import { ApiEndpoint } from "../constants/api-endpoints.constant";
import { AppConst } from "../constants/app.constant";
import { CreateInventoryData, InventoryData, UserDonationInventoryListType } from "../types/inventory.type";
import { LoginData, LoginResponse } from "../types/user.type";

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
};
