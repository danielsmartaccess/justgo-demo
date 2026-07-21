@echo off
title Just Go - Servidor local
echo.
echo  ============================================
echo   JUST GO - Event Intelligence
echo  ============================================
echo.
echo   Landing:  http://localhost:8080
echo   App:      http://localhost:8080/app/
echo.
echo   Para parar o servidor: CTRL+C
echo  ============================================
echo.
start "" http://localhost:8080
cd /d "%~dp0"
python -m http.server 8080
