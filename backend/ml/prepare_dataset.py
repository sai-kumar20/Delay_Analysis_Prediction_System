
import os
import sys

# Add backend folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pandas as pd
from sqlalchemy import text
from database import SessionLocal

db = SessionLocal()

query = text("""

SELECT

    SHOP_CODE,

    EQPT,

    AGENCY_CODE,

    DELAY_FREQ,

    REMARKS_CATEGORY,

    DELAY_DURN,

    MONTH(DEL_DATE) AS MONTH

FROM delay_data

WHERE

    DELAY_DURN IS NOT NULL

    AND EQPT IS NOT NULL

    AND SHOP_CODE IS NOT NULL

""")

connection = db.connection()

df = pd.read_sql(query, connection)

db.close()


# -----------------------------
# Create Season Column
# -----------------------------

def get_season(month):

    if month in [3, 4, 5]:
        return "Summer"

    elif month in [6, 7, 8, 9]:
        return "Monsoon"

    else:
        return "Winter"


df["SEASON"] = df["MONTH"].apply(get_season)


# -----------------------------
# Remove Missing Values
# -----------------------------

df.dropna(inplace=True)


# -----------------------------
# Save Dataset
# -----------------------------

df.to_csv("ml/ml_dataset.csv", index=False)

print("Dataset Created Successfully")

print(df.head())

print(df.shape)