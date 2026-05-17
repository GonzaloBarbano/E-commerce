# 🧪 spec-tester.md — Testing JavaScript con Jasmine | Actividad Obligatoria 3

**Fecha de creación:** 12 de mayo de 2026
**Rol:** Tester JavaScript / QA Engineer
**Responsable:** Nicolás Aguirre (@Naguirre0102)
**Proyecto:** E-commerce de Hardware para PC
**Entrega:** Tercera Entrega (Unidad N°3 — JavaScript)
**Rama:** `feature/tester-javascript-jasmine`

---

## 📑 Tabla de Contenidos

1. [ANTES — Plan de Testing](#antes--plan-de-testing)
2. [ANTES — Herramientas y Estrategia](#antes--herramientas-y-estrategia)
3. [ANTES — Criterios de Aceptación](#antes--criterios-de-aceptación)
4. [AL CIERRE — Evidencia de Ejecución](#al-cierre--evidencia-de-ejecución)
5. [AL CIERRE — Resumen de Resultados](#al-cierre--resumen-de-resultados)
6. [AL CIERRE — Ajustes Manuales y Coordinación](#al-cierre--ajustes-manuales-y-coordinación)

---

## ANTES — Plan de Testing

### 🎯 Objetivo

Implementar una suite de tests automatizados con **Jasmine 5.10** que valide la lógica de negocio de los 4 flujos principales definidos por el Arquitecto de Diagramas, asegurando que el código de `js/script.js` se comporte correctamente en casos esperados, casos borde y entradas inválidas.

### 📌 Alcance

Los tests cubrirán **únicamente las funciones puras de lógica de negocio** expuestas en `js/script.js`. No se testea:

- Interacción con `prompt()` / `alert()` (capa de UI, no aplica DOM en esta entrega).
- Manipulación del DOM (no permitido por consigna).
- Persistencia real en base de datos (no existe en esta entrega; los flujos del Arquitecto la modelan como swimlane pero la implementación JS la simula con arrays en memoria).

### 🔢 Funciones planificadas por flujo

Este es el plan de cobertura. Los nombres exactos pueden ajustarse al ver el código final de `js/script.js`; lo importante es que la **superficie funcional** quede testeada.

#### Flujo 1 — Búsqueda y Filtrado

| Función esperada | Qué valida el test |
|---|---|
| `filtrarProductos(catalogo, criterios)` | Devuelve subset correcto del catálogo según marca/precio/specs |
| `validarCriteriosBusqueda(criterios)` | Rechaza criterios mal formados (string en precio, rangos invertidos) |
| `ordenarResultados(productos, criterio)` | Orden estable por precio asc/desc, alfabético, etc. |

**Tipos de tests:**
- Happy path: catálogo válido + criterios válidos → array filtrado.
- Casos borde: catálogo vacío, ningún producto coincide, todos coinciden.
- Errores: `null`/`undefined` como catálogo, criterios faltantes.
- Operaciones array: verificar inmutabilidad del catálogo original.

#### Flujo 2 — Carrito de Compras

| Función esperada | Qué valida el test |
|---|---|
| `validarStock(producto, cantidad)` | `true` si hay stock suficiente, `false` si no |
| `validarLimitePorUsuario(item, cantidad)` | Respeta el límite máximo configurado por producto |
| `agregarAlCarrito(carrito, producto, cantidad)` | Devuelve carrito con item agregado o cantidad incrementada |
| `calcularSubtotal(precio, cantidad)` | Producto correcto, rechaza negativos |
| `aplicarIVA(monto, alicuota = 0.21)` | IVA 21% según consigna del Arquitecto |
| `calcularTotalCarrito(carrito)` | Suma de subtotales + IVA |

**Tipos de tests:**
- Happy path: carrito con 2-3 productos, cálculo correcto del total con IVA.
- Casos borde: carrito vacío (total 0), un solo item, cantidad 1.
- Errores: stock insuficiente, cantidad negativa, precio negativo (debe lanzar o devolver false).
- Operaciones objeto/array: estructura del item del carrito (`{id, nombre, precio, cantidad}`).

#### Flujo 3 — Validación de Compatibilidad

| Función esperada | Qué valida el test |
|---|---|
| `validarSocket(cpu, motherboard)` | `cpu.socket === motherboard.socket` |
| `validarTipoRAM(ram, motherboard)` | DDR4/DDR5 compatible con MB |
| `calcularConsumoTotal(componentes)` | Suma de TDPs de cada componente |
| `validarPSU(consumoTotal, psu)` | `psu.watts >= consumoTotal` |
| `validarTamanoRefrigerador(cooler, case)` | Cooler entra en el case |
| `generarReporteCompatibilidad(componentes)` | Devuelve `{ compatible: boolean, errores: string[] }` |

**Tipos de tests:**
- Happy path: build válido (AM5 + DDR5 + PSU suficiente) → reporte `compatible: true`.
- Casos borde: justo en el límite (PSU = consumo exacto), una sola incompatibilidad.
- Errores: componentes faltantes, datos malformados.
- Operaciones array: el array `errores` se construye correctamente (vacío si compatible, con N entradas si no).

#### Flujo 4 — Generación de Recibo

| Función esperada | Qué valida el test |
|---|---|
| `generarIdOrden()` | Devuelve string único (formato esperado) |
| `calcularSubtotalLinea(item)` | `precio × cantidad` correcto |
| `validarCodigoDescuento(codigo)` | `{ valido: bool, porcentaje: number }` |
| `aplicarDescuento(total, porcentaje)` | Resta porcentaje correctamente |
| `generarRecibo(carrito, codigoDescuento)` | Objeto recibo con id, items, subtotal, IVA, descuento, envío $50, total |

**Tipos de tests:**
- Happy path: carrito con items + código de descuento válido → recibo completo.
- Casos borde: sin código de descuento, descuento 0%, descuento 100%.
- Errores: carrito vacío debe rechazar la generación de recibo.
- Operaciones objeto: estructura del recibo y sus líneas.

### 📊 Cobertura mínima por suite

- **4 suites de tests** (una por flujo) usando `describe()`.
- **Mínimo 3 tests por suite** (idealmente 5–8 para cubrir happy + borde + error).
- **Total estimado:** 20–30 tests.

---

## ANTES — Herramientas y Estrategia

### 🧰 Stack de testing

| Herramienta | Versión / Fuente | Uso |
|---|---|---|
| **Jasmine** | 5.10.0 vía CDN (cdnjs) | Framework de testing en navegador |
| **GitHub Copilot Agent Mode** | VS Code | Generar `script.spec.js` a partir de `js/script.js` como contexto |
| **Playwright MCP** | `@playwright/mcp` (oficial Microsoft) | Abrir `test-runner.html` en browser real, ejecutar las suites y capturar screenshots PASS/FAIL |
| **VS Code** | última estable | Editor + cliente de MCPs |

### 🤖 Justificación del uso de IA

**Copilot Agent para generación de tests:**
- Acelera la creación de specs repetitivas (estructura `describe`/`it` × 4 flujos).
- Sugiere casos borde que se pueden pasar por alto al escribir manualmente.
- Permite re-generar tests si Lucas cambia firmas de funciones en `js/script.js`.

**Playwright MCP para ejecución:**
- Reemplaza la necesidad de abrir manualmente el `test-runner.html` y screenshotear.
- Permite que Copilot Agent controle el browser y capture evidencia de forma reproducible.
- Configurable en `.vscode/mcp.json` (el repo ya tiene MCPs configurados de la entrega anterior).

### 🔄 Flujo de trabajo

```
1. Lucas (Dev JS) commitea js/script.js
        │
        ▼
2. Yo abro Copilot Agent y le adjunto:
   - js/script.js (contexto principal)
   - spec-tester.md (este archivo, define qué testear)
        │
        ▼
3. Copilot genera draft de js/test/script.spec.js
        │
        ▼
4. Reviso el output, ajusto manualmente, agrego casos faltantes
        │
        ▼
5. Pido a Copilot (vía Playwright MCP) que abra test-runner.html y
   capture screenshots de cada suite
        │
        ▼
6. Documento resultados en testing-doc.md y en la sección AL CIERRE
   de este spec. Reporto bugs como issues si fallan tests.
```

### 📂 Archivos a entregar

| Archivo | Propósito |
|---|---|
| `docs/03-specs/actividad-obligatoria-3/spec-tester.md` | Este documento (plan + evidencia) |
| `js/test/test-runner.html` | Runner Jasmine con CDN configurado |
| `js/test/script.spec.js` | 4 suites con todos los tests |
| `js/test/testing-doc.md` | Instrucciones de ejecución, descripción de suites, métricas, screenshots |

---

## ANTES — Criterios de Aceptación

Checklist que debe cumplirse para considerar la tarea cerrada:

### Documentación
- [ ] `spec-tester.md` existe en `docs/03-specs/actividad-obligatoria-3/`.
- [ ] `spec-tester.md` está commiteado **antes** que `js/test/script.spec.js` (verificable en `git log --diff-filter=A`).
- [ ] Sección BEFORE completa con plan, herramientas y criterios.
- [ ] Sección AL CIERRE completa con prompt, screenshots y resumen.

### Implementación
- [ ] `js/test/test-runner.html` carga Jasmine 5.10.0 desde CDN y referencia `script.js` + `script.spec.js`.
- [ ] `js/test/script.spec.js` contiene **4 suites `describe()`** (una por flujo).
- [ ] Cada suite tiene **≥ 3 tests `it()`**.
- [ ] Tests cubren happy path, casos borde, validación de errores, operaciones con arrays/objetos.
- [ ] Se usan al menos 4 tipos distintos de assertions de Jasmine (`toBe`, `toEqual`, `toBeTruthy`/`toBeFalsy`, `toContain`, `toThrow`, etc.).

### Ejecución y evidencia
- [ ] Test runner abierto exitosamente en browser vía Playwright MCP.
- [ ] Screenshots PASS/FAIL capturados y embebidos en `testing-doc.md` y en este spec.
- [ ] Métricas finales documentadas (X tests / Y pasaron / Z fallaron).

### Coordinación
- [ ] Bugs encontrados reportados como issues en GitHub con título claro, esperado vs obtenido, pasos para reproducir, y test que falla.
- [ ] Ajustes pedidos al Desarrollador JS para mejorar testabilidad están documentados.

### Git
- [ ] Rama `feature/tester-javascript-jasmine` creada desde `develop` actualizado.
- [ ] Al menos 1 issue de GitHub asociada al rol.
- [ ] PR contra `develop` abierto con descripción y review de otro integrante.
- [ ] Entrada en `changelog.md` con link al PR y resumen.

---

## AL CIERRE — Evidencia de Ejecución

> Sección completada el 15 de mayo de 2026 tras ejecutar la suite Jasmine en navegador real.

### Herramientas finalmente utilizadas

| Herramienta | Uso | Comentario |
|---|---|---|
| **Antigravity Agent (IDE con asistente IA en modo Agente)** | Generación de `js/test/script.spec.js` y ejecución del test runner | Reemplaza a GitHub Copilot Agent. El flujo IA-asistido y la documentación del prompt se mantienen idénticos a lo planificado. |
| **Playwright (vía script de automatización del Agente)** | Apertura del runner en `http://localhost:5501/`, espera de Jasmine y captura de screenshots PASS/FAIL | Reemplaza la invocación de Playwright vía MCP. Resultado equivalente: browser real + screenshots reproducibles. |
| **Live Server (VS Code)** | Servir `js/test/test-runner.html` en `localhost:5501` | Necesario para que Playwright lo abra como URL HTTP. |

### Prompt utilizado en el Agente IA para generar `script.spec.js`

```text
Generá el archivo js/test/script.spec.js con 4 suites describe() — una por
cada flujo del menú principal de js/script.js (Cotizador, Compatibilidad,
Carrito, Buscador). Por cada suite incluí mínimo 3 tests it() (objetivo
5-7 tests por suite) cubriendo los 4 tipos obligatorios:
  - Happy path (caso normal de uso)
  - Casos borde (valores límite, vacíos, exactos)
  - Validación de errores (null, undefined, negativos, tipos inválidos)
  - Operaciones sobre arrays/objetos (inmutabilidad, búsquedas, estructura)

Usá las firmas EXACTAS de las funciones expuestas globalmente en
js/script.js (NO inventes nombres). Usá al menos estos 6 tipos de assertions
Jasmine: toBe, toEqual, toBeTruthy, toBeFalsy, toContain, toThrow. Si una
función no acepta cierta entrada porque tira Error, testealo con
expect(() => fn(...)).toThrow().

No uses async/await, no toques el DOM, no llames a prompt/alert en los tests.
Asumí que prompt/alert están stub-eados en test-runner.html. Escribí los tests
en español. Compatible con Jasmine 5.10.

Como referencia del plan de cobertura, ver spec-tester.md (adjunto).
```

**Archivos adjuntos como contexto:**

- `js/script.js` (639 líneas, código bajo prueba).
- `docs/03-specs/actividad-obligatoria-3/spec-tester.md` (este documento, sección BEFORE — plan de cobertura).

### Fragmento representativo del código generado por el Agente IA

Fragmento de la **Suite 1 — Cotizador** (`describe("Flujo 1 — Cotizador de Productos", ...)`), parte del output IA que se mantuvo sin cambios:

```javascript
describe("calcularSubtotal()", function () {
  it("calcula correctamente sin descuento (cantidad < 3)", function () {
    expect(calcularSubtotal(100, 2)).toBe(200);
  });

  it("aplica el descuento por volumen del 10% para 5 unidades", function () {
    // 100 * 5 * 0.90 = 450
    expect(calcularSubtotal(100, 5)).toBe(450);
  });

  it("redondea a 2 decimales", function () {
    // 99.99 * 3 * 0.95 = 284.9715 → 284.97
    expect(calcularSubtotal(99.99, 3)).toBe(284.97);
  });

  it("lanza Error si el precio es negativo", function () {
    expect(function () { calcularSubtotal(-10, 5); }).toThrow();
  });

  it("lanza Error si la cantidad es 0 o negativa", function () {
    expect(function () { calcularSubtotal(100, 0); }).toThrow();
    expect(function () { calcularSubtotal(100, -3); }).toThrow();
  });
});
```

### Screenshots del test runner

Capturadas con Playwright contra `http://localhost:5501/js/test/test-runner.html` y guardadas en `js/test/screenshots/`:

| # | Imagen | Contenido |
|---|---|---|
| 1 | [`01-overview.png`](../../../js/test/screenshots/01-overview.png) | Resumen global de Jasmine: **59 specs, 0 failures** |
| 2 | [`02-flujo1-cotizador.png`](../../../js/test/screenshots/02-flujo1-cotizador.png) | Suite 1 — Cotizador (14 tests, todos PASS) |
| 3 | [`03-flujo2-compatibilidad.png`](../../../js/test/screenshots/03-flujo2-compatibilidad.png) | Suite 2 — Verificador de Compatibilidad (13 tests, todos PASS) |
| 4 | [`04-flujo3-carrito.png`](../../../js/test/screenshots/04-flujo3-carrito.png) | Suite 3 — Simulador de Carrito (15 tests, todos PASS) |
| 5 | [`05-flujo4-buscador.png`](../../../js/test/screenshots/05-flujo4-buscador.png) | Suite 4 — Buscador de Productos (10 tests, todos PASS) |

---

## AL CIERRE — Resumen de Resultados

| Métrica | Valor |
|---|---|
| Tests totales (specs) | **59** |
| Tests PASS | **59** ✅ |
| Tests FAIL | **0** |
| Porcentaje de éxito | **100%** |
| Suites describe() raíz | 4 (una por flujo del menú) |
| Sub-suites describe() (una por función pura) | 17 |
| Tipos de assertions Jasmine usadas | 8 — `toBe`, `toEqual`, `toBeTruthy`, `toBeFalsy`, `toContain`, `toThrow`, `toBeNull`, `jasmine.objectContaining` |
| Bugs reportados como issues en GitHub | 0 (ningún test falló) |

### Bugs encontrados (issues abiertos)

No se reportaron bugs. La implementación de Lucas (`js/script.js`) pasó las 59 specs en el primer intento.

---

## AL CIERRE — Ajustes Manuales y Coordinación

### Ajustes manuales sobre el output del Agente IA

El output inicial se mantuvo prácticamente intacto. Ajustes puntuales realizados:

1. **Stub de `prompt`/`alert` en `test-runner.html`** — no es un ajuste sobre el spec, pero fue indispensable. `js/script.js` invoca `iniciarMenu()` en su última línea, lo que disparaba prompts infinitos al abrir el runner. Se sobrescribieron `window.prompt` (devuelve `null`) y `window.alert` (no-op) antes del `<script src="../script.js">`, así `iniciarMenu()` sale en la primera iteración y los tests pueden ejecutarse.
2. **`jasmine.objectContaining` y `jasmine.any`** — agregados manualmente al test de `recomendarFuente()` para verificar la estructura del objeto retornado sin acoplarse a valores específicos.
3. **Uso de `beforeEach()`** — agregado en Suite 3 (Carrito) y Suite 4 (Buscador) para inicializar `productoBase`/`miniCatalogo` antes de cada test y garantizar aislamiento.
4. **Tests de inmutabilidad** — agregados explícitamente en `agregarAlCarrito()`, `filtrarProductos()` y `ordenarPorPrecio()` validando que el array de entrada no se mute.

### Ajustes solicitados al Desarrollador JavaScript

Se identificó un único punto de fricción durante el setup del runner: la línea `iniciarMenu();` al final de `js/script.js:639` se auto-ejecuta al cargar el script. Esto **rompía la ejecución de los tests** porque disparaba un loop de `prompt()` que bloqueaba el browser.

**Resolución elegida:** stub de `window.prompt`/`window.alert` en `test-runner.html` antes de cargar `script.js` (ver sección anterior, ajuste #1). Esta solución mantiene `js/script.js` sin cambios y respeta la entrega de Lucas. Alternativa descartada (más prolija pero más invasiva): envolver `iniciarMenu()` en una guarda `if (typeof window.__TESTING__ === 'undefined')` o moverla a un archivo de bootstrap separado. No se aplicó para no requerir un nuevo PR de Lucas a último momento.

Todas las funciones puras del catálogo resultaron testeables sin más cambios: están expuestas globalmente (no encapsuladas en IIFE), tienen parámetros explícitos, devuelven valores o lanzan errores controlados, y no llaman a `prompt`/`alert` directamente. Coordinación con Lucas: ✅ completa.

### Obstáculos encontrados

1. **Playwright MCP no se pudo invocar desde GitHub Copilot** — al activar el modo Agente en Copilot, el servidor MCP `playwright` configurado en `.vscode/mcp.json` no respondió. Se sustituyó por la ejecución de Playwright a través del IDE Antigravity, que también orquesta agentes IA y soporta automatización de browser. El flujo final (browser real → ejecución de Jasmine → screenshots) se cumplió igualmente.
2. **Auto-ejecución de `iniciarMenu()`** — descripto arriba. Resuelto con el stub en el runner.

---

**Estado del documento:** ✅ Sección ANTES completa | ✅ Sección AL CIERRE completa — entrega cerrada el 15 de mayo de 2026
