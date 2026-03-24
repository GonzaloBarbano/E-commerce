# Spec: [Desarrollador Frontend]

## 1. Meta y Contexto

- **Tarea asignada (según plan.md):** Crear la estructura HTML5 básica para una página de E-commerce que sirva como cimiento para el desarrollo interactivo a lo largo del curso.
- **Objetivo:** Establecer una estructura semántica y accesible de una página web de E-commerce que incluya todos los elementos fundamentales solicitados, dejando preparada la base para futuras fases de estilos CSS y funcionalidades JavaScript.

---

## 2. Requerimientos Técnicos y Funcionales

- [x] **HTML5 Semántico:** Utilizar etiquetas HTML5 semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, etc.) para estructura clara y accesible.
- [x] **Elementos Básicos Requeridos:** Incluir en la página:
  - Título de la página y encabezados jerárquicos (`<h1>`, `<h2>`, `<h3>`)
  - Párrafos descriptivos sobre el E-commerce
  - Al menos 3 imágenes relacionadas con productos/categorías (con atributo `alt` descriptivo)
  - Enlaces funcionales (internos y/o externos) relacionados con el E-commerce
  - Al menos una lista (ordenada o desordenada) de categorías o productos
  - Un formulario básico (ej: newsletter, contacto o búsqueda)
  - Una tabla con información de productos o comparativa
- [x] **Accesibilidad y SEO:** Incluir metaetiquetas esenciales (`<meta name="viewport">`, `<meta name="description">`, etc.) y atributos accesibles en todos los elementos.
- [x] **Marcadores para Fases Futuras:** Incluir comentarios HTML indicando:
  - Dónde se aplicarán estilos CSS (con etiquetas como `<!-- TODO: CSS: ... -->`)
  - Dónde se integrarán funcionalidades JavaScript (con etiquetas como `<!-- TODO: JS: ... -->`)
- [x] **Documentación en Código:** Agregar comentarios claros explicando la estructura de cada sección y propósito de elementos clave.
- [x] **Validez HTML:** El código debe pasar validación del W3C sin errores (advertencias aceptables).

---

## 3. Criterios de Aceptación (Definición de "Terminado")

_Para que esta tarea se considere lista, debe cumplir con:_

- [x] **Validación W3C:** El archivo `index.html` pasa el validador del W3C sin errores críticos (https://validator.w3.org/).
- [x] **Estructura Semántica:** El HTML utiliza etiquetas semánticas apropiadas y no abusa de divs genéricos.
- [x] **Completitud de Elementos:** Contiene todos los elementos básicos solicitados (título, párrafos, imágenes, enlaces, listas, formularios, tablas).
- [x] **Comentarios Descriptivos:** Cada sección principal contiene al menos un comentario explicatorio.
- [x] **Marcadores Identificados:** Los comentarios `<!-- TODO: CSS: ... -->` y `<!-- TODO: JS: ... -->` están claramente marcados.
- [x] **Atributos Accesibles:** Todas las imágenes tienen `alt` descriptivo, formularios tienen `<label>` asociadas, y se utilizan atributos `aria` donde corresponda.
- [x] **Commits Descriptivos:** La rama contiene commits con mensajes claros en formato `feat: ...` o `docs: ...` detallando qué se agregó o modificó.
- [x] **README.md Actualizado:** El archivo `README.md` incluye descripción del proyecto, instrucciones de uso y contexto del E-commerce elegido.
- [x] **Archivos Organizados:** El proyecto sigue la estructura especificada en `plan.md` con `docs/specs/`, `docs/mockups/`, etc.

---

## 4. Estrategia de Prompts (Para el Agente IA)

- **Herramienta a utilizar:** GitHub Copilot en VS Code con el contexto del proyecto. MCP Figma
- **Contexto a proveer a la IA:**
  > "Actúa como un desarrollador frontend experto en HTML5 semántico y accesibilidad web (WCAG). Tu tarea es crear una estructura HTML válida y bien documentada para una página de E-commerce siguiendo las especificaciones en `docs/specs/spec-frontend.md`. El código debe incluir comentarios explicativos y marcadores para futuras fases de CSS y JavaScript."
- **Archivos de referencia:**
  - `index.html` (a crear)
  - `docs/specs/spec-frontend.md` (esta especificación)
  - `plan.md` (requerimientos generales del proyecto)
  - `docs/mockup/actividad-obligatoria-1/` (si hay mockups disponibles)

- **Características adicionales a considerar:**
  - Utilizar estructura de carpetas clara: `/assets/images/` para imágenes
  - Seguir convenciones de nombres descriptivos en clases e ids (aunque no haya CSS aún)
  - Preparar la estructura para que sea responsive (agregar viewport meta)
  - Considerar SEO desde el inicio con metaetiquetas adecuadas

---

## Notas de Desarrollo

- El HTML no debe incluir estilos inline; toda la presentación se delegará a CSS en futuras entregas.
- La funcionalidad interactiva será agregada en fases posteriores del proyecto.
- Se recomienda usar herramientas de validación y linters HTML durante el desarrollo para mantener la calidad del código.
- Este archivo spec-frontend.md debe ser incluido en el PR correspondiente como referencia de trabajo realizado.
