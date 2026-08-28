# Spec: Desarrollador JS Eventos + DOM — AO4

## Metadata

- **Rol:** Desarrollador JS Eventos + DOM
- **Autor:** @Naguirre0102 (Nicolás Aguirre)
- **Fecha inicio:** 2026-07-02
- **Entrega:** Actividad Obligatoria N°4 — Programación Web I (UCES)
- **Rama de trabajo:** `feature/dev-eventos-dom`

## Contexto

**El punto de partida es `js/script.js` post-AO3:** ~700 líneas que contienen datos del catálogo, funciones puras (validaciones, cálculos, serializadores) y 4 funciones orquestadoras (`cotizadorInteractivo`, `verificadorCompatibilidad`, `carritoSimulador`, `buscadorProductos`) que usan `prompt()`/`alert()` para input/output, más `iniciarMenu()` que es un `while` con `switch`.

**La consigna AO4 exige eliminar por completo `prompt()` y `alert()`** (penalización -0.5 pts al grupo si quedan). La interacción del usuario debe pasar a HTML (forms + eventos DOM) y las salidas a manipulación del DOM (crear elementos, actualizar contenido, aplicar clases CSS).

---

## BEFORE — Plan de trabajo

### Objetivo

Refactorizar `js/script.js` a un **controlador puro** de eventos DOM + agregar al `index.html` una nueva sección con 4 UIs (una por flujo), reemplazando la interacción vía `prompt/alert` por formularios HTML con validación en tiempo real y feedback visual.

### Filosofía

**Cirugía mínima + convivencia con el e-commerce actual:**

- **NO** rehacer el `index.html` completo. Se mantiene todo lo actual (navbar, hero, catálogo de productos, modal, footer).
- **SÍ** agregar una `<section id="simulador">` nueva al final del `<main>` con los 4 flujos como cards colapsibles (Bootstrap 5.3 accordion — ya disponible en el proyecto por el Primer Parcial).
- Los orquestadores actuales de `script.js` **desaparecen**; su lógica pasa a **handlers de eventos** (uno por form) que invocan métodos de las clases del dominio de Lucas.

### Arquitectura del nuevo `js/script.js`

```
[Imports/globals de las clases]
     ↓
[DOMContentLoaded listener → init()]
     ↓
[init(): cargar estado desde StorageUtil, configurar event listeners]
     ↓
[Handlers específicos, uno por form:]
   - handleCotizadorSubmit(event)
   - handleCompatibilidadSubmit(event)
   - handleCarritoAgregarSubmit(event)
   - handleBuscadorSubmit(event)
     ↓
[Helpers de DOM:]
   - renderResumenCotizacion(cot, contenedor)
   - renderResumenCompatibilidad(informe, contenedor)
   - renderCarrito(carrito, contenedor)
   - renderResultadosBusqueda(resultados, contenedor)
   - mostrarError(mensaje, contenedor)
   - validarInputTiempoReal(input) → aplica clases is-valid / is-invalid de Bootstrap
```

### Patrón homogéneo elegido para handlers

Todos los handlers siguen el mismo patrón:

```javascript
function handleXxxSubmit(event) {
  event.preventDefault();
  try {
    const formData = capturarInputs(event.target);
    if (!validar(formData)) {
      mostrarError('...', contenedorResultado);
      return;
    }
    const resultado = new Clase(...formData).operacion();
    render(resultado, contenedorResultado);
    // Persistir si aplica
    StorageUtil.guardar('pc:xxx', resultado.toJSON(), 'local');
  } catch (err) {
    mostrarError(`Error: ${err.message}`, contenedorResultado);
    console.error(err);
  }
}
```

Ventajas:

- `event.preventDefault()` evita reload del form.
- `try/catch` envuelve toda la lógica y muestra errores en el DOM (no crashea).
- Delegación clara: `script.js` **no** contiene lógica de negocio; delega a las clases de Lucas.

### Wireframe de la nueva `<section id="simulador">`

```
+------------------------------------------------------------+
| <section id="simulador" class="container my-5">            |
|                                                            |
|   <h2>Simulador PC Hardware</h2>                           |
|                                                            |
|   <div class="accordion" id="acc-simulador">               |
|     +--------------------------------------------------+   |
|     | ▼ Flujo 1: Cotizador de Productos                |   |
|     |   +--------------------------------------------+ |   |
|     |   | <form id="form-cotizador">                 | |   |
|     |   |   <select> categoría                       | |   |
|     |   |   <input type="number"> cantidad (1-100)   | |   |
|     |   |   <button type="submit">Cotizar</button>   | |   |
|     |   | </form>                                    | |   |
|     |   | <div id="resultado-cotizador"></div>       | |   |
|     |   +--------------------------------------------+ |   |
|     +--------------------------------------------------+   |
|     | ▶ Flujo 2: Verificador de Compatibilidad         |   |
|     +--------------------------------------------------+   |
|     | ▶ Flujo 3: Simulador de Carrito                  |   |
|     +--------------------------------------------------+   |
|     | ▶ Flujo 4: Buscador de Productos                 |   |
|     +--------------------------------------------------+   |
|   </div>                                                   |
| </section>                                                 |
+------------------------------------------------------------+
```

**Detalles por card:**

| Card | Inputs | Botón | Output |
|---|---|---|---|
| Cotizador | `<select>` categoría (6 opciones) + `<input number>` cantidad | Cotizar | `<div>` con resumen: categoría, cantidad, descuento, subtotal, IVA, total |
| Compatibilidad | `<input number>` TDP CPU + `<input number>` TDP GPU | Verificar | `<div>` con consumo estimado + fuente recomendada o advertencia |
| Carrito | `<select>` producto (6 del catálogo) + `<input number>` cantidad | Agregar al carrito | `<ul>` con items + subtotal + IVA + total; botón "vaciar carrito"; persiste en `localStorage` |
| Buscador | `<select>` categoría (con opción "todas") + `<input number>` precio máx | Buscar | `<table>` con productos filtrados, ordenados por precio |

### Integración con Storage (coordinación con Lucas)

- **Cotizador:** al calcular, se guarda la última cotización en `sessionStorage` bajo la clave `pc:ultimaCotizacion`. Al recargar la página, se muestra el último resumen automáticamente.
- **Carrito:** el estado del carrito persiste en `localStorage` bajo la clave `pc:carrito` para que sobreviva refresh y cierre del browser. Se carga en el `init()`.
- **Compatibilidad y Buscador:** no persisten (efímeros).

### Validación en tiempo real

- Cada `<input>` numérico tiene evento `input` que valida rango y aplica clases Bootstrap `is-valid` / `is-invalid`.
- Cada `<select>` tiene evento `change` que valida que no sea la opción placeholder.
- El botón submit queda deshabilitado si el form no es válido (`form.checkValidity()`).

### Herramientas

- **GitHub Copilot en modo Agente** (obligatorio por consigna 2.2.9). Prompt esperado (draft): *"Con las clases de `js/models/*.js` (Producto, Carrito, Cotizacion) + este spec + el `index.html` actual como contexto, refactorizá `js/script.js` a un controlador puro de eventos DOM. Sin lógica de negocio. Reemplazá todos los `prompt()` y `alert()` por interacciones HTML. Usá el patrón homogéneo de handlers documentado en este spec."*
- **Bootstrap 5.3 accordion + form-validation** — ya disponible en el proyecto.

## Criterios de aceptación

Eventos + DOM (0.2 pts del spec + 2.3 pts de implementación):

- [ ] Este `spec-dev-eventos-dom.md` commiteado antes que cualquier modificación a `js/script.js` (verificable en historial git).
- [ ] `js/script.js` refactorizado como controlador puro (sin lógica de negocio, solo eventos + DOM).
- [ ] `iniciarMenu()` eliminado. La llamada `iniciarMenu();` al final del archivo también.
- [ ] Todos los `prompt()` y `alert()` eliminados. Verificado con `grep -rn "prompt(\|alert(" js/`.
- [ ] Nueva sección `<section id="simulador">` agregada al `index.html` sin modificar el e-commerce actual (navbar, hero, catálogo, modal, footer intactos).
- [ ] 4 forms con inputs adecuados, validación en tiempo real y feedback visual (Bootstrap `is-valid`/`is-invalid`).
- [ ] 4 handlers submit implementados siguiendo el patrón homogéneo con `try/catch`.
- [ ] Manipulación del DOM para mostrar resultados (creación de elementos, actualización de contenido, aplicación de clases CSS).
- [ ] Integración con `StorageUtil` para persistir carrito (localStorage) y última cotización (sessionStorage).
- [ ] Carrito se restaura desde `localStorage` al cargar la página.
- [ ] Manejo de errores: si una clase o storage tira `Error`, se muestra en el DOM (no crashea el JS).
- [ ] Código limpio: nombres descriptivos, JSDoc en handlers y helpers, indentación consistente.

## Referencias

- Consigna oficial AO4 — sección 3.1.2 (Desarrollador JS Eventos + DOM).
- Bibliografía Unidad 4 — DOM y Eventos (páginas 322-335 del libro Gauchat 2017; capítulo 12 de Haverbeke 2018).
- `js/script.js` post-AO3 (700 líneas) — punto de partida a refactorizar.
- `index.html` post-AO3 — punto de partida a extender (sin tocar lo existente).

---

## AT CLOSE — 03/07/2026

### Herramienta IA utilizada

**Claude Code** (asistente IA en modo agente, Anthropic) para el refactor completo de `js/script.js` y la inserción de la `<section id="simulador">` en el `index.html`. Se lo alimentó con el spec BEFORE de este rol, las funciones puras del `js/script.js` post-AO3 (700 líneas), el `index.html` actual, y el spec del rol POO de Lucas (para conocer la API de las clases que iban a existir en `js/models/`).

Nota: la consigna AO4 sugiere GitHub Copilot Agent Mode; se optó por Claude Code por familiaridad del equipo (mismo uso que en AO3).

### Prompt utilizado con Claude Code

```text
Con el js/script.js actual (700 líneas con orquestadores prompt/alert)
+ el spec-dev-eventos-dom.md + el spec-dev-poo.md de Lucas + el
index.html actual como contexto, refactorizá js/script.js para que
sea un CONTROLADOR PURO:

- Sin lógica de negocio: toda la lógica va a las clases del dominio
  de Lucas (Producto, Carrito, Cotizacion en js/models/).
- Sin prompt() ni alert(): todas las entradas por forms HTML, todas
  las salidas por manipulación del DOM.
- 4 handlers submit siguiendo el patrón homogéneo del spec:
  event.preventDefault() → try/catch → capturar inputs → invocar
  clase de dominio → renderizar en el DOM → persistir vía StorageUtil.
- init() en DOMContentLoaded que restaura el carrito (localStorage
  key pc:carrito) y la última cotización (sessionStorage key
  pc:ultimaCotizacion).
- Preservar la función inicializarModalProducto() heredada del
  Primer Parcial.
- Eliminar iniciarMenu() y la llamada al final del archivo.
```

### Fragmento del código generado

El handler del cotizador quedó como caso más representativo del patrón homogéneo:

```javascript
function handleCotizadorSubmit(event) {
  event.preventDefault();
  var contenedor = document.getElementById("resultado-cotizador");
  try {
    var categoria = document.getElementById("cot-categoria").value;
    var cantidad = parseInt(document.getElementById("cot-cantidad").value, 10);
    var precio = preciosPorCategoria[categoria];
    if (typeof precio !== "number") {
      throw new Error("Categoría inválida");
    }
    var cot = new Cotizacion(categoria, cantidad, precio);
    contenedor.innerHTML = renderResumenCotizacion(cot);
    StorageUtil.guardar("pc:ultimaCotizacion", cot.toJSON(), "session");
  } catch (err) {
    mostrarError(contenedor, err.message);
    console.error(err);
  }
}
```

Los otros 3 handlers (compatibilidad, carrito, buscador) siguen exactamente el mismo esqueleto — solo cambian las clases invocadas y los helpers de render.

### Ajustes manuales sobre el output de la IA

1. **Guarda de dependencias `dependenciasPOOStorageDisponibles()`** — el `init()` original crasheaba si `Producto`/`Carrito`/`Cotizacion`/`StorageUtil` no estaban cargados. Se agregó una verificación con `typeof X !== "undefined"` para las 4 dependencias; si alguna falta, el simulador se deshabilita elegantemente y **no rompe el modal del Primer Parcial** ni el resto del e-commerce. Esto permitió commitear el refactor de `script.js` a la rama de Nico ANTES de que Lucas mergeara sus clases (etapa de la Fase 2 del roadmap AO4).
2. **Función `escaparHTML()`** — se agregó para escapar las cadenas que vienen del catálogo/inputs antes de usarlas con `innerHTML`. Sin este escape, un producto con nombre `<script>alert('XSS')</script>` en el catálogo ejecutaría JS al renderizarse en el carrito. Con `escaparHTML`, se sanitiza a `&lt;script&gt;...`. No estaba en el spec original, agregado como buena práctica de seguridad.
3. **`renderResumenCotizacion` como `<pre>`** en vez de HTML formateado — se optó por preservar el output textual de `cot.generarResumen()` (con `\n`) usando `<pre>`. Simplifica la integración con el método de Lucas (no requiere que Cotizacion devuelva HTML) y hace el resumen fácilmente copiable.
4. **`renderCarrito` sin usar `Carrito.toJSON` internamente** — el render iterá directamente sobre `carrito.items[]` para armar el `<ul>` en vez de serializar-parsear-serializar. Más simple y directo.

### Decisiones finales sobre integración con POO + Storage

- **Contrato de storage keys firmado en los specs BEFORE.** Antes de escribir código, `spec-dev-eventos-dom.md` (Nico) y `spec-dev-storage.md` (Lucas) acordaron `pc:carrito` (localStorage) y `pc:ultimaCotizacion` (sessionStorage). Lucas ajustó su implementación con un commit específico (`fix(storage): alinear claves con spec`) para matchear.
- **Sin cambios en las clases de Lucas post-integración.** El `js/script.js` invoca `new Cotizacion(cat, cant, precio)`, `new Carrito()`, `carrito.agregar(producto, cantidad)`, `carrito.calcularTotal()`, `StorageUtil.guardar(...)`, `Producto.fromJSON(...)`, `Carrito.fromJSON(...)`, `Cotizacion.fromJSON(...)` — todas con la API acordada. No hizo falta modificar código de Lucas ni de Nico post-merge.
- **`carrito.agregar` no muta `producto.stock`.** Decisión de diseño acordada con Lucas: el decremento de stock queda fuera de la responsabilidad de `Carrito`. Si en AO5 se quisiera implementar, se agregaría una clase `Catalogo` que orqueste el descuento. En AO4 se omite (cirugía mínima).
- **`carrito` global como única variable de estado.** El controlador `js/script.js` mantiene una única variable de estado global (`var carrito = null`) inicializada en `init()`. No se usan closures ni módulos porque toda la lógica de negocio vive en las clases; el controlador solo orquesta.

### Verificación end-to-end

Los 20 tests E2E automatizados con Playwright (ver `docs/07-testing-ao4/reporte-e2e.md`) validan que este controlador funciona correctamente end-to-end contra las clases y el StorageUtil de Lucas. **20/20 PASS**.
