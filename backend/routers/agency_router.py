from fastapi import APIRouter
from sqlalchemy import text

from database import SessionLocal

router = APIRouter()


@router.get("/agency-wise")
def agency_wise(
    month: int,
    year: int
):

    db = SessionLocal()

    query = text("""
        SELECT

    AGENCY_CODE,

    COUNT(*) AS TOTAL_DELAYS,

    SUM(DELAY_DURN) AS TOTAL_DELAY_HOURS,

    AVG(DELAY_DURN) AS AVG_DELAY_HOURS

FROM delay_data

WHERE MONTH(DEL_DATE)=:month
AND YEAR(DEL_DATE)=:year
AND AGENCY_CODE IS NOT NULL
AND TRIM(AGENCY_CODE) <> ''

GROUP BY AGENCY_CODE

ORDER BY TOTAL_DELAY_HOURS DESC;
    """)

    result = db.execute(
        query,
        {
            "month": month,
            "year": year
        }
    )

    data = []

    for row in result:

        data.append({

            "agency_code": row[0],

            "total_delays": row[1],

            "total_delay_hours": float(row[2]),

            "avg_delay_hours": float(row[3])

        })

    db.close()

    return data