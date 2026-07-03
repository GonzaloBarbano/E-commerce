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

## AT CLOSE — (se completa al cerrar la entrega)

*Sección pendiente. Debe incluir:*

- *Prompt exacto utilizado en Copilot Agent para generar `models.spec.js` y `storage.spec.js`.*
- *Screenshots del test runner con el conteo final de specs y suites.*
- *Resumen: cuántos tests pasaron, cuántos fallaron, cuántos bugs se reportaron como issues.*
- *Ajustes manuales realizados en los tests + coordinación con Lucas para mejorar testabilidad.*
