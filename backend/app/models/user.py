import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id            = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email         = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name     = Column(String(100), nullable=False)
    programme     = Column(String(100), nullable=True)
    year_of_study = Column(String(10), nullable=True)
    skill_level   = Column(String(50), default="beginner")
    availability  = Column(JSONB, default=dict)
    is_verified   = Column(Boolean, default=False)
    avatar_url    = Column(String(500), nullable=True)
    created_at    = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    created_groups = relationship("StudyGroup", back_populates="creator")
    group_memberships = relationship("GroupMember", back_populates="user")
    forum_posts    = relationship("ForumPost", back_populates="author")
    uploaded_files = relationship("AcademicFile", back_populates="uploader")
    reviews_given  = relationship(
        "PeerReview", foreign_keys="PeerReview.reviewer_id", back_populates="reviewer"
    )
    reviews_received = relationship(
        "PeerReview", foreign_keys="PeerReview.reviewee_id", back_populates="reviewee"
    )
