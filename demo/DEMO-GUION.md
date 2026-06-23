# 🛠️ Guión de la Demo en Vivo

## Pre-requisitos
```bash
git --version   # 2.15+ (worktree está desde 2.5, pero prune desde 2.15)
kiro --version  # Kiro CLI instalado
```

Preparar el staging antes de la charla (ver `demo/staging/`):
```bash
cd demo/staging && bash setup-staging.sh
```

Crear un repo de ejemplo antes de la charla:
```bash
mkdir ~/demo-worktree && cd ~/demo-worktree
git init
echo "# Mi Proyecto" > README.md
git add . && git commit -m "initial commit"

# Crear ramas para simular trabajo en equipo
git checkout -b feature/login
echo "login page" > login.html
git add . && git commit -m "feat: add login page"

git checkout -b feature/dashboard
echo "dashboard" > dashboard.html
git add . && git commit -m "feat: add dashboard"

git checkout main
```

---

## PARTE A: Flujo básico (8 min)

### Paso 1: Ver el estado actual
```bash
cd ~/demo-worktree
git branch
git worktree list
```

> 🎯 Solo hay un worktree: el principal en main.

**Decir:** "Ahora mismo tenemos un solo directorio de trabajo. Si quiero trabajar en `feature/login`, normalmente haría `git checkout`. Pero con worktree..."

### Paso 2: Crear un worktree
```bash
git worktree add ../demo-worktree-login feature/login
```

**Decir:** "Eso es todo. Ya tengo otra carpeta con la rama `feature/login` lista para trabajar."

### Paso 3: Verificar
```bash
git worktree list
ls ../demo-worktree-login/
```

> 🎯 Se ve:
> ```
> /Users/.../demo-worktree        abc1234 [main]
> /Users/.../demo-worktree-login  def5678 [feature/login]
> ```

**Decir:** "Dos carpetas, dos ramas, un solo repo. Sin clonar, sin stash."

### Paso 4: Trabajar en el worktree
```bash
cd ../demo-worktree-login
echo "forgot password link" >> login.html
git add . && git commit -m "feat: add forgot password"
```

### Paso 5: Volver al principal — todo intacto
```bash
cd ../demo-worktree
cat README.md   # sigue igual, no se tocó nada
git log --oneline   # no tiene el commit del login
```

**Decir:** "Mi rama main está exactamente como la dejé. Cero interferencia."

### Paso 6: Eliminar el worktree
```bash
git worktree remove ../demo-worktree-login
git worktree list   # ya solo queda main
```

---

## PARTE B: Caso real — hotfix con Kiro en paralelo (8 min)

### Paso 7: Simular que estás desarrollando
```bash
cd ~/demo-worktree
git checkout feature/dashboard
echo "widget de ventas" >> dashboard.html
# NO haces commit todavía — estás a medio trabajo
```

**Decir:** "Imaginen que están a medio feature, archivos modificados, nada commiteado... y llega el mensaje: 'Hay un bug en producción, arréglalo YA'."

### Paso 8: SIN worktree (el dolor)
**Decir:** "Normalmente harían esto:"
```bash
# git stash
# git checkout main
# git checkout -b hotfix/bug-123
# ... arreglar ...
# git checkout feature/dashboard
# git stash pop  ← 💥 posible conflicto
```
**"Pero con worktree + Kiro..."**

### Paso 9: CON worktree + Kiro (la solución)
```bash
# Crear worktree para el hotfix basado en main
git worktree add ../demo-worktree-hotfix -b hotfix/bug-123 main
```

**Decir:** "Una línea. Creé un worktree nuevo basado en main. Ahora le delego el bug a Kiro:"

```bash
cd ../demo-worktree-hotfix
kiro chat -m "Hay un bug en auth.js: no valida input null y lanza TypeError. Investiga, arregla el bug, y haz commit."
```

> 🎯 Kiro empieza a trabajar en el worktree del hotfix.

### Paso 10: Mientras Kiro trabaja, yo sigo en mi feature
```bash
# Volver al worktree principal SIN esperar a Kiro
cd ~/demo-worktree
git status   # mis cambios siguen ahí, intactos
echo "filtro por fecha" >> dashboard.html
```

**Decir:** "Kiro está arreglando el bug en un worktree. Yo sigo trabajando en mi feature en otro. Dos contextos, cero interferencia. Esto es trabajo paralelo humano + IA."

### Paso 11: Verificar que Kiro terminó
```bash
cd ../demo-worktree-hotfix
git log --oneline -3
cat auth.js   # ver el fix que Kiro hizo
```

> 🎯 El commit de Kiro aparece en el log. El bug está arreglado.

**Decir:** "No hice stash. No cambié de rama. Kiro resolvió en su worktree, yo seguí productivo en el mío. Eso es el poder de worktree + IA."

### Paso 12: Limpiar el worktree del hotfix
```bash
cd ~/demo-worktree
git worktree remove ../demo-worktree-hotfix
```

**Decir:** "Hotfix listo, worktree eliminado. Mi feature sigue exactamente donde la dejé."

---

## PARTE C: Worktree para code review (7 min)

### Paso 13: Alguien abrió un PR que quieres revisar
```bash
cd ~/demo-worktree
git checkout main
git fetch origin

# Crear worktree temporal para revisar el PR
git worktree add ../review-pr-42 origin/feature/login
```

**Decir:** "Así puedo revisar el código de un PR sin salir de mi rama actual."

### Paso 14: Revisar y probar
```bash
cd ../review-pr-42
cat login.html
# Podrías correr tests aquí: npm test, mvn test, etc.
```

### Paso 15: Terminar la revisión y limpiar
```bash
cd ~/demo-worktree
git worktree remove ../review-pr-42
```

### Paso 16: Mantenimiento
```bash
# Si borraste la carpeta manualmente sin usar worktree remove:
git worktree prune

# Ver estado final
git worktree list
```

**Decir:** "`prune` limpia referencias a worktrees que ya no existen en disco. Úsenlo si borran carpetas a mano."

---

## 🚨 Plan B (si algo falla)

- Tener el repo ya creado con las ramas listas
- Tener los comandos en `demo-commands.sh` para copiar y pegar
- Si git es muy viejo: `git worktree --help` para verificar disponibilidad

---

## 📝 Notas para el presentador

- Usar terminales lado a lado para mostrar los dos worktrees simultáneamente
- Hacer `pwd` frecuentemente para que la gente sepa en qué carpeta estás
- El momento "wow" es el Paso 11: ver el commit de Kiro ya listo mientras tú seguías trabajando
- Si alguien pregunta sobre IDE: "Sí, puedes abrir cada worktree como un proyecto separado en IntelliJ/VS Code"
- **Para Kiro:** usar el staging pre-armado (ver `demo/staging/`) que tiene el bug plantado en `auth.js`
- **Si Kiro tarda:** el worktree te da buffer natural — sigue explicando o mostrando cosas en tu worktree principal
- **Si Kiro falla:** tener el fix pre-commiteado en un branch `hotfix/backup` como plan B
