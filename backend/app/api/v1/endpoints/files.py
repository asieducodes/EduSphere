from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from uuid import UUID
import cloudinary
import cloudinary.uploader
from app.core.database import get_db
from app.core.security import get_current_user
from app.core.config import settings
from app.models.user import User
from app.models.group import StudyGroup, GroupMember, AcademicFile

router = APIRouter()

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)

MAX_FILE_SIZE_MB = 15


@router.get("/{group_id}/files")
def list_files(
    group_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    group = db.query(StudyGroup).filter(StudyGroup.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found.")

    files = db.query(AcademicFile).filter(AcademicFile.group_id == group_id).all()
    return {
        "group_id": str(group_id),
        "files": [
            {
                "file_id": str(f.id),
                "file_name": f.file_name,
                "file_url": f.file_url,
                "file_type": f.file_type,
                "file_size_kb": f.file_size_kb,
                "upvote_count": f.upvote_count,
                "uploader": {
                    "user_id": str(f.uploader.id),
                    "full_name": f.uploader.full_name,
                },
                "uploaded_at": f.uploaded_at.isoformat(),
            }
            for f in files
        ],
    }


@router.post("/{group_id}/files", status_code=status.HTTP_201_CREATED)
async def upload_file(
    group_id: UUID,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verify membership
    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == current_user.id,
    ).first()
    if not member:
        raise HTTPException(status_code=403, detail="You must be a group member to upload files.")

    # File size check (15MB limit per SRS FR5.1)
    contents = await file.read()
    size_kb = len(contents) / 1024
    if size_kb > MAX_FILE_SIZE_MB * 1024:
        raise HTTPException(status_code=413, detail=f"File exceeds {MAX_FILE_SIZE_MB}MB limit.")

    # Detect file type from extension
    ext = file.filename.split(".")[-1].lower() if "." in file.filename else "other"

    # Upload to Cloudinary
    try:
        result = cloudinary.uploader.upload(
            contents,
            folder=f"edusphere/groups/{group_id}",
            resource_type="raw",
            public_id=file.filename,
            overwrite=False,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

    # Save metadata to DB
    academic_file = AcademicFile(
        group_id=group_id,
        uploader_id=current_user.id,
        file_name=file.filename,
        file_url=result["secure_url"],
        file_type=ext,
        file_size_kb=int(size_kb),
    )
    db.add(academic_file)
    db.commit()
    db.refresh(academic_file)

    return {
        "file_id": str(academic_file.id),
        "file_name": academic_file.file_name,
        "file_url": academic_file.file_url,
        "file_size_kb": academic_file.file_size_kb,
        "uploaded_at": academic_file.uploaded_at.isoformat(),
    }
