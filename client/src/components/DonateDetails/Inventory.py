from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId


class InventoryModel(BaseModel):
    inventory_id: Optional[str] = ""
    user_id: Optional[str] = ""
    user_name: Optional[str] = ""
    material_image: Optional[str] = ""
    fabric_type: Optional[str] = ""
    # = Field(..., regex="donate|recycle|upcycle")
    category: Optional[str] = ""
    reason_for_category: Optional[str] = ""
    green_coins: int = 10
    picked_up_date: Optional[str] = ""
    pick_up_address: Optional[str] = ""
    organization_id: Optional[str] = ""
    organization_name: Optional[str] = ""
    organization_address: Optional[str] = ""
    # = Field(default="pending", regex="pending|picked_up|received")
    donation_status: Optional[str] = ""
    collector_id: Optional[str] = ""
    collector_name: Optional[str] = ""
    drop_off_date: Optional[str] = ""
    submitted_date: Optional[str] = ""


    ai_response: Optional[str] = ""
    donation_center_selected: Optional[str] = ""


class InventoryCreateModel(BaseModel):
    user_id: str
    user_name: str
    material_image: str
    pick_up_address: str


class InventoryUpdateStatusModel(BaseModel):
    collector_id: str
    collector_name: str
    donation_status: str
    picked_up_date: Optional[str] = ""
    drop_off_date: Optional[str] = ""


class InventoryUpdateModel(BaseModel):
    DonationStatusEnum: str
    donation_center_selected: str
    collector_id: Optional[str] = ""
    collector_name: Optional[str] = ""
