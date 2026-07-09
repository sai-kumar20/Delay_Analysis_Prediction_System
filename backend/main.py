from fastapi import FastAPI
from routers.prediction_router import router as prediction_router
from fastapi.middleware.cors import CORSMiddleware
from routers.shop_router import router as shop_router
from routers.equipment_router import router as equipment_router
from routers.agency_router import router as agency_router
from routers.duration_router import router as duration_router
from routers.conveyor_router import router as conveyor_router
from routers.season_router import router as season_router
from routers.prediction_report_router import router as prediction_report_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(shop_router)
app.include_router(equipment_router)
app.include_router(agency_router)
app.include_router(duration_router)
app.include_router(conveyor_router)
app.include_router(season_router)
app.include_router(prediction_router)
app.include_router(prediction_report_router)
@app.get("/")
def home():
    return {
        "message": "Delay Analysis & Prediction System"
    }