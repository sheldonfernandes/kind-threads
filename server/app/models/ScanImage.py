from pydantic import BaseModel

class ScanImage(BaseModel):
    fabric_type: str
    image: str
