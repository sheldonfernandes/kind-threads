from pydantic import BaseModel

class ScanImage(BaseModel):
    fabric_type: str
    base64image: str
    image_format : str
