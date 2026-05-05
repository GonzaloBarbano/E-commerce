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
- [ ] Bootstrap 5.3.3 incluido vía CDN jsDelivr (CSS + JS bundle con Popper) con SRI.
- [ ] Orden de carga de CSS respetado (Bootstrap antes de styles.css; bootstrap-overrides.css después de Bootstrap; responsive.css al final).
- [ ] `css/bootstrap-overrides.css` creado con mapeo de variables `--bs-*` a los tokens del proyecto.
- [ ] No se rompe ningún selector existente de `styles.css`, `components.css` ni `responsive.css`.

**Sistema de columnas**
- [ ] `.main-container` migrado a `container-fluid > row > col-lg-3 + col-lg-9`.
- [ ] `.featured-gallery` migrado a row + cols responsivos (12/6/4).
- [ ] `.products-grid` migrado a row + cols responsivos (12/6/4).
- [ ] `.footer-container` migrado a row + cols (12/6).
- [ ] Tablas envueltas en `.table-responsive` con clase `.table` aplicada.

**Coherencia visual**
- [ ] Paleta de colores del mockup mantenida (primary `#7c3aed`, surface-dark `#1e1b2e`).
- [ ] Tipografía Inter sigue aplicándose globalmente.
- [ ] Imágenes del hero y productos siguen usando `object-fit: contain` (no se recortan).
- [ ] Estados hover/focus de botones y links mantienen la transición de 0.3s.

**QA y entregables del rol**
- [ ] `docs/04-testing/test-case-6.md` documentado siguiendo el template, con prompts y resultados de Playwright MCP en iPhone 14 Pro, Galaxy S23 e iPad Air.
- [ ] Por cada hallazgo se abre issue tipo `bug` vía GitHub MCP desde Copilot Agent Mode.
- [ ] Cada issue se resuelve en una rama `fix/<nombre>` → develop, registrada bajo `[Fixed]` en `changelog.md`.
- [ ] PR `feature/dev-frontend-bootstrap-update-migration` → `develop` creado con la plantilla `.github/PULL_REQUEST_TEMPLATE/feature-template.md`.
- [ ] Entrada del PR registrada en `changelog.md` con link y descripción del aporte.

---

## 3. MOMENTO 2 — AL CERRAR la tarea (Evidencia)

_(Esta sección se completa al terminar la implementación, antes de abrir la PR.)_

### 3.1 Prompt exacto utilizado con Figma MCP + Copilot Agent Mode

```
[Pendiente — registrar el prompt usado para que Copilot genere bootstrap-overrides.css y la migración de columnas a partir del mockup disenio-bootstrap.png]
```

### 3.2 Resultado generado por la IA

_(Pendiente — describir qué archivos generó Copilot, qué clases agregó al index.html y qué estructura de overrides propuso.)_

### 3.3 Ajustes manuales realizados sobre el output

_(Pendiente — listar las correcciones que se hicieron al output de la IA: ajustes de specificity, breakpoints, conflictos con responsive.css, etc.)_

### 3.4 Hallazgos de Playwright MCP e issues abiertas

_(Pendiente — completar al cerrar el test-case-6.md.)_

| Issue # | Dispositivo | Descripción del hallazgo | PR de fix |
|---|---|---|---|
|  |  |  |  |

### 3.5 Obstáculos y resoluciones

_(Pendiente — documentar los problemas técnicos que aparezcan durante la migración y cómo se resolvieron.)_

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

- Mockup actualizado a Bootstrap: [`docs/01-mockup/disenio-bootstrap.png`](../../01-mockup/)
- Spec del Coordinador (contexto): [`spec-devops.md`](./spec-devops.md)
- Spec del Especialista en Componentes (rol acoplado): [`spec-componentes-bootstrap.md`](./spec-componentes-bootstrap.md) _(pendiente)_
- Test case responsive a generar: [`docs/04-testing/test-case-6.md`](../../04-testing/) _(pendiente)_
