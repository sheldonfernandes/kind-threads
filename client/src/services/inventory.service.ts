import axios from "axios";
import { ApiEndpoint } from "../constants/api-endpoints.constant";
import { AppConst } from "../constants/app.constant";
import { UserDonationInventoryListType } from "../types/inventory.type";

export const InventoryService = {
  getUserDonationInventoryList: async (
    userid: string
  ): Promise<UserDonationInventoryListType> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.USER_DONATION_INVENTORY_LIST_API(userid),
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "GET",
    }).then((res) => res.data);
  },
};
