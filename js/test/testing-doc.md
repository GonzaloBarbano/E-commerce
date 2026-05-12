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

### Suite 1: Búsqueda y Filtrado de Productos

**Diagrama de referencia:** [`actividad-flujo-1-busqueda.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-1-busqueda.puml)

**Funciones Testeadas:**

- `filtrarProductos(catalogo, criterios)` - Filtra catálogo por marca / rango de precio / specs.
- `validarCriteriosBusqueda(criterios)` - Rechaza criterios mal formados o incompletos.
- `ordenarResultados(productos, criterio)` - Ordena resultados por precio o nombre.

**Casos de Prueba:**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Filtra GPUs NVIDIA entre $800 y $1500 sobre catálogo válido | Happy Path |
| 2 | Catálogo vacío devuelve array vacío | Caso Borde |
| 3 | Ningún producto coincide con los filtros aplicados | Caso Borde |
| 4 | Criterios con `null` / `undefined` son rechazados | Validación de Errores |
| 5 | El catálogo original no se muta tras el filtrado | Operaciones Arrays/Objetos |

---

### Suite 2: Carrito de Compras y Cálculo de Precio

**Diagrama de referencia:** [`actividad-flujo-2-carrito.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-2-carrito.puml)

**Funciones Testeadas:**

- `validarStock(producto, cantidad)` - Verifica disponibilidad antes de agregar al carrito.
- `validarLimitePorUsuario(item, cantidad)` - Aplica límite máximo de unidades por producto.
- `agregarAlCarrito(carrito, producto, cantidad)` - Agrega o incrementa item en el carrito.
- `calcularSubtotal(precio, cantidad)` - Calcula `precio × cantidad`.
- `aplicarIVA(monto, alicuota)` - Aplica IVA 21% por defecto.
- `calcularTotalCarrito(carrito)` - Suma subtotales y aplica IVA.

**Casos de Prueba:**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Carrito con 2 productos calcula total correcto con IVA 21% | Happy Path |
| 2 | Carrito vacío devuelve total 0 | Caso Borde |
| 3 | Stock insuficiente rechaza el agregado | Validación de Errores |
| 4 | Cantidad negativa o cero es rechazada | Validación de Errores |
| 5 | Agregar un producto ya existente incrementa su cantidad, no duplica | Operaciones Arrays/Objetos |

---

### Suite 3: Validación de Compatibilidad de Componentes

**Diagrama de referencia:** [`actividad-flujo-3-compatibilidad.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-3-compatibilidad.puml)

**Funciones Testeadas:**

- `validarSocket(cpu, motherboard)` - Compara socket de CPU y motherboard.
- `validarTipoRAM(ram, motherboard)` - Verifica compatibilidad DDR4 / DDR5.
- `calcularConsumoTotal(componentes)` - Suma TDPs de los componentes.
- `validarPSU(consumoTotal, psu)` - Confirma que la PSU soporta el consumo.
- `generarReporteCompatibilidad(componentes)` - Devuelve `{ compatible, errores[] }`.

**Casos de Prueba:**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Build AM5 + DDR5 + PSU 850W → reporte `compatible: true` | Happy Path |
| 2 | PSU con watts exactamente iguales al consumo es válida (≥) | Caso Borde |
| 3 | Socket CPU distinto al de motherboard genera error específico | Validación de Errores |
| 4 | Componente faltante en el build es rechazado | Validación de Errores |
| 5 | Array de errores se construye con todas las incompatibilidades, no se corta en la primera | Operaciones Arrays/Objetos |

---

### Suite 4: Generación de Recibo de Compra

**Diagrama de referencia:** [`actividad-flujo-4-recibo.puml`](../../docs/05-diagramas/01-diagrama-de-actividades/actividad-flujo-4-recibo.puml)

**Funciones Testeadas:**

- `generarIdOrden()` - Devuelve identificador único de orden.
- `calcularSubtotalLinea(item)` - Subtotal por línea (`precio × cantidad`).
- `validarCodigoDescuento(codigo)` - Devuelve `{ valido, porcentaje }`.
- `aplicarDescuento(total, porcentaje)` - Aplica descuento al total.
- `generarRecibo(carrito, codigoDescuento)` - Construye objeto recibo completo.

**Casos de Prueba:**

| # | Descripción | Tipo |
|---|-------------|------|
| 1 | Recibo válido con items, IVA 21%, descuento aplicado y envío $50 | Happy Path |
| 2 | Recibo sin código de descuento mantiene total = subtotal + IVA + envío | Caso Borde |
| 3 | Carrito vacío rechaza la generación del recibo | Validación de Errores |
| 4 | Código de descuento inválido se ignora silenciosamente | Validación de Errores |
| 5 | El objeto recibo contiene las líneas del carrito y todos los campos esperados | Operaciones Arrays/Objetos |

---

## Métricas de Cobertura

### Resumen General

| Métrica | Valor |
|---------|-------|
| Total de Tests | [XX] |
| Tests Pasando | [XX] ✅ |
| Tests Fallando | [XX] ❌ |
| Porcentaje de Éxito | [XX]% |

### Cobertura por Tipo de Test

| Tipo | Cantidad | Porcentaje |
|------|----------|------------|
| Happy Path | [XX] | [XX]% |
| Casos Borde | [XX] | [XX]% |
| Validación de Errores | [XX] | [XX]% |
| Operaciones Arrays/Objetos | [XX] | [XX]% |

### Análisis de Cobertura de Código

**Metodología:** Se revisó manualmente cada función de `js/script.js` y se verificó qué líneas son ejecutadas por los tests implementados en `js/test/script.spec.js`.

| Función | Líneas Totales | Tests | Líneas Cubiertas | Cobertura |
|---------|----------------|-------|------------------|-----------|
| `filtrarProductos()` | [XX] | [X] | [XX] | [XX]% |
| `validarCriteriosBusqueda()` | [XX] | [X] | [XX] | [XX]% |
| `ordenarResultados()` | [XX] | [X] | [XX] | [XX]% |
| `validarStock()` | [XX] | [X] | [XX] | [XX]% |
| `agregarAlCarrito()` | [XX] | [X] | [XX] | [XX]% |
| `calcularTotalCarrito()` | [XX] | [X] | [XX] | [XX]% |
| `aplicarIVA()` | [XX] | [X] | [XX] | [XX]% |
| `validarSocket()` | [XX] | [X] | [XX] | [XX]% |
| `validarTipoRAM()` | [XX] | [X] | [XX] | [XX]% |
| `calcularConsumoTotal()` | [XX] | [X] | [XX] | [XX]% |
| `validarPSU()` | [XX] | [X] | [XX] | [XX]% |
| `generarReporteCompatibilidad()` | [XX] | [X] | [XX] | [XX]% |
| `generarIdOrden()` | [XX] | [X] | [XX] | [XX]% |
| `validarCodigoDescuento()` | [XX] | [X] | [XX] | [XX]% |
| `aplicarDescuento()` | [XX] | [X] | [XX] | [XX]% |
| `generarRecibo()` | [XX] | [X] | [XX] | [XX]% |

**Cobertura Total Estimada:** [XX]% ([XX]/[XX] líneas ejecutables)

#### Líneas NO Cubiertas

> Por completar tras ejecución final. Se documentan acá las líneas de `js/script.js` que no son alcanzadas por ningún test, junto a la justificación (ej.: rama muerta, manejo de error difícil de simular, interacción con `prompt()` excluida del scope).

---

## Capturas de Pantalla

### Tests Pasando

![Tests Exitosos](./screenshots/tests-passing.png)
*Todos los tests ejecutándose correctamente*

### Vista Detallada de Suites

![Suite Detalle](./screenshots/suite-detail.png)
*Expansión de una suite mostrando tests individuales*

---

## Issues Conocidos

> Esta sección se completa con cada bug detectado durante la ejecución de la suite, replicando el bloque siguiente por cada issue abierto en GitHub.

### Issue #[X]: [Título del Issue]

- **Severidad:** Alta / Media / Baja
- **Suite Afectada:** `describe("[Nombre Suite]")`
- **Test Afectado:** `it("[descripción test]")`
- **Comportamiento Esperado:** [Descripción]
- **Comportamiento Obtenido:** [Descripción]
- **Pasos para Reproducir:**
  1. [Paso 1]
  2. [Paso 2]
  3. [Paso 3]
- **Código del Test que Falla:**

  ```javascript
  it("descripción", function() {
    expect(resultado).toBe(esperado);
  });
  ```

- **GitHub Issue:** #[número]
- **Estado:** Abierto / Resuelto

---

## Limitaciones del Testing

- Tests síncronos únicamente (no se usan Promises ni `async/await` en esta entrega).
- No se mide cobertura de código de forma automatizada — el cálculo se realiza manualmente por función.
- Requiere conexión a internet en la primera carga (Jasmine se sirve desde CDN `cdnjs.cloudflare.com`).
- No incluye tests de integración con el DOM ni manejo de eventos (la consigna restringe esta entrega a lógica pura).
- Las llamadas a `prompt()` y `alert()` no se testean — se considera que pertenecen a la capa de UI y quedan fuera del alcance unitario.
- La "Base de Datos" modelada en los diagramas de actividades se simula con arrays en memoria; no hay persistencia real que validar.

---

**Última Actualización:** [Fecha de ejecución final]
**Tester/QA Engineer:** Nicolás Aguirre (@Naguirre0102)
**Colaboración con:** Lucas Fischer (@LucasFUces) — Desarrollador JavaScript
