#!/bin/bash
# setup-staging.sh - Prepara el repo para la demo con Kiro
# Ejecutar ANTES de la charla

set -e

DEMO_DIR=~/demo-worktree

# Limpiar si existe
rm -rf "$DEMO_DIR" "${DEMO_DIR}-"*

# Crear repo
mkdir -p "$DEMO_DIR" && cd "$DEMO_DIR"
git init
echo "# Mi Proyecto" > README.md

# Copiar auth.js con el bug
cp "$(dirname "$0")/auth.js" ./auth.js

git add . && git commit -m "initial commit"

# Crear rama feature/dashboard
git checkout -b feature/dashboard
echo "dashboard" > dashboard.html
git add . && git commit -m "feat: add dashboard"

# Crear rama feature/login
git checkout -b feature/login
echo "login page" > login.html
git add . && git commit -m "feat: add login page"

# Volver a main
git checkout main

echo ""
echo "✅ Staging listo en $DEMO_DIR"
echo "   Ramas: main, feature/dashboard, feature/login"
echo "   Bug plantado: auth.js (null pointer sin validar)"
echo ""
echo "Para la demo:"
echo "   cd $DEMO_DIR"
echo "   git worktree list"
