import traceback

from fastapi import HTTPException
from langchain_core.prompts import ChatPromptTemplate
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames
from app.models import ScanImage
from langchain_ibm import WatsonxLLM


class InventoryService:
    @staticmethod
    def fetch_image_data(scannedImageData: ScanImage):
        try:
        
            return {"hi": "hello"}
        except Exception as e:
            print(f"Error in inventory service: {e}")
            print(traceback.format_exc())
            raise HTTPException(status_code=404, detail=str(e))
