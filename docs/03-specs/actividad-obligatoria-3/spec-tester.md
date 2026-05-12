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

> 📝 Sección a completar después de ejecutar los tests con Playwright MCP.

### Prompt utilizado en Copilot Agent

```text
[Se completa al cierre con el prompt exacto utilizado para generar
js/test/script.spec.js, indicando qué archivos se adjuntaron como contexto.]
```

### Fragmento del código generado por Copilot

```javascript
// [Se completa al cierre con un fragmento representativo del output de Copilot,
// señalando qué partes se mantuvieron y cuáles requirieron ajuste manual.]
```

### Screenshots del test runner

> 📝 Embebidos desde `js/test/` o adjuntos al PR.

- `[ ]` Screenshot global (todas las suites)
- `[ ]` Screenshot Suite 1 — Búsqueda
- `[ ]` Screenshot Suite 2 — Carrito
- `[ ]` Screenshot Suite 3 — Compatibilidad
- `[ ]` Screenshot Suite 4 — Recibo

---

## AL CIERRE — Resumen de Resultados

> 📝 Métricas finales una vez ejecutada la suite completa.

| Métrica | Valor |
|---|---|
| Tests totales | _por completar_ |
| Tests PASS | _por completar_ |
| Tests FAIL | _por completar_ |
| Bugs reportados como issues | _por completar_ |
| Tiempo total de ejecución | _por completar_ |

### Bugs encontrados (issues abiertos)

| # | Título | Suite afectada | Estado |
|---|---|---|---|
| _-_ | _por completar_ | _-_ | _-_ |

---

## AL CIERRE — Ajustes Manuales y Coordinación

> 📝 Documentar qué partes del output de Copilot se mantuvieron tal cual, qué se ajustó manualmente y qué ajustes se le pidieron al Desarrollador JS para mejorar testabilidad.

### Ajustes manuales sobre el output de Copilot

_Por completar._

### Ajustes solicitados al Desarrollador JS

_Por completar._

### Obstáculos encontrados

_Por completar._

---

**Estado del documento:** ✅ Sección ANTES completa | ⏳ Sección AL CIERRE pendiente de ejecución
