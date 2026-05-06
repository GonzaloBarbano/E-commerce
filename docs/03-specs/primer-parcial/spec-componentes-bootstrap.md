# Especificación Técnica: Especialista en Componentes Bootstrap — Primer Parcial

- **Rol:** Especialista en Componentes Bootstrap
- **Usuario de GitHub:** @Naguirre0102
- **Rama:** `feature/esp-com-bootstrap-add-component`
- **Issue principal:** [#96](https://github.com/GonzaloBarbano/E-commerce/issues/96)
- **Objetivo Principal:** Implementar dos componentes avanzados de Bootstrap 5.3 sobre la base de migración del Rol 1 (Frontend/Bootstrap, PR #93 mergeado): un **Carousel** que reemplaza la galería de productos destacados del hero, y un **Modal** que muestra el detalle de cada producto al click en su card.

---

## 1. Meta y Contexto

**Qué se va a hacer:**
Sumar dos componentes Bootstrap funcionales y customizados al e-commerce PC-Hardware, manteniendo la paleta y tipografía del proyecto a través de `bootstrap-overrides.css`. Ambos componentes se eligieron por encajar con el contexto del e-commerce y por su alta visibilidad en la página principal.

**Por qué:**
La consigna del Primer Parcial exige al menos dos componentes Bootstrap avanzados (sección 3.1.3 del PDF). Carousel y Modal:
- Son **funcionalmente significativos** para un e-commerce (no decorativos).
- Tienen **alta visibilidad**: ambos se ven en la página principal sin navegar.
- Demuestran **integración real con el JS bundle de Bootstrap** (no solo clases utilitarias estáticas).
- **No conflictan** con los componentes HTML avanzados implementados por el Rol de @LucasFUces (`<details>/summary>`, `<datalist>`, `<input type="range">`).

**Limitación de alcance:**
Este rol **no toca**: navbar (queda como custom checkbox-hack del Rol 1), grilla del layout (responsabilidad del Rol Frontend/Bootstrap, ya cerrada con PR #93), tablas (también del Rol 1).

---

## 2. MOMENTO 1 — ANTES de comenzar (Planificación)

### 2.1 Componentes elegidos y justificación técnica

#### Componente 1 — Carousel

**Reemplaza** `<div class="featured-gallery row g-3">` actual (3 `<figure class="gallery-item col-12 col-md-6 col-lg-4">` con imágenes estáticas) en la sección `<section id="inicio" class="hero-section">`.

**Estructura propuesta:**

```html
<div id="hero-carousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="assets/images/gpu-destacada.jpg" class="d-block w-100" alt="NVIDIA RTX 4090">
      <div class="carousel-caption d-none d-md-block">
        <h3>NVIDIA RTX 4090</h3>
        <p>Tarjetas gráficas de última generación con 24GB GDDR6X.</p>
      </div>
    </div>
    <!-- 2 slides más: cpu-destacada.jpg, build-completo.jpg -->
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#hero-carousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#hero-carousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>
```

**Decisiones técnicas:**
- `data-bs-ride="carousel"` activa la auto-rotación (intervalo default 5s).
- `data-bs-pause="hover"` (heredado del default) pausa el slider al hover — UX mejorada.
- Las imágenes ya están referenciadas en el sitio: `gpu-destacada.jpg`, `cpu-destacada.jpg`, `build-completo.jpg`. Algunas tienen 404 documentados en BUG-05 (testing-doc.md) — fuera del scope de este rol.
- Captions ocultas en mobile (`d-none d-md-block`) para mejor legibilidad en pantallas chicas.
- Indicadores y controles personalizados en `bootstrap-overrides.css` con la paleta del proyecto.

#### Componente 2 — Modal

**Agrega** un modal compartido `#product-modal` al final del `<body>`, antes del `<script>` de Bootstrap. **Cada `.product-card` recibe** un botón "Ver detalle" que abre el modal con los datos de ese producto, leídos por JS desde `data-product-*` attributes.

**Estructura propuesta:**

```html
<!-- Modal compartido al final del body -->
<div class="modal fade" id="product-modal" tabindex="-1" aria-labelledby="product-modal-label" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="product-modal-label">Detalle del producto</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <img id="modal-product-image" src="" alt="" class="img-fluid mb-3">
        <p><strong>Marca:</strong> <span id="modal-product-brand"></span></p>
        <p><strong>Especificaciones:</strong> <span id="modal-product-specs"></span></p>
        <p><strong>Stock:</strong> <span id="modal-product-stock"></span></p>
        <p class="product-price"><span id="modal-product-price"></span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Agregar al Carrito</button>
      </div>
    </div>
  </div>
</div>
```

**Botón en cada card:**

```html
<button
  type="button"
  class="btn btn-outline-primary btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#product-modal"
  data-product-name="Intel Core i9-13900K"
  data-product-brand="Intel"
  data-product-specs="24 núcleos | 5.8 GHz Turbo"
  data-product-stock="12 unidades"
  data-product-price="$599.99 USD"
  data-product-image="assets/images/intel-i9-13900k.jpg"
>
  Ver detalle
</button>
```

**JS inline para rellenar el modal** (al final del body, antes del `<script>` de Bootstrap):

```html
<script>
  document.getElementById('product-modal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const data = button.dataset;
    document.getElementById('product-modal-label').textContent = data.productName;
    document.getElementById('modal-product-image').src = data.productImage;
    document.getElementById('modal-product-image').alt = data.productName;
    document.getElementById('modal-product-brand').textContent = data.productBrand;
    document.getElementById('modal-product-specs').textContent = data.productSpecs;
    document.getElementById('modal-product-stock').textContent = data.productStock;
    document.getElementById('modal-product-price').textContent = data.productPrice;
  });
</script>
```

**Decisiones técnicas:**
- **Un solo modal compartido** en lugar de 6 modales (uno por producto). Más mantenible: si se agrega un nuevo producto, solo hay que sumarle el botón con sus `data-product-*`. El modal único se rellena con `show.bs.modal`.
- **`modal-lg` + `modal-dialog-centered`**: tamaño cómodo para mostrar imagen + specs, centrado vertical para mejor UX en desktop.
- **Botón "Ver detalle" como `.btn-outline-primary btn-sm`**: secundario respecto al "Agregar al Carrito" principal, no compite visualmente.
- **Modal Footer con dos botones**: "Cerrar" outline-secondary + "Agregar al Carrito" primary. El segundo botón duplica la acción de la card pero es esperable en e-commerce.

### 2.2 Customización planeada en `css/bootstrap-overrides.css`

Sumar al archivo existente:

```css
/* ============================================
   CAROUSEL — controles e indicadores con paleta
   ============================================ */
.carousel-indicators [data-bs-target] {
  background-color: var(--color-primary);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: drop-shadow(0 0 4px rgba(var(--color-primary-rgb), 0.6));
}

.carousel-caption {
  background-color: rgba(30, 27, 46, 0.7);  /* surface-dark con opacidad */
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

/* ============================================
   MODAL — header con paleta del proyecto
   ============================================ */
.modal-header {
  background-color: var(--color-surface-dark);
  color: #ffffff;
  border-bottom: none;
}

.modal-header .btn-close {
  filter: invert(1);  /* Botón close blanco sobre header oscuro */
}

.modal-content {
  border-radius: var(--border-radius);
  border-color: var(--color-border);
}
```

### 2.3 Plan de testing — `test-case-7.md` (Carousel) y `test-case-8.md` (Modal)

Misma metodología que el TC6 del Rol 1: **análisis estático del HTML+CSS** + verificación visual en Live Preview, dado que Copilot Agent no logró invocar el MCP server `playwright` (incidente documentado en TC6 Nota Metodológica).

**TC7 — Carousel** verificará:
- Estructura HTML correcta (clases `carousel`, `carousel-inner`, `carousel-item`, `carousel-indicators`, `carousel-control-prev/next`).
- Auto-rotación con `data-bs-ride="carousel"`.
- Indicadores y controles con paleta del proyecto (override aplicado).
- Caption oculta en mobile (`d-none d-md-block`).
- Accesibilidad: `aria-label` en controles, `visually-hidden` para texto descriptivo.

**TC8 — Modal** verificará:
- Estructura HTML correcta (clases `modal fade`, `modal-dialog`, `modal-content`, `modal-header`, `modal-body`, `modal-footer`).
- Trigger `data-bs-toggle="modal"` + `data-bs-target="#product-modal"` en cada botón.
- 6 botones (uno por card) con `data-product-*` attributes completos.
- JS de relleno dinámico funcional (event `show.bs.modal`).
- Accesibilidad: `aria-labelledby`, `tabindex="-1"`, focus trap, dismiss con ESC.

**Dispositivos obligatorios** (PDF cátedra): iPhone 14 Pro (393×852), Samsung Galaxy S23 (412×915), iPad Air (820×1180).

### 2.4 Criterios de aceptación (Checklist)

**Documentación previa**
- [x] `spec-componentes-bootstrap.md` commiteado en `docs/03-specs/primer-parcial/` antes de cualquier cambio de código.
- [x] Issue [#96](https://github.com/GonzaloBarbano/E-commerce/issues/96) abierto, vinculado a la rama feature.

**Implementación Carousel**
- [x] `<div id="hero-carousel" class="carousel slide" data-bs-ride="carousel">` reemplaza completamente la `<div class="featured-gallery row g-3">` en la sección hero.
- [x] 3 slides con clase `.carousel-item` (1 con `.active` inicial).
- [x] Indicadores con `<button data-bs-target="#hero-carousel" data-bs-slide-to="N">` y `aria-label`.
- [x] Controles `prev` / `next` con `<button data-bs-target="#hero-carousel" data-bs-slide="prev|next">` y texto `visually-hidden`.
- [x] Caption en cada slide con `<h3>` + `<p>` (oculta en mobile con `d-none d-md-block`).

**Implementación Modal**
- [x] Modal compartido `<div class="modal fade" id="product-modal" tabindex="-1">` al final del body, antes del `<script>` de Bootstrap.
- [x] `modal-dialog` con clases `modal-lg` y `modal-dialog-centered`.
- [x] Botón "Ver detalle" agregado en cada una de las 6 `.product-card` con `data-bs-toggle="modal"`, `data-bs-target="#product-modal"` y los 6 `data-product-*` attributes.
- [x] JS inline (~12 líneas) que escucha `show.bs.modal` y rellena los campos del modal con los `data-*` del botón disparador.
- [x] Modal Footer con dos botones: "Cerrar" (`btn-outline-secondary`) y "Agregar al Carrito" (`btn-primary`).

**Customización en `bootstrap-overrides.css`**
- [x] Indicadores del carousel con `background-color: var(--color-primary)`.
- [x] Caption con fondo `rgba(30, 27, 46, 0.7)` (surface-dark con opacidad).
- [x] Modal header con `background-color: var(--color-surface-dark)` y texto blanco.
- [x] `.btn-close` del modal con `filter: invert(1)` para contrastar con el header oscuro.

**Coherencia con Rol 1**
- [x] No se rompe el sistema de columnas del layout.
- [x] No se introducen regresiones en sidebar, products-grid, footer ni tablas.
- [x] No se modifica la lógica del navbar custom (checkbox-hack).
- [x] Los `<details>/summary>` de Lucas en las product-cards permanecen intactos.

**QA y entregables del rol**
- [x] `docs/04-testing/test-case-7.md` (Carousel) documentado con análisis estático en los 3 dispositivos del PDF.
- [x] `docs/04-testing/test-case-8.md` (Modal) documentado con la misma metodología.
- [x] `docs/04-testing/testing-doc.md` actualizado con TC7 y TC8 en el índice.
- [x] Análisis del TC7/TC8 sin hallazgos bloqueantes — solo OBS-001 (TC7, code muerto en `styles.css`) y OBS-001/OBS-002 (TC8, observaciones informativas) que **no se promueven a issue bug** por baja severidad. Documentado dentro de cada test case y en sección 3.4 de este spec.
- [ ] PR `feature/esp-com-bootstrap-add-component` → `develop` creado con la plantilla `feature-template.md`.
- [ ] Entrada del PR registrada en `changelog.md` con link y descripción del aporte.

---

## 3. MOMENTO 2 — AL CERRAR la tarea (Evidencia)

### 3.1 Prompts utilizados con Copilot Agent Mode

Tras el incidente documentado en el TC6 del Rol 1 (Copilot Agent describió un test runner standalone sin invocar realmente el MCP server `playwright`), para el Rol 2 se decidió **no depender de Copilot Agent para la implementación** y se usó la planificación detallada del Momento 1 (sección 2.1) como spec ejecutable. El único uso del agente en este rol fue intentar — sin éxito — invocar Playwright MCP para los TC7 y TC8 con el siguiente prompt:

```
Usá Playwright MCP. Iniciá un browser headed.
Para cada uno de estos viewports: iPhone 14 Pro (393×852), Galaxy S23 (412×915), iPad Air (820×1180):
1. Navegá a http://127.0.0.1:3000/index.html
2. Tomá screenshot de la página y del modal abierto (click en "Ver detalle").
3. Verificá: estructura del Carousel y Modal, customizaciones CSS, accesibilidad,
   sin overflow, console limpia.
Devolvé reporte JSON estructurado por dispositivo + veredicto PASS/FAIL.
```

El intento fue idéntico al de TC6: Copilot describió un setup de testing sin escribirlo a disco ni invocar las MCP tools. Por eso los TC7 y TC8 también se resolvieron con análisis estático.

### 3.2 Resultado obtenido (implementación manual)

Como no hubo output útil de IA, los componentes se implementaron manualmente siguiendo el spec del Momento 1 al pie de la letra. La estructura final coincide con la planificada:

- **Carousel** (commit `caa30c4`): `<div id="hero-carousel" class="carousel slide" data-bs-ride="carousel">` con 3 slides + indicadores + controles + captions, exactamente como el spec sección 2.1.
- **Modal** (commit `89c501a`): modal compartido al final del body + 6 botones "Ver detalle" en las cards (envueltos en `<div class="d-grid gap-2">` junto a "Agregar al Carrito") + script inline de relleno.
- **Overrides CSS**: agregados a `css/bootstrap-overrides.css` después de la sección de TABLES preexistente. Total 60 líneas nuevas.

### 3.3 Ajustes manuales realizados durante la implementación

| Sub-paso | Commit | Cambios |
|---|---|---|
| 1a | `caa30c4` "Implemento Carousel para hero - reemplaza featured-gallery" | `index.html`: bloque `<div class="featured-gallery row g-3">` con 3 figures reemplazado por `<div id="hero-carousel" class="carousel slide" data-bs-ride="carousel" aria-label="Productos destacados">` con indicadores, slides (con `aria-current` en el activo), controles prev/next con `visually-hidden`, captions `d-none d-md-block`. `bootstrap-overrides.css`: nueva sección CAROUSEL con `#hero-carousel` (border-radius, overflow hidden, margin), `.carousel-item img` (height 350px desktop / 220px mobile vía media query, object-fit contain), indicadores violetas, caption con fondo `rgba(30, 27, 46, 0.7)`. |
| 1b | `89c501a` "Implemento Modal compartido con Ver detalle en cada card" | `index.html`: en cada una de las 6 product-cards, los botones quedaron envueltos en `<div class="d-grid gap-2">` con un nuevo botón `<button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#product-modal" data-product-{name,brand,specs,stock,price,image}>` arriba del `<button class="btn-add-cart">`. Modal compartido `<div class="modal fade" id="product-modal">` con `modal-lg modal-dialog-centered`, header/body/footer, agregado al final del `<body>` antes del `<script>` de Bootstrap. Script inline `<script>` (~12 líneas) que escucha `show.bs.modal` y rellena 7 elementos del modal (label, image src+alt, brand, specs, stock, price). `bootstrap-overrides.css`: nueva sección MODAL con header oscuro (`--color-surface-dark`), `.btn-close` con `filter: invert(1)`, `.modal-content` con border-radius del proyecto, `.modal-body img` con `max-height: 280px` y `object-fit: contain`. |

**Decisiones técnicas tomadas durante los ajustes:**

- **Wrapper `.d-grid gap-2` en cada card** en lugar de poner los dos botones inline o uno full-width custom. Razón: aprovechar las utilidades de Bootstrap para layout consistente, mantener el `.btn-add-cart` legacy intacto sin tener que tocar `components.css`.
- **Un solo modal compartido** en lugar de 6 modales individuales. Razón: escalabilidad — agregar un 7° producto solo requiere copiar la card con sus `data-product-*` correctos, sin duplicar markup del modal.
- **Script inline al final del body** (no en archivo separado). Razón: una sola feature, 12 líneas, no justifica fragmentar más el árbol de archivos. El orden (después del modal HTML, antes del bundle JS) garantiza que los elementos referenciados por `getElementById` ya existan cuando el listener se registra.
- **Atributo `aria-label="Productos destacados"`** en el div principal del Carousel para anunciar la sección al lector de pantalla, complementario a los `aria-label` específicos de cada slide en sus indicadores.
- **`max-height: 280px`** en la imagen del modal-body (en lugar de `height` fijo) para preservar el aspect ratio natural si la imagen es más chica.

### 3.4 Hallazgos de los TC7 y TC8 e issues abiertas

| TC | Tipo | Severidad | Descripción | Acción |
|---|---|---|---|---|
| TC7 | OBS-001 | Baja (code smell) | Reglas legacy `.featured-gallery img` y `.featured-gallery` en `styles.css` ya no aplican a ningún elemento del DOM tras el reemplazo por Carousel. | **No se promueve a issue.** Documentado en TC7 sección "Bugs Identificados". Cleanup trivial sin impacto que puede hacerse en futura iteración si Gonza lo pide en review. |
| TC8 | OBS-001 | Informativa | `<p class="product-price">` dentro del modal-body hereda `color: var(--color-primary)` y `font-size: var(--font-size-price)` de `components.css`. | Comportamiento **deseado** — el precio en el modal se muestra grande y violeta, igual que en la card. No es bug. |
| TC8 | OBS-002 | Baja (deuda futura) | Botón "Agregar al Carrito" del modal-footer es decorativo (sin lógica de carrito todavía). | Sin acción para este parcial. Se atará la lógica cuando se implemente el carrito en una iteración futura. |

**Total de issues bug abiertos en el Rol 2: 0.** Las 3 observaciones documentadas son no bloqueantes y no requieren rama `fix/*`.

### 3.5 Obstáculos y resoluciones

1. **Copilot Agent no logró invocar las MCP tools `playwright/browser_*`** (mismo patrón que TC6). **Resolución:** ejecutar todo el rol con análisis estático del código + verificación visual en Live Preview, replicando metodología del TC6. Los TC7 y TC8 quedan listos para re-ejecutarse con Playwright MCP real en el Momento 2 (post-merge sobre GitHub Pages).

2. **Coexistencia con `<details>/summary>` de Lucas en las product-cards.** Lucas (rol HTML Avanzados, PR #85) ya había agregado un `<details class="product-specs-details">` en cada `.product-info`, justo antes del `<button class="btn-add-cart">`. Riesgo: que el botón "Ver detalle" del Modal duplique conceptualmente lo que muestra el `<details>`. **Resolución:** diseñar el Modal para mostrar info **complementaria** (imagen ampliada + datos clave en formato grande) en lugar de las specs técnicas que ya están en el `<details>`. El usuario tiene dos accesos distintos: `<details>` para una vista rápida inline, Modal para una vista expandida con foco en la imagen y el precio.

3. **Decisión sobre el orden de los botones en cada card.** Tres alternativas evaluadas: (a) "Ver detalle" arriba + "Agregar al Carrito" abajo; (b) ambos en la misma fila lado a lado; (c) "Agregar al Carrito" como acción primaria arriba. **Resolución:** opción (a) — Ver detalle como `.btn-outline-primary btn-sm` arriba (acción secundaria/exploratoria), Agregar al Carrito como `.btn-add-cart` abajo (acción primaria de conversión). Justificación: mantiene la jerarquía visual del e-commerce (acción primaria al pie de la card) y el "Ver detalle" funciona como teaser que lleva al modal.

4. **Asegurar que el JS inline no rompa la accesibilidad.** El listener `show.bs.modal` modifica el `<h2 class="modal-title">` con `textContent` (no `innerHTML`), evitando inyección XSS. Bootstrap maneja el focus trap del modal de forma nativa. **Resolución sin obstáculo real**, pero documentado para referencia futura.

5. **Customización del `.btn-close` en el header oscuro.** El close button de Bootstrap es por default un SVG negro, lo que se ve invisible sobre fondo `--color-surface-dark`. **Resolución:** `filter: invert(1)` en `bootstrap-overrides.css` para invertir los colores del SVG y mostrarlo blanco. Solución estándar de Bootstrap docs.

---

## 4. Herramientas y entorno

- **Bootstrap 5.3.3** — CDN jsDelivr (CSS + JS bundle con Popper, ya cargado por el Rol 1).
- **Figma MCP** — para tomar el mockup actualizado por el Coordinador como contexto.
- **GitHub Copilot Agent Mode** — generación de boilerplate para Carousel y Modal.
- **Playwright MCP (`@playwright/mcp`)** — testing responsive contra `http://localhost:3000` (con fallback a análisis estático si el agente no logra invocar el MCP, replicando metodología del TC6).
- **GitHub MCP (`@modelcontextprotocol/server-github`)** — apertura de issues bug.
- **Editor:** Visual Studio Code o IDE Antigravity (ambos soportan `.vscode/mcp.json`).
- **Control de versiones:** Git + GitHub bajo GitFlow.

---

## 5. Referencias del proyecto

- Mockup actualizado a Bootstrap: [`docs/01-mockup/disenio-bootstrap.png`](../../01-mockup/) (commiteado por el Coordinador con doble extensión `.png.png`, no corregido al momento del rol).
- Spec del Coordinador: [`spec-devops.md`](./spec-devops.md).
- Spec del Rol 1 (Frontend/Bootstrap, base de este rol): [`spec-frontend-bootstrap.md`](./spec-frontend-bootstrap.md).
- Spec del Rol HTML Avanzados (Lucas): [`spec-html-avanzados.md`](./spec-html-avanzados.md).
- Test cases del Rol 1: [`test-case-6.md`](../../04-testing/test-case-6.md).
- Test cases del rol: [`test-case-7.md`](../../04-testing/test-case-7.md) (Carousel) y [`test-case-8.md`](../../04-testing/test-case-8.md) (Modal).
- Issue principal: [#96](https://github.com/GonzaloBarbano/E-commerce/issues/96).
- Commits del rol en la rama: `973bb21` (spec) → `caa30c4` (Carousel) → `89c501a` (Modal) → `4742649` (TC7 + TC8).
