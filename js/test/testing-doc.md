# Documentación de Testing - Suite Jasmine

**Proyecto:** E-commerce de Hardware para PC
**Entrega:** Actividad Obligatoria N°3
**Framework:** Jasmine 5.10.0 (vía CDN)
**Rol responsable:** Tester JavaScript / QA Engineer

## Índice

1. [Ejecución de Tests](#ejecución-de-tests)
2. [Suites de Tests](#suites-de-tests)
3. [Métricas de Cobertura](#métricas-de-cobertura)
4. [Capturas de Pantalla](#capturas-de-pantalla)
5. [Issues Conocidos](#issues-conocidos)

---

## Ejecución de Tests

### Pasos para Ejecutar

1. Abrir `test-runner.html` en el navegador
2. Los tests se ejecutan automáticamente
3. Verificar resultados en la interfaz de Jasmine

### Interpretación de Resultados

- **Verde**: Tests pasando ✅
- **Rojo**: Tests fallando ❌
- **Amarillo**: Tests pendientes ⚠️

---

## Suites de Tests

> Las 4 suites del runner corresponden a las 4 opciones del menú principal de `js/script.js` (en el orden 1-2-3-4 que ve el usuario).
>
> ⚠️ **Nota sobre la trazabilidad diagrama → código:** los diagramas entregados por el Arquitecto (`actividad-flujo-1-busqueda`, `actividad-flujo-2-carrito`, `actividad-flujo-3-compatibilidad`, `actividad-flujo-4-recibo`) y los flujos implementados por el Desarrollador JavaScript (`Cotizador`, `Compatibilidad`, `Carrito`, `Buscador`) **no quedaron 100 % alineados nominalmente** entre roles. La correspondencia real es: Buscador ↔ `flujo-1-busqueda`, Carrito ↔ `flujo-2-carrito`, Compatibilidad ↔ `flujo-3-compatibilidad`, y Cotizador es el flujo más cercano a `flujo-4-recibo` (ambos calculan total + descuento + IVA, aunque el Cotizador no genera un recibo formal). Esto se documenta acá por transparencia para que el evaluador pueda seguir la trazabilidad.

### Suite 1 — Cotizador de Productos

**Función orquestadora:** `flujo1Cotizador()` (no se testea, depende de `prompt`/`alert`).

**Diagrama de referencia:** No existe un diagrama equivalente exacto para el Cotizador. El flujo más cercano es [`actividad-flujo-4-recibo.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-4-recibo.puml) — modela el cálculo de un total con descuento e IVA, paralelo a lo que hace el Cotizador. La desalineación parcial entre los flujos modelados y los implementados está documentada en la nota al inicio de esta sección (CR Hallazgo #5).

**Funciones puras testeadas:**

- `validarCategoria(categoria)` — Valida que la categoría exista en `preciosPorCategoria` (normaliza espacios y mayúsculas).
- `validarCantidad(cantidad)` — Acepta enteros en el rango 1–100.
- `calcularDescuento(cantidad)` — Devuelve 0/5/10/15 % según tramos por volumen.
- `calcularSubtotal(precioUnitario, cantidad)` — `precio × cantidad × (1 – descuento)`, redondeado a 2 decimales. Lanza Error si los valores son inválidos.
- `generarResumenCotizacion(categoria, cantidad, precioUnitario)` — Devuelve el texto de cotización con IVA 21 %.

**Casos de Prueba (14 specs):**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Acepta categorías existentes en mayúsculas, minúsculas y con espacios | Happy Path |
| 2 | Rechaza categorías inexistentes, `null`, `undefined`, vacío y no-string | Validación de Errores |
| 3 | `validarCantidad` acepta el rango 1–100 y rechaza 0, negativos, > 100, "abc" | Casos Borde + Errores |
| 4 | Tramos de descuento exactos: 1→0 %, 3→5 %, 5→10 %, 10→15 %, 1000→15 % | Casos Borde |
| 5 | `calcularSubtotal` aplica descuento del 10 % para 5 unidades (100×5×0.9 = 450) | Happy Path |
| 6 | `calcularSubtotal` redondea a 2 decimales (`99.99 × 3 × 0.95 = 284.97`) | Casos Borde |
| 7 | `calcularSubtotal` lanza Error con precio negativo o cantidad ≤ 0 | Validación de Errores |
| 8 | `generarResumenCotizacion` contiene la categoría, el precio y el porcentaje de descuento | Operaciones Arrays/Objetos (string) |

---

### Suite 2 — Verificador de Compatibilidad

**Función orquestadora:** `flujo2Compatibilidad()` (no se testea).

**Diagrama de referencia:** [`actividad-flujo-3-compatibilidad.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-3-compatibilidad.puml)

**Funciones puras testeadas:**

- `calcularConsumoTotal(tdpCpu, tdpGpu)` — `(tdpCpu + tdpGpu + 100) × 1.2`, redondea hacia arriba. Lanza Error si los TDP son negativos.
- `recomendarFuente(consumoWatts)` — Busca en `fuentesRecomendadas` la primera ≥ consumo. Devuelve `null` si supera 1000 W.
- `validarTdp(valor)` — Acepta enteros en el rango 1–1000.
- `generarInformeCompatibilidad(tdpCpu, tdpGpu, fuente)` — Arma el texto del informe (incluye recomendación o advertencia).

**Casos de Prueba (13 specs):**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Cálculo con CPU 125 W + GPU 450 W → (125+450+100)×1.2 = 810 W | Happy Path |
| 2 | `calcularConsumoTotal` devuelve siempre entero (`Math.ceil`) | Casos Borde |
| 3 | TDPs negativos lanzan Error | Validación de Errores |
| 4 | TDPs en cero devuelven el consumo base de 120 W | Casos Borde |
| 5 | `recomendarFuente(700)` devuelve la fuente de 750 W (la más chica que cubre) | Happy Path |
| 6 | `recomendarFuente(650)` devuelve la fuente de 650 W (igualdad exacta) | Casos Borde |
| 7 | `recomendarFuente(1500)` devuelve `null` (no hay fuente disponible) | Validación de Errores |
| 8 | La fuente recomendada incluye `potencia`, `nombre` y `precio` | Operaciones Arrays/Objetos |
| 9 | `validarTdp` acepta 1–1000 y rechaza 0, negativos, > 1000 y "abc" | Casos Borde + Errores |
| 10 | El informe contiene la marca de la fuente recomendada (`"Corsair"`) cuando hay match | Happy Path |
| 11 | El informe muestra `"supera 1000W"` cuando no hay fuente recomendada | Validación de Errores |

---

### Suite 3 — Simulador de Carrito

**Función orquestadora:** `flujo3Carrito()` (no se testea).

**Diagrama de referencia:** [`actividad-flujo-2-carrito.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-2-carrito.puml)

**Funciones puras testeadas:**

- `agregarAlCarrito(carrito, producto, cantidad)` — Agrega un item nuevo o incrementa la cantidad si ya existe. **No muta** el carrito original.
- `calcularTotalCarrito(carrito)` — Suma `precio × cantidad` de cada item, redondeado a 2 decimales.
- `aplicarIva(monto)` — Aplica IVA del 21 %, redondeado a 2 decimales. Lanza Error si el monto es negativo.
- `generarResumenCarrito(carrito)` — Devuelve el texto resumen con líneas, subtotal, IVA y total.
- `obtenerProductoPorOpcion(opcion)` — Busca un producto en el catálogo por número de opción del menú (1–6).

**Casos de Prueba (15 specs):**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Agrega un producto nuevo al carrito (estructura `{id, nombre, precio, cantidad}`) | Happy Path |
| 2 | Si el producto ya existe, suma la cantidad (no duplica) | Operaciones Arrays/Objetos |
| 3 | El carrito original no se muta (`slice` interno) | Operaciones Arrays/Objetos |
| 4 | `agregarAlCarrito` lanza Error si el producto es `null` o la cantidad ≤ 0 | Validación de Errores |
| 5 | Permite tener múltiples productos distintos en el carrito | Operaciones Arrays/Objetos |
| 6 | `calcularTotalCarrito([])` → 0 (carrito vacío) | Casos Borde |
| 7 | Cálculo correcto con varios items (`100×2 + 50.5×3 = 351.5`) | Happy Path |
| 8 | Redondea a 2 decimales (`0.1 × 3 = 0.3`, sin errores de IEEE-754) | Casos Borde |
| 9 | `aplicarIva(100) = 121` y `aplicarIva(1000) = 1210` | Happy Path |
| 10 | `aplicarIva` redondea a 2 decimales (`99.99 → 120.99`) | Casos Borde |
| 11 | `aplicarIva(0) = 0` | Casos Borde |
| 12 | `aplicarIva(-50)` lanza Error | Validación de Errores |
| 13 | `generarResumenCarrito([])` informa carrito vacío | Casos Borde |
| 14 | El resumen incluye nombre, precio, cantidad, IVA y total | Operaciones Arrays/Objetos |
| 15 | `obtenerProductoPorOpcion(1)` devuelve el primer producto del catálogo y `(0)` / `(99)` / `(-1)` devuelven `null` | Casos Borde |

---

### Suite 4 — Buscador de Productos

**Función orquestadora:** `flujo4Buscador()` (no se testea).

**Diagrama de referencia:** [`actividad-flujo-1-busqueda.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-1-busqueda.puml)

**Funciones puras testeadas:**

- `filtrarProductos(productos, categoria, precioMaximo)` — Devuelve los productos que cumplen ambos criterios. Acepta `"todas"` como wildcard. **No muta** el array original. Lanza Error con inputs inválidos.
- `ordenarPorPrecio(productos)` — Ordena de menor a mayor precio. No muta el array original (usa `slice().sort()`).
- `generarResultadosBusqueda(resultados, categoria, precioMaximo)` — Arma el texto con encabezado (categoría + precio máx) y lista de productos.

**Casos de Prueba (10 specs):**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Filtra por categoría `"cpu"` y precio máx 200 → 1 resultado | Happy Path |
| 2 | `"todas"` como categoría devuelve todo el catálogo bajo el precio máx | Casos Borde |
| 3 | Si ningún producto cumple los filtros devuelve `[]` | Casos Borde |
| 4 | El catálogo original no se muta (inmutabilidad) | Operaciones Arrays/Objetos |
| 5 | Lanza Error si `productos` no es un array | Validación de Errores |
| 6 | Lanza Error si el precio máximo es negativo | Validación de Errores |
| 7 | Precio máximo exactamente igual al precio del producto cuenta como match (≤) | Casos Borde |
| 8 | `ordenarPorPrecio` ordena de menor a mayor y no muta el array original | Operaciones Arrays/Objetos |
| 9 | `ordenarPorPrecio([])` devuelve `[]` | Casos Borde |
| 10 | `generarResultadosBusqueda` muestra encabezado con categoría, precio máx, marca y stock; informa "No se encontraron" si está vacío | Happy Path + Casos Borde |

---

## Métricas de Cobertura

### Resumen General

| Métrica | Valor |
|---------|-------|
| Total de specs (it) | **68** |
| Tests Pasando (verificación local post-CR) | **68** ✅ |
| Tests Fallando | **0** ❌ |
| Porcentaje de Éxito | **100%** |

> ℹ️ **Nota sobre las screenshots:** las imágenes adjuntas en este documento muestran la ejecución de la **versión inicial de la suite (59 specs)** capturada con Playwright antes del code review de @GonzaloBarbano. Tras aplicar los 7 hallazgos del code review se agregaron 9 specs adicionales (separación de tests con assertions distintas + casos borde de la Suite 4), llegando al total de **68 specs**. Todos pasan localmente en `test-runner.html`. Las screenshots no se re-capturaron para evitar reagendar la corrida con Antigravity Agent.

### Cobertura por Suite

| Suite | Flujo | Specs | Estado |
|-------|-------|-------|--------|
| 1 | Cotizador de Productos | 23 | ✅ Todos PASS |
| 2 | Verificador de Compatibilidad | 14 | ✅ Todos PASS |
| 3 | Simulador de Carrito | 16 | ✅ Todos PASS |
| 4 | Buscador de Productos | 15 | ✅ Todos PASS |

### Funciones puras cubiertas por suite

| Suite | Funciones de `js/script.js` testeadas |
|-------|-----------------------------------------|
| 1. Cotizador | `validarCategoria()`, `validarCantidad()`, `calcularDescuento()`, `calcularSubtotal()`, `generarResumenCotizacion()` |
| 2. Compatibilidad | `calcularConsumoTotal()`, `recomendarFuente()`, `validarTdp()`, `generarInformeCompatibilidad()` |
| 3. Carrito | `agregarAlCarrito()`, `calcularTotalCarrito()`, `aplicarIva()`, `generarResumenCarrito()`, `obtenerProductoPorOpcion()` |
| 4. Buscador | `filtrarProductos()`, `ordenarPorPrecio()`, `generarResultadosBusqueda()` |

Total: **17 funciones puras testeadas** sobre las 17 expuestas globalmente en el módulo. Los orquestadores `flujo1Cotizador()` / `flujo2Compatibilidad()` / `flujo3Carrito()` / `flujo4Buscador()` y `iniciarMenu()` no se testean porque dependen de `prompt`/`alert` — capa de UI fuera del alcance unitario.

### Tipos de tests aplicados

Cada suite incluye los **4 tipos obligatorios** definidos en la consigna:

| Tipo | Ejemplo aplicado |
|------|------------------|
| Happy Path | `expect(calcularSubtotal(100, 5)).toBe(450)` — caso normal con descuento 10% |
| Casos Borde | `expect(calcularTotalCarrito([])).toBe(0)` — carrito vacío |
| Validación de Errores | `expect(() => aplicarIva(-50)).toThrow()` — monto negativo |
| Operaciones Arrays/Objetos | Inmutabilidad: `filtrarProductos()` no muta el catálogo original |

### Tipos de assertions Jasmine usadas

8 tipos distintos (la consigna pide ≥4): `toBe`, `toEqual`, `toBeTruthy`, `toBeFalsy`, `toContain`, `toThrow`, `toBeNull`, `jasmine.objectContaining` + `jasmine.any`.

---

## Capturas de Pantalla

Capturas tomadas con Playwright contra `http://localhost:5501/js/test/test-runner.html` (Live Server de VS Code).

### 1. Resumen global — 59 specs, 0 failures

![Resumen global](./screenshots/01-overview.png)

### 2. Suite 1 — Cotizador de Productos

![Suite Cotizador](./screenshots/02-flujo1-cotizador.png)

### 3. Suite 2 — Verificador de Compatibilidad

![Suite Compatibilidad](./screenshots/03-flujo2-compatibilidad.png)

### 4. Suite 3 — Simulador de Carrito

![Suite Carrito](./screenshots/04-flujo3-carrito.png)

### 5. Suite 4 — Buscador de Productos

![Suite Buscador](./screenshots/05-flujo4-buscador.png)

---

## Issues Conocidos

**No se reportaron bugs durante la ejecución.** Las 59 specs pasaron en el primer intento contra `js/script.js` (PR #115, @LucasFUces). El código quedó estructurado de forma testeable (funciones puras, expuestas globalmente, sin dependencia de `prompt`/`alert` para la lógica de negocio).

### Punto de fricción resuelto sin bug-report

Durante la integración del runner se detectó que `js/script.js:639` invoca `iniciarMenu()` al cargar el script, lo que disparaba `prompt()` infinitos al abrir `test-runner.html` y bloqueaba la ejecución de Jasmine. **No se abrió un issue** porque la solución se aplicó del lado del Tester sin requerir modificar `js/script.js`: se sobreescribieron `window.prompt` y `window.alert` en `test-runner.html` antes de cargar el script bajo prueba. Ver detalle en [`docs/03-specs/actividad-obligatoria-3/spec-tester.md`](../../docs/03-specs/actividad-obligatoria-3/spec-tester.md) sección **AL CIERRE — Ajustes Manuales y Coordinación**.

---

## Limitaciones del Testing

- Tests síncronos únicamente (no se usan Promises ni `async/await` en esta entrega).
- No se mide cobertura de código de forma automatizada — el cálculo se realiza manualmente por función.
- Requiere conexión a internet en la primera carga (Jasmine se sirve desde CDN `cdnjs.cloudflare.com`).
- No incluye tests de integración con el DOM ni manejo de eventos (la consigna restringe esta entrega a lógica pura).
- Las llamadas a `prompt()` y `alert()` no se testean — se considera que pertenecen a la capa de UI y quedan fuera del alcance unitario.
- La "Base de Datos" modelada en los diagramas de actividades se simula con arrays en memoria; no hay persistencia real que validar.

---

**Última Actualización:** 15 de mayo de 2026
**Tester/QA Engineer:** Nicolás Aguirre (@Naguirre0102)
**Colaboración con:** Lucas Fischer (@LucasFUces) — Desarrollador JavaScript
**Resultado final:** 59 specs / 59 PASS / 0 FAIL / 0 issues abiertos
