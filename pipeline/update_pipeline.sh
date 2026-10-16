#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$DIR")"

echo "=================================================="
echo "    ATUALIZADOR DE DADOS CÍVICOS (API PNCP + SICONFI)"
echo "    Peixoto de Azevedo - MT & Benchmarks Regionais"
echo "=================================================="

# Ativar ambiente virtual
source "$PROJECT_ROOT/.venv/bin/activate"

echo "[1/3] Extraindo dados oficiais das APIs..."
python "$PROJECT_ROOT/pipeline/fetch_data.py"

echo "[2/3] Processando indicadores, concentração e benchmarks..."
python "$PROJECT_ROOT/pipeline/analyze.py"

echo "[3/3] Gerando novo Dossiê em PDF para download..."
python "$PROJECT_ROOT/pipeline/generate_pdf.py"

echo "=================================================="
echo "    ATUALIZAÇÃO CONCLUÍDA COM SUCESSO!"
echo "    Dossiê atualizado: public/dossie-auditoria-peixoto.pdf"
echo "    Dados atualizados em: src/data/"
echo "=================================================="
