export class ApiEndpoint {
  API_BASE_URL: string;
  USER_DONATION_INVENTORY_LIST_API: (userid: string) => string;
  CREATE_INVENTORY_API: string;
  LOGIN_API: string;
  MARKETPLACE_API: string;
  UPDATE_STATUS_API: (inventory_id: string) => string;
  COLLECTOR_INVLIST_API: (collector_id: string, status: string) => string;

  constructor() {
    this.API_BASE_URL = process.env.NEXT_PUBLIC_API_ROOT_PATH || "";
    this.USER_DONATION_INVENTORY_LIST_API = (userid: string) =>
      `/user/${userid}/inventory_list`;
    this.CREATE_INVENTORY_API = "/inventory/create";
    this.LOGIN_API = "/user/login";
    this.MARKETPLACE_API = "/inventory/list_inventory/pending";
    this.UPDATE_STATUS_API = (inventory_id: string) =>
      `/inventory/${inventory_id}/update`;
    this.COLLECTOR_INVLIST_API = (collector_id: string, status: string) =>
      `/collector/${collector_id}/inventory_list?status=${status}`;
  }
}
