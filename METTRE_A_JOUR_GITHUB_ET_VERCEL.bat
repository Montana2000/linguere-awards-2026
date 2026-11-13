@echo off
chcp 65001 >nul
title Linguères Awards 2026 - Synchronisation GitHub & Vercel
cls
echo =====================================================================
echo       LINGUÈRES AWARDS 2026 - SYNCHRONISATION AUTOMATIQUE
echo                     GitHub ^& Vercel
echo =====================================================================
echo.
cd /d "%~dp0"

echo [1/3] Verification des modifications en cours...
git status --short
echo.

set /p USER_MSG="Entrez un message de mise a jour (ou appuyez sur ENTREE) : "
if "%USER_MSG%"=="" (
    set USER_MSG=Mise a jour du site Linguères Awards
)

echo.
echo [2/3] Enregistrement des fichiers modifies...
git add .
git commit -m "%USER_MSG%"

echo.
echo [3/3] Envoi vers GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo =====================================================================
    echo [ERREUR] L'envoi vers GitHub a echoue.
    echo Verifiez votre connexion internet ou vos acces GitHub.
    echo =====================================================================
    goto fin
)

echo.
echo =====================================================================
echo [SUCCES] Vos modifications sont en ligne sur GitHub !
echo.
echo Vercel a detecte la mise a jour et re-deploie
echo automatiquement votre site en direct en quelques secondes.
echo.
echo Depot GitHub : https://github.com/Montana2000/linguere-awards-2026
echo =====================================================================

:fin
echo.
echo Appuyez sur une touche pour quitter...
pause >nul
