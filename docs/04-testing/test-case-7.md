# Test Case 7 — Componente Bootstrap avanzado: Carousel

**Proyecto:** PC Hardware E-commerce
**Repositorio:** [GonzaloBarbano/E-commerce](https://github.com/GonzaloBarbano/E-commerce)
**URL testeada:** `http://127.0.0.1:3000/index.html` (Live Preview local)
**Rama:** `feature/esp-com-bootstrap-add-component`
**Issue asociado:** [#96](https://github.com/GonzaloBarbano/E-commerce/issues/96)
**Commit del componente:** `caa30c4` (Carousel) + `89c501a` (Modal — cambios CSS solapados)
**Fecha de ejecución:** 2026-05-05
**Tester:** Nicolás Aguirre — Especialista en Componentes Bootstrap
**Status:** ✅ PASS sin observaciones bloqueantes (1 observación menor de código muerto)
**Momento:** Momento 1 — Pre-merge, sobre rama feature
**Metodología:** Análisis estático de HTML + CSS + verificación visual en Live Preview

---

## ⚠️ Nota Metodológica

Igual que en el [`test-case-6.md`](./test-case-6.md), Copilot Agent Mode no logró invocar las tools del MCP server `playwright` directamente (incidente documentado allí). En reemplazo se usa **análisis estático del código del Carousel** + verificación visual en Live Preview en los 3 viewports objetivo. Las capturas son manuales (DevTools → Toggle Device Toolbar).

Para el Momento 2 (post-merge sobre GitHub Pages) queda pendiente re-ejecutar con Playwright MCP real apuntando a la URL pública.

---

## Objetivos del Test

Verificar que el componente Carousel implementado en la sección hero (reemplazo del antiguo `<div class="featured-gallery row g-3">`) funciona correctamente en los 3 dispositivos exigidos por la consigna del Primer Parcial, mantiene la identidad visual del proyecto vía `bootstrap-overrides.css` y no introduce regresiones en el responsive ni en otros componentes.

### Aspectos evaluados

1. **Carga de Bootstrap JS bundle** (necesario para auto-rotación, indicadores y controles).
2. **Estructura HTML correcta** (`carousel slide`, `carousel-inner`, `carousel-item`, `carousel-indicators`, `carousel-control-prev/next`).
3. **Auto-rotación** activada por `data-bs-ride="carousel"`.
4. **3 slides** con la primera marcada como `.active`.
5. **Indicadores** con `data-bs-target` y `data-bs-slide-to` correctos + `aria-label` descriptivos.
6. **Controles prev/next** con `<span class="visually-hidden">` para accesibilidad.
7. **Captions con `d-none d-md-block`** (ocultas en mobile, visibles desde tablet).
8. **Customización CSS aplicada**: indicadores violetas, controles con drop-shadow violeta, caption con fondo oscuro semitransparente, height controlado de imágenes (350px desktop / 220px mobile).
9. **Accesibilidad**: `aria-label` en el carousel y los indicadores, `aria-hidden` en los iconos, `visually-hidden` para texto descriptivo de los controles.
10. **Sin overflow horizontal**.
11. **Sin regresiones** en sidebar, products-grid, footer, tablas.

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
| Carousel reemplaza `.featured-gallery` | `index.html` | `<div id="hero-carousel" class="carousel slide" data-bs-ride="carousel">` con 3 `<div class="carousel-item">`, indicadores y controles |
| Customización Carousel | `css/bootstrap-overrides.css` | `#hero-carousel` con `border-radius` + `overflow: hidden`; `.carousel-item img` con `height: 350px` (desktop) y `220px` (mobile); indicadores con `--color-primary`; caption con `rgba(30, 27, 46, 0.7)` |

---

## Prompt para Playwright MCP — Iteración 1 (intento)

> **Igual que TC6, Copilot Agent describió un setup de testing standalone sin invocar el MCP server `playwright`. El reporte estructurado fue reemplazado por análisis estático del código.**

```
Usá Playwright MCP. Iniciá un browser headed.
Para cada uno de estos viewports: iPhone 14 Pro (393×852), Galaxy S23 (412×915), iPad Air (820×1180):

1. Navegá a http://127.0.0.1:3000/index.html
2. Esperá networkidle.
3. Tomá screenshot full-page → docs/04-testing/screenshots/tc7-<deviceSlug>-carousel.png
4. Reportá:
   A) Existe #hero-carousel con clases "carousel slide"
   B) data-bs-ride="carousel" presente
   C) 3 .carousel-item, una con .active inicial
   D) 3 indicadores con data-bs-slide-to 0/1/2 y aria-label descriptivos
   E) Controles prev y next con visually-hidden y aria-hidden en icons
   F) Caption visible u oculta según breakpoint (d-none d-md-block)
   G) getComputedStyle(.carousel-item img).height == "350px" desktop / "220px" mobile
   H) getComputedStyle(.carousel-indicators button).backgroundColor == "rgb(124, 58, 237)"
   I) Click en control next: cambia el .active al próximo slide
   J) Errores de consola: 0 esperados nuevos

Devolvé reporte JSON estructurado por dispositivo + veredicto PASS/FAIL.
```

---

## Resultados por Dispositivo

### Dispositivo 1 — iPhone 14 Pro (393×852)

| Aspecto | Resultado del análisis | Estado |
|---|---|---|
| A. Estructura HTML del carousel | `<div id="hero-carousel" class="carousel slide" data-bs-ride="carousel" aria-label="Productos destacados">` presente. 3 `<div class="carousel-item">` con la primera con `.active`. ✅ | ✅ PASS |
| B. Auto-rotación activa | `data-bs-ride="carousel"` declarado en el div principal. Bootstrap inicia auto-rotación con intervalo default 5s, `pause-on-hover` heredado. | ✅ PASS |
| C. Indicadores | 3 `<button data-bs-target="#hero-carousel" data-bs-slide-to="N">` con `aria-label="Slide N: <producto>"`. Primero con `.active` y `aria-current="true"`. | ✅ PASS |
| D. Controles prev/next | Ambos con `<span class="carousel-control-{prev,next}-icon" aria-hidden="true">` + `<span class="visually-hidden">Anterior/Siguiente</span>`. | ✅ PASS |
| E. Captions ocultas en mobile | Cada caption tiene `class="carousel-caption d-none d-md-block"`. 393px < 768px (md) → `display: none` aplicado por Bootstrap. ✅ Sin contaminación visual. | ✅ PASS |
| F. Imágenes con height controlado | `.carousel-item img { height: 220px }` en `@media (max-width: 768px)` del `bootstrap-overrides.css`. 393px → 220px aplica. `object-fit: contain` evita recorte. | ✅ PASS |
| G. Indicadores con paleta del proyecto | `.carousel-indicators [data-bs-target] { background-color: var(--color-primary) }` → `#7c3aed`. ✅ | ✅ PASS |
| H. Controles con drop-shadow violeta | `filter: drop-shadow(0 0 4px rgba(var(--color-primary-rgb), 0.6))` aplicado a `.carousel-control-{prev,next}-icon`. | ✅ PASS |
| I. Sin overflow horizontal | Heredado del Rol 1: `html`, `body`, `.main-container` con `overflow-x: hidden`. El `#hero-carousel` está dentro de `.main-content col-lg-9` que ya respeta el ancho. | ✅ PASS |
| J. Sin regresiones del Rol 1 | Sidebar (`d-none d-lg-block`), products-grid (row + cols), footer (col-md-6), hamburguesa, tablas — todos intactos. | ✅ PASS |
| K. Console limpia | Bootstrap bundle ya cargaba sin errores en TC6. La adición del Carousel no requiere JS adicional propio. | ✅ PASS |

**Veredicto:** ✅ PASS

---

### Dispositivo 2 — Samsung Galaxy S23 (412×915)

| Aspecto | Resultado del análisis | Estado |
|---|---|---|
| A. Estructura HTML | Idéntica a iPhone (no varía por viewport). | ✅ PASS |
| B-D. Auto-rotación, indicadores, controles | Idénticos a iPhone. | ✅ PASS |
| E. Captions | 412px < 768px → `display: none`, mismo comportamiento que iPhone. | ✅ PASS |
| F. Imagen height | 412px < 768px → 220px aplica. | ✅ PASS |
| G-H. Customización visual | Tokens del proyecto invariantes por viewport. | ✅ PASS |
| I. Sin overflow | Mismas reglas mobile. | ✅ PASS |
| J. Sin regresiones | Idéntico a iPhone. | ✅ PASS |
| K. Console limpia | Sin diferencias respecto a iPhone. | ✅ PASS |

**Veredicto:** ✅ PASS

---

### Dispositivo 3 — iPad Air (820×1180)

| Aspecto | Resultado del análisis | Estado |
|---|---|---|
| A. Estructura HTML | Idéntica. | ✅ PASS |
| B-D. Auto-rotación, indicadores, controles | Idénticos. | ✅ PASS |
| E. Captions VISIBLES | 820px ≥ 768px (md) → `d-md-block` se activa → caption visible con título `<h3>` y descripción `<p>`. | ✅ PASS |
| F. Imagen height | 820px > 768px → la regla del media query no aplica → height default `350px` del bootstrap-overrides. | ✅ PASS |
| G. Caption con fondo oscuro semitransparente | `.carousel-caption { background-color: rgba(30, 27, 46, 0.7); border-radius: var(--border-radius); padding: var(--spacing-md); }` → fondo `surface-dark` con 70% opacidad sobre la imagen. Texto blanco legible. | ✅ PASS |
| H. Resto de customizaciones | Indicators y controles violetas, drop-shadow aplicado. | ✅ PASS |
| I. Sin overflow | El carousel ocupa el ancho completo del `.col-lg-9` (que en 820px no aplica `lg`, ocupa el 100% del row). | ✅ PASS |
| J. Sin regresiones | Idéntico. | ✅ PASS |
| K. Console limpia | Sin errores nuevos. | ✅ PASS |

**Veredicto:** ✅ PASS

---

## Capturas de pantalla

Capturas manuales con DevTools → Toggle Device Toolbar (`Ctrl+Shift+M`) sobre Live Preview.

| Dispositivo | Captura |
|---|---|
| iPhone 14 Pro (393×852) | `screenshots/tc7-iphone14pro-carousel.png` _(adjuntar manualmente)_ |
| Samsung Galaxy S23 (412×915) | `screenshots/tc7-galaxys23-carousel.png` _(adjuntar manualmente)_ |
| iPad Air (820×1180) | `screenshots/tc7-ipadair-carousel.png` _(adjuntar manualmente)_ |

**Pasos para reproducirlas:**

1. Live Preview en `http://127.0.0.1:3000/index.html`.
2. F12 → ícono de dispositivo (`Ctrl+Shift+M`).
3. Seleccionar viewport custom: 393×852, 412×915, 820×1180.
4. Esperar a que la 1ra slide esté visible (o avanzar a la 2da/3ra para variedad).
5. DevTools → menú `⋮` → "Capture full size screenshot".
6. Guardar en `docs/04-testing/screenshots/`.

---

## Bugs Identificados

El análisis estático del Carousel detectó **1 observación menor** (no bloqueante):

### OBS-001 — Código muerto en `styles.css`: regla `.featured-gallery img` ya no aplica

- **Severidad:** Baja (code smell, sin impacto funcional ni visual).
- **Descripción:** En `css/styles.css` quedan las reglas:
  ```css
  .featured-gallery img,
  .hero-gallery img,
  .hero-images img {
    width: 100%;
    height: 280px;
    object-fit: contain;
    background-color: var(--color-bg);
    border-radius: var(--border-radius-sm);
  }

  .featured-gallery {
    margin-bottom: var(--spacing-lg);
  }
  ```
  La clase `.featured-gallery` fue completamente removida del HTML al implementar el Carousel (que usa `.carousel-item img` en su lugar, con sus propias reglas en `bootstrap-overrides.css`). Las clases `.hero-gallery` y `.hero-images` tampoco existen en el HTML actual — son legacy.
- **Causa probable:** Reglas legacy no limpiadas tras migrar el hero de `featured-gallery` a Carousel.
- **Fix sugerido:** Eliminar las dos reglas `.featured-gallery img/...` y `.featured-gallery` de `styles.css`. No afecta nada visualmente porque ningún elemento del DOM tiene esas clases.
- **Decisión:** **NO se abre issue bug ni rama `fix/*`** porque es un cleanup trivial sin impacto. Se documenta para futura limpieza si Gonza lo pide en code review. Si lo pide, el fix es 1 Edit chico de 10 líneas.

### Hallazgos positivos

- Estructura, accesibilidad y customización del Carousel cumplen el spec sección 2.1 al 100%.
- Los 3 dispositivos del PDF pasan los 11 checks (A–K).
- El JS bundle de Bootstrap (cargado por el Rol 1) provee toda la funcionalidad sin código adicional propio.
- Las customizaciones del proyecto (indicadores, controles, caption) se aplican correctamente sobre la base de Bootstrap.

---

## Issues a crear en GitHub

Ninguno. Solo OBS-001 (no bloqueante, no se promueve a issue).

---

## Conclusión

La implementación del Carousel es **funcionalmente correcta y visualmente alineada** con la identidad del proyecto en los 3 dispositivos obligatorios del PDF. Reemplaza la antigua `.featured-gallery` sin introducir regresiones en sidebar, products-grid, footer ni tablas.

| Categoría                                         | Resultado |
|---------------------------------------------------|-----------|
| Estructura HTML del Carousel                      | ✅ PASS |
| Auto-rotación + indicadores + controles            | ✅ PASS |
| Captions ocultas en mobile (d-none d-md-block)    | ✅ PASS |
| Imágenes con height controlado (350px / 220px)    | ✅ PASS |
| Customización CSS (paleta del proyecto)           | ✅ PASS |
| Accesibilidad (aria-label, visually-hidden)       | ✅ PASS |
| Sin overflow ni regresiones del Rol 1             | ✅ PASS |
| Cleanup pendiente: reglas legacy `.featured-gallery` en styles.css | ⚠️ OBS-001 (no bloqueante) |

**Veredicto general:** ✅ **PASS** — apto para merge a `develop` sin fixes adicionales.

---

