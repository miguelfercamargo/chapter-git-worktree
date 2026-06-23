# Prompt para Kiro en la Demo

## Prompt exacto para copiar y pegar en la demo:

```
Hay un bug en auth.js: cuando user es null o undefined, la función validateUser lanza un TypeError porque intenta acceder a user.email sin validar primero. Arregla el bug agregando validación de null al inicio de validateUser y authenticate. Haz commit con el mensaje "fix: handle null user input in auth".
```

## Qué debe hacer Kiro:
1. Leer `auth.js`
2. Agregar guard clause al inicio de `validateUser` para validar que `user` no sea null/undefined
3. Opcionalmente validar en `authenticate` también
4. Hacer `git add . && git commit`

## Resultado esperado:
- Un commit con el fix en la rama `hotfix/bug-123`
- El archivo `auth.js` con la validación de null

## Tiempo estimado: 15-30 segundos

## Plan B:
Si Kiro falla o tarda mucho, ejecutar manualmente:
```bash
sed -i '' '5i\
\  if (!user) return { valid: false, error: "User is required" };\
' auth.js
git add . && git commit -m "fix: handle null user input in auth"
```
