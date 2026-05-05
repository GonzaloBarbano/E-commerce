# Test Case 6 — Responsive: Migración a Bootstrap

**Proyecto:** PC Hardware E-commerce
**Repositorio:** [GonzaloBarbano/E-commerce](https://github.com/GonzaloBarbano/E-commerce)
**URL testeada:** `http://127.0.0.1:3000/index.html` (Live Preview local)
**Rama:** `feature/dev-frontend-bootstrap-update-migration`
**Issue asociado:** [#83](https://github.com/GonzaloBarbano/E-commerce/issues/83)
**Fecha de ejecución:** _(pendiente)_
**Tester:** Nicolás Aguirre — Desarrollador Frontend/Bootstrap
**Status:** _(pendiente — ejecutar prompts del agente)_
**Momento:** Momento 1 — Pre-merge, sobre Live Preview local
**Herramienta:** Playwright MCP (`@playwright/mcp`) — invocado desde Agent Mode

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

> **Cómo usar este prompt:** abrí el panel de Agent Mode en Antigravity (o Copilot Agent Mode si estás en VS Code), pegá el bloque siguiente y ejecutá. El agente va a invocar Playwright MCP automáticamente.

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

> _(Pendiente de ejecución — pegar el output del agente abajo de cada subsección.)_

### Dispositivo 1 — iPhone 14 Pro (393×852)

| Aspecto | Resultado | Estado |
|---|---|---|
| A. Carga Bootstrap (CSS + JS, sin errores SRI) | _(pendiente)_ | _(pendiente)_ |
| B. Sin overflow horizontal | _(pendiente)_ | _(pendiente)_ |
| C. Sistema de columnas (sidebar oculto, products 1col) | _(pendiente)_ | _(pendiente)_ |
| D. Identidad visual (navbar oscuro, btn-primary violeta, Inter) | _(pendiente)_ | _(pendiente)_ |
| E. Hamburguesa funcional | _(pendiente)_ | _(pendiente)_ |
| F. Tabla con scroll-responsive interno | _(pendiente)_ | _(pendiente)_ |
| G. Console limpia | _(pendiente)_ | _(pendiente)_ |

**Veredicto:** _(pendiente)_

---

### Dispositivo 2 — Samsung Galaxy S23 (412×915)

| Aspecto | Resultado | Estado |
|---|---|---|
| A. Carga Bootstrap | _(pendiente)_ | _(pendiente)_ |
| B. Sin overflow horizontal | _(pendiente)_ | _(pendiente)_ |
| C. Sistema de columnas | _(pendiente)_ | _(pendiente)_ |
| D. Identidad visual | _(pendiente)_ | _(pendiente)_ |
| E. Hamburguesa funcional | _(pendiente)_ | _(pendiente)_ |
| F. Tabla con scroll-responsive interno | _(pendiente)_ | _(pendiente)_ |
| G. Console limpia | _(pendiente)_ | _(pendiente)_ |

**Veredicto:** _(pendiente)_

---

### Dispositivo 3 — iPad Air (820×1180)

| Aspecto | Resultado | Estado |
|---|---|---|
| A. Carga Bootstrap | _(pendiente)_ | _(pendiente)_ |
| B. Sin overflow horizontal | _(pendiente)_ | _(pendiente)_ |
| C. Sistema de columnas (sidebar oculto, products/hero 2 col) | _(pendiente)_ | _(pendiente)_ |
| D. Identidad visual | _(pendiente)_ | _(pendiente)_ |
| F. Tabla con scroll-responsive (no aplica si la tabla cabe en 820px) | _(pendiente)_ | _(pendiente)_ |
| G. Console limpia | _(pendiente)_ | _(pendiente)_ |

**Veredicto:** _(pendiente)_

---

## Capturas de pantalla

> _(Pendientes — Playwright las guarda en `docs/04-testing/screenshots/` cuando se ejecuta el prompt.)_

| Dispositivo | Captura |
|---|---|
| iPhone 14 Pro | _(pendiente)_ `screenshots/tc6-iphone14pro.png` |
| Samsung Galaxy S23 | _(pendiente)_ `screenshots/tc6-galaxys23.png` |
| iPad Air | _(pendiente)_ `screenshots/tc6-ipadair.png` |

---

## Bugs Identificados

> _(Por cada hallazgo de FAIL o PASS_WITH_WARNINGS del agente, agregar una sección abajo siguiendo el formato BUG-XX usado en `test-case-1.md` y `test-case-2.md`.)_

### BUG-XX — _(título descriptivo del hallazgo)_

- **Severidad:** _(Alta / Media / Baja)_
- **Dispositivos afectados:** _(iPhone / Galaxy S23 / iPad / todos)_
- **Descripción:** _(qué falló y por qué)_
- **Pasos para reproducir:** _(secuencia de pasos manuales)_
- **Causa probable:** _(hipótesis)_
- **Fix sugerido:** _(en qué archivo/línea, qué cambio aplicar)_
- **Issue de GitHub:** _(pendiente — crear con GitHub MCP / `gh issue create`)_

---

## Issues a crear en GitHub (GitHub MCP)

> _(Pendiente — para cada bug detectado, abrir issue con `gh issue create` o desde GitHub MCP en Agent Mode.)_

| # | Título | Severidad | Labels | Estado |
|---|---|---|---|---|
| _BUG-XX_ | _(pendiente)_ | _(pendiente)_ | `bug`, `responsive`, `primer-parcial` | Por crear |

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

> _(Pendiente de ejecución y análisis. Completar después de tener los resultados del agente y los issues resueltos.)_

| Categoría                                | Resultado |
|------------------------------------------|-----------|
| Carga de Bootstrap                       | _(pendiente)_ |
| Sistema de columnas                      | _(pendiente)_ |
| Identidad visual                         | _(pendiente)_ |
| Sin regresiones de responsive            | _(pendiente)_ |
| Tablas con scroll-responsive             | _(pendiente)_ |
| Hamburguesa funcional en mobile          | _(pendiente)_ |

**Veredicto general:** _(pendiente)_

---

_Test case redactado para ser ejecutado con Playwright MCP desde Agent Mode (Antigravity / Copilot)._
_URL local: `http://127.0.0.1:3000` — si tu Live Preview usa otro puerto (ej: 5500 con Live Server de Ritwick Dey), reemplazar en los prompts antes de pegarlos._
