import os
from dotenv import load_dotenv
from fastapi import APIRouter

from app.services.InventoryService import InventoryService
from app.models.Inventory import InventoryCreateModel, InventoryUpdateModel, InventoryUpdateStatusModel

load_dotenv()
router = APIRouter(
    prefix=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/inventory",
)

@router.get("/list_inventory/marketplace")
def get_inventory_list():
    return InventoryService.get_marketplaceList()

@router.get("/list_inventory/latest")
def get_inventory_list_latest():
    return InventoryService.get_latestInventoryList()

@router.post("/create")
def create_inventory(inventoryCreateModel: InventoryCreateModel):
    return InventoryService.create_inventory(inventoryCreateModel)

@router.put("/{inventory_id}/update")
def create_inventory(inventory_id: str, inventoryUpdateModel: InventoryUpdateModel):
    return InventoryService.update_inventory(inventory_id , inventoryUpdateModel)

@router.put("/{inventory_id}/update/status")
def update_inventory(inventory_id: str, inventoryUpdateModel: InventoryUpdateStatusModel):
    return InventoryService.update_inventory_status(inventory_id, inventoryUpdateModel)


@router.get("/dashboard_statistics")
def get_dashboard_statistics():
    return InventoryService.get_dashboard_statistics()