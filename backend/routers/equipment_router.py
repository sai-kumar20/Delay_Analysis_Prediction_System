from fastapi import APIRouter
from sqlalchemy import text

from database import SessionLocal

router = APIRouter()


@router.get("/equipment-wise")
def equipment_wise(
    shop_code: str,
    month: int,
    year: int
):

    db = SessionLocal()

    # Convert "1,2" -> [1, 2]
    shop_codes = [
        int(code.strip())
        for code in shop_code.split(",")
    ]

    placeholders = ",".join(
        [f":code{i}" for i in range(len(shop_codes))]
    )

    query = text(f"""
        SELECT

            EQPT,

            COUNT(*) AS TOTAL_DELAYS,

            SUM(DELAY_DURN) AS TOTAL_DELAY_HOURS,

            AVG(DELAY_DURN) AS AVG_DELAY_HOURS

        FROM delay_data

        WHERE SHOP_CODE IN ({placeholders})
        AND MONTH(DEL_DATE) = :month
        AND YEAR(DEL_DATE) = :year
        AND EQPT IS NOT NULL
        AND TRIM(EQPT) <> ''

        GROUP BY EQPT

        ORDER BY TOTAL_DELAY_HOURS DESC
    """)

    params = {
        "month": month,
        "year": year
    }

    for i, code in enumerate(shop_codes):
        params[f"code{i}"] = code

    result = db.execute(query, params)

    data = []

    for row in result:

        data.append({

            "equipment": row[0],

            "total_delays": row[1],

            "total_delay_hours": float(row[2]),

            "avg_delay_hours": float(row[3])

        })

    db.close()

    return data