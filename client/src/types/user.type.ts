import { InventoryData } from "./inventory.type";

export type UserData = {
  user_id: string;
  user_name: string;
  state: string;
  address: string;
  contact: string;
  email_address: string;
  total_green_coins: number;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  user_data: {
    user_id: string;
    user_name: string;
    state: string;
    address: string;
    contact: string;
    email_address: string;
    total_green_coins: number;
  };
  errorMessage: string;
  errorCode: string;
};

export type UserStats = {
  water_saved: number,
  carbon: number,
  clothes_donated: number
}

export type UserStatsResponse = {
  success: boolean,
  user_data: UserStats,
  errorMessage: string | null,
  errorCode: string | null
}

export type UserFeedResponse = {
  success: boolean,
  inventory_list: InventoryData[],
  errorMessage: string | null,
  errorCode: string | null
}