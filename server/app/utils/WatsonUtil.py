import os

def get_watsonxai_creds():
    api_key = os.getenv("WATSONX_AI_KEY", None)
    api_url = os.getenv("WATSONX_AI_API", None)
    project_id = os.getenv("WATSONX_AI_PROJECT_ID", None)
    return {"url": api_url, "apikey": api_key, "projectid": project_id}


def augment_api_request_body(user_query, image):
    messages = [
        {
            "role": "user",
            "content": [{
                "type": "text",
                "text": 'You are a helpful assistant that answers in JSON format.' + user_query
            },
                {
                "type": "image_url",
                "image_url": {
                    "url": image,
                }
            }]
        }
    ]

    return messages


def human_prompt():
    return """
<|begin_of_text|><|start_header_id|>user<|end_header_id|>

<|image|>Provide answer in JSON format where short_desc, type, brand, size, condition, material, recommendation and donation_centers are attributes of JSON.

1. short_desc: Describe the item atleast 10 characters.
2. type: Identify the type of item (e.g., shirt, pants, dress, bottle, can, etc.).
3. brand: Detect and determine the brand if visible (e.g., via logos, tags, or design features).
4. size: Determine the size (e.g., S, M, L, etc.) if available through tags or labels.
5. condition: Assess the condition of the item (e.g., new, slightly worn, heavily used, torn, etc.).
6. material: Identify the material of the item (e.g., cotton, polyester, wool, etc.).
7. recommendation: Crisp 2 sentence note best way to reuse, recycle or donate the item and why
8. donation_centers: Upto 2 local donation centers address for identified item type at zip code 27560. Address contains atleast 10 characters.
Here's an example JSON output format for reference:
```
{
    "short_desc": "string",
    "type": "string",
    "brand": "string",
    "size": "string",
    "condition: "string",
    "material": "string",
    "recommendation": "string",
    "donation_centers": [ "string", "string", "string"]
}
```
<|eot_id|><|start_header_id|>assistant<|end_header_id|>
"""
