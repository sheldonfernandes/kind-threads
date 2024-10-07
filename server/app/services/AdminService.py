import traceback

from fastapi import HTTPException

from app.utils import MongoUtil


class AdminService:
    @staticmethod
    def get_items(org_received_status):
        try:
            inventory_list = MongoUtil.get_list_of_items(org_received_status)
            if len(inventory_list)==0:
                return {"success": False, "errorCode": "EKTU001",
                        "errorMessage": "No items found"}
            return {
                'success': True,
                'items': inventory_list,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in user service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
