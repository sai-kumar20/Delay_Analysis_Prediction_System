from fastapi import APIRouter
from sqlalchemy import text

from database import SessionLocal

router = APIRouter()


@router.get("/shop-wise")
def shop_wise(month: int, year: int):

    db = SessionLocal()

    query = text("""
        SELECT

            SHOP_CODE,

            COUNT(*) AS TOTAL_DELAYS,

            SUM(DELAY_DURN) AS TOTAL_DELAY_HOURS,

            AVG(DELAY_DURN) AS AVG_DELAY_HOURS

        FROM delay_data

        WHERE MONTH(DEL_DATE)=:month

        AND YEAR(DEL_DATE)=:year

        GROUP BY SHOP_CODE

        ORDER BY TOTAL_DELAYS DESC

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
            "shop_code": row[0],

            "total_delays": row[1],

            "total_delay_hours": float(row[2]),

            "avg_delay_hours": float(row[3])
        })

    db.close()

    return data