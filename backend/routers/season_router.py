from fastapi import APIRouter
from sqlalchemy import text

from database import SessionLocal

router = APIRouter()


@router.get("/season-wise")
def season_wise():

    db = SessionLocal()

    query = text("""

        SELECT

CASE
    WHEN MONTH(DEL_DATE) IN (3,4,5) THEN 'Summer'
    WHEN MONTH(DEL_DATE) IN (6,7,8,9) THEN 'Monsoon'
    ELSE 'Winter'
END AS SEASON,

COUNT(*) AS TOTAL_DELAYS,

SUM(DELAY_DURN) AS TOTAL_DELAY_HOURS,

AVG(DELAY_DURN) AS AVG_DELAY_HOURS

FROM delay_data

GROUP BY SEASON

ORDER BY
CASE
    WHEN SEASON='Summer' THEN 1
    WHEN SEASON='Monsoon' THEN 2
    ELSE 3
END;

    """)

    result = db.execute(query)

    data = []

    for row in result:

        data.append({

    "season": row[0],

    "total_delays": row[1],

    "total_delay_hours": float(row[2]),

    "avg_delay_hours": float(row[3])

})

    db.close()

    return data