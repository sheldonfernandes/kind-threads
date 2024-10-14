def get_category(response):
    keywords = ("Recycle", "Upcycle")
    category = "Donate"
    for word in keywords:
        if word.lower() in response.lower():
            category = word
            break
    return category

def calculate_stats(data):
    # Calculate water saved
    WEIGHT_PER_ITEM = .4
    WATER_PER_KG_COTTON = 4000
    WATER_PER_KG_OTHER_CLOTH = 500
    water_saved = WEIGHT_PER_ITEM * WATER_PER_KG_COTTON if data['fabric_type'] == "Cotton"   else WEIGHT_PER_ITEM * WATER_PER_KG_OTHER_CLOTH
    
    # Calculate Carbon footprint
    CARBON_PER_KG = 10
    carbon = WEIGHT_PER_ITEM * CARBON_PER_KG

    stats  = { 'water_saved': water_saved, 'carbon': carbon, 'clothes_donated': 1 }
    return stats