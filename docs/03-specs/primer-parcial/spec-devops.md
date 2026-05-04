# Especificación Técnica: Coordinador / DevOps (Actividad 2)

- **Rol:** Coordinador / Devops
- **Usuario de GitHub:** @GonzaloBarbano
- **Objetivo Principal:** Orquestar la migración del diseño a Bootstrap, asegurar la calidad del código mediante Code Reviews asistidos por IA y gestionar el flujo de despliegue.

## 1. MOMENTO 1: ANTES de comenzar (Planificación)

### 🛠️ Correcciones de Actividad N°1

_Se resolverán los siguientes puntos detectados en la entrega anterior:_

- Consolidación del Backport desde la rama de entrega anterior hacia `develop`.
- Resolución de conflictos pendientes en archivos de configuración.
- Ajuste de rutas relativas en la documentación técnica para asegurar su correcta visualización en el repositorio.

### 🎨 Actualización del Mockup (Figma a Bootstrap)

_Antes de que el Desarrollador Frontend inicie, se incorporan los siguientes cambios en el diseño:_

- **Sistema de Grilla:** Implementación de la grilla de 12 columnas de Bootstrap para garantizar un layout responsivo nativo.
- **Componentes Avanzados:** Incorporación de `Navbar` (navegación), `Carousel` (banner principal), `Modal` (vistas de detalle) y `Cards` (listado de productos).
- **Estilos:** Actualización de la paleta de colores y tipografías para que sean coherentes con las variables de Bootstrap.
- **Estados de Interacción:** Definición de estados _hover_, _active_ y _focus_ para botones y enlaces siguiendo los estándares de accesibilidad.

### ✅ Criterios de Aceptación (Checklist DevOps)

- [ ] El archivo `spec-devops.md` ha sido commiteado antes que cualquier cambio de código.
- [ ] El mockup en Figma está actualizado y el enlace es accesible para el equipo.
- [ ] Se exportó el diseño en `docs/01-mockup/disenio-bootstrap.png`.
- [ ] El enlace al Figma actualizado ha sido incluido en el `README.md`.
- [ ] Todas las Pull Requests nuevas están vinculadas a un Issue y requieren al menos 1 revisión aprobada.

---

## 2. Registro de Code Reviews con IA (Al cerrar la tarea)

### 🔍 Evidencia de Revisione con Copilot Agent

_(Esta sección se completará al finalizar el sprint)_

**Ejemplo de Prompt a utilizar:**
`@copilot /review Revisar el diff de esta PR. Foco en la implementación correcta de las clases de Bootstrap, uso de utilidades de espaciado (m-, p-) y que no existan estilos CSS redundantes que Bootstrap ya cubra.`

| PR # | Componente Revisado | Hallazgos de IA | Decisión Final |
| :--- | :------------------ | :-------------- | :------------- |
| #    |                     |                 |                |
| #    |                     |                 |                |

## 3. Decisiones de Diseño y Bootstrap

_Explicación de los componentes incluidos y su justificación técnica:_

- **Componente X:** Se incluyó para resolver el problema de [X] facilitando la experiencia de usuario en dispositivos móviles.
- **Uso de MCP:** Se utilizó el Model Context Protocol para agilizar el paso de diseño de Figma a código HTML/Bootstrap.

## 4. Obstáculos y Resoluciones

_(Documentar aquí los problemas encontrados durante la migración o la gestión de ramas y cómo se solucionaron)_

## 5. Herramientas y Entorno

- **Diseño:** Figma (Migración a Bootstrap).[cite: 1]
- **Control de Versiones:** Git & GitHub (GitFlow).[cite: 1]
- **IA:** GitHub Copilot Agent para Code Reviews.[cite: 1]
- **Despliegue:** GitHub Pages.[cite: 1]
