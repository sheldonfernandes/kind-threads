export type UserData = {
  user_id: string;
  user_name: string;
  state: string;
  country: string;
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
    country: string;
    contact: string;
    email_address: string;
    total_green_coins: number;
  };
  errorMessage: string;
  errorCode: string;
};
