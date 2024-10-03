import traceback

from fastapi import HTTPException
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames
from app.models import ScanImage
from app.utils import MongoUtil
from langchain_ibm import WatsonxLLM

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
    def fetch_list_of_donation(userid):
        try:
            data = MongoUtil.get_list_of_donation(userid)
            if data == None:
                return {"success": False, "errorCode": "EKTU001",
                        "errorMessage": "User doesn't exist"}
            
            return {
                'success': True,
                'user_donation_list': data,
                'errorMessage': None,
                'errorCode': None
            }
        except Exception as e:
            print(f"Error in user service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
