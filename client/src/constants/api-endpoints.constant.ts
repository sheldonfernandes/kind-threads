export class ApiEndpoint {
  API_BASE_URL: string;
  USER_DONATION_INVENTORY_LIST_API: (userid: string) => string;

  constructor() {
    this.API_BASE_URL = process.env.NEXT_PUBLIC_API_ROOT_PATH || "";
    this.USER_DONATION_INVENTORY_LIST_API = (userid: string) =>
      `/inventory/user/${userid}/listOfDonation`;
  }
}
