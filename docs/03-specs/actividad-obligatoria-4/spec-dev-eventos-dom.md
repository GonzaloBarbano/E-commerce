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

## AT CLOSE — (se completa al cerrar la entrega)

*Sección pendiente. Debe incluir:*

- *Prompt exacto utilizado en Copilot Agent para refactorizar `js/script.js`.*
- *Fragmento del código generado por Copilot para al menos uno de los handlers.*
- *Ajustes manuales realizados sobre el output de la IA y su justificación.*
- *Decisiones finales sobre integración con las clases de Lucas (POO + Storage).*
