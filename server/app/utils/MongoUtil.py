import os
import uuid
from fastapi.encoders import jsonable_encoder
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps, loads

from app.models.User import RegisterUserParams, UserLoginParams
from app.models.Inventory import InventoryUpdateModel


def get_database():
    client = MongoClient(os.getenv('MONGODB_CONNECTION_STRING'))
    return client[os.getenv('MONGODB_DATABASE')]


def get_user_profile(userid):
    db = get_database()
    data = db.get_collection('users').find_one({"user_id": userid}, {'_id': 0})
    return data


def list_inventory_by_user_id(userid):
    db = get_database()
    data = db.get_collection('inventory').find(
        {"user_id": userid}, {'_id': 0}).to_list(100)
    return data


def list_inventory_by_status(org_received_status):
    db = get_database()
    data = db.get_collection('inventory').find(
        {"organization_received_status": org_received_status}, {'_id': 0}).to_list(100)
    return data


def list_inventory_by_collector_id(collector_id, status):
    db = get_database()
    data = db.get_collection('inventory').find(
        {"collector_id": collector_id, "organization_received_status": status}, {'_id': 0}).to_list(100)
    return data


def create_new_inventory(inventory_data):
    db = get_database()
    collection = db['inventory']
    inventory_id = collection.insert_one(inventory_data).inserted_id
    inventory = collection.find_one({'_id': ObjectId(inventory_id)})
    inventory['_id'] = str(inventory['_id'])
    return inventory


def update_inventory(inventory_id: str, inventory_update_data: InventoryUpdateModel):
    db = get_database()
    collection = db['inventory']
    if (inventory_update_data.organization_received_status == 'picked_up'):
        updated_inventory = collection.update_one({'inventory_id': inventory_id}, {
            "$set": {
                                                  "collector_id": inventory_update_data.collector_id,
                                                  "collector_name": inventory_update_data.collector_name,
                                                  "organization_received_status": inventory_update_data.organization_received_status,
                                                  "picked_up_date": inventory_update_data.picked_up_date,
                                                  "drop_off_date": inventory_update_data.drop_off_date}})
    else:
        updated_inventory = collection.update_one({'inventory_id': inventory_id}, {
            "$set": {
                "collector_id": inventory_update_data.collector_id,
                                                  "collector_name": inventory_update_data.collector_name,
                                                  "organization_received_status": inventory_update_data.organization_received_status,
                                                  "drop_off_date": inventory_update_data.drop_off_date
                                                  }})

    updated_inventory = collection.find_one(
        {'inventory_id': inventory_id}, {'_id': 0})
    return updated_inventory


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
    data = db.get_collection('organizations').find_one(
        {"category": category}, {'_id': 0})
    return data


def aggregate_inventory_by_user_id(userid):
    db = get_database()
    data = db.get_collection('inventory').aggregate(
        [
            {
                "$match": {
                    "user_id": userid
                }
            },
            {
                "$group": {
                    "_id": {
                        "isCotton": {
                            "$cond": [
                                {"$eq": ['$fabric_type', 'cotton']},
                                True,
                                False
                            ]
                        }
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$group": {
                    "_id": None,
                    "total": {"$sum": "$count"},  # Total count of all items
                    "details": {
                        "$push": {
                            "isCotton": "$_id.isCotton",
                            "count": "$count"
                        }
                    }
                }
            }
        ]
    ).to_list(100)
    return data


def aggregate_inventory():
    db = get_database()
    data = db.get_collection('inventory').aggregate(
        [
            {
                "$group": {
                    "_id": {
                        "isCotton": {
                            "$cond": [
                                {"$eq": ['$fabric_type', 'cotton']},
                                True,
                                False
                            ]
                        }
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$group": {
                    "_id": None,
                    "total": {"$sum": "$count"},  # Total count of all items
                    "details": {
                        "$push": {
                            "isCotton": "$_id.isCotton",
                            "count": "$count"
                        }
                    }
                }
            }
        ]
    ).to_list(100)
    return data
