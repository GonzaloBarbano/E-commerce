# Spec Maestro: E-commerce de Hardware para PC

## Plan de Primera Entrega - Arquitectura Base y Esqueleto Semántico

---

## 1. Contexto del Proyecto

### Propósito

Este proyecto es un **E-commerce especializado en la venta de componentes y hardware para computadoras personales (PC)**. La plataforma permitirá a usuarios (tanto novatos como entusiastas) explorar un catálogo completo de componentes tecnológicos, comprender sus especificaciones técnicas y adquirir productos para armar o actualizar sus sistemas informáticos.

### Productos Principales

- **Procesadores (CPUs)**: Intel Core, AMD Ryzen
- **Tarjetas Gráficas (GPUs)**: NVIDIA GeForce, AMD Radeon
- **Placas Madre**: Soporte para múltiples sockets (LGA, AM4, etc.)
- **Memoria RAM**: DDR4, DDR5 con diferentes capacidades
- **Almacenamiento**: SSD, HDD, NVMe
- **Fuentes de Alimentación**: 80 Plus, certificaciones de eficiencia
- **Refrigeración**: Ventiladores, liquid cooling
- **Periféricos**: Teclados, ratones, monitores

### Alcance de la Primera Entrega

En esta primera entrega nos enfocamos en establecer:

1. La **arquitectura HTML5 profesional y escalable** de la plataforma
2. El **esqueleto semántico** con estructura base de navegación, catálogo y carrito
3. La **preparación de la estructura** para interactividad futura (filtros dinámicos, búsqueda, carrito)
4. La **documentación técnica** por rol (Frontend, UX, DevOps, IA)
5. El **registro de decisiones y prompts** utilizados en el planning y diseño

---

## 2. Objetivos del Proyecto

### Objetivos Generales

1. **Crear una base sólida y escalable**: HTML5 semántico que pueda crecer con nuevas funcionalidades sin refactoring mayor
2. **Documentar el flujo de trabajo por especialidad**: Cada rol (Frontend, UX, DevOps, IA) tiene claros sus requerimientos y entregables
3. **Establecer prácticas de Spec-Driven Development**: Toda tarea debe estar especificada antes de codificar

### Objetivos Específicos para Primera Entrega

- Implementar estructura semántica HTML5 con header, nav, main, footer
- Crear molde para catálogo de productos con estructura tabular y de lista
- Diseñar área visual para carrito de compras (sin funcionalidad interactiva aún)
- Preparar espacios marcados para búsqueda y filtrado de productos
- Incluir sección educativa de compatibilidad entre componentes
- Documentar especificaciones por rol en `docs/specs/`
- Registrar al menos 5 prompts utilizados en el proceso de planificación

---

## 3. Requerimientos Funcionales

### RF1 - Catálogo de Componentes

**Descripción**: La plataforma debe mostrar una lista completa de productos, organizados y visualizables desde la página principal.

**Especificación Técnica**:

- Estructura de lista (`<ul>` o tabla `<table>`) con productos disponibles
- Cada producto es una entidad independiente con información clara
- Preparación para cargar dinámicamente desde una futura API REST
- Método de visualización inicial: tabla semántica con filas y columnas

**Criterios de validación**:

- ✅ Lista/tabla visible con mínimo 5 productos de ejemplo
- ✅ Cada producto tiene al menos nombre y precio

---

### RF2 - Ficha Técnica del Producto

**Descripción**: Cada producto debe exponer sus especificaciones clave de manera clara y estructurada.

**Especificación Técnica**:

- Campos obligatorios por producto:
  - **Marca**: (ej. Intel, NVIDIA, Corsair)
  - **Modelo**: (ej. RTX 4090, Ryzen 9 7950X)
  - **Precio**: Formato monetario claro (ej. $1,299.99 USD)
  - **Stock**: Cantidad disponible
  - **Especificaciones clave**:
    - Procesadores: GHz, núcleos, caché
    - GPUs: VRAM, CUDA cores, consumo TDP
    - Propiedades específicas del producto
- Estructura HTML clara y semántica para futura extracción de datos

**Criterios de validación**:

- ✅ Campos de datos completos en cada producto
- ✅ Información técnica estructurada y legible

---

### RF3 - Categorización de Productos

**Descripción**: La estructura HTML está preparada y lista para soportar navegación por categorías de componentes.

**Especificación Técnica**:

- Menú de navegación (`<nav>`) que lista categorías principales:
  - Procesadores
  - Tarjetas Gráficas
  - Memoria RAM
  - Almacenamiento
  - Fuentes de Alimentación
  - Refrigeración
  - Periféricos
- Estructura preparada para filtrado por categoría (sin funcionalidad interactiva aún)
- Comentarios en código indicando dónde se implementará la lógica de filtrado

**Criterios de validación**:

- ✅ Menú de navegación semántico presente
- ✅ Estructura lista para futura funcionalidad de filtrado

---

### RF4 - Carrito de Compras

**Descripción**: Área designada en la interfaz para mostrar productos seleccionados por el usuario.

**Especificación Técnica**:

- Sección `<aside>` o `<section>` con identificador claro para el carrito
- Estructura tabular o listado de productos seleccionados
- Columnas: Producto, Cantidad, Precio unitario, Subtotal
- Área para mostrar total y cantidad de items
- Comentarios indicando futura implementación de lógica add/remove

**Criterios de validación**:

- ✅ Área del carrito visible y estructurada
- ✅ Placeholders o ejemplos de items en el carrito

---

### RF5 - Buscador y Filtros

**Descripción**: Interfaz preparada para búsqueda por texto y filtrado por atributos (marca, precio, especificaciones).

**Especificación Técnica**:

- **Buscador**: Campo `<input type="search">` con label descriptivo
- **Filtros disponibles**:
  - Por marca (checkboxes o select)
  - Por rango de precio (inputs numéricos o slider)
  - Por especificación clave (ej. VRAM para GPUs)
- Botón de búsqueda/filtrado
- Comentarios indicando futura implementación de lógica de filtrado

**Criterios de validación**:

- ✅ Formulario de búsqueda presente y semánticamente correcto
- ✅ Controles de filtrado estructurados

---

### RF6 - Contenido Educativo y Compatibilidad

**Descripción**: Información educativa que ayude a usuarios a entender compatibilidad entre componentes.

**Especificación Técnica**:

- Sección dedicada con contenido sobre:
  - "¿Qué fuente necesita esta GPU?" (tabla de compatibilidad TDP)
  - "Socket compatibility" para procesadores y placas madre
  - Especificaciones de compatibilidad de RAM
  - Guías rápidas de ensamblaje
- Estructura semántica con `<section>`, `<article>`, listas y tablas
- Ejemplos y recomendaciones

**Criterios de validación**:

- ✅ Sección educativa presente con mínimo 2 temas de compatibilidad
- ✅ Contenido estructurado y legible

---

## 4. Requerimientos No Funcionales

### RNF1 - Usabilidad

**Criterios**:

- La interfaz es simple, clara y fácil de navegar
- Estructura jerárquica evidente con headings (`<h1>`, `<h2>`, `<h3>`)
- Contraste adecuado entre elementos (preparado para CSS)
- Navegación intuitiva entre secciones
- Accesibilidad semántica mejorada con etiquetas HTML5

---

### RNF2 - Compatibilidad

**Criterios**:

- La página funciona correctamente en navegadores modernos (Chrome, Firefox, Safari, Edge)
- HTML5 válido según especificación W3C
- No depende de JavaScript para estructura básica (progressive enhancement)
- Compatible con dispositivos móviles (estructura responsive-ready)

---

### RNF3 - Estructura y Mantenibilidad del Código

**Criterios**:

- Código HTML bien comentado e indentado
- Estructura de carpetas clara (`docs/specs/`, `docs/prompts/`)
- Nombres de elementos, clases e ids significativos
- Documentación en README.md sobre estructura del proyecto
- Archivo `plan.md` como guía maestra de requerimientos

---

### RNF4 - Escalabilidad

**Criterios**:

- Estructura preparada para agregar nuevos productos sin modificar layout
- Clases CSS y IDs pensadas para futura extensión
- Separación clara de concerns (presentación, datos, interactividad)
- Comentarios indicando puntos de extensión futura

---

## 5. Criterios de Aceptación (Checklist de Entrega)

### Documentación y Planning

- [ ] **plan.md** presente con estructura completa (Contexto, Objetivos, Requerimientos F/NF, Criterios)
- [ ] **README.md** con descripción clara del proyecto y estructura de carpetas
- [ ] **docs/02-prompts/** contiene al menos **5 archivos** `prompts-*.md` con:
  - Prompt real utilizado
  - Modelo de IA usado (ChatGPT, Gemini, Claude, Copilot, Cursor, etc.)
  - Resultado y aporte al proyecto
  - Decisión técnica derivada

### Especificaciones por Rol

- [ ] `docs/specs/spec-frontend.md` - Estructura HTML, componentes visuales
- [ ] `docs/specs/spec-ux.md` - Flujo de usuario, wireframes, accesibilidad
- [ ] `docs/specs/spec-devops.md` - Estructura de carpetas, deployments
- [ ] `docs/specs/spec-ia.md` - Aplicación de IA en features (búsqueda, recomendaciones)

### Implementación HTML

- [ ] `index.html` con estructura HTML5 válida
  - [ ] `<header>` semántico con logo/título del E-commerce
  - [ ] `<nav>` con menú de categorías
  - [ ] `<main>` como contenedor principal
    - [ ] Sección de catálogo (lista/tabla de productos)
    - [ ] Sección de búsqueda y filtros
    - [ ] Sección de carrito de compras
    - [ ] Sección educativa de compatibilidad
  - [ ] `<footer>` con información general
  - [ ] Comentarios claros indicando áreas de futuro CSS y JavaScript

### Contenido del Catálogo

- [ ] Mínimo **5 productos de ejemplo** con campos completos:
  - Marca
  - Modelo
  - Precio
  - Stock
  - Especificaciones técnicas clave
- [ ] Productos distribuidos entre al menos **3 categorías diferentes**
- [ ] Datos realistas (precios reales, especificaciones verdaderas)

### Estructura del Código

- [ ] Indentación consistente y legible
- [ ] Nombres de clases e ids descriptivos
- [ ] Comentarios explicativos en secciones clave
- [ ] Sin código comentado sin propósito
- [ ] Validación HTML5 correcta (sin errores de estructura)

### Preparación para Futura Interactividad

- [ ] Comentarios `<!-- TODO: Implementar búsqueda dinámica -->` en áreas relevantes
- [ ] Comentarios `<!-- TODO: Agregar estilos CSS para... -->` en secciones visuales
- [ ] Comentarios `<!-- TODO: Implementar carrito interactivo -->` en sección de carrito
- [ ] IDs y clases preparadas para futura selección por JavaScript

### Control de Versión y Entrega

- [ ] Repositorio Git actualizado con commits significativos
- [ ] Branch `release/actividad-obligatoria-1` con cambios finales
- [ ] Pull Request creado con descripción detallada
- [ ] Todos los archivos en el repositorio sin archivos temporales

---

## 6. Notas Finales de Desarrollo

### Enfoque de Spec-Driven Development

- **Especificar antes de codificar**: Cada tarea debe tener su spec en `docs/specs/`
- **Documentar decisiones**: Registrar prompts y su aporte al proyecto
- **Validar contra criterios**: Usar este checklist como validación final

### Flujo de Trabajo Recomendado

1. Leer y comprender este `plan.md` completo
2. Redactar especificaciones por rol en `docs/specs/`
3. Generar y documentar prompts útiles en `docs/02-prompts/`
4. Implementar `index.html` según especificaciones
5. Validar contra criterios de aceptación
6. Preparar PR con descripción clara y referencia a specs

### Pautas de Código

- Usa comentarios HTML para marcar secciones (`<!-- ===== SECCIÓN ===== -->`)
- Documenta todas las decisiones técnicas en comments
- Deja claros marcadores de futuras funcionalidades JavaScript y CSS

---

**Fecha de creación del plan**: Abril 2026  
**Versión**: 1.0 - Spec Maestro para Primera Entrega  
**Estado**: Ready for Development
<<<<<<< HEAD


---

## Actividad Obligatoria N° 2: Estilos, Layout y Responsive Design

### 1. Objetivos de la Entrega
El objetivo de esta segunda fase es transformar el esqueleto semántico de la Actividad 1 en una interfaz visualmente atractiva, estructurada y adaptable a cualquier dispositivo, siguiendo un estricto flujo de trabajo colaborativo.

### 2. Requerimientos Técnicos (Frontend & UX)
- **Estilos Visuales:** Aplicar la paleta de colores, tipografías y espaciados definidos en el mockup de Figma (`diseño-con-estilos.png`).
- **Layout Avanzado:** Implementar el catálogo de productos de hardware y las secciones principales utilizando **CSS Flexbox** y **CSS Grid**.
- **Diseño Responsivo:** Garantizar que la página sea completamente funcional en dispositivos móviles y tablets mediante el uso de **Media Queries** en CSS.
- **Integridad Semántica:** Mantener intacta la estructura HTML5 y de accesibilidad lograda en la entrega anterior.

### 3. Sistema de Diseño

> Referencia visual: [Mockup en Figma](https://www.figma.com/design/LdjthTrqI614Fyr0M8bjF6/%22E-commerce---Mockup-Inicial--copia-?node-id=0-1)  
> Imagen exportada: `docs/01-mockup/actividad-obligatoria-2/diseño-con-estilos.png`

#### Paleta de Colores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#7C3AED` | Botones, CTAs, navbar |
| `--color-primary-hover` | `#6D28D9` | Hover de botones |
| `--color-primary-light` | `#EDE9FE` | Badges, tags |
| `--color-surface-dark` | `#1E1B2E` | Navbar, footer |
| `--color-surface-card` | `#FFFFFF` | Fondo de cards |
| `--color-bg` | `#F8F9FA` | Fondo general |
| `--color-border` | `#E2E8F0` | Bordes, separadores |
| `--color-text` | `#111827` | Texto principal |
| `--color-text-muted` | `#64748B` | Texto secundario |
| `--color-success` | `#16A34A` | Stock disponible |
| `--color-error` | `#DC2626` | Sin stock |

#### Tipografía

**Fuente:** Inter — `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`

| Token | Tamaño | Peso | Uso |
|---|---|---|---|
| `--font-size-h1` | 32px | 700 | Título principal |
| `--font-size-h2` | 24px | 600 | Títulos de sección |
| `--font-size-h3` | 20px | 600 | Subtítulos |
| `--font-size-body` | 16px | 400 | Texto general |
| `--font-size-sm` | 14px | 400 | Categorías, filtros |
| `--font-size-nav` | 15px | 500 | Links del navbar |
| `--font-size-price` | 22px | 700 | Precio de producto |

#### Espaciados y Componentes

| Token | Valor | Uso |
|---|---|---|
| `--navbar-height` | 64px | Alto del navbar |
| `--sidebar-width` | 240px | Ancho del sidebar |
| `--card-padding` | 16px | Padding interno de cards |
| `--page-padding-x` | 32px | Padding horizontal de página |
| `--gap-cards` | 24px | Separación entre cards |
| `--radius-md` | 6px | Border-radius de botones |
| `--radius-lg` | 8px | Border-radius de cards |

### 4. Flujo de Trabajo y Calidad (DevOps & QA)
- **Gestión de Ramas:** Todo desarrollo nuevo debe hacerse en ramas `feature/` que nacen de `develop`.
- **Estandarización:** Uso obligatorio del template para Pull Requests. Cada PR debe estar vinculada a un Issue.
- **Code Review con IA:** El equipo de DevOps realizará un mínimo de 4 revisiones de código utilizando **Copilot Agent** directamente sobre los diffs, para asegurar la calidad y coherencia con el diseño.
- **Despliegue:** La entrega culminará con la fusión hacia `release/actividad-obligatoria-2` y su despliegue público en **GitHub Pages**.
=======
>>>>>>> 18c700dcba717cf6d197cae4c117305b4fe380aa
