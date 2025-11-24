from fastapi import APIRouter, HTTPException
from typing import List
from ..models.property import Property
from ..services.data_service import fetch_properties

router = APIRouter()

@router.get("/properties", response_model=List[Property])
async def get_properties(district: str = None, verified: bool = None, scam_flag: bool = None):
    try:
        properties = await fetch_properties(district, verified, scam_flag)
        return properties
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))