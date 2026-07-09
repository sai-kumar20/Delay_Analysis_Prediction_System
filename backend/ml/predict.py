import joblib
import pandas as pd

# -----------------------------
# Load Model and Encoders
# -----------------------------

model = joblib.load("ml/models/equipment_delay_model.pkl")

encoders = joblib.load("ml/models/label_encoders.pkl")


# -----------------------------
# Prediction Function
# -----------------------------

def predict_delay(
    shop_code,
    equipment,
    agency,
    delay_freq,
    remarks_category,
    month,
    season
):

    data = {
        "SHOP_CODE": shop_code,
        "EQPT": equipment,
        "AGENCY_CODE": agency,
        "DELAY_FREQ": delay_freq,
        "REMARKS_CATEGORY": remarks_category,
        "MONTH": month,
        "SEASON": season
    }

    df = pd.DataFrame([data])

    # Encode categorical columns

    categorical_columns = [
        "SHOP_CODE",
        "EQPT",
        "AGENCY_CODE",
        "REMARKS_CATEGORY",
        "SEASON"
    ]

    for col in categorical_columns:

        value = str(df.loc[0, col])

        encoder = encoders[col]

        if value in encoder.classes_:

            df[col] = encoder.transform(df[col].astype(str))

        else:

            df[col] = 0

    prediction = model.predict(df)[0]

    # -----------------------------
    # Risk Level
    # -----------------------------

    if prediction < 2:
        risk = "LOW 🟢"

    elif prediction < 5:
        risk = "MEDIUM 🟡"

    else:
        risk = "HIGH 🔴"

    # -----------------------------
    # Recommendation
    # -----------------------------

    if risk == "LOW 🟢":

        recommendation = (
            "Equipment is operating normally. Continue routine maintenance."
        )

    elif risk == "MEDIUM 🟡":

        recommendation = (
            "Inspect equipment during the next maintenance cycle."
        )

    else:

        recommendation = (
            "Immediate inspection recommended. Preventive maintenance should be scheduled before the next production cycle."
        )

    return {

        "predicted_delay": round(float(prediction), 2),

        "risk_level": risk,

        "recommendation": recommendation

    }


# -----------------------------
# Test
# -----------------------------

if __name__ == "__main__":

    result = predict_delay(

        shop_code=1,

        equipment="CT-2",

        agency="MIS",

        delay_freq=1,

        remarks_category="Operational Delay",

        month=7,

        season="Monsoon"

    )

    print(result)