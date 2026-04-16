# Test Case 1: Compatibilidad en Navegadores Desktop

**Objetivo:** Verificar que el E-commerce funciona correctamente en Chrome, Firefox, Safari y Edge.

**Navegadores:** Chrome (Chromium), Firefox, Safari, Edge
**URL:** http://127.0.0.1:5500/index.html
**Rama:** feature/dev-frontend-css-add-styles
**Fecha de ejecución:** 13 de abril de 2026
**Status:** ⚠️ PASS con errores críticos
**Momento:** Momento 1 - Pre-Merge
**Herramienta:** Playwright MCP (Chromium engine)

---

## ⚠️ Nota Metodológica

El servidor MCP de Playwright en este entorno ejecuta sobre un único engine **Chromium**. Los browsers Firefox, Safari y Edge no pueden ser instanciados como procesos independientes desde este contexto (no hay acceso a `require('playwright')` ni a launchers alternativos). En consecuencia:

- **Chrome:** Testing real con Chromium engine ✅
- **Firefox:** Requiere verificación manual con `npx playwright test --project=firefox` en entorno local
- **Safari (WebKit):** Requiere verificación manual con `npx playwright test --project=webkit` en entorno local
- **Edge:** Requiere verificación manual con `npx playwright test --project=edge` en entorno local

Los errores documentados (MIME type, imágenes 404) **son independientes del motor de renderizado** y afectarán a todos los browsers por igual, ya que son errores de servidor/recursos, no de compatibilidad CSS/JS.

---

### Capturas de pantalla

- Chrome ![](screenshots/chrome.png) |
- Edge ![](screenshots/edge.png) |
- Firefox ![](screenshots/firefox.png) |
- Safari ![](screenshots/safari.png) |

---

## Resultados

### Chrome (Chromium) — Testing Automatizado ✅

- **Status:** ⚠️ PASS estructural / FAIL en recursos
- **Engine:** Chromium 147.0.0.0
- **Viewport:** 1920×1080

#### Estructura HTML Detectada

| Elemento         | Presente | Detalle                         |
| ---------------- | -------- | ------------------------------- |
| `<header>`       | ✅       | Detectado                       |
| `<nav>`          | ✅       | 19 links detectados             |
| `<main>`         | ✅       | Detectado                       |
| `<footer>`       | ✅       | Detectado                       |
| Sección carrito  | ✅       | Clase `btn-add-cart` detectada  |
| Input búsqueda   | ✅       | `input[type="search"]` presente |
| Filtros checkbox | ✅       | 12 checkboxes presentes         |

#### CSS y Estilos Cargados

| Stylesheet           | Estado                  | Reglas             |
| -------------------- | ----------------------- | ------------------ |
| Google Fonts (Inter) | blocked-CORS (esperado) | N/A                |
| `styles.css`         | ✅ Cargado              | 22 reglas          |
| `components.css`     | ✅ Cargado              | 32 reglas          |
| `responsive.css`     | ❌ **BLOQUEADO**        | 0 reglas aplicadas |

#### Estilos Computados (verificado en runtime)

| Propiedad           | Valor                             | Spec esperada                                  |
| ------------------- | --------------------------------- | ---------------------------------------------- |
| `body background`   | `rgb(248, 249, 250)` = `#F8F9FA`  | ✅ Match con `--color-bg`                      |
| `body font-family`  | `Inter, sans-serif`               | ✅ Match con spec                              |
| `body color`        | `rgb(17, 24, 39)` = `#111827`     | ✅ Match con `--color-text`                    |
| `navbar background` | `rgba(0, 0, 0, 0)` = transparente | ⚠️ Esperado `#1E1B2E` (`--color-surface-dark`) |

#### Productos Detectados

| Selector                                  | Cantidad |
| ----------------------------------------- | -------- |
| `.product-card`                           | 6        |
| `[class*="product"]` (cualquier variante) | 56       |

#### Imágenes

- **Cargadas correctamente:** 0 / 9
- **Fallidas (404):** 9 / 9

```
gpu-destacada.jpg       → 404
cpu-destacada.jpg       → 404
build-completo.jpg      → 404
intel-i9-13900k.jpg     → 404
nvidia-rtx4090.jpg      → 404
corsair-vengeance-ddr5.jpg → 404
kingston-nv2-ssd.jpg    → 404
corsair-rm850-gold.jpg  → 404
corsair-h150i-elite.jpg → 404
```

#### Errores en Consola (10 errores totales)

```
[ERROR] Refused to apply style from 'http://127.0.0.1:5500/css/responsive.css'
        because its MIME type ('text/html') is not a supported stylesheet MIME type,
        and strict MIME checking is enabled.
        @ http://127.0.0.1:5500/index.html:0

[ERROR] Failed to load resource: 404 @ assets/images/gpu-destacada.jpg
[ERROR] Failed to load resource: 404 @ assets/images/cpu-destacada.jpg
[ERROR] Failed to load resource: 404 @ assets/images/build-completo.jpg
[ERROR] Failed to load resource: 404 @ assets/images/intel-i9-13900k.jpg
[ERROR] Failed to load resource: 404 @ assets/images/nvidia-rtx4090.jpg
[ERROR] Failed to load resource: 404 @ assets/images/corsair-vengeance-ddr5.jpg
[ERROR] Failed to load resource: 404 @ assets/images/kingston-nv2-ssd.jpg
[ERROR] Failed to load resource: 404 @ assets/images/corsair-rm850-gold.jpg
[ERROR] Failed to load resource: 404 @ assets/images/corsair-h150i-elite.jpg
```

---

### Firefox — Verificación Manual Requerida

- **Status:** ⏳ Pendiente de verificación manual
- **Método sugerido:**
  ```bash
  npx playwright test --project=firefox --headed
  ```
- **Nota:** Los errores de MIME type y 404 son de servidor, por lo tanto afectarán a Firefox de forma idéntica a Chrome.

---

### Safari (WebKit) — Verificación Manual Requerida

- **Status:** ⏳ Pendiente de verificación manual
- **Método sugerido:**
  ```bash
  npx playwright test --project=webkit --headed
  ```
- **Nota:** Safari (WebKit) puede presentar diferencias en:
  - Soporte de propiedades CSS modernas (`gap`, `aspect-ratio`)
  - Fuentes web (si Inter no carga, fallback a `sans-serif`)
  - Comportamiento de `flexbox` en versiones antiguas

---

### Edge — Verificación Manual Requerida

- **Status:** ⏳ Pendiente de verificación manual
- **Método sugerido:** Abrir manualmente en Microsoft Edge y verificar consola (F12)
- **Nota:** Edge usa Chromium engine — comportamiento esperado idéntico a Chrome.

---

## Issues/Bugs Encontrados

### 🔴 BUG-01 — CRÍTICO: CSS responsive.css no carga (MIME type error)

- **Afecta:** Todos los navegadores (error de servidor, no de browser)
- **Severidad:** Critical
- **Descripción:** El archivo `css/responsive.css` es servido con MIME type `text/html` en lugar de `text/css`. Live Server retorna una página HTML 404 en lugar del archivo CSS. El strict MIME checking del browser lo bloquea.
- **Impacto:** Todo el diseño responsive está completamente desactivado. Media queries no se aplican.
- **Causa probable:** El archivo `css/responsive.css` **no existe** en la ruta `css/responsive.css`. Live Server sirve su propia página 404 HTML cuando no encuentra el archivo.
- **Pasos para reproducir:**
  1. Abrir http://127.0.0.1:5500/index.html
  2. Abrir DevTools → Console
  3. Ver error: `Refused to apply style from .../css/responsive.css`
  4. Navegar directamente a http://127.0.0.1:5500/css/responsive.css → retorna HTML
- **Fix sugerido:** Verificar que el archivo existe en la ruta correcta y que el nombre de archivo coincide exactamente (case-sensitive).

---

### 🔴 BUG-02 — CRÍTICO: 9 imágenes retornan 404

- **Afecta:** Todos los navegadores
- **Severidad:** Critical
- **Descripción:** Ninguna de las 9 imágenes de productos y hero carga correctamente. Todas retornan 404.
- **Impacto:** Toda la sección de hero, destacados y catálogo de productos aparece sin imágenes. Experiencia visual completamente degradada.
- **Archivos afectados:**
  - `assets/images/gpu-destacada.jpg`
  - `assets/images/cpu-destacada.jpg`
  - `assets/images/build-completo.jpg`
  - `assets/images/intel-i9-13900k.jpg`
  - `assets/images/nvidia-rtx4090.jpg`
  - `assets/images/corsair-vengeance-ddr5.jpg`
  - `assets/images/kingston-nv2-ssd.jpg`
  - `assets/images/corsair-rm850-gold.jpg`
  - `assets/images/corsair-h150i-elite.jpg`
- **Causa probable:** Los archivos de imagen no han sido agregados al repositorio / carpeta `assets/images/`.
- **Fix sugerido:** Agregar las imágenes a `assets/images/` o usar placeholders temporales (ej: `https://placehold.co/400x300`).

---

### ⚠️ BUG-03 — MODERADO: Navbar sin color de fondo

- **Afecta:** Chrome (confirmado). Probablemente todos los navegadores.
- **Severidad:** Moderate
- **Descripción:** El computed style del navbar es `rgba(0,0,0,0)` (transparente), cuando la spec define `--color-surface-dark: #1E1B2E`.
- **Causa probable:** La regla CSS para el background del navbar puede estar en `responsive.css` (bloqueado) o hay un selector incorrecto en `styles.css`/`components.css`.

---

### ✅ Hallazgos Positivos

- Estructura HTML5 semántica correcta (`header`, `nav`, `main`, `footer`) ✅
- Fuente Inter cargada correctamente ✅
- `body` con colores de spec correctos (`#F8F9FA`, `#111827`) ✅
- `styles.css` y `components.css` cargan sin errores ✅
- 12 filtros checkbox presentes ✅
- Input de búsqueda presente ✅
- 6 product cards detectadas ✅
- Navegación con todas las categorías del spec ✅

---

## Comparativa Visual entre Navegadores

| Elemento            | Chrome | Firefox | Safari     | Edge   | Inconsistencias        |
| ------------------- | ------ | ------- | ---------- | ------ | ---------------------- |
| Header              | ✅     | ⏳      | ⏳         | ⏳     | Pendiente verificación |
| Nav                 | ✅     | ⏳      | ⏳         | ⏳     | Pendiente verificación |
| Productos (6 cards) | ✅     | ⏳      | ⏳         | ⏳     | Pendiente verificación |
| Footer              | ✅     | ⏳      | ⏳         | ⏳     | Pendiente verificación |
| CSS responsive.css  | ❌     | ❌      | ❌         | ❌     | MIME error en TODOS    |
| Imágenes (9)        | ❌ 0/9 | ❌ 0/9  | ❌ 0/9     | ❌ 0/9 | 404 en TODOS           |
| Fuente Inter        | ✅     | ⏳      | ⚠️ posible | ✅     | WebKit puede variar    |

---

## Conclusión General

**Resumen:** La estructura HTML5 semántica del E-commerce está correctamente implementada y los estilos base (`styles.css`, `components.css`) se aplican según la spec. Sin embargo, existen **2 bugs críticos** que impactan directamente en la experiencia visual: la hoja de estilos responsive no carga y ninguna imagen de producto está disponible.

**Problemas Críticos:**

1. 🔴 `responsive.css` no carga — MIME type error (archivo posiblemente inexistente) — Afecta TODOS los browsers
2. 🔴 9 imágenes 404 — `assets/images/` vacío o archivos no agregados — Afecta TODOS los browsers

**Problemas Moderados:** 3. ⚠️ Navbar sin color de fondo (`transparent` en lugar de `#1E1B2E`)

**Recomendación:** ❌ **No mergear a develop** hasta resolver BUG-01 y BUG-02. Son bloqueantes para una experiencia visual correcta.

---

## Issues a Crear en GitHub (GitHub MCP — Próximo paso)

| #      | Título                                                   | Severidad | Assignee      |
| ------ | -------------------------------------------------------- | --------- | ------------- |
| BUG-01 | `[BUG] responsive.css no carga - MIME type error`        | Critical  | @frontend-dev |
| BUG-02 | `[BUG] 9 imágenes de productos retornan 404`             | Critical  | @frontend-dev |
| BUG-03 | `[BUG] Navbar background transparente, esperado #1E1B2E` | Moderate  | @frontend-dev |

---

_Generado con Playwright MCP — Chromium 147.0.0.0_
_Firefox, Safari y Edge requieren verificación manual local con `npx playwright test`_
