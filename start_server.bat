@echo off
chcp 65001 >nul
echo ============================================
echo   SNPE Website - Local Proxy Server
echo   http://localhost:8080
echo ============================================
echo.
echo 브라우저에서 http://localhost:8080 으로 접속하세요.
echo CSS/JS는 원본 서버에서 프록시로 로드됩니다.
echo 종료하려면 Ctrl+C 를 누르세요.
echo.
cd /d "%~dp0"
start http://localhost:8080
python server.py
