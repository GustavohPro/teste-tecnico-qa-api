#!/bin/bash

# Cypress Tests - Setup Script for Linux/macOS
# Este script configura o ambiente e executa os testes do Cypress

set -e  # Exit on error

echo "================================================"
echo "🚀 Cypress - Setup e Execução de Testes"
echo "================================================"
echo ""

# Verificar se Node.js e npm estão instalados
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale npm primeiro."
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Limpar dependências antigas (opcional)
echo "🔄 Limpando cache de dependências..."
npm cache clean --force 2>/dev/null || true
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

echo ""
echo "🧪 Executando testes do Cypress..."
echo "================================================"

# Executar testes do Dog API
npm run test:dog

echo ""
echo "================================================"
echo "✅ Testes concluídos com sucesso!"
echo ""
echo "📊 Relatórios disponíveis em: ./mochawesomeReports/"
echo "================================================"
