# 🏆 Reto: Domina Git Worktree

## Contexto
Tu equipo trabaja en un proyecto con múltiples features en paralelo.
Debes resolver 3 situaciones usando **exclusivamente** `git worktree` — sin stash, sin clonar.
La Situación 4 es bonus (requiere Kiro CLI instalado).

---

## Instrucciones

### 1. Preparar el repo
```bash
git clone https://github.com/[TU-REPO]/reto-worktree.git
cd reto-worktree
```

> Si no hay repo remoto, crear uno local:
```bash
mkdir reto-worktree && cd reto-worktree
git init
echo "# Proyecto Reto" > README.md
git add . && git commit -m "initial commit"

git checkout -b feature/api
echo "GET /customers" > api.txt
git add . && git commit -m "feat: add customers endpoint"

git checkout -b feature/ui
echo "<h1>Home</h1>" > index.html
git add . && git commit -m "feat: add home page"

git checkout main
```

---

## Situaciones a resolver

### Situación 1: Hotfix urgente
Estás trabajando en `feature/api` (con cambios sin commitear). Te piden arreglar un bug en main urgentemente.

**Tu tarea:**
- Crear un worktree para el hotfix basado en main
- Crear el archivo `fix.txt` con el contenido "bug fixed"
- Hacer commit del fix
- Eliminar el worktree del hotfix
- Verificar que tus cambios en `feature/api` siguen intactos

### Situación 2: Code review en paralelo
Sin salir de tu rama actual, necesitas revisar el código de `feature/ui`.

**Tu tarea:**
- Crear un worktree temporal para `feature/ui`
- Verificar que `index.html` existe en ese worktree
- Agregar un archivo `review-notes.txt` con "LGTM" (sin commitear)
- Eliminar el worktree

### Situación 3: Trabajo paralelo
Necesitas tener 3 ramas activas simultáneamente: main, feature/api, y una nueva `feature/docs`.

**Tu tarea:**
- Crear worktrees para `feature/api` y `feature/docs` (rama nueva basada en main)
- En `feature/docs`: crear `docs.md` con "# Documentación" y hacer commit
- Listar todos los worktrees activos (`git worktree list`)
- Eliminar todos los worktrees adicionales

### Situación 4: Bonus — Worktree + Kiro (agente IA)
Mientras trabajas en `feature/api`, necesitas crear un endpoint `/health` en una rama nueva. En vez de hacerlo tú, delégalo a Kiro en un worktree separado.

**Tu tarea:**
- Crear un worktree con rama nueva `feature/health` basada en main
- En ese worktree, usar Kiro para que implemente el endpoint:
  ```bash
  cd ../reto-worktree-health
  kiro chat -m "Crea un archivo health.js que exporte una función healthCheck que retorne { status: 'ok', timestamp: Date.now() }. Haz commit con mensaje 'feat: add health endpoint'."
  ```
- Verificar que Kiro hizo el commit (`git log --oneline`)
- Volver a tu worktree principal y confirmar que tus archivos no se tocaron
- Eliminar el worktree

**Punto clave:** Tu worktree principal no se alteró en ningún momento mientras Kiro trabajaba.

---

## Reglas del juego
- ❌ NO usar `git stash`
- ❌ NO usar `git checkout` para cambiar de rama en el worktree principal
- ❌ NO clonar el repo de nuevo
- ✅ Usar `git worktree add`, `remove`, `list`, `prune`
- ✅ Puedes hacer commits en cualquier worktree

---

## Entrega

Enviar pantallazo de:
1. Output de `git worktree list` mostrando los 3 worktrees de la Situación 3
2. Output de `git log --oneline --all` al final mostrando todos los commits

---

## Criterio de éxito
- Las 3 situaciones resueltas sin stash ni checkout entre ramas
- Todos los worktrees creados y eliminados correctamente
- Los commits existen en las ramas correctas
- **Bonus:** Situación 4 completada con Kiro (commit generado por el agente)

¡Buena suerte! 🚀
