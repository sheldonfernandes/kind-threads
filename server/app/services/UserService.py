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
            print(f"Error in search service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
