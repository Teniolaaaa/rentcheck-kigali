# backend/src/routes/__init__.py

from fastapi import APIRouter

router = APIRouter()

from .properties import router as properties_router

router.include_router(properties_router, prefix="/properties", tags=["properties"])