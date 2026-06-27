from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/me")
def get_my_profile(current_user: User = Depends(get_current_user)):
    return {
        "user_id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email,
        "programme": current_user.programme,
        "year_of_study": current_user.year_of_study,
        "skill_level": current_user.skill_level,
        "availability": current_user.availability,
        "avatar_url": current_user.avatar_url,
        "created_at": current_user.created_at.isoformat(),
    }


@router.patch("/me")
def update_profile(
    payload: dict,
    current_user: User = Depends(get_current_user),
):
    # TODO: implement full update logic
    return {"message": "Profile updated successfully."}
