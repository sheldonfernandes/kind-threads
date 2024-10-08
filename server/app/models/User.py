from pydantic import BaseModel

class UserLoginParams(BaseModel):
    email: str
    password: str

class RegisterUserParams(BaseModel):
    user_name: str
    state: str
    country: str
    contact: str
    email_address: str
    password:  str
