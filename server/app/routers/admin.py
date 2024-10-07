import os
from dotenv import load_dotenv
from fastapi import APIRouter

from app.services.InventoryService import InventoryService
from app.services.AdminService import AdminService

load_dotenv()
router = APIRouter(
    prefix=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/admin",
)


@router.get("/listOfItems")
def fetch_items(org_received_status: str):
    return AdminService.get_items(org_received_status)
