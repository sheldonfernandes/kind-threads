from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class InventoryModel(BaseModel):
    inventory_id: ObjectId = Field(default_factory=ObjectId, alias="_id")
    user_id: str
    user_name: str
    material_image: str
    fabric_type: str
    category: str #= Field(..., regex="donate|recycle|upcycle")
    reason_for_category: str
    green_coins: int = 5
    picked_up_date: datetime
    pick_up_address: str
    organization_id: str
    organization_name: str
    organization_received_status: str #= Field(default="pending", regex="pending|received")
    drop_off_date: datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
