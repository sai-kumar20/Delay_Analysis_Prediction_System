from fastapi import APIRouter
from pydantic import BaseModel

from ml.predict import predict_delay

router = APIRouter()


class PredictionRequest(BaseModel):
    shop_code: int
    equipment: str
    agency: str
    delay_freq: float
    remarks_category: str
    month: int
    season: str


@router.post("/predict")
def predict(request: PredictionRequest):

    result = predict_delay(
        shop_code=request.shop_code,
        equipment=request.equipment,
        agency=request.agency,
        delay_freq=request.delay_freq,
        remarks_category=request.remarks_category,
        month=request.month,
        season=request.season
    )

    return result