import os
from dotenv import load_dotenv
from fastapi import APIRouter

from app.services.InventoryService import InventoryService
from app.models.ScanImage import ScanImage

load_dotenv()
router = APIRouter(
    prefix=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/inventory",
)


@router.post("/scanimage")
def fetch_image_data(scannedImageData: ScanImage):
    return InventoryService.fetch_image_data(scannedImageData)

@router.get("/user/{userid}/listOfDonation")
def fetch_user_profile(userid: str):
    return InventoryService.fetch_list_of_donation(userid)
