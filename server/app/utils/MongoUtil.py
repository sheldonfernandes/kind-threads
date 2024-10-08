import os
import uuid
from fastapi.encoders import jsonable_encoder
from pymongo import MongoClient

from app.models.User import RegisterUserParams, UserLoginParams


def get_database():
    client = MongoClient(os.getenv('MONGODB_CONNECTION_STRING'))
    return client[os.getenv('MONGODB_DATABASE')]


def get_user_profile(userid):
    db = get_database()
    data = db.get_collection('users').find_one({"user_id": userid}, {'_id': 0})
    return data


def get_list_of_donation(userid):
    db = get_database()
    data = db.get_collection('inventory').find(
        {"user_id": userid}, {'_id': 0}).to_list(100)
    return data


def validate_user(userLoginParams: UserLoginParams):
    db = get_database()
    data = db.get_collection('users').find_one(
        {"email_address": userLoginParams.email, "password": userLoginParams.password}, {'_id': 0})
    return data


def register_user(registerUserParams: RegisterUserParams):
    db = get_database()
    user_id = uuid.uuid4().hex
    data = db.get_collection('users').insert_one(
        {"user_id": user_id, "total_green_coins": 0, **jsonable_encoder(registerUserParams)})
    return data

def get_organization(category):
    db = get_database()
    data = db.get_collection('organizations').find_one({"category": category}, {'_id': 0})
    return data