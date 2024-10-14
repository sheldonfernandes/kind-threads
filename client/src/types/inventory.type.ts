export type InventoryListType = {
  success: boolean;
  inventory_list: InventoryData[];
  errorMessage: string;
  errorCode: string;
};

export type CreateInventoryData = {
  user_id: string;
  user_name: string;
  material_image: string;
  pick_up_address: string;
};

export type InventoryData = {
  _id: string;
  inventory_id: string;
  user_id: string;
  user_name: string;
  material_image: string;
  category: string;
  reason_for_category: string;
  green_coins: number;
  submitted_date:string;
  picked_up_date: string;
  pick_up_address: string;
  donation_center_selected: string;
  donation_status: string;
  collector_id: string;
  collector_name: string;
  drop_off_date: string;
  ai_response: AIresponse;
};

export enum DonationStatusEnum {
  PENDING = "pending",
  PICKED_UP = "picked_up",
  RECEIVED = "received",
  SELF_CLAIM = "self_claim",
  SELF_CLAIM_PICKEDUP = "self_claim_picked_up"
}

export type InventoryDetailModal = {
  showModal: boolean;
  category?: string;
  donation_status?: string;
  user_name?: string;
  picked_up_date?: string | null;
  pick_up_address?: string;
  donation_center_selected?: string;
  inventory_id?: string;
  drop_off_date?: string | null;
};
export type AIresponse = {
  short_desc: string;
  type: string;
  brand: string;
  size: string;
  condition: string;
  material: string;
  recommendation: string;
  donation_type?:string;
  donation_centers: string[];
};

export type UpdateInventory = {
  inventory_id: string;
  collector_id: string;
  collector_name: string;
  donation_status: string;
};

export type UpdateDonation = {
  inventory_id: string;
  donation_status: string;
  donation_center_selected?: string;
  collector_id?: string;
  collector_name?: string;
};