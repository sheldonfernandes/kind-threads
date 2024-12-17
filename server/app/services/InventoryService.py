import traceback
import uuid

from fastapi import HTTPException
from app.models.Inventory import InventoryModel, InventoryCreateModel, InventoryUpdateModel, InventoryUpdateStatusModel
from app.utils import MongoUtil
import json
import re
from datetime import datetime, timedelta
from app.utils.WatsonUtil import augment_api_request_body, get_watsonxai_creds, human_prompt
from app.utils.AppUtil import calculate_stats, get_category
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai import Credentials

creds = get_watsonxai_creds()
credentials = Credentials(
    url=creds["url"],
    api_key=creds["apikey"]
)
watsonx_llm = ModelInference(
    model_id="meta-llama/llama-3-2-90b-vision-instruct",
    credentials=credentials,
    project_id=creds["projectid"],
    params={
        "max_tokens": 1000
    },
)


class InventoryService:
    @staticmethod
    def create_inventory(inventoryCreateModel: InventoryCreateModel):
        inventory = InventoryModel()
        inventory.inventory_id = uuid.uuid4().hex
        inventory.user_id = inventoryCreateModel.user_id
        inventory.user_name = inventoryCreateModel.user_name
        inventory.material_image = inventoryCreateModel.material_image
        inventory.pick_up_address = inventoryCreateModel.pick_up_address
        inventory.submitted_date = str(datetime.now())

        user_query = human_prompt()

        messages = augment_api_request_body(
            user_query, inventoryCreateModel.material_image)
        response = watsonx_llm.chat(messages=messages)
        ai_response_from_model = response['choices'][0]['message']['content']

        pattern = r'\{.*?\}'
        data_string = re.search(
            pattern, ai_response_from_model, re.DOTALL).group()
        ai_response = json.loads(data_string)

        category = get_category(ai_response_from_model)

        inventory.category = category
        inventory.reason_for_category = ai_response["recommendation"]

        # Default values while creating new inventory item
        inventory.green_coins = 10
        inventory.picked_up_date = str(datetime.now() + timedelta(days=2))
        inventory.donation_status = "pending"
        inventory.ai_response = ai_response
        inventory.fabric_type = ai_response["material"]
        try:
            response = MongoUtil.create_new_inventory(inventory.model_dump())
            return response
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def update_inventory(inventory_id: str, inventoryUpdateModel: InventoryUpdateModel):
        try:
            response = MongoUtil.update_inventory(
                inventory_id, inventoryUpdateModel)
            return response
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def update_inventory_status(inventory_id: str, inventoryUpdateModel: InventoryUpdateStatusModel):

        current_date: datetime = datetime.now()
        if (inventoryUpdateModel.donation_status == 'picked_up'):
            inventoryUpdateModel.picked_up_date = str(current_date)
            inventoryUpdateModel.drop_off_date = str(
                current_date + timedelta(days=2))
        else:
            inventoryUpdateModel.drop_off_date = str(current_date)
        try:
            response = MongoUtil.update_inventory_status(
                inventory_id, inventoryUpdateModel)
            return response
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def get_marketplaceList():
        try:
            inventory_list = MongoUtil.get_marketplaceList()
            if inventory_list == None:
                return {"success": False, "errorCode": "EKTU002",
                        "errorMessage": "Inventory not found with org_received_status: {org_received_status}"}
            inventory_list_with_stats = []
            for i in inventory_list:
                i['stats'] = calculate_stats(i)
                inventory_list_with_stats.append(i)
            return {
                'success': True,
                'inventory_list': inventory_list_with_stats,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def get_latestInventoryList():
        try:
            inventory_list = MongoUtil.get_latestInventoryList()
            if inventory_list == None:
                return {"success": False, "errorCode": "EKTU002",
                        "errorMessage": "Inventory not found with org_received_status: {org_received_status}"}
            inventory_list_with_stats = []
            for i in inventory_list:
                i['stats'] = calculate_stats(i)
                inventory_list_with_stats.append(i)
            return {
                'success': True,
                'inventory_list': inventory_list_with_stats,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def get_dashboard_statistics():
        try:
            data = MongoUtil.aggregate_inventory()
            if data == None:
                return {"success": False, "errorCode": "EKTU001",
                        "errorMessage": "No donations found for user"}

            # Calculate water saved
            WEIGHT_PER_ITEM = .4
            WATER_PER_KG_COTTON = 4000
            WATER_PER_KG_OTHER_CLOTH = 500
            water_saved = 0
            for x in data[0]['details']:
                if x['isCotton'] == True:
                    water_saved += x['count'] * \
                        WEIGHT_PER_ITEM * WATER_PER_KG_COTTON
                if x['isCotton'] == False:
                    water_saved += x['count'] * \
                        WEIGHT_PER_ITEM * WATER_PER_KG_OTHER_CLOTH

            # Calculate Carbon footprint
            CARBON_PER_KG = 10
            carbon = data[0]['total'] * WEIGHT_PER_ITEM * CARBON_PER_KG

            stats = {'water_saved': water_saved, 'carbon': carbon,
                     'clothes_donated': data[0]['total']}
            return {
                'success': True,
                'user_data': stats,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in user service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
