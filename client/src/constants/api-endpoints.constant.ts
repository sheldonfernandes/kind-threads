export class ApiEndpoint {
  API_BASE_URL: string;
  USER_DONATION_INVENTORY_LIST_API: (userid: string) => string;
  CREATE_INVENTORY_API: string;
  LOGIN_API :string;

  constructor() {
    this.API_BASE_URL = process.env.NEXT_PUBLIC_API_ROOT_PATH || "";
    this.USER_DONATION_INVENTORY_LIST_API = (userid: string) =>
      `/user/${userid}/inventory_list`;
    this.CREATE_INVENTORY_API = "/inventory/create";
    this.LOGIN_API = "/user/login"
  }
}
