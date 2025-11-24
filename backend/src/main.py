from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import json
from pathlib import Path

app = FastAPI(
    title="RentCheck Kigali API",
    description="Verify landlords and properties in Kigali, Rwanda",
    version="1.0.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
DATA_FILE = Path(__file__).parent.parent / "data" / "kigali_rental_sample.json"

def load_properties():
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

PROPERTIES = load_properties()

@app.get("/")
def root():
    return {
        "message": "Welcome to RentCheck Kigali API",
        "endpoints": {
            "/health": "Health check",
            "/api/v1/properties/search": "Search properties",
            "/api/v1/properties/{id}": "Get property by ID",
            "/api/v1/stats": "Get platform statistics"
        }
    }

@app.get("/health")
def health():
    return {"status": "healthy", "properties_loaded": len(PROPERTIES)}

@app.get("/api/v1/properties/search")
def search_properties(
    q: Optional[str] = None,
    district: Optional[str] = None,
    min_score: Optional[int] = None,
    verified_only: bool = False
):
    results = PROPERTIES.copy()
    
    # Search by query
    if q:
        q_lower = q.lower()
        results = [
            p for p in results 
            if q_lower in p['landlord_name'].lower() 
            or q_lower in p['property_address'].lower()
        ]
    
    # Filter by district
    if district:
        results = [p for p in results if p['district'] == district]
    
    # Filter by minimum score
    if min_score:
        results = [p for p in results if p['rent_check_score'] >= min_score]
    
    # Filter verified only
    if verified_only:
        results = [p for p in results if p['verified_landlord']]
    
    # Sort by score descending
    results.sort(key=lambda x: x['rent_check_score'], reverse=True)
    
    return {
        "total": len(results),
        "properties": results
    }

@app.get("/api/v1/properties/{property_id}")
def get_property(property_id: str):
    property = next((p for p in PROPERTIES if p['property_id'] == property_id), None)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property

@app.get("/api/v1/stats")
def get_stats():
    total_properties = len(PROPERTIES)
    verified_landlords = sum(1 for p in PROPERTIES if p['verified_landlord'])
    avg_score = sum(p['rent_check_score'] for p in PROPERTIES) / total_properties if total_properties > 0 else 0
    total_disputes = sum(len(p['legal_disputes']) for p in PROPERTIES)
    total_scams = sum(len(p['scam_reports']) for p in PROPERTIES)
    
    return {
        "total_properties": total_properties,
        "verified_landlords": verified_landlords,
        "average_score": round(avg_score, 2),
        "total_disputes": total_disputes,
        "total_scam_reports": total_scams,
        "safe_properties": sum(1 for p in PROPERTIES if p['rent_check_score'] >= 75)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)