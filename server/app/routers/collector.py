import os
from dotenv import load_dotenv
from fastapi import APIRouter

from app.services.CollectorService import CollectorService

load_dotenv()
router = APIRouter(
    prefix=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/collector",
)

@router.get("/{collector_id}/inventory_list")
def fetch_items(collector_id: str, status : str = 'picked_up'):
    return CollectorService.get_inventory_list_by_collector_id(collector_id,status)
