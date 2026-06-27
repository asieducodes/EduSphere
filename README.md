<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=1a3cc7&amp;height=200&amp;section=header&amp;text=EduSphere&amp;fontSize=72&amp;fontColor=ffffff&amp;fontAlignY=38&amp;desc=Campus%20Study%20Group%20and%20Resource%20Finder%20%E2%80%94%20KNUST&amp;descAlignY=58&amp;descSize=18" width="100%"/>

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-File_Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**EduSphere** is a domain-restricted, mobile-first web application built exclusively for KNUST students to discover and join course-specific study groups, share academic resources (past questions, notes, textbooks), and locate on-campus study spots in real time.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Docs](#-api-documentation) · [Team](#-team)

</div>
---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Domain-Restricted Auth** | Registration and login restricted to `@st.knust.edu.gh` emails only |
| 👥 **Study Group Engine** | Create, discover, and join course-specific study groups with capacity tracking |
| 📁 **Resource Repository** | Upload and download past questions, notes, and textbooks (PDF, DOCX, PPTX) |
| 💬 **Discussion Forums** | Threaded asynchronous discussions inside each group workspace |
| 🗺️ **Campus Study Map** | Real-time busyness indicators for KNUST libraries and study blocks |
| 👤 **Student Profiles** | Availability grid, enrolled courses, peer tutor ratings, upload history |
| 🔔 **Notification Engine** | Live alerts for new forum posts and membership state changes |
| 📅 **Session Scheduling** | Group hosts can post shared study session events with time and location |

---

## 🛠 Tech Stack

### Frontend
- **React 18** with React Router v6
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for page and modal animations
- **Leaflet.js** for the interactive campus map
- **Axios** for API communication

### Backend
- **FastAPI** (Python) with Uvicorn ASGI server
- **SQLAlchemy** ORM with Alembic migrations
- **PostgreSQL 16** relational database
- **JWT (python-jose)** for stateless authentication
- **bcrypt** for password hashing
- **Cloudinary** for academic file storage

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- Python >= 3.11
- PostgreSQL >= 14
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/EduSphere.git
cd EduSphere
```

---

### 2. Backend setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Fill in your values in .env

# Run database migrations
alembic upgrade head

# Start the development server
uvicorn app.main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`
API docs available at: `http://localhost:8000/docs`

---

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your values in .env

# Start the development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### 4. Environment variables

**Backend `.env`**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/edusphere
SECRET_KEY=your-super-secret-jwt-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOWED_EMAIL_DOMAIN=st.knust.edu.gh
```

**Frontend `.env`**
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 📁 Project Structure

```
EduSphere/
├── frontend/                        # React application
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── auth/                # LoginCard, SignupForm, OnboardWizard
│       │   ├── layout/              # Navbar, BottomNav, PageWrapper
│       │   ├── groups/              # GroupCard, GroupGrid, JoinModal, FilterPanel
│       │   ├── resources/           # FileCard, UploadModal, FileExplorer
│       │   ├── map/                 # MapContainer, SpotCard, BusynessBar
│       │   ├── profile/             # ProfileHeader, CourseChips, AvailabilityGrid
│       │   └── shared/              # SearchBar, Avatar, Badge, ToastNotif, StarRating
│       ├── pages/                   # LandingPage, AuthPage, HomePage, GroupsPage,
│       │                            # ResourcesPage, MapPage, ProfilePage, GroupRoomPage
│       ├── hooks/                   # useAuth, useGroups, useFiles, useMap
│       ├── context/                 # AuthContext, NotificationContext
│       ├── services/                # api.js, authService.js, groupService.js,
│       │                            # fileService.js, mapService.js
│       └── utils/                   # validators.js, formatters.js, constants.js
│
├── backend/                         # FastAPI application
│   ├── app/
│   │   ├── api/v1/endpoints/        # auth.py, users.py, groups.py,
│   │   │                            # files.py, posts.py, reviews.py, map.py
│   │   ├── core/                    # config.py, security.py, database.py
│   │   ├── models/                  # user.py, group.py, post.py,
│   │   │                            # file.py, review.py, spot.py
│   │   ├── schemas/                 # Pydantic request/response schemas
│   │   ├── services/                # Business logic layer
│   │   └── utils/                   # email.py, cloudinary.py, validators.py
│   ├── tests/                       # Pytest test suites
│   ├── alembic/                     # Database migrations
│   ├── requirements.txt
│   └── main.py
│
├── docs/                            # Full project documentation
│   ├── diagrams/
│   │   ├── mermaid/                 # ERD, Sequence, Component, State diagrams
│   │   └── uml/                     # Use Case, Activity, Class, Component UML
│   └── wireframes/                  # Stitch/Figma exported screens
│
├── scripts/                         # DB seed scripts, deployment helpers
└── README.md
```

---

## 📡 API Documentation

Once the backend is running, full interactive API docs are available at:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Core Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register with KNUST email |
| `POST` | `/api/v1/auth/login` | Login and receive JWT |
| `GET` | `/api/v1/users/me` | Get authenticated user profile |
| `GET` | `/api/v1/groups` | List and filter all study groups |
| `POST` | `/api/v1/groups` | Create a new study group |
| `POST` | `/api/v1/groups/{id}/join` | Join a study group |
| `GET` | `/api/v1/groups/{id}/posts` | Get discussion thread |
| `POST` | `/api/v1/groups/{id}/posts` | Create a forum post |
| `GET` | `/api/v1/groups/{id}/files` | List group files |
| `POST` | `/api/v1/groups/{id}/files` | Upload a file (Cloudinary) |
| `GET` | `/api/v1/map/spots` | Get campus study spots |
| `POST` | `/api/v1/groups/{id}/reviews` | Submit a peer rating |

---

## 👨‍💻 Team

| Name | Role | GitHub |
|---|---|---|
| Asiedu Seth Osei | Backend Lead / Software Architect | [@asieducodes](https://github.com/asieducodes) |
| Frimpong Solomon Junior | Backend Developer | — |
| Agyemang Casper Adu-Gyamfi| Frontend Developer | — |
| Ackom Arnold | Frontend Developer | — |
| Daniel Kuma Gyebi | Documentation | — |
| Joshua Adu Sarfo| Documentation | — |
|Jessica Oforiwaa Anim | Database | — |
|Amuzu Emmanuel|Database | — |

> Built as a group project for **KNUST — Department of Computer Engineering**

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=1a3cc7&height=100&section=footer" width="100%"/>
</div>
