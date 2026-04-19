# Testing Doc — Actividad Obligatoria N°2

**Proyecto:** PC Hardware E-commerce  
**Repositorio:** [GonzaloBarbano/E-commerce](https://github.com/GonzaloBarbano/E-commerce)  
**URL de producción:** https://gonzalobarbano.github.io/E-commerce/

---

## Índice de test cases

- [Test Case 1 — Compatibilidad en navegadores desktop](./test-case-1.md)
- [Test Case 2 — Responsive en dispositivos móviles y tablet](./test-case-2.md)
- [Test Case 3 — Performance y carga](./test-case-3.md)
- [Test Case 4 — Accesibilidad web (WCAG 2.1 AA)](./test-case-4.md)
- [Test Case 5 — Validación de estructura HTML semántica y CSS](./test-case-5.md)

---

## Resumen general

Este documento centraliza los resultados de testing ejecutados en dos momentos:

- **Momento 1**: testing pre-merge sobre ramas `feature/` (entorno local y análisis estático)
- **Momento 2**: testing post-merge sobre `develop` → GitHub Pages ([gonzalobarbano.github.io/E-commerce](https://gonzalobarbano.github.io/E-commerce/))

---

## Resumen de issues — Momento 1

| Issue       | Título                                                    | Tipo de hallazgo         | Responsable | Estado               |
| ----------- | --------------------------------------------------------- | ------------------------ | ----------- | -------------------- |
| BUG-01      | `responsive.css` no carga — MIME type error               | CSS / Servidor local     | Frontend    | Cerrado              |
| BUG-02      | 9 imágenes de productos retornan 404                      | Assets faltantes         | Frontend    | Parcialmente cerrado |
| BUG-03      | Navbar sin color de fondo (transparente)                  | CSS visual               | Frontend    | Cerrado              |
| BUG-001     | Menú hamburguesa ausente en mobile/tablet                 | Responsive / JS          | Frontend    | Cerrado              |
| DEF-01      | Jerarquía de encabezados H1→H3 en sidebar (heading-order) | Accesibilidad WCAG 2.4.6 | Frontend    | Cerrado              |
| W-1         | `h1` usado como texto del logo dentro de `<a>`            | HTML semántico / SEO     | Frontend    | Cerrado              |
| Performance | `@import` Google Fonts bloquea el renderizado             | Performance CSS          | Frontend    | Abierto              |

---

## Resumen de issues — Momento 2

| Issue   | Título                                                                         | Tipo de hallazgo         | Responsable | Estado  |
| ------- | ------------------------------------------------------------------------------ | ------------------------ | ----------- | ------- |
| BUG-05  | 3 imágenes de hero/banner siguen en 404 en producción                          | Assets faltantes         | Frontend    | Abierto |
| BUG-04  | favicon.ico no encontrado en GitHub Pages                                      | Asset menor              | Frontend    | Abierto |
| BUG-004 | Botón hamburguesa con dimensiones 4×4px en tablet (820px)                      | CSS responsive           | Frontend    | Abierto |
| DEF-03  | `aria-label` prohibido en `<div>` sin role (regresión)                         | Accesibilidad WCAG 4.1.2 | Frontend    | Abierto |
| DEF-04  | `h1 visually-hidden` fuera de landmark (regresión)                             | Accesibilidad WCAG 1.3.1 | Frontend    | Abierto |
| M2-E1   | `<header>` cierre prematuro — nav y logo fuera del landmark                    | HTML semántico           | Frontend    | Abierto |
| M2-E2   | `<div class="main-content">` cierra en línea de apertura — secciones huérfanas | HTML semántico           | Frontend    | Abierto |
| M2-E3   | Tabla comparativa huérfana — `caption/thead/tbody` fuera de `<table>`          | HTML semántico           | Frontend    | Abierto |

---

## Observaciones

### Momento 1 — Pre-merge sobre ramas `feature/`

- **TC1** — Compatibilidad visual en navegadores desktop sobre la rama `feature/dev-frontend-css-add-styles`  
  Resultado: **FAIL CON OBSERVACIONES**  
  Hallazgos principales: `responsive.css` bloqueado por MIME type error (Live Server sirve 404 HTML en lugar del CSS), 9 imágenes retornan 404, navbar con background transparente en lugar de `#1E1B2E`. La estructura HTML semántica y los estilos base (`styles.css`, `components.css`) son correctos.  
  Issues asociados: BUG-01, BUG-02, BUG-03 (abiertos en Momento 1, cerrados o parcialmente resueltos en Momento 2)

- **TC2** — Responsive en dispositivos móviles y tablet sobre la rama `feature/responsive-design-add-responsive-styles`  
  Resultado: **PARCIALMENTE APROBADO**  
  Hallazgo crítico: menú hamburguesa ausente — el `<nav>` no colapsa en ningún breakpoint, sin botón ni script toggle (`<!-- TODO: JS: Agregar menú hamburguesa -->` sin implementar). Grid de productos, sidebar, tipografía y media queries base son correctos.  
  Issue asociado: BUG-001 (**cerrado en Momento 2**)

- **TC3** — Performance y carga sobre la rama `feature/dev-frontend-css-and-styles`  
  Resultado: **FALLA**  
  9/9 imágenes con HTTP 404 impiden evaluación visual completa. `@import` de Google Fonts en `styles.css` genera cadena de requests bloqueantes (+150–400ms estimado). Métricas de tiempo (DOMContentLoaded, FCP) pendientes de captura con Chrome DevTools.  
  Issues asociados: BUG-02 (assets), issue de performance por `@import` (abierto)

- **TC4** — Accesibilidad web sobre la rama `feature/dev-frontend-css-add-styles`  
  Resultado: **APROBADO CON OBSERVACIONES**  
  1 violación axe-core: `heading-order` — salto H1→H3 en sidebar (WCAG 2.4.6, impacto moderado). Contraste de botones 18.26:1 ✅, 9/9 imágenes con `alt` descriptivo ✅, landmarks e inputs con ARIA correctos ✅.  
  Issue asociado: DEF-01 (**cerrado en Momento 2**)

- **TC5** — Validación de estructura HTML semántica y CSS sobre la rama `feature/dev-frontend-css-add-styles`  
  Resultado: **PASS con warnings — sin errores críticos de sintaxis**  
  0 errores de sintaxis HTML5. 6 warnings: W-1 (`h1` como logo), W-2 (`h3` dentro de `nav` en sidebar), W-3 (`div.main-content` sin landmark semántico), W-4 (`h3` suelto en `#nosotros`), W-5 (`fieldset` anidado), W-6 (`figure` sin `figcaption`). El documento superaría la validación W3C sin errores.

---

### Momento 2 — Post-merge sobre `develop` (GitHub Pages)

- **TC1** — Compatibilidad visual en navegadores desktop  
  Resultado: **PASS estructural / FAIL parcial en recursos**  
  `responsive.css` resuelto: carga correctamente en GitHub Pages con 11 reglas (el error de MIME era exclusivo del entorno local). Navbar con `#1E1B2E` correcto en runtime. 6/9 imágenes de productos cargan; 3 imágenes de la sección hero persisten en 404. Errores de consola reducidos de 10 a 4.  
  Issues nuevos: BUG-04 (favicon 404), BUG-05 (3 imágenes hero)

- **TC2** — Responsive en dispositivos móviles y tablet  
  Resultado: **PARCIALMENTE APROBADO**  
  BUG-001 (hamburguesa ausente) y BUG-002 (overflow horizontal) resueltos: `.hamburger-btn` presente y funcional, `scrollWidth === viewportWidth` confirmado en 393px y 412px.  
  Hallazgos nuevos: BUG-003 (3 imágenes hero en 404, afecta todos los dispositivos) y BUG-004 (botón hamburguesa con dimensiones computadas 4×4px en viewport 820px — bajo riesgo funcional pero CSS inconsistente).

- **TC3** — Performance y carga  
  Resultado: **APROBADO CON OBSERVACIONES**  
  Métricas dentro de umbrales aceptables: DOMContentLoaded 686ms (≤800ms ✅), Load Event 863ms (≤1500ms ✅), First Contentful Paint 0.5s (≤1000ms ✅), Google Fonts 167ms (≤300ms ✅), 17 requests totales (<20 ✅). Persiste el `@import` de Google Fonts como bloqueante (recomendación R1 no implementada). Las 3 imágenes hero en 404 generan latencia de red innecesaria.

- **TC4** — Accesibilidad web  
  Resultado: **APROBADO CON OBSERVACIONES**  
  DEF-01 (heading-order) resuelto: jerarquía H1→H2→H3 correcta en todo el documento. Se introdujeron 2 regresiones: DEF-03 (`aria-label` en `<div class="main-content">` sin role, WCAG 4.1.2, impacto serio) y DEF-04 (`h1 visually-hidden` sin CSS estándar de ocultamiento accesible, WCAG 1.3.1). DEF-02 (skip link) persiste sin resolver desde Momento 1. Se detectaron 7 mejoras positivas de accesibilidad introducidas en el merge.

- **TC5** — Validación de estructura HTML semántica y CSS  
  Resultado: **FAIL — 3 errores de sintaxis graves**  
  El merge introdujo 3 errores nuevos de sintaxis HTML: M2-E1 (cierre prematuro de `<header>` — nav y logo quedan fuera del landmark), M2-E2 (cierre prematuro de `<div class="main-content">` — secciones `#inicio`, `#tienda` y `#carrito` huérfanas), M2-E3 (tabla comparativa con `<caption>`, `<thead>` y `<tbody>` fuera del contexto `<table>`). W-1, W-2 y W-6 del Momento 1 correctamente resueltos. Regresión semántica M2-W1 (`<h2>` en `<aside>` donde correspondía `<h3>`).  
  **Recomendación:** ❌ No liberar a release hasta corregir M2-E1, M2-E2 y M2-E3. Son errores de HTML inválido que rompen el layout CSS y la semántica del documento.

---

## Estado final por test case

| TC  | Nombre                    | Momento 1                     | Momento 2                       |
| --- | ------------------------- | ----------------------------- | ------------------------------- |
| TC1 | Compatibilidad desktop    | ⚠️ FAIL con observaciones     | ⚠️ PASS parcial en recursos     |
| TC2 | Responsive mobile/tablet  | ❌ PARCIALMENTE APROBADO      | ⚠️ PARCIALMENTE APROBADO        |
| TC3 | Performance y carga       | ❌ FALLA                      | ⚠️ APROBADO CON OBSERVACIONES   |
| TC4 | Accesibilidad WCAG 2.1 AA | ⚠️ APROBADO CON OBSERVACIONES | ⚠️ APROBADO CON OBSERVACIONES   |
| TC5 | HTML semántico y CSS      | ⚠️ PASS con warnings          | ❌ FAIL — 3 errores de sintaxis |
