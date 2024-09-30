import os
from pymongo import MongoClient
from bson.json_util import dumps, loads
def get_database():
    client = MongoClient(os.getenv('MONGODB_CONNECTION_STRING'))
    return client[os.getenv('MONGODB_DATABASE')]

def get_user_profile(userid):
    db = get_database()
    data = db.get_collection('users').find_one({"user_id": userid}, {'_id': 0})
    return data
