# Spec: Desarrollador Frontend/CSS — Actividad Obligatoria 2

## 1. Descripción general

**Qué se va a hacer:**
Generar los archivos de estilos base del sitio e-commerce PC-Hardware a partir del mockup provisto en FigJam. Se crearán dos archivos CSS: styles.css (variables, reset, tipografía, colores, layout base) y components.css (botones, cards, navegación, formularios, estados hover/focus).

**Por qué:**
El proyecto necesita una capa de estilos consistente y mantenible que refleje fielmente el diseño del mockup, aplicando correctamente selectores CSS, herencia, especificidad, box model y diferenciación de elementos en línea vs en bloque.

---

## 2. Análisis de Figma / Mockup

### Layout general

- Estructura de dos columnas: sidebar izquierdo fijo + área de contenido principal a la derecha.
- Navbar horizontal en la parte superior con logo a la izquierda y links + carrito a la derecha.
- Sección Hero: descripción de la tienda + 3 imágenes de producto en fila + botón CTA.
- Sección "Productos Presentados": grid de cards con imagen y nombre de producto.
- Paginación al pie del contenido principal.

### Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| --color-primary | #7C3AED | Botones, CTAs, navbar |
| --color-primary-hover | #6D28D9 | Hover de botones |
| --color-primary-light | #EDE9FE | Badges, tags |
| --color-surface-dark | #1E1B2E | Navbar, footer |
| --color-surface-card | #FFFFFF | Fondo de cards |
| --color-bg | #F8F9FA | Fondo general |
| --color-border | #E2E8F0 | Bordes, separadores |
| --color-text | #111827 | Texto principal |
| --color-text-muted | #64748B | Texto secundario |
| --color-success | #16A34A | Stock disponible |
| --color-error | #DC2626 | Sin stock |

### Tipografía

Fuente: Inter — importada desde Google Fonts

| Token | Tamaño | Peso | Uso |
|---|---|---|---|
| --font-size-h1 | 32px | 700 | Título principal |
| --font-size-h2 | 24px | 600 | Títulos de sección |
| --font-size-h3 | 20px | 600 | Subtítulos |
| --font-size-body | 16px | 400 | Texto general |
| --font-size-sm | 14px | 400 | Categorías, filtros |
| --font-size-nav | 15px | 500 | Links del navbar |
| --font-size-price | 22px | 700 | Precio de producto |

---

## 3. Criterios de aceptación

- [ ] Variables CSS definidas en `:root` con todos los tokens de color, tipografía y espaciado.
- [ ] Reset CSS aplicado (box-sizing, margin/padding 0, etc.).
- [ ] Fuente Inter importada desde Google Fonts y aplicada globalmente.
- [ ] Layout base con sidebar + contenido principal definido en styles.css.
- [ ] Navbar estilizado con fondo oscuro, flex y links correctamente espaciados.
- [ ] Botón primario con hover y focus estilizados en components.css.
- [ ] Cards de producto con imagen, nombre y sombra leve.
- [ ] Input de búsqueda con estilos coherentes al diseño.
- [ ] Selectores con especificidad correcta (sin uso innecesario de !important).
- [ ] Box model explícito: padding, margin y border definidos conscientemente.
- [ ] Diferenciación correcta entre elementos inline y block.
- [ ] Comentarios explicativos en el código sobre decisiones de estilo.

---

## 4. Archivos a generar

| Archivo | Contenido |
|---|---|
| css/styles.css | Variables CSS en :root, reset, tipografías, colores, layout base |
| css/components.css | Botones, cards, navegación, formularios, estados hover/focus |

---

## 5. Prompt utilizado en Copilot Agent

Tengo un e-commerce de PC Hardware con el siguiente mockup y sistema de diseño.
Adjunto: mockup-actv2.png, este spec-frontend.md

Necesito que generes dos archivos CSS:

1. css/styles.css con:
   - @import de la fuente Inter desde Google Fonts
   - Variables CSS en :root con todos los tokens de color, tipografía y espaciado definidos en el spec
   - Reset CSS: box-sizing border-box, margin 0, padding 0 para todos los elementos
   - Estilos base para body, h1-h3, p, a, ul
   - Layout base con sidebar izquierdo fijo de 220px y área de contenido principal usando flexbox
   - Navbar con fondo --color-surface-dark, altura 60px, display flex, justify-content space-between
   - Comentarios explicativos en cada sección del código

2. css/components.css con:
   - Botón primario (.btn-primary): fondo --color-primary, texto blanco, padding, border-radius 8px, hover con --color-primary-hover, transición suave
   - Card de producto (.product-card): fondo blanco, borde --color-border, border-radius 8px, box-shadow leve, overflow hidden
   - Input buscador (.search-input): width 100%, borde --color-border, padding, border-radius 4px, focus con outline --color-primary
   - Links de navbar (.nav-link): color --color-text-muted, font-size 15px, font-weight 500, hover color --color-primary
   - Links de sidebar (.sidebar-link): display block, font-size 14px, color --color-text-muted, hover color --color-primary
   - Paginación (.pagination): display flex, gap, botones con borde y hover

Requisitos técnicos:
- Aplicar selectores, herencia y especificidad de forma correcta (sin !important innecesario)
- Box model explícito: definir padding, margin y border conscientemente en cada componente
- Diferenciar elementos inline y block con estilos apropiados
- Dejar comentarios explicativos sobre decisiones de estilo.
