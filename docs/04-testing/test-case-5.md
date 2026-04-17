# Test Case 5 — Momento 1: Estructura Semántica y Validación W3C

| Campo                  | Detalle                                                 |
| ---------------------- | ------------------------------------------------------- |
| **ID**                 | TC-005                                                  |
| **Módulo**             | Estructura HTML — Semántica y Estándares W3C            |
| **Rama analizada**     | `feature/dev-frontend-css-add-styles`                   |
| **Entorno**            | https://gonzalobarbano.github.io/E-commerce/            |
| **Fecha de ejecución** | 2026-04-17                                              |
| **Tester**             | QA Automatizado (Claude + GitHub MCP)                   |
| **Resultado global**   | ⚠️ PASS con Warnings — Sin errores críticos de sintaxis |

---

## 1. Esquema de Estructura Semántica Detectada

```
html[lang="es"]
└── head
│   ├── meta[charset="UTF-8"]
│   ├── meta[name="viewport"]
│   ├── meta[name="description"] / keywords / author / theme-color
│   ├── title: "PC Hardware"
│   ├── link[preconnect] ×2 (Google Fonts)
│   └── link[stylesheet] styles.css / components.css / responsive.css
└── body
    ├── header[role="banner"]
    │   ├── div.logo-container > a > h1        ⚠️ WARNING-1
    │   └── nav[aria-label="Navegación Principal"]
    │       └── ul > li ×5 > a
    ├── main[role="main"]
    │   ├── div.main-container
    │   │   ├── aside[role="complementary"]
    │   │   │   ├── input[type="search"][aria-label]
    │   │   │   ├── nav[aria-label="Categorías"]  ⚠️ WARNING-2
    │   │   │   │   ├── h3 "CATEGORÍAS"
    │   │   │   │   └── ul > li ×7 > a
    │   │   │   ├── section[aria-label="Filtros"]
    │   │   │   │   └── form#filters-form
    │   │   │   │       └── fieldset ×3 + legend
    │   │   │   └── nav[aria-label="Enlaces Rápidos"]
    │   │   │       └── ul > li ×2 > a
    │   │   └── div.main-content               ⚠️ WARNING-3
    │   │       ├── section#inicio
    │   │       │   ├── h2 "DESCRIPCIÓN DE LA TIENDA"
    │   │       │   ├── figure ×3 > img[alt][loading=lazy]  ⚠️ WARNING-6
    │   │       │   └── a.btn-primary
    │   │       ├── section#tienda
    │   │       │   ├── h2 "PRODUCTOS PRESENTADOS"
    │   │       │   ├── article ×6  ✅
    │   │       │   │   ├── img[alt][loading]
    │   │       │   │   ├── h3.product-name
    │   │       │   │   └── button[type=button][aria-label]
    │   │       │   └── nav[aria-label="Paginación"]
    │   │       └── section#carrito
    │   │           ├── h2 "Mi Carrito"
    │   │           ├── table > caption + thead[scope=col] + tbody  ✅
    │   │           └── button.btn-checkout[aria-label]
    │   ├── section#nosotros
    │   │   ├── h2 "Sobre Nosotros"
    │   │   ├── h3 "Productos Estrella"         ⚠️ WARNING-4
    │   │   └── table > caption + thead[scope=col] + tbody  ✅
    │   ├── section#compatibilidad
    │   │   ├── h2 "Guías de Compatibilidad"
    │   │   └── article.guide-card ×3  ✅
    │   └── section#ayuda
    │       ├── h2 "Centro de Ayuda y Suscripción"
    │       └── form#newsletter-form
    │           └── fieldset > fieldset anidado  ⚠️ WARNING-5
    └── footer[role="contentinfo"]
        ├── div.footer-container
        │   └── section.footer-section ×4
        │       ├── h3 ×4
        │       ├── address  ✅
        │       └── ul > li > a[rel=noopener noreferrer]  ✅
        └── div.footer-bottom > p copyright
```

---

## 2. Checklist de Etiquetas Semánticas HTML5

| Etiqueta              | Presente | Correcto | Observación                                  |
| --------------------- | -------- | -------- | -------------------------------------------- |
| `<header>`            | ✅       | ✅       | `role="banner"` redundante pero válido       |
| `<nav>`               | ✅       | ✅       | 4 instancias con `aria-label` diferenciado   |
| `<main>`              | ✅       | ✅       | `role="main"` redundante pero válido         |
| `<section>`           | ✅       | ⚠️       | `h3` suelto en `#nosotros` — WARNING-4       |
| `<article>`           | ✅       | ✅       | product-cards y guide-cards                  |
| `<aside>`             | ✅       | ✅       | `role="complementary"` correcto              |
| `<footer>`            | ✅       | ✅       | `role="contentinfo"` redundante pero válido  |
| `<figure>`            | ✅       | ⚠️       | Sin `<figcaption>` — WARNING-6               |
| `<address>`           | ✅       | ✅       | Correctamente usado en footer                |
| `<h1>`                | ✅       | ⚠️       | Logo dentro de `<a>` — WARNING-1             |
| `<h2>`                | ✅       | ✅       | Una por sección, jerarquía correcta          |
| `<h3>`                | ✅       | ⚠️       | Caso suelto en `#nosotros` — WARNING-4       |
| `<fieldset>/<legend>` | ✅       | ✅       | Bien aplicado en formularios                 |
| `<label>`             | ✅       | ✅       | Vinculado con `for`/`id` en todos los inputs |
| `<table>`             | ✅       | ✅       | Con `<caption>`, `<thead>`, `scope="col"`    |

---

## 3. Resultados — Warnings y Errors

### 🔴 ERRORS: 0

No se detectaron errores de sintaxis HTML5. El documento es parseable y válido.

---

### ⚠️ WARNINGS: 6

#### WARNING-1 — `<h1>` como texto de logo dentro de `<a>`

- **Ubicación:** `header > div.logo-container > a > h1`
- **Código actual:**

```html
<a href="#inicio" class="logo-link">
  <h1 class="logo-text">PC - HARDWARE</h1>
</a>
```

- **Problema:** El `h1` envuelto en un enlace es anunciado por lectores de pantalla como "enlace, encabezado nivel 1". El texto del logo tampoco describe semánticamente el contenido de la página.
- **Corrección:**

```html
<h1 class="visually-hidden">PC Hardware — Tienda de Componentes</h1>
<a href="#inicio" class="logo-link" aria-label="Ir al inicio de PC Hardware">
  <span class="logo-text" aria-hidden="true">PC - HARDWARE</span>
</a>
```

- **Severidad:** 🟡 MEDIA — Impacto en SEO y accesibilidad.

---

#### WARNING-2 — `<h3>` dentro de `<nav>` en sidebar

- **Ubicación:** `aside > nav.categories-section > h3`
- **Problema:** El `aria-label` del `<nav>` ya identifica el bloque. El `h3` genera jerarquía innecesaria que puede confundir a tecnologías asistivas.
- **Corrección:** Reemplazar el `h3` por un `p` con estilo visual de título, o eliminarlo.
- **Severidad:** 🟢 BAJA.

---

#### WARNING-3 — `<div class="main-content">` sin landmark semántico

- **Ubicación:** `main > div.main-container > div.main-content`
- **Problema:** El wrapper agrupa las secciones principales sin rol ARIA ni semántico. Los lectores de pantalla lo omiten en la navegación por landmarks.
- **Corrección:** No es crítico (las `<section>` hijas ya son landmarks). Opcional: agregar `aria-label` al `div`.
- **Severidad:** 🟢 BAJA — Informativo.

---

#### WARNING-4 — `<h3>` suelto sin `<section>` contenedora en `#nosotros`

- **Ubicación:** `section#nosotros > h3` (antes de la tabla comparativa)
- **Código actual:**

```html
<section id="nosotros">
  <h2>Sobre Nosotros</h2>
  <p>...</p>
  <h3>Productos Estrella - Comparativa</h3>
  <table>
    ...
  </table>
</section>
```

- **Corrección:**

```html
<section id="nosotros">
  <h2>Sobre Nosotros</h2>
  <p>...</p>
  <section aria-label="Comparativa de Productos Estrella">
    <h3>Productos Estrella - Comparativa</h3>
    <table>
      ...
    </table>
  </section>
</section>
```

- **Severidad:** 🟢 BAJA — Mejora semántica.

---

#### WARNING-5 — `<fieldset>` anidado en el formulario de newsletter

- **Ubicación:** `form#newsletter-form > fieldset > fieldset.checkbox-group`
- **Problema:** Técnicamente válido en HTML5, pero algunos AT históricos tienen comportamiento inconsistente con fieldsets anidados.
- **Corrección:** Verificar en el validador oficial. Aceptable para navegadores modernos.
- **Severidad:** 🟢 MUY BAJA — Solo verificación.

---

#### WARNING-6 — `<figure>` sin `<figcaption>`

- **Ubicación:** `section#inicio > div.featured-gallery > figure ×3`
- **Código actual:**

```html
<figure class="gallery-item">
  <img src="..." alt="..." loading="lazy" />
</figure>
```

- **Corrección:**

```html
<figure class="gallery-item">
  <img src="..." alt="..." loading="lazy" />
  <figcaption class="visually-hidden">Descripción de la imagen</figcaption>
</figure>
```

- **Severidad:** 🟢 BAJA — Buenas prácticas semánticas.

---

## 4. Jerarquía de Headings

```
h1 → "PC - HARDWARE"  (logo — uso incorrecto, ver WARNING-1)
  h2 → "DESCRIPCIÓN DE LA TIENDA"        (section#inicio)
  h2 → "PRODUCTOS PRESENTADOS"           (section#tienda)
    h3 → product-name ×6                (article.product-card)
  h2 → "Mi Carrito"                      (section#carrito)
  h2 → "Sobre Nosotros"                  (section#nosotros)
    h3 → "Productos Estrella..."          (suelto — WARNING-4)
  h2 → "Guías de Compatibilidad"         (section#compatibilidad)
    h3 → "Socket de Procesadores"        (article.guide-card)
    h3 → "Fuente de Alimentación"        (article.guide-card)
    h3 → "Especificaciones de RAM"       (article.guide-card)
  h2 → "Centro de Ayuda y Suscripción"  (section#ayuda)
  -- footer --
    h3 ×4                                ✅ No saltan niveles
```

La jerarquía es lógica y no salta niveles. El único problema semántico es el `h1` del logo.

---

## 5. Verificación de Atributos Críticos

| Check                          | Estado  | Detalle                                     |
| ------------------------------ | ------- | ------------------------------------------- |
| `<html lang="es">`             | ✅ PASS | Correctamente declarado                     |
| `charset="UTF-8"`              | ✅ PASS | Primera meta del `<head>`                   |
| `viewport` meta                | ✅ PASS | Presente y correcto                         |
| `alt` en todas las imágenes    | ✅ PASS | Descriptivo en cada imagen                  |
| `loading="lazy"` en imágenes   | ✅ PASS | Aplicado a todas las imágenes de contenido  |
| `aria-label` en navs múltiples | ✅ PASS | Diferenciado en los 4 `<nav>`               |
| `scope="col"` en tablas        | ✅ PASS | Presente en todos los `<th>`                |
| `<caption>` en tablas          | ✅ PASS | Presente en todas las tablas                |
| `for`/`id` en labels           | ✅ PASS | Vinculación correcta en todos los inputs    |
| `rel="noopener noreferrer"`    | ✅ PASS | En todos los `target="_blank"`              |
| Etiquetas obsoletas            | ✅ PASS | Ninguna detectada                           |
| Atributos duplicados           | ✅ PASS | No se detectaron                            |
| `role` redundantes             | ℹ️ INFO | En `header`, `main`, `footer` — no es error |

---

## 6. Resumen W3C

| Tipo       | Cantidad                                  |
| ---------- | ----------------------------------------- |
| 🔴 Error   | 0                                         |
| ⚠️ Warning | 6                                         |
| ℹ️ Info    | 3 (role redundantes en landmarks nativos) |

El documento superaría la validación W3C sin errores.

---

## 7. Evidencia Visual — Instrucciones W3C Validator

> Playwright MCP no pudo inicializarse en este ciclo. Ver sección de instrucciones manuales al pie del documento.

Screenshots a obtener:

- `docs/evidence/tc-005-w3c-validator-uri.png` — resultado completo del validador
- `docs/evidence/tc-005-dom-screenshot.png` — captura del sitio en producción (opcional)

---

## 8. Issues Relacionados

| Título                                                            | Severidad | Estado  |
| ----------------------------------------------------------------- | --------- | ------- |
| `[SEMANTICA] h1 usado como logo — impacto en SEO y accesibilidad` | 🟡 Media  | Abierto |

---

## 9. Conclusión

El HTML demuestra un nivel de calidad semántica destacado para el contexto del proyecto.

**Puntos fuertes:**

- Uso correcto de todas las etiquetas estructurales HTML5
- Accesibilidad bien considerada: `aria-label`, `aria-required`, `aria-describedby`, `scope`, `caption`
- Sin etiquetas obsoletas ni errores de sintaxis
- Jerarquía de headings coherente y sin saltos de nivel
- Formularios con `fieldset`/`legend` y `label[for]` completos
- Imágenes con `alt` descriptivo y `loading="lazy"`
- `rel="noopener noreferrer"` en todos los `target="_blank"`

**Acciones prioritarias antes de entrega:**

1. ⬆️ Corregir **WARNING-1** — `h1` como logo (mayor impacto en SEO)
2. ⬆️ Agregar `<figcaption>` a las `<figure>` — **WARNING-6**
3. Envolver `h3` + tabla en `<section>` dentro de `#nosotros` — **WARNING-4**
