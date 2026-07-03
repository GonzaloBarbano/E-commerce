# Documentación de Testing - Suite Jasmine

**Proyecto:** E-commerce de Hardware para PC
**Entrega:** Actividad Obligatoria N°3 (histórico) — ver nota AO4 más abajo
**Framework:** Jasmine 5.10.0 (vía CDN) + Playwright (E2E en AO4)
**Rol responsable:** Tester JavaScript / QA Engineer

> ℹ️ **Nota sobre AO4 (03/07/2026):**
> Este documento describe el estado del testing al cierre de la **Actividad Obligatoria N°3** (99 specs Jasmine, 100 % PASS, con `spyOn` cubriendo los orquestadores basados en `prompt`/`alert`).
>
> Para **AO4** el testing evolucionó:
>
> - Los orquestadores `prompt`/`alert` fueron reemplazados por handlers de eventos DOM. Las suites 5-8 con `spyOn` del cierre de AO3 y el archivo `script.spec.js` legacy fueron **descartados** — su cobertura equivalente vive ahora en las clases del dominio.
> - Se agregaron 2 archivos nuevos de specs: `models.spec.js` (52 specs sobre Producto/Carrito/Cotizacion) y `storage.spec.js` (19 specs sobre StorageUtil). **Total AO4: 71 specs Jasmine, 100 % PASS.**
> - Se sumó testing **E2E con Playwright** — 20 tests contra el DOM real del simulador. Ver reporte + 8 screenshots en [`docs/07-testing-ao4/`](../../docs/07-testing-ao4/reporte-e2e.md).
>
> El resto de este documento describe el estado histórico de AO3 y se preserva como evidencia del cierre con `LGTM` del docente el 02/07/2026.

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

Las 4 suites del runner corresponden a las 4 opciones del menú principal de `js/script.js` en el orden 1-2-3-4 que ve el usuario: **Cotizador, Verificador de Compatibilidad, Simulador de Carrito, Buscador**.

### 🔴 Post-mortem del rol Tester: desalineación diagramas ↔ código (RC22 + RC30)

> **Estado al 23 de junio de 2026:** la desalineación quedó RESUELTA tras el fix `fix/coord-devops-renumeracion-puml` (alineación de archivos `.puml` con el menú real). Esta sección se mantiene como evidencia del aprendizaje del rol Tester.

Durante la integración detecté que los diagramas entregados por el Arquitecto y los flujos implementados por el Desarrollador JavaScript **no estaban alineados**. La tabla muestra el ANTES (entrega original) y el AHORA (post correcciones):

| # del menú | Implementado | Diagrama original (ANTES) | Diagrama actual (AHORA) |
|---|---|---|---|
| 1 | Cotizador | ❌ No existía (el "Recibo" se cambió de alcance) | ✅ `actividad-flujo-1-cotizador.puml` (creado) |
| 2 | Compatibilidad | `actividad-flujo-3-compatibilidad.puml` (numeración cruzada) | ✅ `actividad-flujo-2-compatibilidad.puml` (renombrado) |
| 3 | Carrito | `actividad-flujo-2-carrito.puml` (numeración cruzada) | ✅ `actividad-flujo-3-carrito.puml` (renombrado) |
| 4 | Buscador | `actividad-flujo-1-busqueda.puml` (numeración cruzada) | ✅ `actividad-flujo-4-buscador.puml` (renombrado) |

**Acción correctiva ejecutada:**

- Documenté la desalineación como **aprendizaje del rol Tester** (no escalé a issue de GitHub en su momento; debí hacerlo antes de testear).
- Reescribí la sección "Funciones planificadas por flujo" del `spec-tester.md` con autocrítica y el plan **real** de cobertura validado contra el código de Lucas.
- Tras la baja de @GonzaloBarbano del grupo, asumí los roles de Coord/DevOps + Arquitecto de Diagramas y resolví la desalineación renombrando los `.puml` y creando el del Cotizador (PR del fix de renumeración).
- **Aprendizaje:** el plan de testing se valida contra la implementación, no contra el plan previo del Arquitecto.

### Suite 1 — Cotizador de Productos

**Función orquestadora:** `flujo1Cotizador()` (no se testea, depende de `prompt`/`alert`).

**Diagrama de referencia:** [`actividad-flujo-1-cotizador.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-1-cotizador.puml)

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

**Diagrama de referencia:** [`actividad-flujo-2-compatibilidad.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-2-compatibilidad.puml)

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

**Diagrama de referencia:** [`actividad-flujo-3-carrito.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-3-carrito.puml)

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

**Diagrama de referencia:** [`actividad-flujo-4-buscador.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-4-buscador.puml)

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
| Total de specs (it) | **99** |
| Tests Pasando | **99** ✅ |
| Tests Fallando | **0** ❌ |
| Porcentaje de Éxito | **100%** |

### Cobertura por Suite

| Suite | Foco | Specs | Estado |
|-------|------|-------|--------|
| 1 | Cotizador — funciones puras | 24 | ✅ Todos PASS |
| 2 | Compatibilidad — funciones puras | 14 | ✅ Todos PASS |
| 3 | Carrito — funciones puras | 18 | ✅ Todos PASS |
| 4 | Buscador — funciones puras | 16 | ✅ Todos PASS |
| 5 | Cotizador — orquestador con `spyOn` | 7 | ✅ Todos PASS |
| 6 | Compatibilidad — orquestador con `spyOn` | 6 | ✅ Todos PASS |
| 7 | Carrito — orquestador con `spyOn` | 7 | ✅ Todos PASS |
| 8 | Buscador — orquestador con `spyOn` | 7 | ✅ Todos PASS |

### Cobertura de orquestadores (Suites 5-8) — agregada por RCN7 R1

A pedido del docente (RCN7 del 2° review), se agregaron 4 suites adicionales que cubren las **funciones orquestadoras** (`cotizadorInteractivo()`, `verificadorCompatibilidad()`, `carritoSimulador()`, `buscadorProductos()`) usando `spyOn(window, 'prompt')` y `spyOn(window, 'alert')` para mockear la capa de UI.

Cada suite verifica:

- **Happy path** con inputs válidos vía `prompt`, validando el mensaje final por `alert`.
- **Cancelaciones** (`prompt` devuelve `null`): el orquestador sale silenciosamente sin invocar `alert`.
- **Inputs inválidos**: el orquestador muestra el mensaje de error correspondiente vía `alert`.
- **RCN8 R2**: el `try/catch` global captura excepciones internas y muestra `"Error: …"` por `alert` + `console.error`. Se prueba forzando una excepción con `spyOn(window, 'X').and.throwError(...)` sobre una función pura que el orquestador invoca.

### Funciones cubiertas por suite

| Suite | Tipo | Funciones de `js/script.js` testeadas |
|-------|------|-----------------------------------------|
| 1. Cotizador (puras) | pura | `validarCategoria()`, `validarCantidad()`, `calcularDescuento()`, `calcularSubtotal()`, `generarResumenCotizacion()` |
| 2. Compatibilidad (puras) | pura | `calcularConsumoTotal()`, `recomendarFuente()`, `validarTdp()`, `generarInformeCompatibilidad()` |
| 3. Carrito (puras) | pura | `agregarAlCarrito()`, `decrementarStock()`, `calcularTotalCarrito()`, `aplicarIva()`, `generarResumenCarrito()`, `obtenerProductoPorOpcion()` |
| 4. Buscador (puras) | pura | `filtrarProductos()`, `ordenarPorPrecio()`, `generarResultadosBusqueda()` |
| 5. Cotizador (orquestador) | orquestador con `spyOn` | `cotizadorInteractivo()` |
| 6. Compatibilidad (orquestador) | orquestador con `spyOn` | `verificadorCompatibilidad()` |
| 7. Carrito (orquestador) | orquestador con `spyOn` | `carritoSimulador()` |
| 8. Buscador (orquestador) | orquestador con `spyOn` | `buscadorProductos()` |

Total: **18 funciones puras + 4 funciones orquestadoras** = todas las funciones expuestas de `js/script.js` quedan cubiertas tras la incorporación de las suites de `spyOn`. La función `iniciarMenu()` no se testea directamente porque su responsabilidad es el `while` de selección de menú; sus 4 subflujos sí están cubiertos individualmente.

### Tipos de tests aplicados

Cada suite de funciones puras (1-4) incluye los **4 tipos obligatorios** definidos en la consigna; las suites de orquestadores (5-8) suman los tipos de **mocking** y **cobertura de manejo de errores**:

| Tipo | Ejemplo aplicado |
|------|------------------|
| Happy Path | `expect(calcularSubtotal(100, 5)).toBe(450)` — caso normal con descuento 10% |
| Casos Borde | `expect(calcularTotalCarrito([])).toBe(0)` — carrito vacío |
| Validación de Errores | `expect(() => aplicarIva(-50)).toThrow()` — monto negativo |
| Operaciones Arrays/Objetos | Inmutabilidad: `filtrarProductos()` no muta el catálogo original |
| **Mocking de UI (Suites 5-8)** | `spyOn(window, "prompt").and.returnValues("cpu", "5")` — simula entrada del usuario |
| **Cobertura de `try/catch` (RCN8 R2)** | `spyOn(window, "X").and.throwError("err")` para forzar excepción + verificar `expect(window.alert).toHaveBeenCalledWith("Error: err")` |

### Tipos de assertions Jasmine usadas

10+ tipos distintos (la consigna pide ≥4):

`toBe`, `toEqual`, `toBeTruthy`, `toBeFalsy`, `toContain`, `toThrow`, `toBeNull`, `toHaveBeenCalled`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`, `jasmine.stringMatching`, `jasmine.stringContaining`, `jasmine.objectContaining`, `jasmine.any`.

Las assertions de spies (`toHaveBeenCalled*`) se incorporaron al implementar RCN7 R1 (cobertura de `prompt`/`alert` con `spyOn`).

---

## Capturas de Pantalla

Capturas tomadas contra `test-runner.html` ejecutado en navegador (Live Server de VS Code), con la suite completa de **99 specs** corriendo en milisegundos gracias a los mocks de Jasmine (`spyOn`).

### 1. Resumen global — 99 specs, 0 failures

![Resumen global con 99 specs](./screenshots/01-overview.png)

### 2. Suite 1 — Cotizador (funciones puras)

![Suite 1 Cotizador puras](./screenshots/02-flujo1-cotizador.png)

### 3. Suite 2 — Verificador de Compatibilidad (funciones puras)

![Suite 2 Compatibilidad puras](./screenshots/03-flujo2-compatibilidad.png)

### 4. Suite 3 — Simulador de Carrito (funciones puras)

![Suite 3 Carrito puras](./screenshots/04-flujo3-carrito.png)

### 5. Suite 4 — Buscador de Productos (funciones puras)

![Suite 4 Buscador puras](./screenshots/05-flujo4-buscador.png)

> ℹ️ Las suites **5–8 (orquestadores con `spyOn`)** quedan visibles en la captura `01-overview.png` (que muestra el detalle de todas las suites con los nombres de los specs y sus tiempos de ejecución).

---

## Issues Conocidos

**No se reportaron bugs durante la ejecución.** Las 99 specs pasan en su totalidad contra el `js/script.js` final (incluyendo los fixes RCN1–RCN8 del Round 2 aplicados por @LucasFUces). El código quedó estructurado de forma testeable: funciones puras separadas de orquestadoras, `try/catch` global en cada subflujo, y la capa de UI (`prompt`/`alert`) cubierta con `spyOn` en las suites 5–8.

### Punto de fricción resuelto sin bug-report

Durante la integración del runner se detectó que `js/script.js` invoca `iniciarMenu()` al cargar el script, lo que disparaba `prompt()` infinitos al abrir `test-runner.html` y bloqueaba la ejecución de Jasmine. **No se abrió un issue** porque la solución se aplicó del lado del Tester sin requerir modificar `js/script.js`: se sobreescribieron `window.prompt` y `window.alert` en `test-runner.html` antes de cargar el script bajo prueba. Ver detalle en [`docs/03-specs/actividad-obligatoria-3/spec-tester.md`](../../docs/03-specs/actividad-obligatoria-3/spec-tester.md) sección **AL CIERRE — Ajustes Manuales y Coordinación**.

---

## Limitaciones del Testing

- Tests síncronos únicamente (no se usan Promises ni `async/await` en esta entrega).
- No se mide cobertura de código de forma automatizada — el cálculo se realiza manualmente por función. La introducción de las suites 5–8 con `spyOn` permite afirmar que **todas las funciones expuestas globalmente quedan ejercidas** por al menos un test.
- Requiere conexión a internet en la primera carga (Jasmine se sirve desde CDN `cdnjs.cloudflare.com`).
- No incluye tests de integración con el DOM ni manejo de eventos del modal (`inicializarModalProducto()`); esa función pertenece al alcance del modal heredado del Primer Parcial y no de la lógica de los 4 flujos de la AO3.
- La persistencia se simula con arrays en memoria; no hay base de datos que validar (la materia no contempla backend).

---

**Última Actualización:** 30 de junio de 2026
**Tester/QA Engineer:** Nicolás Aguirre (@Naguirre0102)
**Colaboración con:** Lucas Fischer (@LucasFUces) — Desarrollador JavaScript
**Resultado final:** 99 specs / 99 PASS / 0 FAIL / 0 issues abiertos
