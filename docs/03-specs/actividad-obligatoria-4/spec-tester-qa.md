# Spec: Tester QA — AO4

## Metadata

- **Rol:** Tester QA
- **Autor:** @Naguirre0102 (Nicolás Aguirre)
- **Fecha inicio:** 2026-07-02
- **Entrega:** Actividad Obligatoria N°4 — Programación Web I (UCES)
- **Rama de trabajo:** `feature/tester-qa-specs`

## Contexto

Este spec cubre las responsabilidades de **Tester QA** dentro de la distribución de roles de AO4. Nico asume 3 roles simultáneos (Coord/DevOps + Tester QA + Dev JS Eventos+DOM) por la reducción del grupo a 2 personas tras el abandono de @GonzaloBarbano.

El punto de partida técnico es AO3 recién cerrada con `LGTM` del docente:

- **99 specs Jasmine** funcionando al 100%.
- 8 suites `describe()` — 4 sobre funciones puras + 4 sobre orquestadores con `spyOn(prompt/alert)`.
- La estructura POO nueva de AO4 va a **desactualizar todos los tests que están sobre las funciones puras globales** (porque esas funciones se convierten en métodos de clase). Además, las suites 5-8 sobre orquestadores con `spyOn` **quedan obsoletas** porque ya no habrá `prompt`/`alert` que interceptar — los orquestadores pasan a ser handlers de eventos DOM.

---

## BEFORE — Plan de trabajo

### Objetivo

Actualizar la suite de tests Jasmine al nuevo diseño POO + Storage + Eventos, manteniendo o mejorando la cobertura, y generar los 2 nuevos archivos de specs que la consigna pide (`models.spec.js` y `storage.spec.js`).

### Filosofía

**Reutilización máxima:** las funciones puras que hoy están en `js/script.js` se convierten en métodos de clases. La lógica ya está probada por 99 specs de AO3 — los tests solo cambian de sintaxis (`calcularTotalCarrito(items)` pasa a ser `new Carrito(items).calcularTotal()`), no de casos de prueba.

**Cirugía mínima** también en tests: adaptar en vez de reescribir. Las suites 5-8 de `spyOn` sobre orquestadores se descartan porque no aplican al nuevo diseño (ya no hay `prompt`/`alert`); se reemplazan por tests que simulan eventos DOM cuando la testabilidad lo permita, o quedan cubiertas por tests de integración manual.

### Nuevos archivos de specs (obligatorios por consigna)

1. **`js/test/models.spec.js`** — Tests para las clases del dominio en `js/models/`:
   - Constructores (validaciones, propiedades iniciales).
   - Métodos de negocio (los mismos casos happy path + edge cases + errores que las suites 1-4 actuales, adaptados a instancias de clase).
   - Métodos de serialización `toJSON()` / `fromJSON()`.
   - Inmutabilidad (no mutar arrays/objetos originales).
   
2. **`js/test/storage.spec.js`** — Tests para `js/utils/storage.js`:
   - CRUD básico: `guardar`, `obtener`, `actualizar`, `eliminar`.
   - Auxiliares: `listar` (con prefijo), `limpiar`.
   - Serialización JSON automática (objetos complejos).
   - Manejo de errores: storage lleno (mock con QuotaExceededError), datos corruptos (JSON inválido en el storage).
   - Diferenciación entre `localStorage` y `sessionStorage`.

### Refactorización del archivo existente

**`js/test/script.spec.js`** se recorta y adapta:

- **Se descartan** las suites 5-8 (orquestadores con `spyOn(prompt/alert)`) — ya no aplican porque los orquestadores pasan a ser handlers de eventos DOM.
- **Se mantienen adaptadas** las suites 1-4 (funciones puras) solo si quedan funciones auxiliares sueltas en `js/script.js` que valga la pena testear. Si toda la lógica se migra a clases, entonces `script.spec.js` queda mínimo (solo helpers del controlador).
- La mayor parte de los ~72 tests actuales de funciones puras se mueven/reproducen en `models.spec.js` adaptados a instancias de clase.

### Herramientas

- **Jasmine 5.10** (mismo runner que AO3, sin cambios).
- **GitHub Copilot en modo Agente** (obligatorio por consigna 2.2.9) para generar los archivos de specs a partir del código fuente. Prompt esperado (draft): *"Con `js/models/*.js` + `js/utils/storage.js` + este spec como contexto, generá `js/test/models.spec.js` y `js/test/storage.spec.js` cubriendo happy path, edge cases y errores. Usá el estilo de `js/test/script.spec.js` de AO3 (Jasmine 5.10, `describe`/`it`, sin `beforeAll` global)."*
- **Playwright MCP**: **NO se usa** por decisión del grupo.

### Justificación de screenshots manuales (en vez de Playwright MCP)

La consigna sugiere Playwright MCP para ejecutar tests y capturar screenshots del test runner. **Se optó por screenshots manuales** por los siguientes motivos:

1. **Continuidad con AO3:** el docente aceptó screenshots manuales en AO3 (RCN6 R1 resuelto con capturas manuales de `test-runner.html`). No hay indicación de que sean obligatorias las de Playwright MCP.
2. **Fricción de setup:** instalar y configurar Playwright MCP requiere ~1-2 días de setup (npm, MCP server, aprender la sintaxis). Con el deadline apretado y equipo reducido a 2 personas, ese tiempo se invierte mejor en el código de features.
3. **Resultado equivalente para el evaluador:** ambas opciones producen imágenes PNG del runner con el conteo "N specs, 0 failures" — que es lo que la rúbrica pide.

Se documenta esta decisión aquí y se replica al momento de entrega. Si el docente lo cuestiona en el review, se puede migrar a Playwright MCP en un fix posterior.

## Criterios de aceptación

Testing (0.15 pts del spec + 1.25 pts de testing):

- [ ] Este `spec-tester-qa.md` commiteado antes que cualquier archivo spec de testing (verificable en historial git).
- [ ] `js/test/models.spec.js` creado con cobertura de las 3 clases POO (Producto, Carrito, Cotizacion) — constructores, métodos, `toJSON()`/`fromJSON()`.
- [ ] `js/test/storage.spec.js` creado con tests CRUD + auxiliares + manejo de errores para `js/utils/storage.js`.
- [ ] `js/test/script.spec.js` refactorizado — se descartan suites 5-8 (obsoletas), se adaptan o migran suites 1-4.
- [ ] `js/test/test-runner.html` actualizado para cargar los 3 archivos de specs.
- [ ] `js/test/testing-doc.md` actualizado con:
  - Nueva estructura de testing (models + storage + script).
  - Instrucciones para ejecutar cada suite.
  - Métricas de cobertura actualizadas.
  - Justificación de screenshots manuales.
- [ ] Screenshots del test runner capturados manualmente (mismo formato que AO3, con "N specs, 0 failures" visible).
- [ ] Bugs encontrados durante testing reportados como issues en GitHub, asignados al rol correspondiente (POO → Lucas, Storage → Lucas, DOM → Nico).
- [ ] Cobertura mínima: cada método público de cada clase tiene al menos 1 test.

## Referencias

- Consigna oficial AO4 — sección 3.1.1 (Testing y QA).
- AO3 `spec-tester.md` — estructura y estilo de tests a reutilizar.
- AO3 `js/test/script.spec.js` — 99 specs actuales, referencia para adaptar.

---

## AT CLOSE — 03/07/2026

### Herramientas IA utilizadas

Dos agentes IA distintos, uno para la parte unitaria y otro para la E2E:

- **Claude Code** — generación de los tests unitarios Jasmine (`models.spec.js` + `storage.spec.js`) contra la API acordada con Lucas en los specs BEFORE. Se le pasó como contexto el `spec-tester-qa.md`, los specs de Lucas (`spec-dev-poo.md` + `spec-dev-storage.md`), el estilo de tests de AO3 (`js/test/script.spec.js`), y la firma de las clases que Lucas iba a implementar.
- **Antigravity Agent** con Playwright — testing E2E automatizado del simulador en `index.html`. Se le pasó el prompt estructurado que incluía los 20 casos de prueba con inputs específicos y outputs esperados.

Ambas herramientas se usaron **antes de que Lucas mergeara sus clases** (Claude Code) y **después del merge** (Antigravity), en modo TDD parcial: los tests fueron escritos primero contra la API prometida, y ejecutados después contra la implementación real.

### Prompt utilizado con Claude Code (generación de specs unitarios)

```text
Con los specs BEFORE de POO y Storage como contexto (docs/03-specs/
actividad-obligatoria-4/spec-dev-poo.md y spec-dev-storage.md) más
el spec-tester-qa.md, generá js/test/models.spec.js y
js/test/storage.spec.js contra la API acordada.

Cobertura mínima esperada:
- Producto: constructor + validaciones + toJSON/fromJSON.
- Carrito: agregar (nuevo/existente), eliminar, vaciar, estaVacio,
  calcularSubtotal, aplicarIva, calcularTotal, toJSON/fromJSON,
  inmutabilidad.
- Cotizacion: constructor + validaciones + tramos de descuento
  (0/5/10/15 según cantidad) + calcularSubtotal + aplicarIva +
  calcularTotal + generarResumen + toJSON/fromJSON.
- StorageUtil: 6 funciones CRUD + manejo de errores (JSON corrupto,
  storage lleno) + integración con las clases POO.

Estilo: mismo que js/test/script.spec.js de AO3 (Jasmine 5.10,
describe/it, sin beforeAll global).
```

### Prompt utilizado con Antigravity Agent (Playwright E2E)

El prompt completo se documentó en el reporte [`docs/07-testing-ao4/reporte-e2e.md`](../../07-testing-ao4/reporte-e2e.md) y consistió en un checklist de 20 tests estructurados: setup + 4 flujos (cotizador, compatibilidad, carrito, buscador) × ~5 casos por flujo + regression tests del e-commerce del Primer Parcial. Cada caso con inputs específicos y outputs esperados en el DOM.

### Screenshots capturados

8 imágenes en [`docs/07-testing-ao4/screenshots/`](../../07-testing-ao4/screenshots/):

1. `simulador-overview.png` — sección `<section id="simulador">` con las 4 cards accordion.
2. `t1-cotizador-happy-path.png` — cotización de 5 unidades de CPU con 10 % descuento.
3. `t2-compatibilidad-fuente-ok.png` — 810 W consumo + fuente Corsair RM850x recomendada.
4. `t2-compatibilidad-exceso.png` — advertencia por consumo > 1000 W.
5. `t3-carrito-con-items.png` — carrito con 2 unidades de RTX 4090 + subtotal + IVA + total.
6. `t3-carrito-error-stock.png` — error rojo "Stock insuficiente" con validación del handler.
7. `t4-buscador-resultados.png` — tabla ordenada por precio con 6 productos.
8. `test-runner-overview.png` — Jasmine runner con el detalle de las suites.

### Resumen de resultados

| Métrica | Valor |
|---|---|
| Tests unitarios Jasmine (`models.spec.js`) | **52 specs — 52 PASS — 0 FAIL** |
| Tests unitarios Jasmine (`storage.spec.js`) | **19 specs — 19 PASS — 0 FAIL** |
| Tests E2E (Playwright) | **20 tests — 20 PASS — 0 FAIL** |
| **Total cobertura AO4** | **91 tests — 91 PASS — 0 FAIL** |
| Bugs reportados como issues en GitHub | **0** (ningún test falló al final) |
| Falso positivo detectado y corregido | 1 (valor esperado incorrecto en T1.1 del prompt; el código estaba OK) |

### Ajustes manuales sobre el output de la IA

1. **Corrección del valor esperado en T1.1** — Claude Code calculó `$3268.95` como total esperado del cotizador, pero el cálculo correcto era `599.99 × 5 × 0.90 × 1.21 = 3266.95`. El bug estaba en el prompt (mi cálculo mental), no en el código de Lucas ni en el test. Se corrigió el valor esperado en `run-e2e.js` y se re-ejecutó → 20/20 PASS.
2. **Descarte de `script.spec.js` legacy** — post-integración, los 99 specs viejos (que testeaban funciones puras globales) mostraban ~89 failures porque la lógica migró a métodos de clase. La decisión fue **eliminar el archivo** en vez de refactorizarlo, ya que `models.spec.js` (52 specs nuevos) cubre la misma lógica pero como métodos de instancia. Cobertura equivalente + código más limpio.
3. **Ajuste del guard en `js/script.js`** — se agregó `dependenciasPOOStorageDisponibles()` al inicio del `init()` para evitar `ReferenceError` si `Producto`/`Carrito`/`Cotizacion`/`StorageUtil` no estaban cargados. Permite abrir el `index.html` incluso si Lucas todavía no había mergeado sus clases (degradación elegante). No sugerido por la IA, decisión manual del rol Tester QA para reducir el blast radius de bugs futuros.

### Coordinación con Lucas para mejorar testabilidad

- **Contrato de storage keys acordado antes del código:** `pc:carrito` (localStorage) y `pc:ultimaCotizacion` (sessionStorage). Se documentó en el spec de Nico (`spec-dev-eventos-dom.md`) y en el spec de Lucas (`spec-dev-storage.md`). Lucas ajustó su implementación con un commit específico (`fix(storage): alinear claves con spec (pc:carrito, pc:ultimaCotizacion)`) después de ver que el `js/script.js` del rol Eventos+DOM usaba esas claves.
- **API de las clases POO acordada antes de escribir tests:** métodos exactos, args, valores de retorno y firmas de `toJSON`/`fromJSON`. Los tests fueron escritos contra esa API prometida antes del merge de Lucas, y **corrieron sin ajustes post-merge** — indicador de que la coordinación previa funcionó.
- **Inmutabilidad verificada:** se agregó un test específico (`carrito.agregar` no muta `producto.stock`) tras discutir con Lucas si `agregarAlCarrito` debía o no modificar el catálogo. Decisión: no lo muta; el decremento de stock queda como responsabilidad separada.
