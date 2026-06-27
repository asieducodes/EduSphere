from fastapi import APIRouter
router = APIRouter()

@router.post("/{group_id}/reviews")
def submit_review(group_id: str, payload: dict):
    return {"message": "Review submitted."}
