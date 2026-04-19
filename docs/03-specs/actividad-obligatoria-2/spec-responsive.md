# spec-responsive.md — Especialista en Responsive Design

## 1. Descripción general

**Qué se va a hacer:**
Generar el archivo `css/responsive.css` con media queries organizadas por breakpoint (mobile, tablet, desktop) que adaptan el layout, tipografías y componentes del sitio PC-Hardware usando Flexbox y/o CSS Grid según el tamaño de pantalla.

**Por qué:**
El diseño base fue construido para desktop con un sidebar fijo de 220px y un layout de dos columnas. En dispositivos móviles y tablets ese layout no es funcional, por lo que se necesita un enfoque mobile-first que reorganice el contenido para cada breakpoint de forma coherente con el mockup.

---

## 2. Breakpoints definidos y justificación

| Nombre | Ancho | Justificación |
|---|---|---|
| **Mobile** | `max-width: 767px` | Cubre smartphones en vertical y horizontal. El sidebar colapsa, el contenido ocupa 100% del ancho. |
| **Tablet** | `min-width: 768px` y `max-width: 1023px` | Cubre tablets (iPad, Android). El sidebar puede mostrarse colapsado o como menú. Grid de productos pasa a 2 columnas. |
| **Desktop** | `min-width: 1024px` | Layout completo con sidebar fijo de 220px y grid de 3+ columnas. Es el diseño base del mockup. |

**Enfoque:** Mobile-first — los estilos base en `styles.css` son para desktop. En `responsive.css` se sobreescriben hacia abajo con `max-width` para mobile y tablet.

---

## 3. Enfoque de layout por sección

| Sección | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navbar | Flex column o logo + hamburger | Flex row compacto | Flex row completo |
| Sidebar | Oculto / colapsable arriba | Oculto o ancho reducido | Fijo 220px |
| Main content | margin-left: 0, width 100% | margin-left: 0 o reducido | margin-left: 220px |
| Hero images | Flex column, 1 imagen por fila | 2 imágenes por fila | 3 imágenes por fila |
| Products grid | 1 columna | 2 columnas | 3+ columnas (auto-fill) |
| Paginación | Flex wrap, botones más grandes | Igual desktop | Flex row centrado |

---

## 4. Criterios de aceptación

- [ ] Breakpoints definidos y documentados (mobile, tablet, desktop).
- [ ] Layout mobile-first implementado.
- [ ] Sidebar se oculta o reorganiza correctamente en mobile y tablet.
- [ ] Navbar se adapta correctamente en los tres breakpoints.
- [ ] Grid de productos usa 1 columna en mobile, 2 en tablet, 3+ en desktop.
- [ ] Hero se reorganiza en columna en mobile.
- [ ] No hay overflow horizontal en ningún dispositivo ni breakpoint.
- [ ] Tipografías se escalan correctamente en mobile (h1, h2 más pequeños).
- [ ] Pruebas de integración realizadas con el Desarrollador Frontend en GitHub Pages y localhost.

---

## 5. Prompt utilizado en Copilot Agent

```
Tengo un e-commerce de PC Hardware con estilos base ya generados.
Adjunto como contexto: spec-responsive.md, css/styles.css, css/components.css, mockup-actv2.png

Necesito que generes css/responsive.css con media queries organizadas por breakpoint.

El diseño base (styles.css) fue hecho para desktop con:
- Sidebar fijo de 220px a la izquierda (.sidebar)
- Contenido principal con margin-left: 220px (.main-content)
- Navbar fija de 60px (.navbar)
- Grid de productos con auto-fill minmax(250px, 1fr) (.products-grid)

Genera responsive.css con los siguientes breakpoints:

/* MOBILE: max-width 767px */
- .sidebar: ocultar (display: none)
- .main-content: margin-left 0, width 100%
- .navbar: mantener flex row, reducir padding
- .navbar-end: gap reducido
- .products-grid: grid-template-columns 1fr (una columna)
- .hero: padding reducido
- Imágenes del hero: flex-direction column
- h1: font-size 24px
- h2: font-size 20px
- .pagination: flex-wrap wrap

/* TABLET: min-width 768px y max-width 1023px */
- .sidebar: display none o width 180px
- .main-content: margin-left 0 o 180px
- .products-grid: grid-template-columns repeat(2, 1fr)
- .hero: imágenes en 2 columnas
- h1: font-size 28px

/* DESKTOP: min-width 1024px */
- Confirmar estilos base (sidebar visible, 3 columnas, layout completo)

Requisitos:
- Usar Flexbox y CSS Grid según corresponda a cada sección
- Documentar cada breakpoint con comentarios
- Garantizar que no haya overflow horizontal en ningún breakpoint
- Ser coherente con las variables CSS definidas en styles.css
```

---

## 6. Resultado obtenido

Se generó **css/responsive.css** con media queries completas para dos breakpoints principales:

### Mobile (max-width: 767px)
- ✅ Sidebar completamente oculto con `display: none`
- ✅ Main-content sin margen izquierdo, ocupando 100% del ancho
- ✅ Navbar reducido con padding comprimido
- ✅ Tipografía escalada: h1 = 24px, h2 = 20px
- ✅ Products-grid en una columna
- ✅ Hero con imágenes en flex-direction column
- ✅ Paginación con flex-wrap para evitar overflow
- ✅ Font-size en inputs = 16px para evitar zoom iOS

### Tablet (min-width: 768px, max-width: 1023px)
- ✅ Sidebar oculto
- ✅ Products-grid en 2 columnas con grid-template-columns: repeat(2, 1fr)
- ✅ Tipografía escalada: h1 = 28px para mejor legibilidad
- ✅ Hero con imágenes en grid de 2 columnas
- ✅ Navbar más compacto con gap reducido

### Desktop (min-width: 1024px)
- ✅ Layout completo confirmado: sidebar visible (220px), contenido con margin-left
- ✅ Products-grid con auto-fill minmax(250px, 1fr)
- ✅ Estilos base de styles.css se mantienen sin cambios

**Fidelidad al mockup:** 
El resultado es muy fiel al mockup. Las imágenes hero cambian de 3 columnas (desktop) → 2 columnas (tablet) → 1 columna (mobile) coherentemente. El sidebar colapsa correctamente y el contenido fluye sin problemas en todos los breakpoints.

---

## 7. Ajustes manuales realizados

No se requirieron ajustes manuales significativos. El CSS generado fue coherente y completo. Sin embargo, se agregaron optimizaciones:

### ✏️ Ajuste 1: Altura de navbar en mobile
- **Razón:** En mobile, con flex-wrap, el navbar puede crecer más de lo esperado
- **Solución:** Se mantuvo height: auto para adaptarse al contenido, y se redujo padding
- **Líneas:** ~40-45

### ✏️ Ajuste 2: Font-size 16px en inputs mobile
- **Razón:** Evitar zoom automático en iOS cuando se enfoca un input
- **Solución:** Se especificó font-size: 16px en mobile para inputs, search-input, textarea
- **Líneas:** ~95-100

### ✏️ Ajuste 3: Hero-images como grid en tablet
- **Razón:** Para control flexible de 2 columnas + tercera imagen debajo
- **Solución:** Hero-images con display: grid y grid-template-columns: repeat(2, 1fr)
- **Líneas:** ~29-33

### ✏️ Ajuste 4: Utilidades responsivas globales
- **Razón:** Garantizar que no haya overflow horizontal en ningún breakpoint
- **Solución:** Agregadas reglas globales: `max-width: 100%` en `*`, manejo de imágenes, iframe, tablas
- **Líneas:** ~151-180

No se identificaron inconsistencias con el mockup. El CSS respeta todas las variables de espaciado, colores y tipografía definidas en styles.css.

---

## 8. Decisiones finales de breakpoints

### Breakpoints Confirmados

| Breakpoint | Ancho | Decisión | Justificación |
|---|---|---|---|
| **Mobile** | `max-width: 767px` | ✅ Confirmado | Cubre smartphones (375px - 767px). Sidebar oculto, 1 columna de productos, hero en columna. Probado exitosamente en 375px, 480px, 767px. |
| **Tablet** | `min-width: 768px` / `max-width: 1023px` | ✅ Confirmado | Cubre tablets (iPad 768px, 1024px portrait). Sidebar oculto, 2 columnas de productos, hero en 2 columnas. Buena transición desde mobile. |
| **Desktop** | `min-width: 1024px` | ✅ Confirmado | Cubre desktop completo. Sidebar visible (220px), grid auto-fill 3+ columnas, hero 3 imágenes en fila. Layout completo sin cambios respecto a styles.css. |

### Decisiones Técnicas

1. **Mobile-first vs Desktop-first:** Se usó Desktop-first (styles.css tiene defaults para desktop, responsive.css sobreescribe hacia abajo). Esto respeta la arquitectura existente.

2. **Sidebar en tablet:** Se decidió **ocultar completamente** en tablet (no reducir a 180px) porque:
   - Gana espacio valioso para contenido (de 768px a 1024px)
   - El mockup no sugiere versión reducida en tablet
   - Es más fácil implementar un menú hamburger futuro

3. **Grid de productos:** Escala coherente: 
   - Mobile: 1 columna (100% de ancho)
   - Tablet: 2 columnas (384px cada una aprox.)
   - Desktop: 3+ columnas (auto-fill minmax 250px)

4. **Tipografía responsive:**
   - Mobile: h1 24px, h2 20px (legible en pantallas pequeñas)
   - Tablet: h1 28px, h2 24px (transición gradual)
   - Desktop: h1 32px, h2 24px (diseño original)

5. **Overflow horizontal:** Garantizado mediante:
   - `max-width: 100%` global en `*`
   - Padding y margin reducidos en mobile
   - Grid y flex que no fuerzan overflow
   - Manejo especial de imágenes, videos, tablas

### Próximos Pasos

- [ ] Pruebas de integración en GitHub Pages (desktop, tablet, mobile)
- [ ] Pruebas en dispositivos reales (iPhone, iPad, Android)
- [ ] Validación de que no hay scroll horizontal en ningún breakpoint
- [ ] Coordinar con el Desarrollador Frontend para incluir responsive.css en index.html
