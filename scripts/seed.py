"""
EduSphere Database Seed Script
Run: python scripts/seed.py
Creates initial study spots and a test student account.
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from backend.app.core.database import SessionLocal, engine
from backend.app.core import database
from backend.app.models import user, group
from backend.app.core.security import hash_password
import uuid

# Create all tables
database.Base.metadata.create_all(bind=engine)

db = SessionLocal()

print("🌱 Seeding EduSphere database...")

# Seed test student
test_user = user.User(
    id=uuid.uuid4(),
    email="test@st.knust.edu.gh",
    password_hash=hash_password("Test1234!"),
    full_name="Test Student",
    programme="Computer Engineering",
    year_of_study="Year 3",
    skill_level="intermediate",
    availability={"monday": ["08:00", "14:00"], "wednesday": ["09:00"], "friday": ["11:00"]},
    is_verified=True,
)
db.merge(test_user)

# Seed study spots
spots = [
    group.StudySpot(name="Main Library",                  latitude="6.6745", longitude="-1.5716", noise_level="quiet",    busyness="high",   capacity_pct=85, distance_m=200,  has_power=True),
    group.StudySpot(name="CCB Block",                     latitude="6.6738", longitude="-1.5720", noise_level="moderate", busyness="normal", capacity_pct=55, distance_m=450,  has_power=True),
    group.StudySpot(name="Unity Hall Common Room",        latitude="6.6752", longitude="-1.5708", noise_level="social",   busyness="low",    capacity_pct=30, distance_m=620,  has_power=False),
    group.StudySpot(name="COE Reading Room",              latitude="6.6730", longitude="-1.5730", noise_level="quiet",    busyness="normal", capacity_pct=60, distance_m=350,  has_power=True),
    group.StudySpot(name="Balme Library Annex",           latitude="6.6760", longitude="-1.5695", noise_level="quiet",    busyness="low",    capacity_pct=25, distance_m=800,  has_power=True),
]

for spot in spots:
    db.add(spot)

db.commit()
print("✅ Seed complete!")
print("\nTest credentials:")
print("  Email:    test@st.knust.edu.gh")
print("  Password: Test1234!")
db.close()
