from pydantic import BaseModel

class UserLoginParams(BaseModel):
    email: str
    password: str

class RegisterUserParams(BaseModel):
    user_name: str
    state: str
    address: str
    contact: str
    email_address: str
    password:  str
