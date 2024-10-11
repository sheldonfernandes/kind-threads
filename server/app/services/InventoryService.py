import traceback
import uuid
import random

from fastapi import HTTPException
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames
from app.models.Inventory import InventoryModel, InventoryCreateModel, InventoryUpdateModel
from app.utils import MongoUtil
from langchain_ibm import WatsonxLLM
from datetime import datetime, timedelta

from app.utils.WatsonUtil import get_watsonxai_creds, system_prompt
from app.utils.AppUtil import get_category

creds = get_watsonxai_creds()
params = {
    GenTextParamsMetaNames.DECODING_METHOD: "sample",
    GenTextParamsMetaNames.MAX_NEW_TOKENS: 300,
    GenTextParamsMetaNames.MIN_NEW_TOKENS: 60,
    GenTextParamsMetaNames.TEMPERATURE: 0,
    GenTextParamsMetaNames.TOP_K: 10,
    GenTextParamsMetaNames.TOP_P: 0,
    GenTextParamsMetaNames.REPETITION_PENALTY: 1.2,
    GenTextParamsMetaNames.RANDOM_SEED: 10
}
watsonx_llm = WatsonxLLM(
    model_id="mistralai/mixtral-8x7b-instruct-v01",
    url=creds["url"],
    apikey=creds["apikey"],
    project_id=creds["projectid"],
    params=params,
    streaming=False,
)

FABRIC_TYPE=["Cotton","Acrylic Fabric","Linen","Nylon","Silk","Wool","Polyester"]
class InventoryService:
    @staticmethod
    def create_inventory(inventoryCreateModel: InventoryCreateModel):

        print(inventoryCreateModel)
        inventory = InventoryModel()
        inventory.inventory_id = uuid.uuid4().hex
        inventory.user_id = inventoryCreateModel.user_id
        inventory.user_name = inventoryCreateModel.user_name
        inventory.material_image = inventoryCreateModel.material_image
        inventory.fabric_type = random.choice(FABRIC_TYPE)
        inventory.pick_up_address = inventoryCreateModel.pick_up_address
        inventory.submitted_date = str(datetime.now())

        # Below feilds wil be assigned by watsonxai based date recived from user


        chat_prompt_template = ChatPromptTemplate.from_messages(
                messages=[
                    SystemMessage(content=system_prompt()),
                    HumanMessage(content=[
                        {"type": "image_url",
                         "image_url": {inventoryCreateModel.material_image}},
                        {"type": "text", "text": f"Select either donate or recycle or upcycle for the shown in the image?"}
                    ])
                ]
            )

        chain = chat_prompt_template | watsonx_llm

        category_reason = chain.invoke({})
        category = get_category(category_reason)
        organization_data = MongoUtil.get_organization(category.lower())
        
        
        inventory.category = category
        inventory.reason_for_category = category_reason
        inventory.organization_id = organization_data["organization_id"]
        inventory.organization_name = organization_data["organization_name"]
        inventory.organization_address = organization_data["address"]

        # Default values while creating new inventory item
        inventory.green_coins = 10
        inventory.picked_up_date = str(datetime.now() + timedelta(days=2))
        inventory.organization_received_status = "pending"

        print(inventory.model_dump())
        try:
            response = MongoUtil.create_new_inventory(inventory.model_dump())
            print(response)
            return response
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))
        
    @staticmethod
    def update_inventory(inventory_id: str, inventoryUpdateModel: InventoryUpdateModel):

        current_date: datetime = datetime.now()
        if (inventoryUpdateModel.organization_received_status == 'picked_up'):
            inventoryUpdateModel.picked_up_date = str(current_date)
            inventoryUpdateModel.drop_off_date = str(current_date + timedelta(days=2))
        else:
             inventoryUpdateModel.drop_off_date = str(current_date)
        try:
            response = MongoUtil.update_inventory(inventory_id, inventoryUpdateModel)
            return response
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=500, detail=str(e))
        
    @staticmethod
    def get_inventory_list_by_status(org_received_status):
        try:
            inventory_list = MongoUtil.list_inventory_by_status(org_received_status)
            if inventory_list == None:
                return {"success": False, "errorCode": "EKTU002",
                        "errorMessage": "Inventory not found with org_received_status: {org_received_status}"}
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
                    water_saved += x['count'] * WEIGHT_PER_ITEM * WATER_PER_KG_COTTON
                if x['isCotton'] == False:
                    water_saved += x['count'] * WEIGHT_PER_ITEM * WATER_PER_KG_OTHER_CLOTH

            # Calculate Carbon footprint
            CARBON_PER_KG = 10
            carbon = data[0]['total'] * WEIGHT_PER_ITEM * CARBON_PER_KG

            stats  = { 'water_saved': water_saved, 'carbon': carbon, 'clothes_donated': data[0]['total'] }
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