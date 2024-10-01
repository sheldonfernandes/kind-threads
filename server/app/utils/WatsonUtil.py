import os

def get_watsonxai_creds():
    api_key = os.getenv("WATSONX_AI_KEY", None)
    api_url = os.getenv("WATSONX_AI_API", None)
    project_id = os.getenv("WATSONX_AI_PROJECT_ID", None)
    return {"url": api_url, "apikey": api_key, "projectid": project_id}

def system_prompt():
    return 'You are a helpful assistant. Image will be provided to you with query. Image contains old piece of clothing that has been worn out. Provide a general advice.'