from fastapi import APIRouter

router = APIRouter()

# Seeded KNUST campus study spots
KNUST_SPOTS = [
    {
        "spot_id": "spot-001",
        "name": "Main Library",
        "latitude": "6.6745",
        "longitude": "-1.5716",
        "noise_level": "quiet",
        "busyness": "high",
        "capacity_pct": 85,
        "distance_m": 200,
        "has_power": True,
    },
    {
        "spot_id": "spot-002",
        "name": "CCB Block",
        "latitude": "6.6738",
        "longitude": "-1.5720",
        "noise_level": "moderate",
        "busyness": "normal",
        "capacity_pct": 55,
        "distance_m": 450,
        "has_power": True,
    },
    {
        "spot_id": "spot-003",
        "name": "Unity Hall Common Room",
        "latitude": "6.6752",
        "longitude": "-1.5708",
        "noise_level": "social",
        "busyness": "low",
        "capacity_pct": 30,
        "distance_m": 620,
        "has_power": False,
    },
    {
        "spot_id": "spot-004",
        "name": "College of Engineering Reading Room",
        "latitude": "6.6730",
        "longitude": "-1.5730",
        "noise_level": "quiet",
        "busyness": "normal",
        "capacity_pct": 60,
        "distance_m": 350,
        "has_power": True,
    },
]


@router.get("/spots")
def get_study_spots():
    return {"spots": KNUST_SPOTS}


@router.get("/spots/{spot_id}")
def get_spot(spot_id: str):
    spot = next((s for s in KNUST_SPOTS if s["spot_id"] == spot_id), None)
    if not spot:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Study spot not found.")
    return spot
