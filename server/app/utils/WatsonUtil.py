import os

def get_watsonxai_creds():
    api_key = os.getenv("WATSONX_AI_KEY", None)
    api_url = os.getenv("WATSONX_AI_API", None)
    project_id = os.getenv("WATSONX_AI_PROJECT_ID", None)
    return {"url": api_url, "apikey": api_key, "projectid": project_id}

def system_prompt():
    return """Analyze the provided image of a item to recycle provided in base64 encoding and extract the following details and return in JSON format:

1. short_desc: Describe the item
2. type: Identify the type of item (e.g., shirt, pants, dress, bottle, can, etc.).
3. brand: Detect and determine the brand if visible (e.g., via logos, tags, or design features).
4. size: Determine the size (e.g., S, M, L, etc.) if available through tags or labels.
5. condition: Assess the condition of the item (e.g., new, slightly worn, heavily used, torn, etc.).
6. material: Identify the material of the item (e.g., cotton, polyester, wool, etc.).
7. recommendation: Crisp 2 sentence note best way to reuse, recycle or donate the item and why
8. donation_centers: Upto 2 local donation centers for identified item type at zip code 27560

Here’s an example JSON output format for reference:
```
{
    "short_desc": "Polo t-shirt",
    "type": "t-shirt",
    "brand": "Adidas",
    "size": "Medium",
    "condition: "slightly worn",
    "material": "cotton",
    "recommendation": "The best way to reuse your old cotton T-shirt is to turn it into cleaning cloths or upcycle it into a DIY project. Alternatively, donating it to textile recycling programs or charities extends its life, reduces waste, and supports sustainability efforts by repurposing the material.",
    "donation_centers": [ "Goodwill at 925 Avent Ferry Rd, Holly Springs, NC 27540", "101 Matthews Dr, Holly Springs, NC 27540"]"
}
```
"""
