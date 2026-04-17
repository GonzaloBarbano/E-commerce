# CASO DE PRUEBA N°4 — ACCESIBILIDAD (WCAG 2.1 AA)

**Proyecto:** E-commerce PC Hardware  
**Rama analizada:** `feature/dev-frontend-css-add-styles`  
**URL de prueba:** https://gonzalobarbano.github.io/E-commerce/  
**Repositorio:** https://github.com/GonzaloBarbano/E-commerce  
**Tester:** QA Automatizado (Playwright + axe-core 4.9.1)  
**Fecha de ejecución:** 2025  
**Estándar de referencia:** WCAG 2.1 Nivel AA  
**Herramientas:** Playwright MCP, axe-core 4.9.1 (cdnjs), análisis DOM manual

---

## 1. OBJETIVO

Verificar que el sitio E-commerce PC Hardware cumpla con los criterios de accesibilidad WCAG 2.1 nivel AA, con foco en:

- Contraste de color en botones de acción ("Agregar al Carrito", "Proceder al Pago")
- Presencia y calidad del atributo `alt` en imágenes de productos
- Jerarquía semántica de encabezados (h1–h6)
- Atributos ARIA en elementos interactivos (inputs, links, iconos)
- Estructura de landmarks y navegación de teclado

---

## 2. PRECONDICIONES

| Ítem                                   | Estado     |
| -------------------------------------- | ---------- |
| Sitio accesible en GitHub Pages        | ✅ OK      |
| Página carga sin redirecciones         | ✅ OK      |
| JavaScript ejecutado (SPA/dinámica)    | ✅ OK      |
| axe-core 4.9.1 inyectado correctamente | ✅ OK      |
| Viewport de prueba                     | 1280×900px |

---

## 3. AUDITORÍA AUTOMATIZADA — axe-core 4.9.1

**Resumen general:**

| Categoría                                  | Cantidad |
| ------------------------------------------ | -------- |
| ✅ Reglas que pasan                        | 47       |
| ❌ Violaciones detectadas                  | 1        |
| ⚠️ Incompletas (requieren revisión manual) | 2        |
| ➖ No aplicables                           | 43       |

---

### 3.1 TABLA DE VIOLACIONES

| #    | ID Regla        | Impacto      | Criterio WCAG | Descripción                                                                                                                 | Elemento afectado                                  | Estado   |
| ---- | --------------- | ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| V-01 | `heading-order` | **MODERADO** | WCAG 2.4.6    | Los niveles de encabezado deben aumentar de a uno. Se encontró un `<h3>` directamente después del `<h1>`, omitiendo `<h2>`. | `.categories-section > h3` → `<h3>CATEGORÍAS</h3>` | ❌ FALLA |

---

### 3.2 DETALLE DE VIOLACIÓN V-01

**Regla:** `heading-order`  
**Impacto:** Moderado  
**WCAG:** Criterio 2.4.6 — Encabezados y Etiquetas  
**Descripción:** La jerarquía de encabezados salta de `<h1>` a `<h3>` en la sección de categorías del sidebar, rompiendo la estructura semántica del documento. Esto afecta a usuarios de lectores de pantalla que navegan por headings.

**Selector afectado:**

```html
<h3>CATEGORÍAS</h3>
← Debería ser
<h2>
  <h3>FILTROS</h3>
  ← Debería ser
  <h2>
    <h3>ENLACES RÁPIDOS</h3>
    ← Debería ser
    <h2></h2>
  </h2>
</h2>
```

**Corrección recomendada:**

```html
<!-- Antes -->
<h3>CATEGORÍAS</h3>

<!-- Después -->
<h2>CATEGORÍAS</h2>
```

---

## 4. ANÁLISIS MANUAL POR PUNTO CLAVE

### 4.1 Contraste de Color — Botones de Acción

**Herramienta:** Cálculo WCAG (Luminance Contrast Ratio) sobre `getComputedStyle()`

| Botón              | Color Texto  | Color Fondo        | Ratio       | Mínimo WCAG AA | Resultado |
| ------------------ | ------------ | ------------------ | ----------- | -------------- | --------- |
| Agregar al Carrito | `rgb(0,0,0)` | `rgb(239,239,239)` | **18.26:1** | 4.5:1          | ✅ PASA   |
| Aplicar Filtros    | `rgb(0,0,0)` | `rgb(239,239,239)` | **18.26:1** | 4.5:1          | ✅ PASA   |
| Limpiar            | `rgb(0,0,0)` | `rgb(239,239,239)` | **18.26:1** | 4.5:1          | ✅ PASA   |
| Proceder al Pago   | `rgb(0,0,0)` | `rgb(239,239,239)` | **18.26:1** | 4.5:1          | ✅ PASA   |
| Suscribirse        | `rgb(0,0,0)` | `rgb(239,239,239)` | **18.26:1** | 4.5:1          | ✅ PASA   |

> **Observación:** Los botones utilizan estilos de navegador por defecto (`rgb(239,239,239)`). Si bien el contraste es excelente (18.26:1), la apariencia visual es genérica y no refleja el diseño visual de la tienda. Se recomienda aplicar estilos CSS específicos con colores de marca manteniendo el ratio ≥ 4.5:1.

---

### 4.2 Atributo `alt` en Imágenes de Productos

| Imagen                          | `alt` presente | Texto alternativo                                                  | Calidad            |
| ------------------------------- | -------------- | ------------------------------------------------------------------ | ------------------ |
| `nvidia-rtx4090-destacada.jpg`  | ✅ Sí          | "Tarjeta Gráfica NVIDIA RTX 4090 - Componente de alto rendimiento" | ✅ Descriptivo     |
| `intel-i9-13900k-destacado.jpg` | ✅ Sí          | "Procesador Intel Core i9 - CPU de última generación"              | ✅ Descriptivo     |
| `pc-gaming-completo.jpg`        | ✅ Sí          | "PC Gaming Completo - Configuración de alta gama"                  | ✅ Descriptivo     |
| `intel-i9-13900k.jpg`           | ✅ Sí          | "Intel Core i9-13900K - Procesador 13ava generación, 24 núcleos"   | ✅ Muy descriptivo |
| `nvidia-rtx4090.jpg`            | ✅ Sí          | "NVIDIA GeForce RTX 4090 - 24GB GDDR6X, 16384 CUDA Cores"          | ✅ Muy descriptivo |
| `corsair-vengeance-ddr5.jpg`    | ✅ Sí          | "Corsair Vengeance DDR5 - 32GB (2x16GB), 5600MHz, RGB"             | ✅ Muy descriptivo |
| `kingston-nv2-1tb.jpg`          | ✅ Sí          | "Kingston NV2 1TB - SSD NVMe M.2, velocidad secuencial 3500MB/s"   | ✅ Muy descriptivo |
| `corsair-rm850x.jpg`            | ✅ Sí          | "Corsair RM850x Gold - 850W, 80+ Gold, Modular, 10 años garantía"  | ✅ Muy descriptivo |
| `corsair-h150i.jpg`             | ✅ Sí          | "Corsair iCUE H150i ELITE CAPELLIX - AIO Liquid Cooler 360mm"      | ✅ Muy descriptivo |

**Total imágenes auditadas: 9/9 — Todas con `alt` descriptivo ✅**

---

### 4.3 Jerarquía de Encabezados (h1–h6)

**Árbol de encabezados detectado:**

```
H1: "PC - HARDWARE"
  ├── H3: "CATEGORÍAS"          ← ❌ SALTO (debería ser H2)
  ├── H3: "FILTROS"             ← ❌ SALTO (debería ser H2)
  ├── H3: "ENLACES RÁPIDOS"     ← ❌ SALTO (debería ser H2)
  ├── H2: "DESCRIPCIÓN DE LA TIENDA"     ✅
  ├── H2: "PRODUCTOS PRESENTADOS"        ✅
  │   ├── H3: "Intel Core i9-13900K"      ✅
  │   ├── H3: "NVIDIA RTX 4090"           ✅
  │   ├── H3: "Corsair Vengeance DDR5 32GB" ✅
  │   ├── H3: "Kingston NV2 1TB SSD"     ✅
  │   ├── H3: "Corsair RM850x Gold"      ✅
  │   └── H3: "Corsair H150i ELITE"      ✅
  ├── H2: "Mi Carrito"                   ✅
  ├── H2: "Sobre Nosotros"               ✅
  │   └── H3: "Productos Estrella - Comparativa"  ✅
  ├── H2: "Guías de Compatibilidad"      ✅
  │   ├── H3: "Socket de Procesadores..."  ✅
  │   ├── H3: "Fuente de Alimentación..." ✅
  │   └── H3: "Especificaciones de Memoria RAM"  ✅
  ├── H2: "Centro de Ayuda y Suscripción" ✅
  │   ├── H3: "Contacto"                  ✅
  │   ├── H3: "Enlaces Útiles"            ✅
  │   ├── H3: "Categorías Principales"    ✅
  │   └── H3: "Síguenos"                  ✅
```

**Violación identificada:** Los 3 primeros `<h3>` del sidebar (CATEGORÍAS, FILTROS, ENLACES RÁPIDOS) aparecen en el DOM antes de cualquier `<h2>`, saltando un nivel jerárquico desde `<h1>`.

---

### 4.4 Atributos ARIA — Inputs y Elementos Interactivos

| Elemento          | ID               | `aria-label`          | `<label>` asociada | Estado                   |
| ----------------- | ---------------- | --------------------- | ------------------ | ------------------------ |
| `input[search]`   | `search-input`   | "Buscar productos" ✅ | ❌ No tiene        | ✅ OK (aria-label suple) |
| `input[number]`   | `price-min`      | "Precio mínimo" ✅    | ✅ Sí              | ✅ OK                    |
| `input[number]`   | `price-max`      | "Precio máximo" ✅    | ✅ Sí              | ✅ OK                    |
| `input[checkbox]` | `brand-intel`    | —                     | ✅ Sí              | ✅ OK                    |
| `input[checkbox]` | `brand-amd`      | —                     | ✅ Sí              | ✅ OK                    |
| `input[checkbox]` | `brand-nvidia`   | —                     | ✅ Sí              | ✅ OK                    |
| `input[text]`     | `input-nombre`   | —                     | ✅ Sí              | ✅ OK                    |
| `input[email]`    | `input-email`    | —                     | ✅ Sí              | ✅ OK                    |
| `input[tel]`      | `input-telefono` | —                     | ✅ Sí              | ✅ OK                    |
| `input[checkbox]` | `input-terminos` | —                     | ✅ Sí              | ✅ OK                    |

**Iconos/SVG sin aria:** No se detectaron íconos decorativos sin `aria-hidden`, ni íconos funcionales sin etiqueta.

---

### 4.5 Estructura de Landmarks y Navegación

| Landmark                          | Presente | Observación                                      |
| --------------------------------- | -------- | ------------------------------------------------ |
| `<header>`                        | ✅ Sí    | Correctamente usado                              |
| `<nav>`                           | ✅ Sí    | Presente                                         |
| `<main>`                          | ✅ Sí    | Presente                                         |
| `<footer>`                        | ✅ Sí    | Presente                                         |
| `lang="es"` en `<html>`           | ✅ Sí    | Correcto                                         |
| Skip link ("Saltar al contenido") | ❌ No    | Ausente — recomendado para navegación de teclado |

---

## 5. RESUMEN EJECUTIVO DE RESULTADOS

| #      | Punto de Verificación                  | Impacto WCAG | Estado            | Acción                              |
| ------ | -------------------------------------- | ------------ | ----------------- | ----------------------------------- |
| TC-4.1 | Contraste botones "Agregar al Carrito" | —            | ✅ PASA (18.26:1) | Considerar aplicar estilos de marca |
| TC-4.2 | Atributo `alt` en imágenes             | WCAG 1.1.1   | ✅ PASA (9/9)     | Mantener buena práctica             |
| TC-4.3 | Jerarquía de encabezados               | WCAG 2.4.6   | ❌ FALLA (V-01)   | Cambiar H3→H2 en sidebar            |
| TC-4.4 | ARIA en inputs                         | WCAG 1.3.1   | ✅ PASA           | OK                                  |
| TC-4.5 | Landmarks HTML5                        | WCAG 1.3.1   | ✅ PASA           | OK                                  |
| TC-4.6 | Skip link de teclado                   | WCAG 2.4.1   | ⚠️ AUSENTE        | Agregar skip link                   |
| TC-4.7 | `lang` en `<html>`                     | WCAG 3.1.1   | ✅ PASA           | OK                                  |

---

## 6. DEFECTOS ENCONTRADOS

### DEF-01 — Violación de Jerarquía de Encabezados (MODERADO)

- **ID:** DEF-01
- **Tipo:** Accesibilidad
- **Impacto:** Moderado (axe-core)
- **WCAG:** 2.4.6 Encabezados y Etiquetas
- **Descripción:** Tres `<h3>` del sidebar lateral (CATEGORÍAS, FILTROS, ENLACES RÁPIDOS) aparecen antes del primer `<h2>` del documento, generando un salto inválido desde H1→H3.
- **Elemento:** `.categories-section > h3`, y elementos hermanos
- **Corrección:** Cambiar `<h3>` a `<h2>` en las secciones del sidebar.
- **Prioridad:** Media

### DEF-02 — Ausencia de Skip Link (BEST PRACTICE)

- **ID:** DEF-02
- **Tipo:** Usabilidad / Accesibilidad
- **Impacto:** Moderado (usuarios de teclado)
- **WCAG:** 2.4.1 Saltar Bloques
- **Descripción:** No existe un "skip to content" link que permita a usuarios de teclado omitir la navegación principal.
- **Corrección:** Agregar `<a href="#main" class="skip-link">Saltar al contenido</a>` al inicio del `<body>`.
- **Prioridad:** Baja-Media

---

## 7. OBSERVACIONES DE ESTILO VISUAL

> Los botones muestran los estilos por defecto del navegador (`background: rgb(239,239,239)`), lo cual indica que los estilos CSS de la rama `feature/dev-frontend-css-add-styles` no se están aplicando visualmente a los elementos `<button>`. Se recomienda revisar si hay conflictos de especificidad CSS o selectores faltantes.

---

## 8. CAPTURAS DE PANTALLA

> Las capturas no pudieron guardarse automáticamente en esta ejecución por restricciones del entorno Playwright MCP. Ver **Sección 9** para instrucciones de captura manual desde Mac.

---

## 9. GENERACIÓN MANUAL DEL REPORTE — INSPECTOR EN MAC

Para generar el reporte de accesibilidad desde Safari/Chrome en Mac:

### Opción A — Chrome DevTools (Lighthouse)

1. Abrir `https://gonzalobarbano.github.io/E-commerce/` en Chrome
2. `F12` → Pestaña **"Lighthouse"**
3. Seleccionar categoría **"Accessibility"** → Dispositivo: Desktop
4. Hacer clic en **"Analyze page load"**
5. El reporte se puede exportar como JSON o HTML con el botón "⬇ Save report"

### Opción B — axe DevTools (extensión)

1. Instalar extensión [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
2. Abrir DevTools → Pestaña **"axe DevTools"**
3. Clic en **"Scan ALL of my page"**
4. Exportar resultados como CSV o PDF

### Opción C — Safari Accessibility Inspector (nativo Mac)

1. `Safari → Preferencias → Avanzado → Mostrar menú Desarrollo`
2. `Menú Desarrollo → Mostrar Inspector de Accesibilidad`
3. Navegar el árbol ARIA del DOM completo

---

## CAPTURAS DE PANTALLA (Manual Opción C)

![](screenshots/TestC4-1.png)
![](screenshots/TestC4-1.png)
![](screenshots/TestC4-1.png)

---

## 10. CRITERIOS DE ACEPTACIÓN

| Criterio                       | Estado                |
| ------------------------------ | --------------------- |
| 0 violaciones de nivel Crítico | ✅ Cumplido           |
| 0 violaciones de nivel Serio   | ✅ Cumplido           |
| Todas las imágenes con `alt`   | ✅ Cumplido           |
| Contraste ≥ 4.5:1 en botones   | ✅ Cumplido           |
| Jerarquía de headings correcta | ❌ No cumplido (V-01) |
| Inputs con label o aria-label  | ✅ Cumplido           |
| `lang` definido en HTML        | ✅ Cumplido           |

---

**Estado general del test:** ⚠️ APROBADO CON OBSERVACIONES  
**Violaciones bloqueantes:** 0  
**Violaciones a corregir antes del merge:** 1 (DEF-01 — heading-order)  
**Mejoras recomendadas:** 1 (DEF-02 — skip link)
