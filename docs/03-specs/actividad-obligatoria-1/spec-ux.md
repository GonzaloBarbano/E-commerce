# Spec: Documentador / Diseñador UX

## 1. Meta y Contexto

- **Tarea asignada (según plan.md):** Diseñar el mockup visual inicial de la
  tienda e-commerce, generar el README.md del proyecto y documentar el proceso
  de diseño asistido por IA.
- **Objetivo:** Proveer al equipo una referencia visual clara (mockup en Figma)
  que el Desarrollador Frontend usará para generar el HTML con el servidor MCP,
  y una documentación inicial del proyecto que sirva como presentación del
  repositorio.

## 2. Requerimientos Técnicos y Funcionales

- [x] Crear mockup en Figma con las secciones: header, hero, productos,
      about, formulario y footer
- [x] Exportar mockup como PNG en docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png
- [x] Generar README.md usando GitHub Copilot en modo Agente con el plan.md
      como contexto
- [x] Revisar y completar manualmente el README.md generado por Copilot
- [x] Incluir enlace al archivo de Figma en el README.md
- [x] Usar un LLM para obtener sugerencias de layout y documentar el proceso
      en este archivo
- [x] Crear carpeta docs/01-mockup/actividad-obligatoria-1/ con la imagen exportada

## 3. Criterios de Aceptación (Definición de "Terminado")

- [x] El mockup muestra estructura visual clara con secciones, jerarquía de
      contenido y navegación identificables
- [x] La imagen está exportada en docs/01-mockup/actividad-obligatoria-1/diseño-inicial.png
- [x] El archivo Figma es accesible públicamente vía link en el README.md
- [x] El README.md contiene: título, descripción, objetivos, tecnologías,
      funcionalidades previstas, enlace al mockup y tabla de integrantes
- [x] El README.md fue generado con Copilot y revisado/completado manualmente
- [x] Este spec fue commiteado ANTES que el README.md y el mockup
- [x] El proceso de diseño asistido por IA está documentado en este archivo

## 4. Estrategia de Prompts (Para el Agente IA)

- **Herramienta a utilizar:** GitHub Copilot en modo Agente en VS Code
- **Contexto provisto a la IA:** Se adjuntó el plan.md y el spec-ux.md como
  contexto. Se le pidió sugerencias de layout, estructura de secciones y
  jerarquía visual para la página principal del e-commerce.
- **Prompt utilizado para sugerencias de diseño:**
  "Tengo el siguiente plan.md de mi proyecto e-commerce. Basándote en él,
  sugerirme el layout, la estructura de secciones y la jerarquía visual
  para la página principal."
- **Prompt utilizado para el README:**
  "Generame el README.md para un proyecto e-commerce universitario basándote
  en este plan.md. El README debe incluir: título, descripción, objetivos,
  tecnologías utilizadas, funcionalidades previstas, y una sección de
  documentación."
- **Archivos de referencia:** plan.md, spec-ux.md, diseño-inicial.png

---

## 5. Proceso de diseño asistido por IA

### ¿Qué sugirió la IA?

- Header con logo, navegación y CTA
- Sección hero con h1, subtítulo e imagen destacada
- Sección de features con cards (envíos, garantía, seguridad)
- Grid de productos con article por cada producto
- Sección about con tabla comparativa y lista
- Formulario de newsletter
- Aside opcional con filtros y categorías
- Footer con enlaces, redes y datos legales

### ¿Qué decidí incorporar?

- Header con navegación principal
- Sección hero con propuesta de valor
- Grid de productos
- Sección about con tabla y lista
- Formulario de contacto/suscripción
- Footer completo

### ¿Qué descarté y por qué?

- El aside con filtros: porque es una funcionalidad más compleja que
  corresponde a entregas futuras con JavaScript
- El carrito interactivo: porque JavaScript no es requerido en esta entrega
