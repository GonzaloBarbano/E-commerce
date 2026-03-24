# Prompt 4: Redacción de Especificación Técnica (Spec)

- **Rol:** Desarrollador Frontend
- **Modelo de IA utilizado:** ChatGPT / Claude (Asistente de texto)
- **Método / Técnica:** *Template-based Prompting* (Uso de plantillas) + *Inyección de Contexto*.
- **Contexto Proveído:** Se le pasó el plan general del proyecto, la consigna específica de la materia y la plantilla vacía diseñada por el Especialista en IA.

## Prompt Exacto
> Teniendo en cuenta el plan.md,  la consinga (En esta primera entrega, crearás la estructura básica de una página web que servirá como base para un proyecto interactivo que desarrollarás a lo largo del curso. La página web estará enfocada en [tE-commerce], ofreciendo información inicial sobre el mismo y estableciendo las bases para futuras funcionalidades.) y este template

# Spec: [Desarrollador Frontend]

## 1. Meta y Contexto
- **Tarea asignada (según plan.md):** [Describe brevemente qué te toca hacer]
- **Objetivo:** [¿Qué problema resuelve esta tarea en la pre-entrega?]

## 2. Requerimientos Técnicos y Funcionales
- [ ] Requerimiento 1
- [ ] Requerimiento 2
- [ ] Requerimiento 3

## 3. Criterios de Aceptación (Definición de "Terminado")
*Para que esta tarea se considere lista y la IA entienda cuándo detenerse, debe cumplir con:*
- [ ] Criterio A (Ej: El HTML debe pasar el validador del W3C sin errores).
- [ ] Criterio B (Ej: La rama debe tener commits descriptivos).

## 4. Estrategia de Prompts (Para el Agente IA)
- **Herramienta a utilizar:** [Ej: GitHub Copilot en VS Code]
- **Contexto a proveer a la IA:** [Ej: "Actúa como un desarrollador frontend experto en accesibilidad..."]
- **Archivos de referencia:** [Ej: index.html, styles.css]

Incluye docs/specs/spec-frontend.md redactado antes de
iniciar el desarrollo, describiendo qué se va a hacer, por qué y los criterios de
aceptación.


## Resultados
- **Resultado Esperado:** Un archivo `spec-frontend.md` completo con tareas claras y criterios de aceptación medibles.
- **Resultado Obtenido:** La IA rellenó la plantilla adaptando los requerimientos generales a tareas específicas de Frontend (ej. maquetación, uso de etiquetas semánticas).
- **Correcciones Manuales:** Revisión rápida para asegurar que no se incluyeran tareas fuera de alcance (como agregar CSS o JS, que no corresponden a esta entrega).