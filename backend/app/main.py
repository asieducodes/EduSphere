from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import auth, users, groups, files, posts, reviews, map

app = FastAPI(
    title="EduSphere API",
    description="Campus Study Group & Resource Finder — KNUST",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://edusphere.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router,    prefix="/api/v1/auth",    tags=["Authentication"])
app.include_router(users.router,   prefix="/api/v1/users",   tags=["Users"])
app.include_router(groups.router,  prefix="/api/v1/groups",  tags=["Study Groups"])
app.include_router(files.router,   prefix="/api/v1/groups",  tags=["Files"])
app.include_router(posts.router,   prefix="/api/v1/groups",  tags=["Forum Posts"])
app.include_router(reviews.router, prefix="/api/v1/groups",  tags=["Peer Reviews"])
app.include_router(map.router,     prefix="/api/v1/map",     tags=["Campus Map"])


@app.get("/", tags=["Health"])
def root():
    return {"message": "EduSphere API is running 🎓", "version": "1.0.0"}


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}
