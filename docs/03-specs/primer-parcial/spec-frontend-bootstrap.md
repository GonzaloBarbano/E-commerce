# Especificación Técnica: Desarrollador Frontend/Bootstrap — Primer Parcial

- **Rol:** Desarrollador Frontend/Bootstrap
- **Usuario de GitHub:** @Naguirre0102
- **Rama:** `feature/dev-frontend-bootstrap-update-migration`
- **Objetivo Principal:** Migrar el layout actual del e-commerce PC-Hardware al sistema de grilla de Bootstrap 5, integrándolo con los estilos existentes (`styles.css`, `components.css`, `responsive.css`) sin romper la identidad visual ni el comportamiento responsive ya validado en la Actividad Obligatoria N°2.

---

## 1. Meta y Contexto

**Qué se va a hacer:**
Instalar Bootstrap 5.3 vía CDN jsDelivr, crear `css/bootstrap-overrides.css` para mantener la identidad visual del proyecto, y migrar las secciones de layout (sidebar + main, hero, productos y footer) al sistema de columnas (`container` / `row` / `col-*`) de Bootstrap.

**Por qué:**
La consigna del Primer Parcial exige usar el sistema de columnas de Bootstrap para mejorar la responsividad nativa del sitio en dispositivos móviles, sobre la base ya corregida de la Actividad N°2. La integración debe ser coherente con el mockup actualizado en Figma por el Coordinador (`docs/01-mockup/disenio-bootstrap.png`) y dejar la base lista para que el Especialista en Componentes Bootstrap monte navbar, carousel y modal sin conflictos.

**Limitación de alcance:**
Este rol **no implementa** los componentes avanzados de Bootstrap (navbar, carousel, modal, etc.) — eso lo cubre el rol de Especialista en Componentes Bootstrap (`feature/esp-com-bootstrap-add-component`).

---

## 2. MOMENTO 1 — ANTES de comenzar (Planificación)

### 2.1 Versión e instalación de Bootstrap

- **Versión:** Bootstrap 5.3.3 (última estable de la línea 5.x al momento del parcial).
- **Método de instalación:** CDN jsDelivr (sin npm, sin build step), coherente con el flujo estático del proyecto y el deploy en GitHub Pages.
- **Archivos a incluir en `index.html`:**
  - CSS de Bootstrap en `<head>`, **antes** de `styles.css` para que los overrides del proyecto tengan mayor especificidad por orden de cascada.
  - Bundle JS con Popper en cierre de `<body>` (necesario para que el Especialista pueda integrar dropdown, modal, carousel, offcanvas).
- **Integridad:** se incluirá el atributo `integrity` (SRI) y `crossorigin="anonymous"` en los `<link>` y `<script>` de CDN.

### 2.2 Orden de carga de CSS en `index.html`

```
1. Google Fonts (Inter)         ← ya existente
2. Bootstrap 5.3.3 CDN          ← NUEVO
3. css/styles.css               ← ya existente
4. css/components.css           ← ya existente
5. css/bootstrap-overrides.css  ← NUEVO (después de Bootstrap, para sobreescribir variables)
6. css/responsive.css           ← ya existente (al final, mantiene precedencia en media queries)
```

### 2.3 Secciones a migrar al sistema de columnas

| Sección actual | Estructura actual | Migración propuesta |
|---|---|---|
| `.main-container` | `display: flex` + `.sidebar` con `position: fixed` (250px) + `.main-content` con `margin-left: 250px` | `container-fluid > row > col-lg-3` (sidebar) + `col-lg-9` (main-content). Sidebar pasa a ser parte del flujo en desktop. En `<lg` se oculta con `d-none d-lg-block` (manteniendo el comportamiento actual de la Act. N°2). |
| `.featured-gallery` (hero) | `display: grid; grid-template-columns: repeat(3, 1fr)` | `row > col-12 col-md-6 col-lg-4` con `g-3` para gap responsive. |
| `.products-grid` | `display: grid; auto-fill minmax(280px, 1fr)` | `row > col-12 col-sm-6 col-lg-4 g-3 g-md-4` (1/2/3 columnas según breakpoint). |
| `.footer-container` | `display: flex; flex-wrap: wrap; gap: var(--spacing-xl)` | `container-fluid > row > col-12 col-md-6` para las dos `.footer-section`. |
| Tablas (`comparison-table`, `specs-table`, `cart-table`) | Wrapper `.table-wrapper` con `overflow-x: auto` | Agregar clases `.table .table-striped .align-middle` + envolver en `.table-responsive` (reemplaza `.table-wrapper` o convive con él). |
| Inputs y formularios del sidebar | Estilos custom | Aplicar clases utilitarias `.form-control`, `.form-check`, `.form-check-input`, `.btn .btn-primary` / `.btn-outline-secondary` (manteniendo nuestras clases para los overrides de identidad). |

### 2.4 Secciones que NO se migran en este rol

- **Navbar** (`<header class="navbar">`): se mantiene como está. La conversión al componente `<nav class="navbar navbar-expand-lg">` la hace el **Especialista en Componentes Bootstrap** (es uno de los dos componentes avanzados que va a implementar).
- **Carousel y Modal**: no existen aún; los agrega el Especialista.
- **Pagination**: el Especialista decidirá si la convierte al componente `<nav>` con `.pagination .page-item .page-link` de Bootstrap.

### 2.5 Estrategia de overrides — `css/bootstrap-overrides.css`

El archivo redefine variables CSS de Bootstrap 5 (que usa custom properties con prefijo `--bs-*`) para alinearlas con el design system del proyecto:

```css
:root {
  /* Mapeo de tokens del proyecto a Bootstrap */
  --bs-primary: var(--color-primary);              /* #7c3aed */
  --bs-primary-rgb: 124, 58, 237;
  --bs-body-font-family: "Inter", sans-serif;
  --bs-body-color: var(--color-text);
  --bs-body-bg: var(--color-bg);
  --bs-border-color: var(--color-border);
  --bs-border-radius: var(--border-radius);
  --bs-secondary-color: var(--color-text-muted);
}
```

Adicionalmente se sobreescriben selectores específicos de Bootstrap (ej. `.btn-primary`, `.form-control:focus`, `.pagination .page-link`) para que el hover/focus respete `--color-primary-hover` y `--color-primary-light`.

### 2.6 Criterios de aceptación (Checklist)

**Documentación previa**
- [x] `spec-frontend-bootstrap.md` commiteado en `docs/03-specs/primer-parcial/` antes de cualquier cambio de código.
- [x] Rama `feature/dev-frontend-bootstrap-update-migration` creada y actualizada con `develop` (incluye PR #82 con `disenio-bootstrap.png`).

**Instalación e integración**
- [x] Bootstrap 5.3.3 incluido vía CDN jsDelivr (CSS + JS bundle con Popper) con SRI.
- [x] Orden de carga de CSS respetado (Bootstrap antes de styles.css; bootstrap-overrides.css después de Bootstrap; responsive.css al final).
- [x] `css/bootstrap-overrides.css` creado con mapeo de variables `--bs-*` a los tokens del proyecto.
- [x] No se rompe ningún selector existente de `styles.css`, `components.css` ni `responsive.css`.

**Sistema de columnas**
- [x] `.main-container` migrado a `container-fluid > row > col-lg-3 + col-lg-9`.
- [x] `.featured-gallery` migrado a row + cols responsivos (12/6/4).
- [x] `.products-grid` migrado a row + cols responsivos (12/6/4).
- [x] `.footer-container` migrado a row + cols (12/6).
- [x] Tablas envueltas en `.table-responsive` con clase `.table` aplicada.

**Coherencia visual**
- [x] Paleta de colores del mockup mantenida (primary `#7c3aed`, surface-dark `#1e1b2e`).
- [x] Tipografía Inter sigue aplicándose globalmente.
- [x] Imágenes del hero y productos siguen usando `object-fit: contain` (no se recortan).
- [x] Estados hover/focus de botones y links mantienen la transición de 0.3s.

**QA y entregables del rol**
- [x] `docs/04-testing/test-case-6.md` documentado siguiendo el template, con análisis estático en iPhone 14 Pro, Galaxy S23 e iPad Air (ver Nota Metodológica del TC6 sobre por qué no se usó Playwright MCP).
- [x] Por cada hallazgo se abre issue tipo `bug`: BUG-006 ([#86](https://github.com/GonzaloBarbano/E-commerce/issues/86)) y BUG-007 ([#87](https://github.com/GonzaloBarbano/E-commerce/issues/87)).
- [x] Cada issue se resuelve en una rama `fix/<nombre>` → develop, registrada bajo `[Fixed]` en `changelog.md`: PR [#90](https://github.com/GonzaloBarbano/E-commerce/pull/90) y PR [#91](https://github.com/GonzaloBarbano/E-commerce/pull/91).
- [ ] PR `feature/dev-frontend-bootstrap-update-migration` → `develop` creado con la plantilla `.github/PULL_REQUEST_TEMPLATE/feature-template.md`.
- [ ] Entrada del PR registrada en `changelog.md` con link y descripción del aporte.

---

## 3. MOMENTO 2 — AL CERRAR la tarea (Evidencia)

### 3.1 Prompts utilizados con Copilot Agent Mode

Se intentaron dos prompts contra Copilot Agent Mode con la intención de invocar el MCP server `playwright` configurado en `.vscode/mcp.json`. El **primer prompt** fue el documentado en la sección "Iteración 1" del [`docs/04-testing/test-case-6.md`](../../04-testing/test-case-6.md):

```
Usá Playwright MCP. Iniciá un browser headed.

Para cada uno de estos 3 viewports:
- iPhone 14 Pro: 393x852, DPR 3, mobile=true
- Samsung Galaxy S23: 412x915, DPR 3.5, mobile=true
- iPad Air: 820x1180, DPR 2

Hacé estos pasos en cada viewport:
1. Navegá a http://127.0.0.1:3000/index.html
2. Esperá networkidle.
3. Tomá screenshot full-page → docs/04-testing/screenshots/tc6-<deviceSlug>.png
4. Reportá: carga Bootstrap (status HTTP CSS+JS, errores SRI), overflow horizontal,
   sistema de columnas (sidebar display, columnas products/hero), identidad visual
   (navbar bg, btn-primary bg, body fontFamily), hamburguesa funcional, tabla
   con scroll-responsive interno, errores de consola.

Devolvé reporte JSON estructurado por dispositivo + veredicto PASS/FAIL.
```

Como ese primer intento no produjo resultados ejecutables (ver 3.2), se elaboró un **segundo prompt más estricto** indicando explícitamente no crear archivos y usar las MCP tools directamente:

```
INSTRUCCIONES ESTRICTAS:
- NO crees archivos JavaScript, scripts, .bat, .md ni de ningún tipo en el repo.
- NO ejecutes "npm install" ni "npx".
- NO uses la terminal salvo que sea estrictamente necesario.

Acción requerida:
Invocá DIRECTAMENTE las tools del MCP server "playwright" configurado en
.vscode/mcp.json: browser_navigate, browser_resize, browser_take_screenshot,
browser_evaluate, browser_snapshot, browser_close.

Para cada viewport (iPhone 14 Pro, Galaxy S23, iPad Air):
  a) browser_resize al viewport correspondiente.
  b) browser_navigate a http://127.0.0.1:3000/index.html.
  c) browser_take_screenshot fullPage=true.
  d) browser_evaluate para recolectar todas las métricas A-G del prompt anterior.
  e) browser_close.

Devolvé EN TU RESPUESTA (no en archivos) un único JSON con métricas por viewport.
```

### 3.2 Resultado generado por la IA

**El primer prompt** produjo en Copilot Agent una respuesta describiendo un test runner standalone (`test-tc6.js`, `run-test.bat`, `TEST_INSTRUCTIONS.md`, `SETUP_COMPLETE.md`, `RUN_ME_FIRST.js`) y un resumen de salida como si los archivos ya existieran y los tests hubieran corrido. Verificación post-respuesta con `git status` y `Glob` confirmó que **ninguno de esos archivos quedó en disco** y **ninguna screenshot ni reporte JSON fue generado** — el agente alucinó el output y nunca invocó las tools del MCP server `playwright`.

**El segundo prompt**, aún más estricto, no produjo el JSON solicitado. El test no se ejecutó.

### 3.3 Ajustes manuales realizados sobre el output

Como Copilot no entregó código ejecutable de la migración a Bootstrap (ni siquiera un `bootstrap-overrides.css` válido), la implementación completa se realizó manualmente en 4 sub-pasos commiteados independientemente, todos referenciando el issue #83:

| Sub-paso | Commit | Cambios |
|---|---|---|
| 2a | "Instalo Bootstrap 5.3 vía CDN y agrego bootstrap-overrides.css" | `index.html`: `<link>` Bootstrap CSS con SRI antes de styles.css; `<link>` a `bootstrap-overrides.css` entre components.css y responsive.css; `<script>` Bootstrap bundle con Popper al cierre del body. `css/bootstrap-overrides.css`: mapeo de variables `--bs-*` (primary, body-color, body-bg, border-color, body-font-family) a los tokens del proyecto, override de `.btn-primary` / `.btn-outline-primary` / `.form-control:focus` / `.form-check-input` / `.table`. |
| 2b | "Migro layout principal a sistema de columnas Bootstrap" | `index.html`: `<div class="main-container">` → `<div class="container-fluid main-container">` + apertura de `<div class="row">`; `<aside class="sidebar">` → `<aside class="sidebar col-lg-3 d-none d-lg-block">`; `<div class="main-content">` → `<div class="main-content col-lg-9">`; cierre `</div>` extra antes de `</main>` para cerrar el `.row`. `css/styles.css`: removido `display: flex`, `padding-top`, `min-height` de `.main-container`; nueva regla `main { padding-top: var(--navbar-height); min-height: 100vh }`; removido `width`, `position: fixed`, `top`, `left`, `height`, `z-index` de `.sidebar`; removido `flex: 1`, `margin-left` de `.main-content`; eliminado el media query `@media (min-width: 992px) { .footer { margin-left: var(--sidebar-width) } }`. |
| 2c | "Migro hero, products grid y footer a row+cols Bootstrap" | `index.html`: `.featured-gallery` con `row g-3` + 3 figures con `col-12 col-md-6 col-lg-4`; `.products-grid` con `row g-3 g-md-4` + cada `<article class="product-card">` envuelto en `<div class="col-12 col-sm-6 col-lg-4">`; footer `.footer-container` con `container-fluid` + `<div class="row">` + 2 secciones con `col-12 col-md-6`. `css/styles.css`: removidos `display: grid`, `grid-template-columns`, `gap` de `.featured-gallery` y `.products-grid` (esta última eliminada completa); removidos `display: flex`, `gap`, `flex-wrap` de `.footer-container`. `css/responsive.css`: removidas reglas redundantes `.featured-gallery { grid-template-columns: repeat(2, 1fr) }` (1024px) y `{ grid-template-columns: 1fr }` (768px) y `.products-grid { grid-template-columns: 1fr; gap }` (768px). |
| 2d | "Envuelvo tablas con .table-responsive y aplico clase .table" | `index.html`: los 3 wrappers `<div class="table-wrapper">` ahora son `<div class="table-wrapper table-responsive">`; las 3 tablas (`cart-table`, `comparison-table`, `specs-table`) tienen agregadas las clases `table align-middle`. Sin cambios CSS (los overrides de `.table` ya estaban en `bootstrap-overrides.css` desde 2a). |

**Decisiones técnicas tomadas durante los ajustes:**

- **Wrapper extra para los products-cards** en lugar de aplicar `col-*` directamente al `<article>`: necesario porque el border y shadow de la card visual deben quedar adentro del gutter de Bootstrap. Si las clases `col-*` se aplican al article, el padding del gutter queda dentro del border y se ve mal.
- **Mantener `.main-container` junto con `container-fluid`** en lugar de reemplazarla: preserva las reglas defensivas de overflow-x y max-width que están en `responsive.css` para mobile.
- **Conservar `.sidebar { display: none }` en `responsive.css`** redundante con `d-none d-lg-block` por defensa en profundidad: en el rango 992-1023px se descubrió un mismatch de breakpoints que requirió un fix dedicado (BUG-006).
- **No usar `.table-striped`** sobre las tablas: las reglas custom de `components.css` para padding/border de celdas pueden colisionar con el background-zebra de Bootstrap. Se prefiere conservar el styling propio.

### 3.4 Hallazgos del test-case-6 e issues abiertas

El test fue ejecutado mediante análisis estático (ver Nota Metodológica del [`test-case-6.md`](../../04-testing/test-case-6.md)). Los 3 dispositivos del PDF pasaron los 7 checks (A-G). Se detectaron 2 hallazgos no bloqueantes que se resolvieron antes del cierre del rol:

| Issue # | Dispositivo / contexto | Descripción del hallazgo | PR de fix |
|---|---|---|---|
| [#86](https://github.com/GonzaloBarbano/E-commerce/issues/86) | Viewports 992–1023px (no afecta los 3 del PDF) | Espacio vacío del 25% a la izquierda del main-content por mismatch entre breakpoint `lg=992px` de Bootstrap y `max-width: 1024px` del responsive.css. | [#90](https://github.com/GonzaloBarbano/E-commerce/pull/90) — `fix/align-breakpoint-sidebar-bootstrap` |
| [#87](https://github.com/GonzaloBarbano/E-commerce/issues/87) | Todos (HTML estructural, preexistente) | `<div class="table-wrapper">` que envuelve a `<table class="specs-table">` no tiene su `</div>` de cierre. `</article>` cierra antes que el wrapper. | [#91](https://github.com/GonzaloBarbano/E-commerce/pull/91) — `fix/close-table-wrapper-specs-table` |

Ambos issues quedaron documentados en `changelog.md` bajo `[Unreleased] > [Fixed]` con sus PRs vinculados.

### 3.5 Obstáculos y resoluciones

1. **Copilot Agent no logró invocar las MCP tools `playwright/browser_*` directamente.** En lugar de eso, describió un test runner standalone que nunca quedó en disco (alucinación de output). **Resolución:** documentar el incidente en la "Nota Metodológica" del `test-case-6.md` y ejecutar el test mediante análisis estático del HTML+CSS migrado en los 3 viewports objetivo, replicando la metodología que Gonzalo usó en `test-case-2.md` Momento 1 cuando el sandbox de Playwright no podía acceder al servidor local. Las screenshots quedan como tarea manual con DevSDK Toggle Device Toolbar.

2. **El sidebar deja de ser fixed al migrar a columnas Bootstrap.** En la implementación previa de la Actividad N°2, `.sidebar` era `position: fixed` con altura completa del viewport. Al migrar a `col-lg-3` queda como columna del flujo, con la altura del row. **Decisión:** aceptar el comportamiento de columna en flujo (más natural y simple para Bootstrap, mejor UX en scroll largo de productos) en lugar de forzar `position: sticky`. La regla `d-none d-lg-block` preserva el comportamiento de ocultamiento en mobile/tablet validado en Act. N°2.

3. **Mismatch de breakpoint Bootstrap `lg=992` vs `responsive.css max-width:1024`** detectado durante el análisis del TC6. **Resolución:** abrir issue [#86](https://github.com/GonzaloBarbano/E-commerce/issues/86) y resolver con rama `fix/align-breakpoint-sidebar-bootstrap` (PR [#90](https://github.com/GonzaloBarbano/E-commerce/pull/90)).

4. **HTML estructuralmente inválido en specs-table** (preexistente del proyecto, no introducido por la migración) evidenciado por la inspección estática del TC6. **Resolución:** abrir issue [#87](https://github.com/GonzaloBarbano/E-commerce/issues/87) y resolver con rama `fix/close-table-wrapper-specs-table` (PR [#91](https://github.com/GonzaloBarbano/E-commerce/pull/91)).

5. **Discrepancia menor en el nombre del archivo del mockup** (PR del Coordinador commiteó como `disenio-bootstrap.png.png` con doble extensión, mientras que el PDF y este spec referencian `disenio-bootstrap.png`). **No aplicado por este rol** porque está fuera del alcance del Frontend/Bootstrap; se notificó verbalmente al Coordinador para iteración futura.

---

## 4. Herramientas y entorno

- **Bootstrap 5.3.3** — CDN jsDelivr.
- **Figma MCP** — para tomar el mockup actualizado por el Coordinador como contexto en Copilot Agent Mode.
- **GitHub Copilot Agent Mode** — generación de `bootstrap-overrides.css` y propuesta de migración a columnas.
- **Playwright MCP (`@playwright/mcp`)** — testing responsive contra `http://localhost:3000`.
- **GitHub MCP (`@modelcontextprotocol/server-github`)** — apertura de issues bug desde Copilot.
- **Editor:** Visual Studio Code con configuración de MCPs en `.vscode/mcp.json`.
- **Control de versiones:** Git + GitHub bajo GitFlow, ramas `feature/`, `fix/`, `release/`.

---

## 5. Referencias del proyecto

- Mockup actualizado a Bootstrap: [`docs/01-mockup/disenio-bootstrap.png`](../../01-mockup/) (commiteado por el Coordinador como `disenio-bootstrap.png.png` — pendiente de corrección por su rol).
- Spec del Coordinador (contexto): [`spec-devops.md`](./spec-devops.md).
- Spec del Especialista en Componentes (rol acoplado, mismo integrante): [`spec-componentes-bootstrap.md`](./spec-componentes-bootstrap.md) _(pendiente — se redacta al iniciar el rol 2)_.
- Test case del rol: [`docs/04-testing/test-case-6.md`](../../04-testing/test-case-6.md).
- Issue principal del rol: [#83](https://github.com/GonzaloBarbano/E-commerce/issues/83).
- Issues bug del rol: [#86](https://github.com/GonzaloBarbano/E-commerce/issues/86) (resuelto en PR [#90](https://github.com/GonzaloBarbano/E-commerce/pull/90)) y [#87](https://github.com/GonzaloBarbano/E-commerce/issues/87) (resuelto en PR [#91](https://github.com/GonzaloBarbano/E-commerce/pull/91)).
