import traceback

from fastapi import HTTPException
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames
from app.models.ScanImage import ScanImage
from app.models.Inventory import InventoryModel, InventoryCreateModel, InventoryUpdateModel
from app.utils import MongoUtil
from langchain_ibm import WatsonxLLM
from datetime import datetime, timedelta

from app.utils.WatsonUtil import get_watsonxai_creds, system_prompt

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


class InventoryService:
    @staticmethod
    def fetch_image_data(scannedImageData: ScanImage):
        try:

            chat_prompt_template = ChatPromptTemplate.from_messages(
                messages=[
                    SystemMessage(content=system_prompt()),
                    HumanMessage(content=[
                        {"type": "image_url",
                         "image_url": f"data:image/jpeg;base64,{scannedImageData.image}"},
                        {"type": "text", "text": f"What is the most suitable action for the fabric type {scannedImageData.fabric_type} shown in the image: donate, recycle, or upcycle? Please explain your reasoning for the choice you make."}
                    ])
                ]
            )

            chain = chat_prompt_template | watsonx_llm

            response = chain.invoke({})

            print(response)
            return {"hi": response}
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
        
    @staticmethod
    def create_inventory(inventoryCreateModel: InventoryCreateModel):

        print(inventoryCreateModel)
        inventory = InventoryModel()
        inventory.user_id = inventoryCreateModel.user_id
        inventory.user_name = inventoryCreateModel.user_name
        inventory.material_image = inventoryCreateModel.material_image
        inventory.fabric_type = inventoryCreateModel.fabric_type
        inventory.pick_up_address = inventoryCreateModel.pick_up_address

        # Below feilds wil be assigned by watsonxai based date recived from user
        inventory.category = "donate" 
        inventory.reason_for_category = "The fabric is still in good condition but no longer needed."
        inventory.organization_id = "ORG012345"
        inventory.organization_name = "Recyler Org Ltd"

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
        inventoryUpdateModel.picked_up_date = str(current_date)
        inventoryUpdateModel.drop_off_date = str(current_date + timedelta(days=2))
        try:
            response = MongoUtil.update_inventory(inventory_id, inventoryUpdateModel.model_dump())
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
