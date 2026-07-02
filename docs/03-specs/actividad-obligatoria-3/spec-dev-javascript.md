# spec-dev-javascript.md

**Rol:** Desarrollador JavaScript  
**Integrante:** Lucas — Matrícula 152159  
**Proyecto:** PC Hardware E-commerce  
**Actividad:** Obligatoria N°3 — Programación Web I  
**Fecha:** Mayo 2026

---

## BEFORE — Plan previo al desarrollo

> Este archivo fue commiteado antes de escribir cualquier línea de `js/script.js`, como evidencia del proceso de diseño previo.

### Descripción de los 4 flujos a implementar

El proyecto es un e-commerce de componentes de PC. Los 4 flujos representan las funcionalidades centrales de negocio de la tienda, simuladas con `prompt()` y `alert()`.

| # | Flujo | Descripción |
|---|-------|-------------|
| 1 | **Cotizador de productos** | El usuario elige una categoría (CPU, GPU, RAM, SSD, PSU, Cooling) y una cantidad. El sistema calcula el subtotal aplicando descuentos por volumen. |
| 2 | **Verificador de compatibilidad** | El usuario ingresa el TDP de su CPU y su GPU. El sistema determina qué fuente de alimentación necesita y si hay alguna disponible en stock. |
| 3 | **Simulador de carrito** | El usuario puede agregar productos al carrito, ver el resumen con subtotales y obtener el total final con IVA (21%). |
| 4 | **Buscador de productos** | El usuario filtra el catálogo por categoría y precio máximo. El sistema devuelve los productos que coinciden. |

### Estructura del menú principal

```
prompt("Bienvenido a PC Hardware\n1. Cotizador\n2. Compatibilidad\n3. Carrito\n4. Buscador\nElegí una opción (1-4):")
```

El menú se repite con un `while` hasta que el usuario ingresa "0" para salir.

---

### Decisiones de arquitectura para testabilidad

El punto más importante de esta entrega es que el **Tester (compañero de equipo) pueda escribir tests con Jasmine sobre nuestras funciones**. Para eso:

**Separación lógica/UI:**  
Las funciones de negocio **no llaman a `prompt()` ni `alert()` directamente**. Reciben parámetros y retornan valores. El `prompt()` y `alert()` solo aparecen en la función de menú principal (`iniciarMenu()`), que no es testeable por naturaleza.

**Funciones puras expuestas globalmente:**  
Todas las funciones de negocio se declaran en el scope global (no dentro de una IIFE) para que Jasmine pueda accederlas directamente desde `script.spec.js`.

**Ejemplo de separación:**
```js
// ✅ Función pura — testeable
function calcularSubtotal(precioUnitario, cantidad) { ... }

// ✅ Función de UI — no testeable, pero usa la pura
function flujo1Cotizador() {
  const cat = prompt("...");
  const cant = parseInt(prompt("..."));
  const resultado = calcularSubtotal(precio, cant); // llama a la pura
  alert(resultado);
}
```

---

### Criterios de aceptación — Checklist

- [x] 4 flujos completos con validación de entrada
- [x] Funciones con nombres descriptivos en camelCase, parámetros y retornos explícitos
- [x] Lógica de negocio separada de UI: las funciones puras no llaman a `prompt()` ni `alert()`
- [x] Funciones expuestas globalmente para testing (no encapsuladas en IIFE)
- [x] Arrays de productos definidos como datos del catálogo
- [x] Objetos con propiedades relevantes al contexto del proyecto
- [x] Uso de `if/else if`, `switch`, `for`, `while` según corresponda
- [x] Comentarios JSDoc en todas las funciones de negocio
- [x] Código referenciado correctamente desde `index.html`
- [x] Sin manipulación del DOM ni uso de eventos

---

## AT CLOSE — Evidencia del proceso

> Esta sección se completa al finalizar la tarea.

### Prompt exacto utilizado en Copilot Agent

```
Adjunté como contexto: los archivos .puml del Arquitecto de Diagramas (flujo-1 al flujo-4) y este archivo spec-dev-javascript.md.

Prompt utilizado:
"Basándote en los diagramas de actividades .puml adjuntos y en el spec-dev-javascript.md, generá el archivo js/script.js para el e-commerce PC Hardware. 
El código debe:
- Implementar los 4 flujos descritos en el spec usando prompt() y alert() solo en las funciones de menú
- Separar la lógica de negocio en funciones puras testeables con Jasmine
- Usar arrays de productos y objetos como estructuras de datos
- Incluir validación de entradas y comentarios JSDoc
- No usar manipulación del DOM ni addEventListener"
```

### Fragmento generado por Copilot y ajustes manuales

Copilot generó la estructura base de `calcularSubtotal()` y `cotizadorInteractivo()` (anteriormente `flujo1Cotizador()`).
Se realizaron los siguientes ajustes manuales:

**Ajustes principales realizados:**
- Se agregó la invocación de `iniciarMenu()` al final del archivo (Copilot no la incluyó)
- Se corrigió `generarResumenCotizacion()` para mostrar IVA (21%) consistente con el flujo del carrito
- Se reemplazó el menú hardcodeado del carrito por generación dinámica desde el array `catalogo`
- Se corrigió la numeración de los flujos en los comentarios del archivo
- **RC2**: Se movió el código embebido del modal de `index.html` a una función `inicializarModalProducto()` en `script.js`
- **RC33**: Se renombraron las funciones flujoN a nombres más descriptivos:
  - `flujo1Cotizador()` → `cotizadorInteractivo()`
  - `flujo2Compatibilidad()` → `verificadorCompatibilidad()`
  - `flujo3Carrito()` → `carritoSimulador()`
  - `flujo4Buscador()` → `buscadorProductos()`
- **RC17**: Se agregó decremento de stock real en `agregarAlCarrito()` para que la validación tenga efecto

### Ejemplo de función pura generada — Flujo 1

```javascript
/**
 * Calcula el subtotal de una compra aplicando descuento por volumen.
 * @param {number} precioUnitario - Precio unitario del producto.
 * @param {number} cantidad - Cantidad de unidades.
 * @returns {number} Subtotal con descuento aplicado, redondeado a 2 decimales.
 */
function calcularSubtotal(precioUnitario, cantidad) {
  if (precioUnitario < 0 || cantidad <= 0) {
    throw new Error("Precio y cantidad deben ser valores positivos");
  }
  var descuento = calcularDescuento(cantidad);
  var subtotal = precioUnitario * cantidad * (1 - descuento / 100);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Flujo 1 — Cotizador interactivo con prompt/alert.
 * Entrada → proceso → salida usando las funciones puras del flujo.
 */
function cotizadorInteractivo() {
  var categorias = "cpu | gpu | ram | storage | psu | cooling";
  var categoria = prompt(
    "=== COTIZADOR PC HARDWARE ===\n" +
    "Categorías disponibles:\n" + categorias + "\n\n" +
    "Ingresá la categoría que querés cotizar:"
  );

  if (categoria === null) return; // usuario canceló

  if (!validarCategoria(categoria)) {
    alert("Categoría inválida. Opciones: " + categorias);
    return;
  }

  var categoriaNorm = categoria.trim().toLowerCase();
  var cantidadStr = prompt("¿Cuántas unidades querés? (1-100):");

  if (cantidadStr === null) return;

  if (!validarCantidad(cantidadStr)) {
    alert("Cantidad inválida. Ingresá un número entre 1 y 100.");
    return;
  }

  var cantidad = parseInt(cantidadStr);
  var precio = preciosPorCategoria[categoriaNorm];
  var resumen = generarResumenCotizacion(categoriaNorm, cantidad, precio);
  alert(resumen);
  console.log("[Flujo 1 - Cotizador]", resumen);
}
```

### Decisiones finales de estructura

La arquitectura final de `script.js` se organizó siguiendo estos principios clave:

**Separación lógica/UI:**
- Las funciones de negocio (`calcularSubtotal()`, `filtrarProductos()`, `calcularConsumoTotal()`, etc.) NO llaman a `prompt()` ni `alert()`.
- Las funciones de flujo interactivo (`cotizadorInteractivo()`, `carritoSimulador()`, etc.) sí llaman a `prompt()` y `alert()`, pero solo para entrada/salida.
- Esta separación facilita al Tester escribir tests con Jasmine sin necesidad de burlarse de funciones de diálogo.

**Estructura de datos:**
- El array `catalogo` contiene todos los productos con propiedades relevantes: `id`, `nombre`, `categoria`, `marca`, `precio`, `stock`, `tdp` (cuando aplica).
- El objeto `preciosPorCategoria` permite obtener precios de referencia rápidamente sin iterar el catálogo.
- El array `fuentesRecomendadas` está ordenado por potencia para permitir búsqueda eficiente.

**Testabilidad:**
- Todas las funciones están en scope global (no dentro de IIFE), permitiendo que `script.spec.js` las acceda directamente.
- Las funciones puras no tienen efectos secundarios globales (excepto `agregarAlCarrito()` que decrementa `producto.stock`).
- El menú principal (`iniciarMenu()`) no es testeable por naturaleza, pero toda su lógica de negocio delegada a funciones puras testea correctamente.

**Mantenibilidad:**
- Los comentarios JSDoc explican parámetros, retornos y comportamiento de cada función.
- Los nombres de función son descriptivos en camelCase (ej: `calcularDescuento`, `validarTdp`).
- La estructura refleja una clara separación de responsabilidades: cálculos, validaciones, generación de reportes, y flujos de UI.
