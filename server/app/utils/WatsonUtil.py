import os

def get_watsonxai_creds():
    api_key = os.getenv("WATSONX_AI_KEY", None)
    api_url = os.getenv("WATSONX_AI_API", None)
    project_id = os.getenv("WATSONX_AI_PROJECT_ID", None)
    return {"url": api_url, "apikey": api_key, "projectid": project_id}

def system_prompt():
    return """Analyze the provided clothing image and evaluate its condition. Determine whether the item should be donated, recycled, or upcycled based on the following criteria:

Condition Assessment: Check for signs of wear, damage, or discoloration. Is the fabric frayed, torn, or heavily stained?
Donation Eligibility: If the item is in good condition and suitable for wear, it can be donated. If it shows significant signs of damage or wear, it should not be considered for donation.
Recycling Potential: If the clothing is too damaged for donation, assess whether the material can be recycled. Identify suitable recycling methods or facilities.
Upcycling Opportunities: If the item has potential for creative repurposing despite its condition, suggest ways it can be upcycled into new products.
Provide a clear recommendation for each category based on your evaluation.
"""
