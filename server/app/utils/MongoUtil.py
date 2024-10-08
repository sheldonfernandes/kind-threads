import os
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps, loads

def get_database():
    client = MongoClient(os.getenv('MONGODB_CONNECTION_STRING'))
    return client[os.getenv('MONGODB_DATABASE')]

def get_user_profile(userid):
    db = get_database()
    data = db.get_collection('users').find_one({"user_id": userid}, {'_id': 0})
    return data

def list_inventory_by_user_id(userid):
    db = get_database()
    data = db.get_collection('inventory').find({"user_id": userid}, {'_id': 0}).to_list(100)
    return data

def list_inventory_by_status(org_received_status):
    db = get_database()
    data = db.get_collection('inventory').find({"organization_received_status": org_received_status},{'_id': 0}).to_list(100)
    return data

def list_inventory_by_collector_id(collector_id):
    db = get_database()
    data = db.get_collection('inventory').find({"collector_id": collector_id},{'_id': 0}).to_list(100)
    return data

def create_new_inventory(inventory_data):
    db = get_database()
    collection = db['inventory']
    inventory_id = collection.insert_one(inventory_data).inserted_id
    inventory = collection.find_one({'_id': ObjectId(inventory_id)})
    inventory['_id'] = str(inventory['_id'])
    return inventory

def update_inventory(inventory_id, inventory_update_data):
    db = get_database()
    collection = db['inventory']
    updated_inventory = collection.update_one({'_id': ObjectId(inventory_id)}, {"$set": inventory_update_data})
    updated_inventory = collection.find_one({'_id': ObjectId(inventory_id)})
    updated_inventory['_id'] = str(updated_inventory['_id'])
    return updated_inventory
