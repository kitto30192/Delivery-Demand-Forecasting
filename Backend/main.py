from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from datetime import datetime

# ---------------------------------------------------------
# 1. Initialize Application & Middleware
# ---------------------------------------------------------
app = FastAPI(title="Logistics Demand Prediction API")

# Enable CORS for your React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your React app's URL (e.g., "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# 2. Global Variables (Load ML Models into Memory)
# ---------------------------------------------------------
# NOTE: You must export your trained model and encoder from your notebook using joblib!
# Example: joblib.dump(model, 'xgboost_model.pkl')
try:
    xgb_model = joblib.load('xgboost_model.pkl')
    weather_encoder = joblib.load('weather_encoder.pkl')
    MODEL_LOADED = True
except FileNotFoundError:
    print("WARNING: ML model files not found. The API will run, but predictions will fail until files are added.")
    MODEL_LOADED = False

# ---------------------------------------------------------
# 3. Request Data Validation Schema (Pydantic)
# ---------------------------------------------------------
class DemandRequest(BaseModel):
    hexagon_id: str
    timestamp: str          # Expected format: "YYYY-MM-DD HH:MM:SS"
    weather: str            # e.g., "Cloudy", "Sunny", "Stormy"
    traffic: str            # e.g., "Low", "Medium", "High", "Jam"
    is_festival: bool       # True or False
    previous_30min_demand: float # The lag feature

# ---------------------------------------------------------
# 4. API Endpoints
# ---------------------------------------------------------
@app.get("/health")
def health_check():
    """Simple endpoint to verify the server is running."""
    return {"status": "Active", "model_loaded": MODEL_LOADED}

@app.post("/api/predict")
def predict_live_demand(request: DemandRequest):
    """
    Takes live conditions from the frontend and returns the predicted order volume.
    """
    if not MODEL_LOADED:
        raise HTTPException(status_code=500, detail="ML Model not loaded on server.")

    try:
        # 1. Parse the timestamp
        dt = pd.to_datetime(request.timestamp)
        
        # 2. Encode Traffic (Mapping matches your training data)
        traffic_mapping = {'Low': 1, 'Medium': 2, 'High': 3, 'Jam': 4}
        traffic_encoded = traffic_mapping.get(request.traffic, 2) # Default to Medium
        
        # 3. Encode Festival
        festival_encoded = 1 if request.is_festival else 0
        
        # 4. Encode Weather using your saved LabelEncoder
        # We wrap in a try-except in case the frontend sends a weather type the model hasn't seen
        try:
            weather_encoded = weather_encoder.transform([request.weather])[0]
        except ValueError:
            # Fallback to a common weather code if unrecognized
            weather_encoded = 0 
            
        # 5. Construct the exact feature matrix XGBoost expects
        features_df = pd.DataFrame([{
            'hour': dt.hour,
            'day_of_week': dt.dayofweek,
            'Weather_conditions': weather_encoded,
            'Road_traffic_density': traffic_encoded,
            'Festival': festival_encoded,
            'prev_demand': request.previous_30min_demand
        }])
        
        # 6. Run inference
        prediction = xgb_model.predict(features_df)[0]
        
        # 7. Return the response to the frontend
        return {
            "hexagon_id": request.hexagon_id,
            "timestamp": request.timestamp,
            "predicted_orders": round(float(prediction), 2),
            "status": "High Demand - Dispatch Recommended" if prediction > 2.5 else "Stable"
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")