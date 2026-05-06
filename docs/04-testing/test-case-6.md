# Test Case 6 — Responsive: Migración a Bootstrap

**Proyecto:** PC Hardware E-commerce
**Repositorio:** [GonzaloBarbano/E-commerce](https://github.com/GonzaloBarbano/E-commerce)
**URL testeada:** `http://127.0.0.1:3000/index.html` (Live Preview local)
**Rama:** `feature/dev-frontend-bootstrap-update-migration`
**Issue asociado:** [#83](https://github.com/GonzaloBarbano/E-commerce/issues/83)
**Fecha de ejecución:** 2026-05-05
**Tester:** Nicolás Aguirre — Desarrollador Frontend/Bootstrap
**Status:** ⚠️ PASS con observaciones (2 hallazgos no bloqueantes detectados)
**Momento:** Momento 1 — Pre-merge, sobre rama `feature/dev-frontend-bootstrap-update-migration`
**Metodología:** Análisis estático de HTML + CSS migrado + verificación visual en Live Preview

---

## ⚠️ Nota Metodológica

La invocación directa de las tools del MCP server `playwright` desde Copilot Agent Mode no produjo resultados ejecutables en esta sesión: el agente respondió describiendo un test runner standalone (`test-tc6.js` + `run-test.bat`) sin escribir esos archivos al disco ni invocar realmente el browser controller del MCP. Verificado con `git status` y búsquedas: no hay `test-tc6.js`, `run-test.bat`, `test-tc6-report.json` ni screenshots `tc6-*.png` en el repo.

En su reemplazo se documenta este test case con **análisis estático del HTML y CSS migrado** + verificación visual en Live Preview en los 3 viewports objetivo. Es la misma metodología documentada en [`test-case-2.md`](./test-case-2.md) Momento 1 cuando Playwright corría en sandbox sin acceso al servidor local. Las capturas de pantalla son manuales (DevTools → Toggle Device Toolbar).

Para el **Momento 2** (post-merge a `develop`, sobre GitHub Pages) se recomienda re-ejecutar este test case con Playwright MCP real apuntando a la URL pública.

---

## Objetivos del Test

Verificar que la migración a Bootstrap 5.3 (instalación CDN, sistema de columnas y `bootstrap-overrides.css`) funciona correctamente en los 3 dispositivos exigidos por la consigna del Primer Parcial sin romper la identidad visual ni introducir regresiones del responsive validado en la Actividad Obligatoria N°2.

### Aspectos evaluados

1. **Carga de Bootstrap** vía CDN jsDelivr (CSS + JS bundle, sin errores SRI).
2. **Sistema de columnas Bootstrap** funcionando en sidebar+main, hero, products grid y footer.
3. **Sin regresiones de responsive**: scroll horizontal ausente, hamburguesa funcional, sidebar oculto en mobile/tablet.
4. **Identidad visual preservada**: paleta violeta `#7c3aed`, navbar oscuro `#1e1b2e`, fuente Inter, padding/spacing del proyecto.
5. **Tablas**: scroll horizontal interno en mobile (`.table-responsive`) sin generar overflow de página.
6. **Estados focus/hover** de botones siguen usando los tokens del proyecto (no los defaults de Bootstrap).

---

## Dispositivos obligatorios (PDF cátedra)

| Dispositivo            | Viewport     | UA / Engine     | Notas                                      |
| ---------------------- | ------------ | --------------- | ------------------------------------------ |
| iPhone 14 Pro          | 393×852      | iOS Safari      | DPR 3, mobile=true                         |
| Samsung Galaxy S23     | 412×915      | Chrome Android  | DPR 3.5, mobile=true                       |
| iPad Air               | 820×1180     | iOS Safari      | DPR 2, tablet                              |

---

## Áreas a validar (cambios introducidos en la rama)

| Cambio | Archivo(s) | Verificación esperada |
|---|---|---|
| Bootstrap CDN cargado | `index.html` | `bootstrap.min.css` y `bootstrap.bundle.min.js` con status 200, sin errores SRI |
| Variables `--bs-*` mapeadas | `css/bootstrap-overrides.css` | `getComputedStyle(:root).getPropertyValue('--bs-primary')` == `#7c3aed` o equivalente |
| Layout `.main-container` migrado | `index.html`, `css/styles.css` | `.main-container` tiene clases `container-fluid`; el sidebar es `col-lg-3 d-none d-lg-block`; el main-content es `col-lg-9` |
| Hero `.featured-gallery` migrado | `index.html`, `css/styles.css` | Es `row g-3`; las 3 figures tienen `col-12 col-md-6 col-lg-4` |
| `.products-grid` migrado | `index.html`, `css/styles.css` | Es `row g-3 g-md-4`; las 6 cards están envueltas en `col-12 col-sm-6 col-lg-4` |
| Footer `.footer-container` migrado | `index.html`, `css/styles.css` | Tiene `container-fluid`; las 2 secciones son `col-12 col-md-6` dentro de un `.row` |
| Tablas con `.table-responsive` | `index.html`, `css/bootstrap-overrides.css` | Las 3 tablas tienen clase `table align-middle`; los wrappers tienen `.table-wrapper.table-responsive` |

---

## Prompt para Playwright MCP — Iteración 1: validación general
```
Usá Playwright MCP. Iniciá un browser headed.

Para cada uno de estos 3 viewports:
- iPhone 14 Pro: 393x852, DPR 3, mobile=true (userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15')
- Samsung Galaxy S23: 412x915, DPR 3.5, mobile=true (userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36')
- iPad Air: 820x1180, DPR 2 (no mobile flag)

Hacé estos pasos en cada viewport:

1. Navegá a http://127.0.0.1:3000/index.html
2. Esperá que la página esté lista (networkidle).
3. Tomá screenshot full-page y guardá en docs/04-testing/screenshots/tc6-<deviceSlug>.png
   - deviceSlug: "iphone14pro" / "galaxys23" / "ipadair"

Y reportá lo siguiente para cada dispositivo:

A) Carga de Bootstrap:
   - status HTTP de https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
   - status HTTP de https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
   - errores en console.error que mencionen "integrity" o "SRI" (deben ser 0)

B) Layout sin overflow horizontal:
   - document.documentElement.scrollWidth vs window.innerWidth (deben ser iguales)
   - document.body.scrollWidth vs window.innerWidth (deben ser iguales)

C) Sistema de columnas funcionando:
   - getComputedStyle(.sidebar).display
     · esperado: "none" en iPhone y Galaxy S23 (viewport <992px)
     · esperado: "none" en iPad (820px <992px)
   - getComputedStyle(.main-content).width
     · esperado: ~100% del ancho del row en mobile/tablet
   - en .products-grid: cantidad de cards visibles por fila
     · esperado: 1 en iPhone, 1 en Galaxy S23 (412 <576px → col-12)
     · esperado: 2 en iPad (820 ≥576px → col-sm-6)
   - en .featured-gallery: cantidad de figures por fila
     · esperado: 1 en iPhone (col-12)
     · esperado: 1 en Galaxy S23 (col-12)
     · esperado: 2 en iPad (col-md-6, ≥768px)

D) Identidad visual preservada:
   - getComputedStyle(.navbar).backgroundColor
     · esperado: rgb(30, 27, 46) o "#1e1b2e"
   - getComputedStyle(.btn-primary, .btn-add-cart, .btn-submit, .btn-apply-filters [primer match]).backgroundColor
     · esperado: rgb(124, 58, 237) o "#7c3aed"
   - getComputedStyle(body).fontFamily
     · esperado: contenga "Inter"

E) Hamburguesa funcional (solo iPhone y Galaxy S23):
   - .hamburger-btn visible (display !== 'none', offsetWidth > 0)
   - click sobre .hamburger-btn → .navigation visible (display === 'block')

F) Tablas con scroll-responsive (solo iPhone y Galaxy S23):
   - el .table-wrapper.table-responsive de la tabla "Productos Estrella" tiene scrollWidth > clientWidth
   - el body NO tiene scrollWidth > viewport (la tabla scrollea internamente, no la página)

G) Errores en consola:
   - listá todos los console.error y console.warn (filtrá los esperados de DevTools/extensions)

Devolvé un único reporte estructurado en JSON con:
{
  "iphone14pro": { "A": {...}, "B": {...}, ... },
  "galaxys23":   { "A": {...}, "B": {...}, ... },
  "ipadair":     { "A": {...}, "B": {...}, ... }
}
y un resumen "veredicto" por dispositivo: PASS / PASS_WITH_WARNINGS / FAIL.
```

---

## Resultados por Dispositivo


### Dispositivo 1 — iPhone 14 Pro (393×852)

| Aspecto | Resultado del análisis | Estado |
|---|---|---|
| A. Carga Bootstrap (CSS + JS, SRI) | `<link>` y `<script>` con `integrity` SHA-384 oficial de Bootstrap 5.3.3 + `crossorigin="anonymous"`. Verificado en Live Preview (sub-paso 2a): sin errores rojos en consola, ambos recursos cargan. | ✅ PASS |
| B. Sin overflow horizontal | `html` y `body` con `overflow-x: hidden; max-width: 100%`. `.main-container { max-width: 100vw; overflow-x: hidden }` en `<768px`. `.main-content { overflow-x: hidden; box-sizing: border-box }` en mobile. Sin elementos con width fijo que excedan 393px. | ✅ PASS |
| C. Sistema de columnas | `.sidebar` con `col-lg-3 d-none d-lg-block` → 393px < 992px → `display: none` ✓. `.products-grid` cards con `col-12 col-sm-6 col-lg-4` → 393px < 576px → 1 card por fila ✓. `.featured-gallery` figures con `col-12 col-md-6 col-lg-4` → 1 figure por fila ✓. Footer con `col-12 col-md-6` → secciones apiladas ✓. | ✅ PASS |
| D. Identidad visual | `.navbar { background-color: var(--color-surface-dark) !important }` = `#1e1b2e` ✓. `.btn-primary { --bs-btn-bg: var(--color-primary) }` = `#7c3aed` (override en `bootstrap-overrides.css`) ✓. `body { font-family: "Inter", sans-serif }` y `--bs-body-font-family` mapeado a Inter ✓. | ✅ PASS |
| E. Hamburguesa funcional | `.hamburger-btn { display: flex }` en `@media (max-width: 768px)` → 393px → visible ✓. Toggle vía checkbox-hack (`<input id="menu-toggle">` + `<label class="hamburger-btn">` + `#menu-toggle:checked ~ .navigation { display: block }`) — verificado funcional en sub-pasos 2b–2d. | ✅ PASS |
| F. Tabla con scroll-responsive | `.table-responsive` aplica `overflow-x: auto` (Bootstrap). `.comparison-table { min-width: 500px }` en mobile → 500 > 393 → scroll horizontal interno se activa ✓. La tabla NO genera overflow del body (wrapper aislado). | ✅ PASS |
| G. Console limpia | Verificado en Live Preview tras cada sub-paso: 0 errores rojos, 0 warnings nuevos atribuibles a la migración Bootstrap. | ✅ PASS |

**Veredicto:** ✅ PASS

---

### Dispositivo 2 — Samsung Galaxy S23 (412×915)

| Aspecto | Resultado del análisis | Estado |
|---|---|---|
| A. Carga Bootstrap | Idéntico a iPhone (recursos del CDN no varían por UA). | ✅ PASS |
| B. Sin overflow horizontal | 412 < 576 (sm). Mismas reglas mobile aplican que en iPhone. Sin elementos que excedan 412px. | ✅ PASS |
| C. Sistema de columnas | 412px < 576px (sm) → mismo comportamiento que iPhone: sidebar oculto, products 1 col, hero 1 col, footer 1 col. | ✅ PASS |
| D. Identidad visual | Idéntico a iPhone — los tokens y overrides son viewport-agnostic. | ✅ PASS |
| E. Hamburguesa funcional | 412 < 768 (md) → `display: flex` activo. Checkbox-hack funcional. | ✅ PASS |
| F. Tabla con scroll-responsive | 500 > 412 → scroll horizontal interno se activa en `.comparison-table`. | ✅ PASS |
| G. Console limpia | Sin diferencias respecto a iPhone. | ✅ PASS |

**Veredicto:** ✅ PASS

---

### Dispositivo 3 — iPad Air (820×1180)

| Aspecto | Resultado del análisis | Estado |
|---|---|---|
| A. Carga Bootstrap | Idéntico al resto. | ✅ PASS |
| B. Sin overflow horizontal | 820px no activa los media queries mobile, pero `html { overflow-x: hidden }` global aplica. Layout cómodo en este viewport. | ✅ PASS |
| C. Sistema de columnas | 820 ≥ 576 (sm) → `col-sm-6` en products → 2 cards por fila ✓. 820 ≥ 768 (md) → `col-md-6` en hero y footer → 2 figures/secciones por fila ✓. 820 < 992 (lg) → `col-lg-3` no aplica → sidebar oculto por `d-none d-lg-block` ✓. | ✅ PASS |
| D. Identidad visual | Tokens, overrides y `.btn-primary` violeta intactos. | ✅ PASS |
| E. Hamburguesa funcional | No aplica — 820 > 768, hamburguesa oculta y `.navigation` (nav horizontal) visible por default del navbar. Comportamiento esperado para tablet. | ✅ N/A |
| F. Tabla con scroll-responsive | 820 > 768 → la regla `.comparison-table { min-width: 500px }` no aplica. La tabla toma su ancho natural < 820 → no se requiere scroll interno. `.table-responsive` queda como salvaguarda sin activarse. | ✅ PASS |
| G. Console limpia | Sin errores nuevos. | ✅ PASS |

**Veredicto:** ✅ PASS

---

## Bugs Identificados

El análisis estático detectó **2 hallazgos no bloqueantes** que conviene resolver con ramas `fix/*` antes del merge a `develop`. Ambos son no-críticos: el sitio funciona en los 3 dispositivos del PDF, pero hay una banda de viewports intermedios que muestran espacio vacío y hay un cierre HTML faltante preexistente que el test puso en evidencia.

---

### BUG-006 — Espacio vacío a la izquierda del main-content en viewports 992–1023px

- **Severidad:** Media (afecta laptops chicos y iPad horizontal en el límite del breakpoint)
- **Dispositivos afectados:** Cualquier viewport entre 992px y 1023px de ancho. NO afecta los 3 dispositivos obligatorios del PDF (393, 412, 820).
- **Descripción:** Hay un mismatch entre el breakpoint de Bootstrap (`lg = 992px`) y el media query legacy de `responsive.css` (`max-width: 1024px`). Resultado: en el rango 992–1023px:
  - Bootstrap aplica `.col-lg-3` al `.sidebar` (le asigna 25% de ancho).
  - `responsive.css` aplica `.sidebar { display: none }` (porque `<1024px`).
  - Bootstrap aplica `.col-lg-9` al `.main-content` (le asigna 75% de ancho).
  - El sidebar queda oculto pero `.col-lg-9` mantiene `flex-basis: 75%` → el 25% restante queda como espacio vacío a la izquierda del main-content.
- **Causa probable:** El media query de `responsive.css` se diseñó pensando en breakpoints custom del proyecto (768/1024). Bootstrap 5 usa 992 como breakpoint `lg`. No están alineados.
- **Fix sugerido:** En `css/responsive.css`, cambiar `@media screen and (max-width: 1024px)` a `@media screen and (max-width: 991.98px)` (alinear con el límite inferior de `lg` de Bootstrap). La regla `.sidebar { display: none }` queda redundante con `d-none d-lg-block` y se puede eliminar.
- **Issue de GitHub:** Por crear (ver sección "Issues a crear").

---

### BUG-007 — `<div class="table-wrapper">` de la specs-table sin cerrar (HTML inválido)

- **Severidad:** Media (HTML inválido, no rompe visualmente pero puede dar errores en validación W3C y comportamiento inesperado en el árbol del DOM)
- **Dispositivos afectados:** Todos (es un error estructural, no responsive)
- **Descripción:** En `index.html`, dentro de la sección `#compatibilidad` → `<article class="guide-card">` "Fuente de Alimentación", el `<div class="table-wrapper table-responsive">` que envuelve la `<table class="specs-table">` no tiene su `</div>` de cierre. El cierre del `<article>` aparece antes que el del wrapper, lo que el browser auto-corrige insertando un `</div>` implícito en lugar incorrecto.
- **Aclaración:** Este bug es **preexistente** — no fue introducido por la migración a Bootstrap. Pero el análisis estático del TC6 lo puso en evidencia. Se incluye en este test case porque el rol Frontend/Bootstrap es responsable de resolver hallazgos del test responsive según la consigna del PDF.
- **Pasos para reproducir:**
  1. Abrir `index.html` y buscar `<table class="specs-table table align-middle">`.
  2. Observar que el `</div>` que cierra `<div class="table-wrapper table-responsive">` no está antes de `</article>`.
  3. Validar el HTML en https://validator.w3.org/ — error de cierre de elemento.
- **Fix sugerido:** En `index.html`, agregar `</div>` justo antes de `</article>` en el bloque de la specs-table.
- **Issue de GitHub:** Por crear (ver sección "Issues a crear").

---

### Hallazgos positivos

- Los 3 dispositivos obligatorios del PDF (iPhone 14 Pro, Galaxy S23, iPad Air) pasan los 7 checks (A–G) sin warnings.
- El sistema de columnas se comporta como spec'd: 1/2/3 columnas en mobile/tablet/desktop respectivamente.
- La identidad visual (paleta `#7c3aed` / `#1e1b2e`, fuente Inter, padding/spacing) se preserva tras la migración.
- No se introducen regresiones de los `responsive.css` validados en la Actividad N°2 (hamburguesa, sidebar oculto en mobile, scroll horizontal en tablas).
- Los SRI hashes oficiales de Bootstrap 5.3.3 funcionan — no hay errores de integrity.

---

## Issues a crear en GitHub

Crear con `gh issue create` (los comandos exactos están listos en el spec del rol). Vincular a la PR `feature/dev-frontend-bootstrap-update-migration` con `Closes #N`.

| # | Título | Severidad | Labels | Estado |
|---|---|---|---|---|
| BUG-006 | `[BUG][TC6] Espacio vacío a la izquierda del main-content entre 992-1023px (mismatch breakpoint Bootstrap lg / responsive.css)` | Media | `bug`, `responsive`, `primer-parcial`, `bootstrap` | Por crear |
| BUG-007 | `[BUG][TC6] <div class="table-wrapper"> de specs-table sin </div> de cierre en index.html` | Media | `bug`, `html`, `primer-parcial` | Por crear |

**Estrategia de resolución:** una rama `fix/<nombre>` por cada bug, contra `develop`, con entrada en `[Fixed]` del `changelog.md`.

| Bug | Rama de fix sugerida |
|---|---|
| BUG-006 | `fix/align-breakpoint-sidebar-bootstrap` |
| BUG-007 | `fix/close-table-wrapper-specs-table` |

---

## Prompt para Playwright MCP — Iteración 2: regresiones post-fix

> **Usar después de mergear los `fix/*` de los bugs detectados** para confirmar que están resueltos.

```
Usá Playwright MCP. Repetí el flujo del prompt anterior (iPhone 14 Pro, Galaxy S23, iPad Air sobre http://127.0.0.1:3000/index.html) y devolvé un reporte comparativo:

Para cada hallazgo previo (lista de BUG-XX que estaba con FAIL o WARNING), confirmá:
- ¿La condición que disparaba el bug ahora pasa? (sí/no)
- Adjuntá la observación específica que valida el fix.

Cualquier hallazgo nuevo introducido por los fix/* lo marcás como BUG-NEW-XX.
```

---

## Conclusión

La migración a Bootstrap 5.3 es **funcionalmente correcta en los 3 dispositivos obligatorios** del PDF. El sistema de columnas, los overrides de identidad visual y el comportamiento responsive (hamburguesa, sidebar oculto en mobile/tablet, scroll-responsive en tablas) se mantienen sin regresiones respecto a la base validada en la Actividad Obligatoria N°2.

Se detectan **2 hallazgos no bloqueantes** que conviene resolver antes del merge a `develop`: una banda de viewports intermedios (992–1023px) con espacio vacío por mismatch de breakpoint, y un cierre HTML faltante preexistente en la specs-table que el análisis del TC6 puso en evidencia.

| Categoría                                | Resultado |
|------------------------------------------|-----------|
| Carga de Bootstrap (CSS + JS, SRI)       | ✅ PASS |
| Sistema de columnas                      | ✅ PASS en los 3 dispositivos del PDF |
| Identidad visual (paleta, tipografía)    | ✅ PASS |
| Sin regresiones de responsive            | ✅ PASS |
| Tablas con scroll-responsive             | ✅ PASS |
| Hamburguesa funcional en mobile          | ✅ PASS |
| Layout en viewports 992–1023px           | ⚠️ BUG-006 (espacio vacío izquierdo) |
| Validación HTML estructural              | ⚠️ BUG-007 (table-wrapper sin cerrar — preexistente) |

**Veredicto general:** ⚠️ **PASS CON OBSERVACIONES** — Apto para merge a `develop` con BUG-006 y BUG-007 resueltos previamente vía ramas `fix/*`.

---
