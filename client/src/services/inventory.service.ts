import axios from "axios";
import { ApiEndpoint } from "../constants/api-endpoints.constant";
import { AppConst } from "../constants/app.constant";
import {
  CreateInventoryData,
  InventoryData,
  InventoryListType,
  UpdateInventory,
} from "../types/inventory.type";

export const InventoryService = {
  getUserDonationInventoryList: async (
    userid: string | undefined
  ): Promise<InventoryListType> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.USER_DONATION_INVENTORY_LIST_API(userid || ""),
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "GET",
    }).then((res) => res.data);
  },

  createInventory: async (
    createInventoryData: CreateInventoryData
  ): Promise<InventoryData> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.CREATE_INVENTORY_API,
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "POST",
      data: createInventoryData,
    }).then((res) => res.data);
  },

  getMarketplaceList: async (): Promise<InventoryListType> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.MARKETPLACE_API,
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "GET",
    }).then((res) => res.data);
  },

  updateStatus: async (
    updateInventory: UpdateInventory
  ): Promise<InventoryListType> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.UPDATE_STATUS_API(updateInventory.inventory_id),
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "PUT",
      data: updateInventory,
    }).then((res) => res.data);
  },

  getPickedUpList: async (
    collector_id: string,
    status: string
  ): Promise<InventoryListType> => {
    const apiEndpoint = new ApiEndpoint();
    return axios({
      url: apiEndpoint.COLLECTOR_INVLIST_API(collector_id,status),
      baseURL: apiEndpoint.API_BASE_URL,
      timeout: AppConst.API_TIMEOUT,
      method: "GET",
    }).then((res) => res.data);
  },
};
