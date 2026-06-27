from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from uuid import UUID
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.group import StudyGroup, GroupMember
from pydantic import BaseModel

router = APIRouter()


class CreateGroupRequest(BaseModel):
    course_code: str
    title: str
    description: str = ""
    max_members: int = 10


@router.get("")
def list_groups(
    course_code: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    per_page: int = 12,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(StudyGroup)
    if course_code:
        query = query.filter(StudyGroup.course_code.ilike(f"%{course_code}%"))
    if search:
        query = query.filter(StudyGroup.title.ilike(f"%{search}%"))

    total = query.count()
    groups = query.offset((page - 1) * per_page).limit(per_page).all()

    result = []
    for g in groups:
        member_count = db.query(func.count(GroupMember.user_id)).filter(
            GroupMember.group_id == g.id
        ).scalar()
        result.append({
            "group_id": str(g.id),
            "course_code": g.course_code,
            "title": g.title,
            "description": g.description,
            "member_count": member_count,
            "max_members": g.max_members,
            "is_full": member_count >= g.max_members,
            "creator": {
                "user_id": str(g.creator.id),
                "full_name": g.creator.full_name,
            },
            "created_at": g.created_at.isoformat(),
        })

    return {"total": total, "page": page, "per_page": per_page, "groups": result}


@router.post("", status_code=status.HTTP_201_CREATED)
def create_group(
    payload: CreateGroupRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    group = StudyGroup(
        course_code=payload.course_code.upper(),
        title=payload.title,
        description=payload.description,
        creator_id=current_user.id,
        max_members=payload.max_members,
    )
    db.add(group)
    db.flush()

    membership = GroupMember(
        group_id=group.id,
        user_id=current_user.id,
        role="moderator",
    )
    db.add(membership)
    db.commit()
    db.refresh(group)

    return {
        "group_id": str(group.id),
        "course_code": group.course_code,
        "title": group.title,
        "created_at": group.created_at.isoformat(),
    }


@router.post("/{group_id}/join")
def join_group(
    group_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    group = db.query(StudyGroup).filter(StudyGroup.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found.")

    already_member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == current_user.id,
    ).first()
    if already_member:
        raise HTTPException(status_code=409, detail="You are already a member of this group.")

    member_count = db.query(func.count(GroupMember.user_id)).filter(
        GroupMember.group_id == group_id
    ).scalar()
    if member_count >= group.max_members:
        raise HTTPException(status_code=400, detail="This group is full.")

    membership = GroupMember(group_id=group_id, user_id=current_user.id, role="member")
    db.add(membership)
    db.commit()
    return {"message": "Successfully joined the group.", "group_id": str(group_id)}
