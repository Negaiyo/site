@echo off
cd /d "%~dp0"

set "PY=C:\Users\LEGION\AppData\Local\Programs\Python\Python313\python.exe"
if not exist "%PY%" set "PY=python"

"%PY%" -c "import django, whitenoise" >nul 2>&1
if errorlevel 1 (
    echo Installing requirements...
    "%PY%" -m pip install -r requirements.txt
)

echo.
echo Opening http://127.0.0.1:8000/
echo.

"%PY%" manage.py runserver 127.0.0.1:8000

pause
