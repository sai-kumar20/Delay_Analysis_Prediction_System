import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# -----------------------------
# Load Dataset
# -----------------------------

df = pd.read_csv("ml/ml_dataset.csv")

# -----------------------------
# Encode Categorical Columns
# -----------------------------

encoders = {}

categorical_columns = [
    "SHOP_CODE",
    "EQPT",
    "AGENCY_CODE",
    "REMARKS_CATEGORY",
    "SEASON"
]

for col in categorical_columns:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col].astype(str))
    encoders[col] = encoder

# -----------------------------
# Features and Target
# -----------------------------

X = df.drop(columns=["DELAY_DURN"])

y = df["DELAY_DURN"]

# -----------------------------
# Train-Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -----------------------------
# Train Model
# -----------------------------

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# -----------------------------
# Prediction
# -----------------------------

predictions = model.predict(X_test)

# -----------------------------
# Evaluation
# -----------------------------

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\nModel Trained Successfully\n")

print(f"Mean Absolute Error : {mae:.2f}")

print(f"R2 Score            : {r2:.4f}")

# -----------------------------
# Save Model
# -----------------------------

joblib.dump(model, "ml/models/equipment_delay_model.pkl")

joblib.dump(encoders, "ml/models/label_encoders.pkl")

print("\nModel Saved Successfully")