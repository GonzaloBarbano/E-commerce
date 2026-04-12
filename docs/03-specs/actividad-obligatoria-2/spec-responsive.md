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

> *(Completar después de ejecutar Copilot Agent)*
> Describir qué generó Copilot, qué tan fiel fue al mockup, si hubo inconsistencias.

---

## 7. Ajustes manuales realizados

> *(Completar después de revisar el output de Copilot)*
> Listar qué se tuvo que corregir manualmente y por qué.

---

## 8. Decisiones finales de breakpoints

> *(Completar al cerrar la tarea)*
> Confirmar los breakpoints definitivos con justificación basada en las pruebas realizadas.
