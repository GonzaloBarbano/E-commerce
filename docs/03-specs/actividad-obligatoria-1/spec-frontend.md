# Spec: [Desarrollador Frontend]

spec-frontend.md — Desarrollador Frontend/CSS
1. Descripción general
Qué se va a hacer:
Generar los archivos de estilos base del sitio e-commerce PC-Hardware a partir del mockup provisto en FigJam. Se crearán dos archivos CSS: styles.css (variables, reset, tipografía, colores, layout base) y components.css (botones, cards, navegación, formularios, estados hover/focus).
Por qué:
El proyecto necesita una capa de estilos consistente y mantenible que refleje fielmente el diseño del mockup, aplicando correctamente selectores CSS, herencia, especificidad, box model y diferenciación de elementos en línea vs en bloque.

2. Análisis de Figma / Mockup
Layout general

Estructura de dos columnas: sidebar izquierdo fijo + área de contenido principal a la derecha.
Navbar horizontal en la parte superior con logo a la izquierda y links + carrito a la derecha.
Sección Hero: descripción de la tienda + 3 imágenes de producto en fila + botón CTA.
Sección "Productos Presentados": grid de cards con imagen y nombre de producto.
Paginación al pie del contenido principal.

Secciones identificadas
SecciónDescripciónNavbarLogo (PC-HARDWARE) + links (Inicio, Nosotros, Shop, Ayuda) + CarritoSidebarBuscador, Categorías, Filtros (precio, marca, specs), Enlaces rápidos, SíguenosHeroTítulo tienda + 3 imágenes producto + botón "COMPRAR AHORA"ProductosGrid de cards (imagen + nombre del producto)PaginaciónLinks numéricos al pie

Paleta de colores
TokenHexUso--color-primary#7C3AEDBotones, CTAs, navbar--color-primary-hover#6D28D9Hover de botones--color-primary-light#EDE9FEBadges, tags--color-surface-dark#1E1B2ENavbar, footer--color-surface-card#FFFFFFFondo de cards--color-bg#F8F9FAFondo general--color-border#E2E8F0Bordes, separadores--color-text#111827Texto principal--color-text-muted#64748BTexto secundario--color-success#16A34AStock disponible--color-error#DC2626Sin stock

Tipografía
Fuente: Inter — importada desde Google Fonts
TokenTamañoPesoUso--font-size-h132px700Título principal--font-size-h224px600Títulos de sección--font-size-h320px600Subtítulos--font-size-body16px400Texto general--font-size-sm14px400Categorías, filtros--font-size-nav15px500Links del navbar--font-size-price22px700Precio de producto

Espaciados y grillas
TokenValorUso--spacing-xs4pxSeparación mínima--spacing-sm8pxPadding interno pequeño--spacing-md16pxEspaciado general--spacing-lg24pxSeparación entre secciones--spacing-xl32pxMárgenes grandes--spacing-2xl48pxSeparación de secciones hero--sidebar-width220pxAncho del sidebar--navbar-height60pxAlto del navbar--border-radius8pxBordes redondeados general--border-radius-sm4pxBordes badges/tags
Componentes principales identificados

Botón primario: fondo --color-primary, texto blanco, border-radius, hover con --color-primary-hover
Card de producto: fondo blanco, borde --color-border, sombra leve, imagen superior + nombre inferior
Navbar: fondo --color-surface-dark, flex con space-between, links con --color-text-muted
Input buscador: borde --color-border, padding interno, width 100%
Checkboxes filtros: estilo nativo con label asociado
Links de categoría/sidebar: display block, font-size-sm, color-text-muted, hover color-primary


3. Criterios de aceptación

 Variables CSS definidas en :root con todos los tokens de color, tipografía y espaciado.
 Reset CSS aplicado (box-sizing, margin/padding 0, etc.).
 Fuente Inter importada desde Google Fonts y aplicada globalmente.
 Layout base con sidebar + contenido principal definido en styles.css.
 Navbar estilizado con fondo oscuro, flex y links correctamente espaciados.
 Botón primario con hover y focus estilizados en components.css.
 Cards de producto con imagen, nombre y sombra leve.
 Input de búsqueda con estilos coherentes al diseño.
 Selectores con especificidad correcta (sin uso innecesario de !important).
 Box model explícito: padding, margin y border definidos conscientemente.
 Diferenciación correcta entre elementos inline y block.
 Comentarios explicativos en el código sobre decisiones de estilo.
 Pruebas de integración coordinadas con Especialista en Responsive en GitHub Pages y localhost.


4. Archivos a generar
ArchivoContenidocss/styles.cssVariables CSS en :root, reset, tipografías, colores, layout basecss/components.cssBotones, cards, navegación, formularios, estados hover/focus

5. Prompt utilizado en Copilot Agent
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