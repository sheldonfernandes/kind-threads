import os
from fastapi import FastAPI
from dotenv import load_dotenv

from app.routers import users
from app.routers import inventory
from app.routers import admin

load_dotenv()
app = FastAPI(
    title="Server APIs",
    description="APIs",
    swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
    docs_url=f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/docs"
)

@app.get(
    f"{os.getenv('ROOT_PATH') if os.getenv('ROOT_PATH') else ''}/healthz",
    tags=["Health"],
)
def healthz():
    return "OK"

app.include_router(users.router)
app.include_router(inventory.router)
app.include_router(admin.router)

