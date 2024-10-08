import traceback

from fastapi import HTTPException

from app.utils import MongoUtil


class UserService:
    @staticmethod
    def fetch_user_profile(userid):
        try:
            data = MongoUtil.get_user_profile(userid)
            if data == None:
                return {"success": False, "errorCode": "EKTU001",
                        "errorMessage": "User doesn't exist"}
            return {
                'success': True,
                'user_data': data,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in user service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))

    @staticmethod
    def get_inventory_list_by_user_id(user_id):
        try:
            inventory_list = MongoUtil.list_inventory_by_user_id(user_id)
            if inventory_list == None:
                return {"success": False, "errorCode": "EKTU001",
                        "errorMessage": "User not found with userid: {user_id}"}
            
            return {
                'success': True,
                'inventory_list': inventory_list,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))
