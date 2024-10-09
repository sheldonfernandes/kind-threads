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
  fabric_type: string;
  pick_up_address: string;
};

export type InventoryData = {
  _id: string;
  user_id: string;
  user_name: string;
  material_image: string;
  image_type: string;
  fabric_type: string;
  category: string;
  reason_for_category: string;
  green_coins: number;
  picked_up_date: string;
  pick_up_address: string;
  organization_id: string;
  organization_name: string;
  organization_received_status: string;
  collector_id: string;
  collector_name: string;
  drop_off_date: string;
};


export enum OrganizationStatusEnum  {
  PENDING='pending',
  RECEIVED="received"
}

export type InventoryDetailModal = {
  showModal:boolean;
  category?: string;
  picked_up_date?: string | null;
  pick_up_address?: string;
  organization_name?: string;  
}