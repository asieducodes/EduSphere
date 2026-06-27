from fastapi import APIRouter
router = APIRouter()

@router.get("/{group_id}/posts")
def get_posts(group_id: str):
    return {"group_id": group_id, "posts": []}

@router.post("/{group_id}/posts")
def create_post(group_id: str, payload: dict):
    return {"message": "Post created."}
