from fastapi import APIRouter
from sqlalchemy import text

from database import SessionLocal

router = APIRouter()


@router.get("/conveyor-wise")
def conveyor_wise():

    db = SessionLocal()

    query = text("""

        SELECT

    CASE
        WHEN REMARKS LIKE '%BF%' THEN 'BF Conveyor'
        WHEN REMARKS LIKE '%CONV-A%' THEN 'Conveyor A'
        WHEN REMARKS LIKE '%CONV-B%' THEN 'Conveyor B'
        WHEN REMARKS LIKE '%CONV-C%' THEN 'Conveyor C'
        WHEN REMARKS LIKE '%BRIDGE%' THEN 'Bridge Conveyor'
        WHEN REMARKS LIKE '%YARD%' OR REMARKS LIKE '%Y/CONY%' THEN 'Yard Conveyor'
        WHEN REMARKS LIKE '%BOOM%' THEN 'Boom Conveyor'
        WHEN REMARKS LIKE '%CONV%' THEN 'General Conveyor'
WHEN REMARKS LIKE '%CONY%' THEN 'General Conveyor'
WHEN REMARKS LIKE '%CONVEYOR%' THEN 'General Conveyor'
        ELSE 'Other Conveyor'
    END AS CONVEYOR,

    COUNT(*) AS TOTAL_DELAYS,

SUM(DELAY_DURN) AS TOTAL_DELAY_HOURS,

AVG(DELAY_DURN) AS AVG_DELAY_HOURS,

COUNT(*) * 100.0 /
(
    SELECT COUNT(*)
    FROM delay_data
    WHERE REMARKS_CATEGORY = 'Conveyor Failure'
) AS PERCENTAGE

FROM delay_data

WHERE REMARKS_CATEGORY = 'Conveyor Failure'
  AND REMARKS IS NOT NULL
  AND TRIM(REMARKS) <> ''

GROUP BY CONVEYOR

ORDER BY TOTAL_DELAYS DESC;

    """)

    result = db.execute(query)

    data = []

    for row in result:

        data.append({

    "remarks": row[0],

    "total_delays": row[1],

    "total_delay_hours": float(row[2]),

    "avg_delay_hours": float(row[3]),

    "percentage": float(row[4])

})  

    db.close()

    return data