from fastapi import APIRouter
from sqlalchemy import text

from database import SessionLocal

router = APIRouter()


@router.get("/duration-wise")
def duration_wise():

    db = SessionLocal()

    query = text("""
        SELECT
            CASE
                WHEN DELAY_DURN < 1 THEN '0-1 Hr'
                WHEN DELAY_DURN < 2 THEN '1-2 Hr'
                WHEN DELAY_DURN < 5 THEN '2-5 Hr'
                WHEN DELAY_DURN < 10 THEN '5-10 Hr'
                ELSE '10+ Hr'
            END AS DURATION_RANGE,

            COUNT(*) AS TOTAL_DELAYS,

            AVG(DELAY_DURN) AS AVG_DELAY,

            MAX(DELAY_DURN) AS MAX_DELAY

        FROM delay_data

        WHERE DELAY_DURN IS NOT NULL

        GROUP BY DURATION_RANGE

        ORDER BY
            CASE
                WHEN DURATION_RANGE = '0-1 Hr' THEN 1
                WHEN DURATION_RANGE = '1-2 Hr' THEN 2
                WHEN DURATION_RANGE = '2-5 Hr' THEN 3
                WHEN DURATION_RANGE = '5-10 Hr' THEN 4
                ELSE 5
            END
    """)

    result = db.execute(query)

    data = []

    for row in result:

        data.append({

            "duration_range": row[0],
            "total_delays": row[1],
            "avg_delay": float(row[2]),
            "max_delay": float(row[3])

        })

    db.close()

    return data