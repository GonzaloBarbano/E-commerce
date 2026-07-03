# Diagrama de Clases — AO4 PC Hardware

## Ubicación
- Fuente: `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases.puml`
- Imagen: `docs/04-diagramas/02-diagrama-de-clases/diagrama-clases.png`

## Clases

### Producto
Representa un item del catálogo de PC Hardware. Atributos: `id`, `nombre`,
`categoria`, `marca`, `precio`, `stock`, `tdp`. Se valida en el constructor
que `id`, `precio` y `stock` tengan tipos y rangos correctos. Expone
`toJSON()`/`fromJSON()` para serialización.

### ItemCarrito
Envuelve un `Producto` junto con una `cantidad`. Es la unidad interna que
compone un `Carrito`. Calcula su propio `subtotal()` (precio × cantidad).

### Carrito
Colección de `ItemCarrito`. Provee `agregar()`, `eliminar()`, `vaciar()`,
y los cálculos de `calcularSubtotal()`, `aplicarIva()` y `calcularTotal()`
(subtotal + 21% IVA). `estaVacio()` indica si no tiene items.

### Cotizacion
Representa una cotización independiente de N unidades de una categoría,
con descuento por volumen: 15% para 10 o más unidades, 10% para 5 o más,
5% para 3 o más, sin descuento por debajo de eso. Calcula subtotal, IVA
y total, y genera un resumen legible con `generarResumen()`.

## Relaciones
- **Carrito "1" o-- "0..*" ItemCarrito** (agregación): un carrito contiene
  cero o más items; los items no pueden existir sin el carrito que los
  agrupa lógicamente, pero conceptualmente son independientes del ciclo
  de vida del carrito (agregación, no composición fuerte).
- **ItemCarrito "1" --> "1" Producto** (asociación): cada item envuelve
  exactamente un producto del catálogo.
- **Cotizacion** es independiente: no tiene relación directa con
  `Carrito` ni con `Producto`, ya que trabaja solo con categoría,
  cantidad y precio unitario ingresados por el usuario.

## Trazabilidad con AO3
La lógica de `calcularDescuento()`, `calcularSubtotal()`, `aplicarIva()`
y `agregarAlCarrito()` reutiliza las funciones puras ya probadas por los
99 specs Jasmine de AO3 (`js/script.js`), migradas ahora a métodos de
instancia de las clases del dominio.

## Referencias
- Spec BEFORE: `docs/03-specs/actividad-obligatoria-4/spec-dev-poo.md`
- Clases: `js/models/Producto.js`, `js/models/Carrito.js`, `js/models/Cotizacion.js`