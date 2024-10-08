import os
from dotenv import load_dotenv
from fastapi import APIRouter
from app.services.UserService import UserService

load_dotenv()
router = APIRouter(
    prefix=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/user",
)

@router.get("/{userid}/profile")
def fetch_user_profile(userid: str):
    return UserService.fetch_user_profile(userid)

@router.get("/{userid}/inventory_list")
def get_inventory_list(userid: str):
    return UserService.get_inventory_list_by_user_id(userid)
