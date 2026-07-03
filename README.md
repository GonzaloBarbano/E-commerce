# 🌐 E-commerce Web Store

---

## 📌 Datos Académicos

- **Carrera:** Tecnicatura Universitaria en Programación de Sistemas
- **Materia:** Programación Web I

---

## 📖 Descripción

Este proyecto es una tienda online interactiva desarrollada como parte de la materia Programación Web I en la Tecnicatura Universitaria en Programación de Sistemas. La página web se enfoca en el comercio electrónico, proporcionando una estructura básica que servirá como base para futuras funcionalidades interactivas.

En esta primera entrega, se establece la estructura HTML5 fundamental, con marcadores para la integración de estilos CSS y scripts JavaScript en etapas posteriores. Además, permite aplicar conceptos clave como semántica HTML, accesibilidad, SEO y planificación de funcionalidades dinámicas.

---

## 🎯 Objetivo del entregable

**Actividad Obligatoria N°4 — Programación Web Avanzada (en curso):**

- Migrar el simulador de `prompt()`/`alert()` a una aplicación web interactiva completa.
- Manipulación del DOM y captura de eventos del usuario.
- Programación Orientada a Objetos (POO) con clases del dominio en `js/models/`.
- Persistencia con `localStorage`/`sessionStorage` a través de `js/utils/storage.js`.
- Refactorización de la suite Jasmine para cubrir clases y storage.

---

## 🛠️ Tecnologías

- **HTML5 + Bootstrap 5.3** — estructura semántica + diseño responsive + componentes (accordion, form validation).
- **CSS3** — estilos custom con variables y mobile-first.
- **JavaScript (ES6+)** — POO con `class`, encapsulamiento, serialización JSON, eventos DOM.
- **Web Storage API** — `localStorage` y `sessionStorage` a través de una capa ORM-like.
- **Jasmine 5.10** — framework de testing unitario en navegador.
- **PlantUML** — diagramas de actividades + diagrama de clases (UML).
- **GitHub** — control de versiones, Pull Requests, Issues y Projects (Kanban).
- **Figma** — diseño y mockups de interfaz.
- **GitHub Copilot Agent Mode** — asistencia IA en generación de código y documentación (obligatorio por consigna AO4).
- **Visual Studio Code** — editor de desarrollo.
- **Git** — versionado de cambios con branch model (feature/develop/master + release/backport).

---

## 🚀 Funcionalidades Previstas

### Entrega 1 (Completada)

- ✅ Estructura HTML5 semántica y accesible.
- ✅ Mockup de interfaz en Figma.
- ✅ Documentación y especificaciones.

### Entrega 2 (Completada)

- ✅ Estilos CSS responsive.
- ✅ Diseño visual completo.
- ✅ Mejora de UX/UI.

### Entrega 3 (Completada — `LGTM` del docente el 02/07/2026)

- ✅ Lógica de negocio en JavaScript (4 flujos: cotizador, compatibilidad, carrito, buscador).
- ✅ Diagramas de actividades PlantUML (4 flujos alineados al menú real).
- ✅ Suite de 99 tests Jasmine (100% PASS, 0 failures).
- ✅ Interactividad inicial con `prompt`/`alert`.
- ✅ Resolución de los 3 rounds de reviews del docente (33 RC + 13 RCN).

### Entrega 4 (En curso)

- 🔄 Migración de `prompt()`/`alert()` a UI HTML con eventos DOM y validación en tiempo real.
- 🔄 Nueva sección `<section id="simulador">` en `index.html` con 4 cards accordion.
- 🔄 Clases del dominio (`Producto`, `Carrito`, `Cotizacion`) en `js/models/`.
- 🔄 Capa de persistencia `js/utils/storage.js` con CRUD sobre localStorage/sessionStorage.
- 🔄 Refactor de tests + 2 suites nuevas (`models.spec.js`, `storage.spec.js`).
- 🔄 Code review formal del docente en Slack (requisito para 2° parcial).

---

## 📂 Documentación

- 📁 **[Mockup](docs/01-mockup/disenio-bootstrap.png.png)** - **[Figma](https://www.figma.com/design/LdjthTrqI614Fyr0M8bjF6/%22E-commerce---Mockup-Inicial--copia-?node-id=2012-5&t=ZhvMnQrrSbPoIzV3-1)**

- 🧠 **[Índice de Prompts](docs/02-prompts/prompts.md)**
- 📝 **[Changelog](changelog.md)**
- 📊 **[Ver Índice de Testing y QA](docs/04-testing/testing-doc.md)**
- 📐 **[Diagramas de actividades](docs/05-diagramas/01-diagrama-de-actividades/)**
- 🏗️ **[Diagrama de clases (AO4)](docs/04-diagramas/02-diagrama-de-clases/)** _(en construcción)_
- 💾 **[Documentación de Storage (AO4)](docs/06-storage/storage-doc.md)** _(en construcción)_
- 📋 **Specs AO4:** [Coord/DevOps](docs/03-specs/actividad-obligatoria-4/spec-devops.md) · [Tester QA](docs/03-specs/actividad-obligatoria-4/spec-tester-qa.md) · [Eventos+DOM](docs/03-specs/actividad-obligatoria-4/spec-dev-eventos-dom.md) · [POO](docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md) _(en construcción)_ · [Storage](docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md) _(en construcción)_

---

## 👥 Integrantes del Grupo

> 📌 **Nota administrativa:** @GonzaloBarbano abandonó el grupo el 22/06/2026. La AO4 se realiza con equipo reducido a 2 personas. La distribución de roles se ajustó para cubrir los 4 roles definidos por la consigna. Ver detalle en `docs/03-specs/actividad-obligatoria-4/spec-devops.md`.

| Nombre completo | Matrícula | GitHub | Rol en AO3 | Roles en AO4 |
|---|---|---|---|---|
| Nicolas Aguirre | 153791 | @Naguirre0102 | Coordinador/DevOps + Arquitecto de Diagramas + Tester QA (post-baja de Gonza) | Coordinador/DevOps + Tester QA + Dev JS Eventos+DOM |
| Lucas Ivan Fischer | 152159 | @LucasFUces | Desarrollador JavaScript | Dev JS POO + Dev JS Storage |
| Gonzalo Barbano | 152127 | @GonzaloBarbano | Coord/DevOps + Arquitecto de Diagramas (hasta 22/06/2026) | — (baja) |

---

## ⚙️ Instalación y Uso

Para visualizar el proyecto:

1. Descargar o clonar el repositorio
2. Abrir el archivo `index.html` en un navegador

No se requieren dependencias adicionales en esta etapa.

---

## 🤝 Contribuciones

Las contribuciones se realizan mediante Pull Requests (PR), cada uno acompañado de su correspondiente especificación en `docs/03-specs/`.

---

## 📜 Licencia

Este proyecto es de carácter educativo y no posee una licencia específica.
