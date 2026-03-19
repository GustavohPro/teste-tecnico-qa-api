@echo off
REM Cypress Tests - Setup Script for Windows
REM Este script configura o ambiente e executa os testes do Cypress

setlocal enabledelayedexpansion

echo.
echo ================================================
echo 🚀 Cypress - Setup e Execução de Testes
echo ================================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js não está instalado. Por favor, instale Node.js 18+ primeiro.
    exit /b 1
)

REM Verificar se npm está instalado
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm não está instalado. Por favor, instale npm primeiro.
    exit /b 1
)

echo ✅ Node.js: 
node --version

echo ✅ npm: 
npm --version

echo.
echo 🔄 Limpando cache de dependências...
npm cache clean --force >nul 2>&1
echo.

echo 📦 Instalando dependências...
call npm ci

if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    exit /b 1
)

echo.
echo 🧪 Executando testes do Cypress...
echo ================================================
echo.

REM Executar testes do Dog API
call npm run test:dog

if errorlevel 1 (
    echo.
    echo ❌ Alguns testes falharam. Verifique os relatórios.
    exit /b 1
)

echo.
echo ================================================
echo ✅ Testes concluídos com sucesso!
echo.
echo 📊 Relatórios disponíveis em: .\mochawesomeReports\
echo ================================================
echo.

pause
