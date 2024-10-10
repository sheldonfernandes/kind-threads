import traceback

from fastapi import HTTPException

from app.utils import MongoUtil


class CollectorService:
    @staticmethod
    def get_inventory_list_by_collector_id(collector_id, status):
        try:
            inventory_list = MongoUtil.list_inventory_by_collector_id(collector_id, status)
            if len(inventory_list)==0:
                return {"success": False, "errorCode": "EKTU001",
                        "errorMessage": "No items found"}
            return {
                'success': True,
                'inventory_list': inventory_list,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in user service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
