import uuid
from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class StudyGroup(Base):
    __tablename__ = "study_groups"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_code = Column(String(20), nullable=False, index=True)
    title       = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    creator_id  = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    max_members = Column(Integer, default=10)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    creator  = relationship("User", back_populates="created_groups")
    members  = relationship("GroupMember", back_populates="group")
    posts    = relationship("ForumPost", back_populates="group")
    files    = relationship("AcademicFile", back_populates="group")
    reviews  = relationship("PeerReview", back_populates="group")


class GroupMember(Base):
    __tablename__ = "group_members"

    group_id  = Column(UUID(as_uuid=True), ForeignKey("study_groups.id"), primary_key=True)
    user_id   = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    role      = Column(String(50), default="member")  # member | moderator
    joined_at = Column(DateTime(timezone=True), server_default=func.now())

    group = relationship("StudyGroup", back_populates="members")
    user  = relationship("User", back_populates="group_memberships")


class ForumPost(Base):
    __tablename__ = "forum_posts"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    group_id    = Column(UUID(as_uuid=True), ForeignKey("study_groups.id"), nullable=False)
    author_id   = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    parent_id   = Column(UUID(as_uuid=True), ForeignKey("forum_posts.id"), nullable=True)
    content     = Column(Text, nullable=False)
    is_markdown = Column(Boolean, default=False)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    group   = relationship("StudyGroup", back_populates="posts")
    author  = relationship("User", back_populates="forum_posts")
    replies = relationship("ForumPost", backref="parent", remote_side="ForumPost.id")


class AcademicFile(Base):
    __tablename__ = "academic_files"

    id           = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    group_id     = Column(UUID(as_uuid=True), ForeignKey("study_groups.id"), nullable=False)
    uploader_id  = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    file_name    = Column(String(255), nullable=False)
    file_url     = Column(String(500), nullable=False)
    file_type    = Column(String(50), nullable=True)   # pdf | docx | pptx | zip
    file_size_kb = Column(Integer, nullable=True)
    upvote_count = Column(Integer, default=0)
    uploaded_at  = Column(DateTime(timezone=True), server_default=func.now())

    group    = relationship("StudyGroup", back_populates="files")
    uploader = relationship("User", back_populates="uploaded_files")


class PeerReview(Base):
    __tablename__ = "peer_reviews"

    id           = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reviewer_id  = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    reviewee_id  = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    group_id     = Column(UUID(as_uuid=True), ForeignKey("study_groups.id"), nullable=False)
    rating       = Column(Integer, nullable=False)   # 1–5
    comment      = Column(Text, nullable=True)
    created_at   = Column(DateTime(timezone=True), server_default=func.now())

    reviewer = relationship("User", foreign_keys=[reviewer_id], back_populates="reviews_given")
    reviewee = relationship("User", foreign_keys=[reviewee_id], back_populates="reviews_received")
    group    = relationship("StudyGroup", back_populates="reviews")


class StudySpot(Base):
    __tablename__ = "study_spots"

    id            = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name          = Column(String(150), nullable=False)
    latitude      = Column(String(20), nullable=False)
    longitude     = Column(String(20), nullable=False)
    noise_level   = Column(String(20), default="quiet")   # quiet | moderate | social
    busyness      = Column(String(20), default="normal")  # low | normal | high
    capacity_pct  = Column(Integer, default=0)
    distance_m    = Column(Integer, nullable=True)
    has_power     = Column(Boolean, default=True)
    updated_at    = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
