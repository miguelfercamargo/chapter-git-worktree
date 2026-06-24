# 🎤 Notas del Speaker — Slide por Slide

> **Formato: VIRTUAL (Teams/Meet).** No ves a la audiencia. Todo debe ser hablado.
> Comparte pantalla con la presentación. Tienes estas notas en otro monitor o ventana.

---

## Slide 1: Portada
**No digas nada técnico.** Saluda y espera 5 segundos a que la gente entre.

> "Buenas, ¿cómo están? ¿Me escuchan bien? Perfecto. Hoy les traemos algo que probablemente ya les ha dolido pero no sabían que tenía solución nativa en Git."

Espera. Di "voy a esperar 30 segundos más a que se unan los demás" si es necesario.

---

## Slide 2: "Hoy vamos a ver" (agenda)
Pásala rápido. Dales contexto de qué esperar:

> "Esta es la ruta del día: arrancamos con un problema que todos vivimos, vemos la solución, qué pasa por debajo del capó, después lo ven en vivo en mi terminal, y cerramos con un Kahoot. Así que no se distraigan que al final hay quiz."

---

## Slide 3: "El escenario" (💻 ☕ 🚨 😰)
**Storytelling. Cuenta en primera persona como si te pasó ayer.**

> "Imagínense la siguiente situación — y seguro a más de uno le ha pasado: llevan dos horas en su feature. Están en flujo. Tienen archivos modificados por todos lados, nada commiteado todavía..."

Pausa 2 segundos.

> "...y llega el mensaje del Tech Lead por Teams: 'Hay un bug en producción. Es urgente. ¿Puedes verlo ya?'"

Pausa 2 segundos.

> "El feature no está terminado. Tienen cambios sin commit. Y el bug es para ya. ¿Qué hacen?"

Pausa. No respondas todavía. Deja que piensen.

---

## Slide 4: "El flujo más común" (código stash)
Describe el código como si lo estuvieras viviendo:

> "Esto es lo que hacemos la mayoría: stash para guardar lo que tengo, checkout a main, pull, crear la rama del hotfix, arreglar, push, volver a mi rama, stash pop... y rezar."

Enfatiza la última línea:

> "Ese 'posible conflicto' de la última línea... no es posible — es probable. Y encima ya perdiste el hilo de lo que estabas haciendo hace 20 minutos."

---

## Slide 5: "¿Cómo lo solucionarías hoy?" (stash explicado)
No repitas lo que dice la slide. Agrega experiencia real:

> "Stash funciona, no digo que no. Lo usamos todos. Pero tiene estos problemas: se acumulan, nadie les pone nombre descriptivo — queda stash@{0}, stash@{1}, stash@{5}... ¿cuál era cuál? Y cuando vuelves, si la rama avanzó, puede haber conflictos que no tenían por qué existir."

> "Y lo más importante: aunque uses stash, igual tuviste que cambiar de rama. El cambio de contexto mental ya ocurrió."

---

## Slide 6: "El costo real"
**Habla despacio.** Este es el punto filosófico de la charla.

> "La interrupción va a pasar — eso no lo podemos evitar. Nos van a pedir hotfixes, code reviews, bugs urgentes. Lo que sí podemos evitar es sumarle fricción técnica a esa interrupción: el stash, el pop, el conflicto, reconstruir nuestro estado mental. Eso es lo que worktree elimina."

---

## Slide 7: "¿Y si no tuvieras que cambiar de rama?"
**Déjala en pantalla 4 segundos en silencio.** El silencio en virtual es poderoso — la gente lee.

Luego:

> "Esa es la pregunta. ¿Y si simplemente abres otra carpeta, con otra rama, y tu feature queda exactamente donde la dejaste? Sin tocar un solo archivo."

---

## Slide 8: "Git Worktree" (concepto)
Definición clara y concisa:

> "Git worktree: otro directorio de trabajo con su propio HEAD, vinculado al mismo repositorio. No descarga nada de la red, no duplica la historia de commits."

**Aclaración importante (adelántate a la duda):**

> "Ojo con algo: lo que NO se duplica es la historia de Git — los commits, los objetos, la configuración. Eso se comparte. Pero los archivos fuente sí existen en cada carpeta — porque cada worktree es un checkout independiente. Entonces si tu proyecto necesita un npm install pesado, sí vas a tener que correrlo en cada worktree. Worktree te ahorra el clone y la descarga, no el setup del proyecto."

> "Dicho eso, para un hotfix rápido donde no necesitas correr la app completa — solo arreglar un archivo y hacer push — no necesitas el npm install. Depende del caso."

---

## Slide 9: "Modelo mental" (3 carpetas)
**Usa la analogía que está en la slide:**

> "Piénsenlo como los escritorios virtuales del sistema operativo — Control+derecha en Windows, o los espacios de macOS. Escritorio 1: main. Escritorio 2: tu feature. Escritorio 3: el hotfix. Cada uno independiente, puedes cambiar entre ellos, pero es la misma máquina por debajo."

---

## Slide 10: "Un poco de historia"
Pásala rápido. 15 segundos máximo:

> "Dato curioso: worktree existe desde 2015, Git 2.5. Tiene 11 años disponible y ya es maduro. Simplemente no se conoce mucho porque nunca fue el feature estrella de ningún release."

---

## Slide 11: "Worktree vs Clone vs Stash" (tabla)
**No leas la tabla fila por fila.** La gente la está viendo. Resume:

> "En pantalla tienen la comparación completa. Quiero que se fijen en las dos filas nuevas: 'cambio de contexto' y 'trabajo en progreso'. Ahí está la diferencia real."

> "Con stash, ustedes pausan lo que están haciendo, se van a otra rama, resuelven, y vuelven. Es un pause/resume. Si la rama avanzó mientras no estaban, posible conflicto."

> "Con worktree no hay pause. Su feature sigue activa en su carpeta. Abren OTRA carpeta con otra rama. Son dos contextos vivos al mismo tiempo. Pueden tener los dos abiertos en terminales separadas."

> "Piénsenlo así: stash es como poner pausa a una película para ver otra. Worktree es tener dos pantallas."

> "Si alguien les dice 'pero con un stash hago lo mismo' — técnicamente sí resuelves el problema. Pero con stash cambiaste de rama, perdiste contexto, y cuando vuelves arriesgas conflictos. Con worktree no tocas nada de lo que estabas haciendo."

---

## Slide 12: "Antes de ir al cómo..."
Transición breve:

> "Bien, antes de mostrarles comandos, quiero que entiendan rápidamente qué pasa por debajo. No es magia — es una estructura de archivos."

---

## Slide 13: "Anatomía de .git/"
Describe cada parte brevemente:

> "Cuando ven su carpeta .git, tienen: objects donde está toda la historia comprimida. Refs que son los punteros a ramas y tags. HEAD que dice en qué rama están. Index que es el staging area. Y esta carpeta — worktrees — es donde Git guarda la información de cada worktree adicional que creen."

---

## Slide 14: "¿Qué pasa cuando haces worktree add?"
Enumera los 3 pasos:

> "Cuando ejecutan `git worktree add`, pasan tres cosas. Primero: Git crea una entrada dentro de .git/worktrees/ con su propio HEAD e index. Segundo: la carpeta nueva que se crea recibe un archivo .git — ojo, archivo, no carpeta — que apunta de vuelta al repo principal. Y tercero: objetos, remotes, configuración — todo se comparte. No se duplica nada."

---

## Slide 15: "La estructura física"
Describe el diagrama:

> "En pantalla tienen la estructura. A la izquierda el repo principal con su carpeta .git completa. A la derecha el worktree del hotfix: tiene sus archivos normales, pero su .git es un archivo de texto que dice 'mi repositorio real está allá'. Así Git sabe que están vinculados."

---

## Slide 16: "Reglas y restricciones"
Solo las dos más importantes:

> "Dos reglas que deben recordar: uno, no pueden tener la misma rama checked out en dos worktrees al mismo tiempo — Git los protege de eso para evitar conflictos de escritura. Y dos, el worktree principal — donde hicieron el clone — no se puede eliminar con remove."

> "Lo que es independiente por worktree: el working directory, el staging area, y el estado de merges o rebases. Lo compartido: toda la historia, ramas, tags, remotes y configuración."

---

## Slide 17: "Todo lo que necesitas" (comandos)
No los leas uno por uno. Resumen:

> "En pantalla tienen los 5 comandos. Todos empiezan con `git worktree`: add para crear, list para ver cuáles tienen, remove para eliminar, prune para limpiar referencias muertas, y add con -b para crear un worktree con una rama nueva. Eso es todo lo que necesitan saber. Ahora los van a ver en acción."

---

## Slide 18: "Casos de uso reales"
Pásala rápido, mencionando cada caso:

> "Casos reales donde worktree brilla: hotfix urgente sin perder tu feature — lo que ya vimos. Code review de un PR sin salir de tu rama. Tests largos corriendo en un worktree mientras sigues desarrollando en otro. Y lo que vamos a demostrar hoy: lanzar un agente de IA como Kiro en un worktree para que resuelva algo mientras tú sigues productivo en otro."

---

## Slide 19: "¿Cómo paso mi feature a main?"
**Esta slide responde una pregunta que va a surgir. Adelántate:**

> "Ok, una pregunta que seguro se están haciendo: si tengo mi feature en un worktree y main en otro... ¿cómo hago el merge? ¿Cómo creo el PR?"

> "La respuesta corta: igual que siempre. El flujo de merge no cambia."

Click 1 (Opción A):
> "Si quieren merge local: van al worktree de main, hacen git merge feature/login, y listo. El commit queda en main."

Click 2 (Opción B):
> "O lo más común en equipos: hacen push de su feature y crean el PR en GitHub como siempre. No importa desde qué carpeta hacen el push."

Click 3 (Punto clave):
> "El punto clave aquí: las ramas existen en el REPOSITORIO, no en la carpeta. Los worktrees son solo ventanas — lentes — para ver esas ramas. No tienen que 'pasar' nada de un worktree a otro. Es el mismo repo por debajo."

---

## Slide 20: "¿Cuándo no compensa?"
**Importante para credibilidad.** No vendas worktree como solución a todo:

> "Y para ser honestos: no todo es worktree. Si la interrupción es de dos minutos y un stash simple alcanza, no tiene sentido crear un worktree. Si tu proyecto es un monolito pesado con un npm install de 5 minutos — recuerden que cada worktree necesita su propio node_modules — ahí evalúen si vale la pena."

> "Acá quiero ser super claro con algo porque genera confusión: ¿qué se comparte y qué no?"

> "Se comparte: la historia de Git. Commits, objects, ramas, tags, remotes, configuración. Eso vive en .git y es uno solo."

> "NO se comparte: los archivos de trabajo. Cada worktree es un checkout independiente. Entonces si tu repo necesita npm install, cada worktree necesita su propio npm install. Si ocupa 2GB en node_modules, pues son 2GB por worktree."

> "Ahora, si es solo un hotfix rápido donde van a tocar un archivo y hacer push — no necesitan instalar dependencias en ese worktree. Depende del caso."

> "Recuerden: worktree te ahorra descargar la historia de Git. No te ahorra el setup del proyecto."

---

## Slide 21: "Ahora veámoslo en acción" (intro demo)
Subir la energía. Transición a la demo:

> "Listo, suficiente teoría. Vamos a verlo en vivo en mi terminal. Van a ser tres partes: flujo básico de worktree, un hotfix delegado a Kiro que es un agente de IA, y un code review rápido. Voy a compartir mi terminal..."

Cambia a compartir la terminal. Da 3 segundos para que la gente vea el cambio.

> "¿Se ve bien mi terminal? ¿Se alcanza a leer? Perfecto, arrancamos."

---

## Slide 22: Quizizz
Después de la demo, vuelve a las slides:

> "Bien, eso fue la demo. ¿Quedó claro el concepto? Vamos a comprobarlo. Saquen el celular o abran otra pestaña, entren a quizizz.com/join, y pongan el código que les voy a mostrar ahora. Son 10 preguntas rápidas."

Comparte la pantalla del Quizizz. Espera a que entren.

> "Veo que ya entraron [X] personas... esperamos unos segundos más... listo, arrancamos."

---

## Slide 23: Cierre
Después del Kahoot:

> "Muy bien, gracias por participar. Para cerrar: worktree es un subcomando nativo de Git. No instala nada. Les permite tener múltiples ramas activas al mismo tiempo sin stash ni cambios de contexto. Y como vieron en la demo, habilita que un agente de IA trabaje en una rama mientras ustedes siguen productivos en otra."

> "Les vamos a compartir por el canal del equipo un reto con 4 situaciones para que practiquen. La cuarta es bonus y usa Kiro. Inténtenlo esta semana."

> "¿Preguntas? Les dejo unos segundos para que escriban en el chat si tienen alguna duda..."

Espera 10-15 segundos. Si nadie pregunta:

> "Perfecto, gracias por su tiempo. Cualquier duda me escriben por el canal. ¡Éxito!"

---

## 💡 Tips para presentación VIRTUAL

1. **Pregunta "¿me escuchan bien?" al inicio.** Es tu forma de confirmar que hay gente ahí.
2. **No esperes respuestas visuales.** En virtual nadie asiente. Usa preguntas retóricas y sigue.
3. **Usa "¿se ve mi pantalla?" al cambiar entre slides y terminal.** Es tu checkpoint.
4. **Habla un 20% más lento de lo normal.** El audio virtual comprime la claridad.
5. **Pausa = poder.** 3 segundos de silencio en virtual se sienten como 1 en presencial. Úsalos.
6. **Narra todo lo que haces en la demo.** La gente no ve tu cursor con claridad. Di "voy a escribir..." antes de escribir.
7. **Si algo falla en la demo:** "Bien, en vivo siempre pasa algo. Lo que debería haber pasado es..." y explica. No te paralices.
8. **Ten las notas en otra ventana/monitor.** Nunca minimices la presentación para buscar notas.
9. **No digas "como pueden ver en la pantalla".** Di "lo que está en pantalla muestra..." — así incluyes a quienes no alcanzaron a ver el cambio.
10. **Engancha al inicio.** Los primeros 60 segundos definen si la gente abre otra pestaña o se queda contigo.
11. **Usa el chat a tu favor.** Di "escríbanme en el chat si les ha pasado" en vez de esperar que prendan micrófono.
12. **Confirma transiciones.** Antes de cambiar de slide o a terminal, di "vamos a pasar a..." para que nadie se pierda.
