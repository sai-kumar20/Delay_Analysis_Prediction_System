@echo off

echo =====================================
echo Starting Delay Analysis System...
echo =====================================

:: Start Backend
start cmd /k "cd /d C:\Delay_Analysis_Prediction_System\backend && uvicorn main:app --reload"

timeout /t 3 >nul

:: Start Frontend
start cmd /k "cd /d C:\Delay_Analysis_Prediction_System\frontend && npm run dev"

timeout /t 5 >nul

:: Open Browser
start http://localhost:5173

exit