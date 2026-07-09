from fastapi import APIRouter
import pandas as pd
import joblib

router = APIRouter()

model = joblib.load("ml/models/equipment_delay_model.pkl")
encoders = joblib.load("ml/models/label_encoders.pkl")


# =====================================================
# EQUIPMENT FAILURE PREDICTION
# =====================================================

@router.get("/equipment-prediction")
def equipment_prediction():

    df = pd.read_csv("ml/ml_dataset.csv")

    categorical_columns = [
        "SHOP_CODE",
        "EQPT",
        "AGENCY_CODE",
        "REMARKS_CATEGORY",
        "SEASON"
    ]

    encoded = df.copy()

    for col in categorical_columns:
        encoded[col] = encoders[col].transform(
            encoded[col].astype(str)
        )

    X = encoded.drop(columns=["DELAY_DURN"])

    df["PREDICTED_DELAY"] = model.predict(X)

    report = (
        df.groupby("EQPT")["PREDICTED_DELAY"]
        .mean()
        .reset_index()
    )

    report = report.sort_values(
        by="PREDICTED_DELAY",
        ascending=False
    )

    result = []

    for _, row in report.iterrows():

        delay = round(float(row["PREDICTED_DELAY"]), 2)

        if delay >= 5:

            risk = "HIGH 🔴"
            probability = "90%"
            health = "Likely Failure"
            recommendation = (
                "Immediate inspection required. Schedule preventive maintenance and check mechanical & electrical components."
            )

        elif delay >= 2:

            risk = "MEDIUM 🟡"
            probability = "65%"
            health = "Needs Inspection"
            recommendation = (
                "Inspect equipment in the next maintenance cycle and monitor performance."
            )

        else:

            risk = "LOW 🟢"
            probability = "25%"
            health = "Healthy"
            recommendation = (
                "Equipment is operating normally. Continue routine maintenance."
            )

        result.append({

            "equipment": row["EQPT"],
            "predicted_delay": delay,
            "risk": risk,
            "failure_probability": probability,
            "health": health,
            "recommendation": recommendation

        })

    return result


# =====================================================
# MONSOON CONVEYOR PREDICTION
# =====================================================

@router.get("/monsoon-prediction")
def monsoon_prediction():

    df = pd.read_csv("ml/ml_dataset.csv")

    df = df[df["SEASON"] == "Monsoon"]

    conveyor_keywords = [
        "CONV",
        "CONVEYOR",
        "CONY",
        "CT"
    ]

    df = df[
        df["EQPT"].astype(str).str.upper().apply(
            lambda x: any(k in x for k in conveyor_keywords)
        )
    ]

    encoded = df.copy()

    categorical_columns = [
        "SHOP_CODE",
        "EQPT",
        "AGENCY_CODE",
        "REMARKS_CATEGORY",
        "SEASON"
    ]

    for col in categorical_columns:
        encoded[col] = encoders[col].transform(
            encoded[col].astype(str)
        )

    X = encoded.drop(columns=["DELAY_DURN"])

    df["PREDICTED_DELAY"] = model.predict(X)

    report = (
        df.groupby("EQPT")["PREDICTED_DELAY"]
        .mean()
        .reset_index()
    )

    report = report.sort_values(
        by="PREDICTED_DELAY",
        ascending=False
    )

    result = []

    for _, row in report.iterrows():

        delay = round(float(row["PREDICTED_DELAY"]), 2)

        if delay >= 5:

            risk = "HIGH 🔴"
            probability = "90%"
            recommendation = (
                "Inspect before monsoon. Check rollers, bearings and motors."
            )

        elif delay >= 2:

            risk = "MEDIUM 🟡"
            probability = "65%"
            recommendation = (
                "Schedule preventive maintenance before heavy rainfall."
            )

        else:

            risk = "LOW 🟢"
            probability = "25%"
            recommendation = (
                "Routine inspection is sufficient."
            )

        result.append({

            "conveyor": row["EQPT"],
            "predicted_delay": delay,
            "risk": risk,
            "failure_probability": probability,
            "recommendation": recommendation

        })

    return result