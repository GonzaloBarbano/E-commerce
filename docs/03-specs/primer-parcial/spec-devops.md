# Especificación Técnica: Coordinador / DevOps (Actividad 2)

- **Rol:** COORDINADOR / DEVOPS[cite: 1]
- **Usuario de GitHub:** @GonzaloBarbano[cite: 1]
- **Objetivo Principal:** Orquestar la migración del diseño a Bootstrap, asegurar la calidad del código mediante Code Reviews profesionales y gestionar el flujo de despliegue.

## 1. MOMENTO 1: ANTES de comenzar (Planificación)

### 🛠️ Correcciones de Actividad N°1

- Consolidación del Backport desde la rama de entrega anterior hacia `develop`.
- Ajuste de rutas relativas en la documentación técnica para asegurar su correcta visualización.

### 🎨 Actualización del Mockup (Figma a Bootstrap)

- **Sistema de Grilla:** Implementación de la grilla de 12 columnas de Bootstrap.
- **Componentes Avanzados:** Incorporación de `Carousel` (banner principal) y `Modal` (vistas de detalle)[cite: 1].
- **Estilos:** Actualización de paleta y tipografía coherente con las variables de Bootstrap[cite: 1].

---

## 2. Registro de Code Reviews con IA (Al cerrar la tarea)

### 🔍 Code Review — Senior Engineer (Análisis PR #85 y #93)

_Simulación de revisión técnica profesional sobre los avances del equipo._

#### HALLAZGO #1

- **Tipo de problema:** bug | **Severidad:** 🔴 alta[cite: 1]
- **Archivo:** `index.html` — sliders de precio mínimo/máximo[cite: 1]
- **Explicación técnica:** Los dos `<input type="range">` de precio carecen de validación cruzada. El usuario puede arrastrar el slider mínimo por encima del máximo, generando un rango invertido silencioso que rompe la lógica de filtrado[cite: 1].
- **Sugerencia de mejora:** Implementar una validación mediante `oninput` para asegurar que el valor mínimo nunca supere al máximo[cite: 1].

#### HALLAZGO #2

- **Tipo de problema:** bug / accesibilidad | **Severidad:** 🟠 media[cite: 1]
- **Archivo:** `index.html` — `<datalist id="search-suggestions">`[cite: 1]
- **Explicación técnica:** Las opciones del datalist carecen de texto entre etiquetas. Los lectores de pantalla no anuncian el `value`, haciendo que las sugerencias sean inaccesibles para usuarios con discapacidad visual[cite: 1].
- **Sugerencia de mejora:** Incluir el texto descriptivo dentro de cada etiqueta `<option>`[cite: 1].

#### HALLAZGO #3

- **Tipo de problema:** bug | **Severidad:** 🔴 alta[cite: 1]
- **Archivo:** `index.html` — Estructura de Grilla[cite: 1]
- **Explicación técnica:** En la migración a Bootstrap, se detectaron etiquetas `<div>` de tipo `row` que no fueron cerradas correctamente o están mal anidadas fuera del `container-fluid`. Esto genera un HTML inválido que puede causar comportamientos visuales impredecibles en diferentes navegadores[cite: 1].
- **Sugerencia de mejora:** Verificar el árbol DOM y asegurar que cada `row` esté contenido estrictamente dentro de un `container`[cite: 1].

---

## 3. Decisiones del Mockup y Componentes

- **Carousel:** Elegido para optimizar el espacio en el Hero Section y permitir la rotación de ofertas de hardware[cite: 1].
- **Modal:** Implementado para visualización de detalles técnicos sin pérdida de contexto de navegación[cite: 1].
- **HTML Avanzado:** Se añadieron componentes nativos como `<details>`/`<summary>` para especificaciones y `input type="range"` para filtros de precio[cite: 1].

## 4. Obstáculos y Resoluciones

- **Desincronización de Variables:** Se detectó que los valores RGB en `bootstrap-overrides.css` estaban hardcodeados. Se resolvió proponiendo la creación de tokens `--color-primary-rgb` en el archivo base de estilos para mantener la consistencia[cite: 1].

## 5. Criterios de Aceptación (Checklist DevOps)

- [x] El archivo `spec-devops.md` fue commiteado antes que los cambios de código.
- [x] El mockup en Figma está actualizado (`docs/01-mockup/disenio-bootstrap.png`).
- [x] Se realizaron y documentaron los Code Reviews con Copilot Agent.
- [ ] La rama `release` está lista para el despliegue final en GitHub Pages.

---

**🎯 DECISIÓN FINAL SUGERIDA: REQUEST CHANGES**
Debido a los errores estructurales en el anidamiento de la grilla (Hallazgo #3) y la falta de validación en los componentes avanzados (Hallazgo #1), se solicita corrección antes del merge a `develop`[cite: 1].
