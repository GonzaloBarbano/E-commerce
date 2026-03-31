# Prompt 2: Corrección de Pull Request (Code Review)

- **Rol:** Coordinador / DevOps
- **Modelo de IA utilizado:** Agente en VS Code / GitKraken (MCP)
- **Método / Técnica:** *Role Prompting* (Actúa como Senior) + *Few-Shot Formatting* (Estructura de salida predefinida).
- **Contexto Proveído:** Diferencias de código (diffs) de la Pull Request contra la rama develop.

## Prompt Exacto
```text
Actúa como Senior Software Engineer realizando un code review profesional.
CONTEXTO Y ACCIÓN:
Analiza los cambios de la Pull Request activa comparando la rama actual con develop. Utiliza las herramientas de GitKraken (MCP) para identificar los archivos modificados y publicar los hallazgos.
INSTRUCCIONES DE PUBLICACIÓN:
No solo respondas en este chat.
DEBES PUBLICAR cada hallazgo detectado directamente como un comentario de revisión en la Pull Request en GitHub utilizando las capacidades de GitKraken/GitLens.
Si no puedes publicar directamente, indícame qué error recibes de las herramientas de MCP.
REGLAS DE ANÁLISIS:
Identifica problemas reales del código (bugs, performance, seguridad, legibilidad).
No inventes problemas hipotéticos ni sugieras tests.
Cada hallazgo debe ser independiente.
ESTRUCTURA DE CADA COMENTARIO EN GITHUB:
HALLAZGO #<numero>
Tipo de problema: (bug | performance | seguridad | legibilidad | diseño | otro)
Severidad: (baja | media | alta | crítica)
Explicación técnica: <Por qué esto es un problema real>
Sugerencia de mejora: <Cambio concreto recomendable>
Ejemplo de código corregido:
Fragmento de código
// Código sugerido
DECISIÓN DE REVISOR HUMANO:
[ ] Aceptar sugerencia
[ ] Rechazar sugerencia
Justificación del revisor humano:
AL FINALIZAR:
Proporciona aquí en el chat un "RESUMEN GENERAL DE LA PR" con evaluación de riesgos y tu "DECISIÓN FINAL SUGERIDA (APPROVE / REQUEST CHANGES)".


## Resultados
- **Resultado Esperado:** Comentarios automatizados directamente en GitHub señalando errores reales de código.
- **Resultado Obtenido:** El Agente analizó el código y aplicó la plantilla de evaluación solicitada (Hallazgo, Severidad, Explicación).
- **Correcciones Manuales:** El coordinador humano tuvo que aprobar/rechazar las sugerencias finales para evitar falsos positivos.