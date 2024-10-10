import os
from dotenv import load_dotenv
from fastapi import APIRouter

from app.services.InventoryService import InventoryService
from app.models.ScanImage import ScanImage
from app.models.Inventory import InventoryCreateModel, InventoryUpdateModel

load_dotenv()
router = APIRouter(
    prefix=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/inventory",
)


@router.post("/scanimage")
def fetch_image_data(scannedImageData: ScanImage):
    return InventoryService.fetch_image_data(scannedImageData)

@router.get("/list_inventory/{org_received_status}")
def get_inventory_list(org_received_status: str):
    return InventoryService.get_inventory_list_by_status(org_received_status)

@router.post("/create")
def create_inventory(inventoryCreateModel: InventoryCreateModel):
    return InventoryService.create_inventory(inventoryCreateModel)

@router.put("/{inventory_id}/update")
def update_inventory(inventory_id: str, inventoryUpdateModel: InventoryUpdateModel):
    return InventoryService.update_inventory(inventory_id, inventoryUpdateModel)


@router.get("/dashboard_statistics/")
def get_dashboard_statistics():
    return InventoryService.get_dashboard_statistics()