# Por qué Kiro y no Git AI como complemento de IA en la charla

## El objetivo
Complementar la charla de Git Worktree con un componente de IA que tenga sentido funcional, no solo mencionarlo por cumplir.

---

## ¿Qué es cada herramienta?

| | Kiro (Amazon) | Git AI (usegitai.com) |
|---|---|---|
| **Qué hace** | Agente de IA que escribe código, ejecuta comandos, resuelve tareas | Extensión de Git que trackea qué líneas escribió un agente de IA |
| **Relación con worktree** | **Directa** — trabaja dentro de un worktree como un desarrollador más | **Ninguna** — solo observa quién escribió qué, no importa dónde |
| **Tipo de herramienta** | Productiva (hace trabajo) | Observabilidad (mide trabajo) |
| **Ya la usamos** | ✅ Sí, el equipo trabaja con Kiro día a día | ❌ No la usamos |

---

## ¿Por qué Kiro encaja mejor?

### 1. Demuestra el "para qué" de worktree con IA

El valor de worktree es **trabajo paralelo sin conflictos**. Kiro hace eso tangible:

```
Worktree A (humano):  feature/dashboard → tú desarrollando
Worktree B (Kiro):    hotfix/bug-123   → Kiro arreglando el bug
```

Sin worktree, no podrías tener a Kiro trabajando en una rama mientras tú trabajas en otra — tendrías que esperar, hacer stash, o clonar. **Worktree habilita la colaboración humano-IA en paralelo.**

### 2. Git AI no necesita worktree

Git AI trackea atribución de código (quién escribió cada línea). Eso funciona igual con o sin worktrees. No hay sinergia funcional — sería mencionar dos herramientas desconectadas en la misma charla.

### 3. Es experiencia real del equipo

El equipo ya usa Kiro. Mostrar el flujo worktree + Kiro es mostrar **cómo trabajamos hoy**. No es una herramienta teórica ni una demo forzada.

### 4. El momento "wow" en la demo

En vivo:
1. Creo un worktree para un hotfix
2. Le digo a Kiro: "investiga y arregla este bug"
3. Kiro trabaja solo en ese worktree
4. Mientras tanto, yo sigo desarrollando en mi worktree principal
5. Vuelvo al worktree del hotfix → el fix ya está listo, commiteado

**La audiencia ve trabajo paralelo humano + IA en tiempo real.** Eso no lo puedes demostrar con Git AI.

---

## ¿Cómo se integra en la charla?

No es un bloque separado. Se integra **dentro** de la demo existente:

| Bloque | Qué pasa |
|--------|----------|
| Demo Parte B (hotfix urgente) | En vez de arreglar el bug manualmente, se lo delego a Kiro en un worktree separado. Mientras Kiro trabaja, yo sigo en mi feature. |
| Reto (tarea para casa) | Situación bonus: usar Kiro en un worktree para resolver una tarea. |

**Tiempo adicional:** ~3-5 minutos dentro de la demo que ya existe. No altera la estructura de 50 minutos.

---

## Mensaje clave para la audiencia

> "Git Worktree no solo te permite trabajar en múltiples ramas sin stash — te permite delegar trabajo a un agente de IA en una rama mientras tú sigues productivo en otra. Es el flujo de trabajo paralelo humano + IA."

---

## Resumen

| Criterio | Kiro ✅ | Git AI ❌ |
|----------|---------|-----------|
| Relación funcional con worktree | Directa | Ninguna |
| Demuestra IA en acción | Sí, ejecuta código | No, solo mide |
| Experiencia real del equipo | Sí | No |
| Se integra sin alterar estructura | Sí (dentro de la demo) | Requiere bloque aparte |
| Momento impactante en vivo | Trabajo paralelo humano+IA | Un dashboard de métricas |
