# 🌳 Git Worktree: Múltiples ramas, cero stash

## Información General
- **Duración:** 50 minutos
- **Herramientas:** Git (worktree, subcomando nativo) + Kiro (agente IA)
- **Formato:** Teoría + Demo en vivo + Kahoot
- **Componente IA:** Kiro como agente que trabaja en un worktree en paralelo al desarrollador

---

## 🎯 Agenda

| # | Bloque | Tiempo | Descripción |
|---|--------|--------|-------------|
| 1 | Apertura | 5 min | Rompe-hielo + problema real |
| 2 | Teoría | 12 min | Qué es worktree, cuándo usarlo, modelo mental |
| 3 | Demo | 23 min | Flujo real con worktrees en vivo (incluye Kiro en Parte B) |
| 4 | Kahoot | 7 min | Quiz interactivo |
| 5 | Cierre | 3 min | Recap + presentar reto para casa |

---

## 1️⃣ APERTURA (5 min)

### Rompe-hielo (pregunta al aire)
> "¿A quién le ha pasado que está trabajando en un feature, le llega un hotfix urgente, y tiene que hacer stash, cambiar de rama, rezar que no haya conflictos, arreglar, volver... y cuando regresa ya no sabe qué estaba haciendo?"

### Mostrar el dolor
Escribir en la terminal el flujo "normal":
```bash
# Estás en feature/login trabajando tranquilo...
git stash
git checkout main
git pull
git checkout -b hotfix/urgent-bug
# ... arreglas ...
git commit -m "fix"
git checkout feature/login
git stash pop   # 💥 conflicto
```

> **Punto clave:** "Cada cambio de rama es un cambio de contexto mental. Y los stash se pierden, se olvidan, generan conflictos."

---

## 2️⃣ TEORÍA (12 min)

### ¿Qué es git worktree?
- Permite tener **múltiples directorios de trabajo** vinculados al mismo repositorio
- Cada worktree tiene su propia rama checked out
- Comparten el mismo `.git` (historia, remotes, refs)
- **Lo que NO se duplica:** la historia de Git (objects, commits, configuración)
- **Lo que SÍ se crea nuevo:** el directorio de trabajo (archivos fuente, y cualquier dependencia como node_modules)

> ⚠️ Si tu proyecto requiere `npm install` o builds pesados, cada worktree necesita su propio setup. Worktree ahorra la descarga de Git, no el setup del proyecto.

### Modelo mental
```
mi-proyecto/              ← worktree principal (main)
mi-proyecto-feature/      ← worktree adicional (feature/login)
mi-proyecto-hotfix/       ← worktree adicional (hotfix/urgent)
```

Cada carpeta es independiente. Puedes tener las 3 abiertas en terminales o IDEs separados.

### ¿Cuándo usarlo?
| Situación | Sin worktree | Con worktree |
|-----------|---|---|
| Hotfix urgente mientras trabajo en feature | stash → switch → fix → switch → pop | Abro otra carpeta y arreglo |
| Comparar comportamiento entre ramas | checkout ida y vuelta | Dos carpetas lado a lado |
| Code review de un PR | checkout de la rama del PR | Worktree temporal, lo reviso, lo borro |
| Tests largos corriendo en una rama | Bloqueado hasta que terminen | Sigo trabajando en otro worktree |
| CI local en una rama mientras desarrollo en otra | Imposible | Cada worktree es independiente |

### Comandos esenciales
```bash
git worktree add ../ruta-carpeta nombre-rama    # Crear
git worktree list                                # Ver todos
git worktree remove ../ruta-carpeta              # Eliminar
```

### Reglas del juego
- No puedes tener la misma rama en dos worktrees a la vez
- El worktree principal (donde hiciste `git clone`) no se puede eliminar
- Los worktrees comparten: historia, remote, stash, config
- Los worktrees NO comparten: archivos de trabajo, index (staging area)

### ¿Qué NO es worktree?
- No es un clon (no duplica la historia ni el remote)
- No es una rama (es un directorio que apunta a una rama)
- No reemplaza branches ni PRs — los complementa

---

## 3️⃣ DEMO EN VIVO (23 min)

Ver archivo: `demo/DEMO-GUION.md`

### Parte A: Flujo básico (8 min)
1. Crear un repo de ejemplo con varias ramas
2. Crear un worktree para un hotfix
3. Trabajar en paralelo en ambos
4. Eliminar el worktree cuando terminas

### Parte B: Caso real — hotfix con Kiro en paralelo (8 min)
1. Simular que estás desarrollando un feature
2. Llega un bug urgente
3. Crear worktree, lanzar Kiro para que arregle el bug
4. Mientras Kiro trabaja, seguir desarrollando en el otro worktree
5. Volver al worktree del hotfix → Kiro ya resolvió y commiteó
6. Borrar el worktree

### Parte C: Worktree para code review (7 min)
1. Crear worktree temporal desde una rama de PR
2. Revisar el código, correr tests
3. Eliminar el worktree cuando terminas
4. Mostrar `git worktree list` y `git worktree prune`

---

## 4️⃣ KAHOOT (7 min)

Ver `KAHOOT-PREGUNTAS.md` — 8 preguntas que refuerzan:
- Diferencia entre worktree y clone
- Comandos básicos
- Restricciones (misma rama en dos worktrees)
- Cuándo usarlo vs no usarlo

---

## 5️⃣ CIERRE (3 min)

### Recap en 30 segundos
- Worktree = múltiples carpetas, un solo repo
- Cero stash, cero cambios de contexto
- Ideal para hotfixes, code reviews, y trabajo paralelo
- Con Kiro: trabajo paralelo humano + IA, cada uno en su worktree
- Comando nativo de Git, no instala nada

### Presentar el reto
> "Les dejo un ejercicio donde tienen que resolver 3 situaciones usando worktrees. Sin stash, sin clonar de nuevo. Tienen hasta [fecha]."

### Slide final
```
Sin worktree:   stash → switch → fix → switch → pop → 💥 conflicto
Con worktree:   git worktree add → fix → push → remove → 😎 sigue trabajando
Con worktree + Kiro:  git worktree add → Kiro arregla → tú sigues en otro lado → 🚀
```

---

## 💡 Tips para el presentador

- Tener 2-3 terminales abiertas para mostrar el trabajo paralelo visualmente
- Usar `tree` o `ls` para que la gente vea las carpetas creadas
- Si alguien pregunta "¿y por qué no simplemente clono de nuevo?" → explicar que worktree comparte historia y es instantáneo
- El Kahoot es para reír, no para evaluar
- Tener los comandos en un archivo `.sh` por si los nervios traicionan
- Para la parte de Kiro: tener el staging pre-armado (ver `demo/staging/`) con el bug plantado
- Si Kiro tarda más de lo esperado, el worktree te da buffer natural para seguir explicando
