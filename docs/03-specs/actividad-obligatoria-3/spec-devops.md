# 📋 spec-devops.md — Coordinación DevOps & Code Review | Actividad Obligatoria 3

**Fecha de creación:** 11 de mayo de 2026  
**Rol:** Coordinador/DevOps  
**Proyecto:** E-commerce de Hardware para PC  
**Entrega:** Tercera Entrega (Unidad N°3 - JavaScript)

---

## 📑 Tabla de Contenidos

1. [ANTES: Plan de Coordinación](#antes-plan-de-coordinación)
2. [ANTES: Herramientas y Estrategia](#antes-herramientas-y-estrategia)
3. [ANTES: Criterios de Aceptación](#antes-criterios-de-aceptación)
4. [DURANTE/AL CERRAR: Code Reviews Documentados](#duranteal-cerrar-code-reviews-documentados)
5. [DURANTE/AL CERRAR: Resumen de Reviews](#duranteal-cerrar-resumen-de-reviews)
6. [Obstáculos y Resoluciones](#obstáculos-y-resoluciones)

---

## ANTES: Plan de Coordinación

### 🎯 Visión General

Esta es la **tercera entrega** del proyecto E-commerce basada en la **Unidad Temática N°3: Programación Web con JavaScript**. El objetivo es integrar la lógica de negocio fundamental mediante algoritmos, funciones y estructuras de datos en JavaScript, sin manipulación del DOM ni eventos (eso viene después).

**Continuidad:** Esta entrega se construye sobre la base sólida del Primer Parcial (Entregas 1 y 2), que incluye:

- ✅ Estructura HTML5 semántica y componentes avanzados
- ✅ Diseño responsive con Bootstrap
- ✅ Documentación de mockups y testing
- ✅ Sistema de versionado Git con branch model establecido

### 📊 PRs Esperadas en Orden de Integración

El flujo de integración seguirá este orden para maximizar reutilización de código y validaciones en cadena:

| Orden | Rol                           | Rama                                   | Archivo Principal                                                                  | Descripción                                       | Dependencias                       |
| ----- | ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| 1️⃣    | Arquitecto de Diagramas       | `feature/diagrama-actividades-devops`  | `docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md` + `.puml` + `.png` | 4 diagramas PlantUML de los flujos principales    | Ninguna (independiente)            |
| 2️⃣    | Desarrollador JavaScript      | `feature/script-devops`                | `js/script.js`                                                                     | Implementación completa de 4 flujos en JavaScript | Diagramas (referencia para código) |
| 3️⃣    | Tester JavaScript             | `feature/test-script-devops`           | `js/test/script.spec.js` + `js/test/test-runner.html`                              | Tests con Jasmine para los 4 flujos               | script.js (código a testear)       |
| 4️⃣    | Coordinador/DevOps (Este rol) | `feature/coord-devops-tercera-entrega` | Este archivo + resultados de reviews                                               | Validación cruzada, aprobaciones, release         | Todas las anteriores               |

### 🔄 Criterio de Aprobación General

Cada PR debe cumplir:

- ✅ **Commits bien formados:** Mensaje descriptivo, siguiendo convención `feat:`, `fix:`, `docs:`, etc.
- ✅ **Código documentado:** Comentarios JSDoc en funciones complejas, nombres significativos (camelCase/PascalCase)
- ✅ **Sin conflictos:** Rebase/merge cleanly en `release/primer-parcial`
- ✅ **Pasado code review:** ≥4 reviews (pueden incluir CHANGES_REQUESTED documentados)
- ✅ **Sincronizado:** Se ve reflejado en GitHub Pages tras merge
- ✅ **Backport validado:** Cambios del Primer Parcial están presentes

---

## ANTES: Herramientas y Estrategia

### 🤖 GitHub Copilot Agent Mode para Code Review

**Justificación:** En lugar de hacer reviews manuales tradicionales, utilizaremos Copilot Agent en modo "Code Reviewer" para:

1. **Análisis de consistencia:** Validar que el código refleje los diagramas
2. **Detección de anti-patrones:** Identificar código que no sigue principios SOLID o buenas prácticas
3. **Validación de testing:** Asegurar que los tests cubren casos borde
4. **Documentación:** Verificar que los prompts y especificaciones coincidan con la implementación

**Ventajas:**

- ✅ Feedback consistente y objetivo
- ✅ Documentación automática de hallazgos
- ✅ Reducción de sesgos en revisión manual
- ✅ Educación: Las recomendaciones de Copilot sirven como lecciones

**Limitaciones a considerar:**

- ⚠️ Copilot no reemplaza comprensión de contexto (validar manualmente el flujo de negocio)
- ⚠️ Requiere buenos prompts; si el prompt es vago, la revisión será superficial
- ⚠️ No valida requisitos académicos específicos (ej. "uso de arrays y objetos obligatorio")

### 📋 Herramientas Específicas

| Herramienta                       | Uso                                 | Entrada                         | Salida                                  |
| --------------------------------- | ----------------------------------- | ------------------------------- | --------------------------------------- |
| **Copilot Agent (Code Reviewer)** | Analizar diff, validar convenciones | Diff + especificación           | Problemas detectados, CHANGES_REQUESTED |
| **GitHub Web**                    | Crear/gestionar PRs, comentarios    | Branch + descripción            | PR visible, números de línea en diff    |
| **Git CLI**                       | Merges, creación de releases        | Comandos                        | Actualizaciones en branch, tags         |
| **VS Code**                       | Visualización de cambios, editing   | Archivos editados               | Commits locales, push a remote          |
| **GitHub Pages**                  | Deployment automático               | Push a `release/primer-parcial` | Sitio en vivo (valida integración)      |

### 📌 Flujo de Review Propuesto

```
┌─────────────────┐
│  PR Abierta     │  Desarrollador abre PR desde feature/* a release/primer-parcial
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Copilot Review │  1. Adjuntar diff + spec al Copilot Agent
│  (Automático)   │  2. Pedir validación según criterios académicos
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Review Manual    │  Coordinador revisa hallazgos de Copilot +
│ (Coordinador)    │  Validaciones de contexto del proyecto
└────────┬─────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
┌────────┐  ┌──────────────┐
│ APROBA │  │ CHANGES_REQ  │  Si hay cambios: comentarios enlazados a líneas
│ DO     │  │ (documentar) │
└────┬───┘  └───────┬──────┘
     │              │
     │      ┌───────▼────────┐
     │      │ Desarrollador   │  Ajustes y nuevo commit
     │      │ actualiza       │
     │      └────────┬────────┘
     │              │
     │      ┌───────▼────────┐
     │      │ Re-review       │  Validar cambios
     │      └────────┬────────┘
     │              │
     └──────┬───────┘
            │
            ▼
     ┌─────────────┐
     │  MERGE &    │  Si todo OK: merge a release/primer-parcial
     │  DEPLOY     │  GitHub Pages se actualiza automáticamente
     └─────────────┘
```

---

## ANTES: Criterios de Aceptación

### ✅ Checklist de Aceptación General

**Condición prévia:** Todas las correcciones del Primer Parcial están aplicadas en `release/primer-parcial`.

#### 🔹 **Aspecto 1: Correcciones del Primer Parcial Aplicadas**

- [ ] **AO1 corregida:** HTML semántico, accesibilidad, sin errores W3C
- [ ] **AO2 corregida:** Responsive CSS, Bootstrap bien implementado, sin conflictos de estilos
- [ ] **Backport validado:** Los cambios de correcciones están en la rama `release/primer-parcial` (no solo en `master`)
- [ ] **Historia limpia:** Commits son ordenados, no hay "Fix typo" fuera de contexto

#### 🔹 **Aspecto 2: Integridad Técnica de la Entrega 3**

- [ ] **js/script.js existe y está referenciado** en index.html: `<script src="js/script.js"></script>`
- [ ] **4 flujos principales implementados** con entrada → proceso → salida
- [ ] **Menú de navegación con prompt()** que permite elegir entre flujos
- [ ] **Sin manipulación de DOM:** No hay `document.querySelector()`, `innerHTML`, etc.
- [ ] **Sin event listeners:** No hay `.addEventListener()`, `onclick=`, etc.
- [ ] **4 diagramas PlantUML** (`.puml` + `.png`) documentados en `docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md`
- [ ] **Tests con Jasmine:** `js/test/script.spec.js` + `js/test/test-runner.html` funcionando en navegador
- [ ] **Coverage mínimo:** Cada flujo tiene ≥3 tests (funcionalidad básica + casos borde + validaciones)

#### 🔹 **Aspecto 3: Calidad de Código (Validado por Copilot Agent)**

- [ ] **Nomenclatura:** Variables/funciones en camelCase, constructores en PascalCase
- [ ] **Responsabilidad única:** Cada función hace UNA cosa claramente
- [ ] **Parámetros y retornos:** Funciones reciben parámetros, devuelven resultados; no usan variables globales innecesariamente
- [ ] **Arrays y objetos:** Usados apropiadamente; data grouping coherente con el contexto
- [ ] **Comentarios JSDoc:** Funciones complejas documentadas con `/** ... */`
- [ ] **Indentación y formato:** Código consistentemente indentado (2 o 4 espacios, sin tabs)

#### 🔹 **Aspecto 4: Code Review (≥4 reviews documentados)**

- [ ] **Copilot Agent Review #1:** Arquitecto/Diagramas (validar .puml refleja consignas)
- [ ] **Copilot Agent Review #2:** Desarrollador/Script (validar que script.js = diagramas)
- [ ] **Copilot Agent Review #3:** Tester/Tests (validar cobertura en Jasmine)
- [ ] **Coordinador Review Manual:** Validación de contexto académico + integración cruzada
- [ ] **Documentación de reviews:** Cada review incluye prompt exacto + resumen de hallazgos

#### 🔹 **Aspecto 5: Deployment y Accesibilidad**

- [ ] **GitHub Pages activo:** Sitio se actualiza tras merge a `release/primer-parcial`
- [ ] **Index.html visible** en GitHub Pages sin errores de carga
- [ ] **js/script.js cargado** correctamente (sin errores en consola del navegador)
- [ ] **test-runner.html accesible** en `/js/test/test-runner.html` (pueden ejecutarse tests manual o via CI)
- [ ] **Release creada:** Tag con versión (ej. `v3.0.0-ao3`) en repositorio

#### 🔹 **Aspecto 6: Documentación Completada**

- [ ] **spec-diagramas.md:** Prompts exactos usados, `.puml` adjuntos, decisiones de diseño
- [ ] **spec-dev-javascript.md:** Prompts exactos usados, flujos explicados, estructura de script.js
- [ ] **spec-test-javascript.md:** Prompts exactos usados, cobertura de tests, cómo ejecutar
- [ ] **spec-devops.md (este archivo):** Prompts y reviews documentados, obstáculos resueltos

---

## DURANTE/AL CERRAR: Code Reviews Documentados

### 📝 Plantilla para Cada Code Review

Para cada PR, completar la siguiente sección:

```markdown
### Code Review #[N] — [Rol] — [Rama]

**PR:** #[número]  
**Rama:** feature/[descripción]  
**Archivos principales:** [lista]  
**Fecha:** [fecha de review]  
**Revisor:** Copilot Agent + Coordinador

#### 🤖 Copilot Agent Prompt Exacto

\`\`\`
[COPIAR AQUÍ EL PROMPT COMPLETO USADO EN COPILOT AGENT]
[Incluir: qué archivos del diff se adjuntaron, qué criterios validar, contexto de especificación]
\`\`\`

#### 📤 Contexto Adjuntado al Agent

- [ ] Especificación (`spec-*.md`) relevante
- [ ] Diff o archivos modificados
- [ ] Diagramas PlantUML (si aplica)
- [ ] Archivos de referencia (index.html, plan.md, etc.)

#### ✅ Hallazgos y CHANGES_REQUESTED

[Listar aquí los problemas encontrados, líneas de código, y sugerencias]

Ejemplo:

- ✅ **Línea 45:** Función `calculateTotal()` no sigue patrón input → proceso → output. Sugerir refactor.
- ✅ **Línea 78:** Variable `x` debería ser `productPrice` (nomenclatura significativa)
- ✅ **Línea 102:** Falta comentario JSDoc para función `validateCart()`
- ⚠️ **CHANGES_REQUESTED:** Reemplazar `var` por `const`/`let` (ES6)

#### 📝 Resumen Manual del Coordinador

[Descripción breve de lo que se validó y estado final]
```

### 📌 Reviews Reales (Completar durante la entrega)

---

#### Code Review #1 — Arquitecto de Diagramas — `feature/diagrama-actividades-devops`

**PR:** (por completar)  
**Rama:** feature/diagrama-actividades-devops  
**Archivos principales:**

- `docs/05-diagramas/01-diagrama-de-actividades/diagramas-doc.md`
- `.puml` files (4 diagramas)
- `.png` files (4 imágenes)

**Fecha:** (por completar)  
**Revisor:** Copilot Agent + Coordinador

##### 🤖 Copilot Agent Prompt Exacto

```
[PENDIENTE - Completar cuando sea la hora de revisar]
```

##### 📤 Contexto Adjuntado

- [ ] spec-diagramas.md (especificación del arquitecto)
- [ ] plan.md (contexto de negocio)
- [ ] mockup del proyecto
- [ ] index.html (referencia estructura)

##### ✅ Hallazgos y CHANGES_REQUESTED

```
[PENDIENTE - Completar tras ejecutar Copilot Agent]
```

##### 📝 Resumen Manual del Coordinador

```
[PENDIENTE - Completar tras validación manual]

A validar:
- Cada diagrama tiene inicio/fin definidos
- Decisiones (if/else) visibles en diagramas
- Particiones separadas si hay responsabilidades de usuario/sistema
- Consistencia entre 4 diagramas
```

**Estado:** ⏳ Pendiente  
**Aprobado:** NO (aún no revisado)

---

#### Code Review #2 — Desarrollador JavaScript — `feature/script-devops`

**PR:** (por completar)  
**Rama:** feature/script-devops  
**Archivos principales:**

- `js/script.js`
- `index.html` (referencia a script)

**Fecha:** (por completar)  
**Revisor:** Copilot Agent + Coordinador

##### 🤖 Copilot Agent Prompt Exacto

```
[PENDIENTE - Completar cuando sea la hora de revisar]
```

##### 📤 Contexto Adjuntado

- [ ] spec-dev-javascript.md (especificación del desarrollador)
- [ ] Diagramas PlantUML (.puml) aprobados en Review #1
- [ ] index.html
- [ ] plan.md

##### ✅ Hallazgos y CHANGES_REQUESTED

```
[PENDIENTE - Completar tras ejecutar Copilot Agent]

A validar:
- Código refleja estructura de diagramas
- 4 flujos implementados
- Menú con prompt() funcionando
- Sin manipulación de DOM
- Sin event listeners
- Funciones con nombres descriptivos
- Arrays/objetos usados apropiadamente
- Entrada → proceso → salida en cada flujo
```

##### 📝 Resumen Manual del Coordinador

```
[PENDIENTE - Completar tras validación manual]
```

**Estado:** ⏳ Pendiente  
**Aprobado:** NO (aún no revisado)

---

#### Code Review #3 — Tester JavaScript — `feature/test-script-devops`

**PR:** (por completar)  
**Rama:** feature/test-script-devops  
**Archivos principales:**

- `js/test/script.spec.js`
- `js/test/test-runner.html`
- `js/test/testing-doc.md`

**Fecha:** (por completar)  
**Revisor:** Copilot Agent + Coordinador

##### 🤖 Copilot Agent Prompt Exacto

```
[PENDIENTE - Completar cuando sea la hora de revisar]
```

##### 📤 Contexto Adjuntado

- [ ] spec-test-javascript.md (especificación del tester)
- [ ] js/script.js (código a testear)
- [ ] Diagramas aprobados

##### ✅ Hallazgos y CHANGES_REQUESTED

```
[PENDIENTE - Completar tras ejecutar Copilot Agent]

A validar:
- 4 test suites (uno por flujo)
- Cada suite tiene ≥3 tests (happy path + casos borde + validaciones)
- expect() assertions correctas
- Cobertura de arrays/objetos
- test-runner.html funciona en navegador
- Jasmine CDN cargado correctamente
```

##### 📝 Resumen Manual del Coordinador

```
[PENDIENTE - Completar tras validación manual]
```

**Estado:** ⏳ Pendiente  
**Aprobado:** NO (aún no revisado)

---

#### Code Review #4 — Validación Cruzada — Coordinador

**Descripción:** Validación de integración cruzada, correcciones del Primer Parcial, y coherencia entre roles.

##### 🤖 Copilot Agent Prompt Exacto

```
[PENDIENTE - Completar como última revisión]
```

##### ✅ Checklist de Validación Cruzada

- [ ] Diagramas → Script coherencia (código refleja PlantUML)
- [ ] Script → Tests coherencia (tests validan funcionalidad)
- [ ] Correcciones del Primer Parcial integradas sin conflicto
- [ ] Documentación completa en `docs/03-specs/actividad-obligatoria-3/`
- [ ] Todos los commits tienen mensajes descriptivos
- [ ] No hay archivos `.puml`, `.png`, `.html` sin documentar

##### 📝 Resumen Final

```
[PENDIENTE - Completar al finalizar todas las reviews]
```

**Estado:** ⏳ Pendiente  
**Aprobado:** NO (depende de reviews anteriores)

---

## DURANTE/AL CERRAR: Resumen de Reviews

### 📊 Tabla de Estado

| Review # | Rol           | Rama                 | Estado       | CHANGES_REQUESTED | Aprobado | Merged |
| -------- | ------------- | -------------------- | ------------ | ----------------- | -------- | ------ |
| #1       | Arquitecto    | diagrama-actividades | ⏳ Pendiente | (por completar)   | ❌       | ❌     |
| #2       | Desarrollador | script-devops        | ⏳ Pendiente | (por completar)   | ❌       | ❌     |
| #3       | Tester        | test-script-devops   | ⏳ Pendiente | (por completar)   | ❌       | ❌     |
| #4       | Coordinador   | coord-devops         | ⏳ Pendiente | (validación)      | ❌       | ❌     |

### 📈 Progreso de Integración

- [ ] **Hito 1:** Review #1 completado → Diagramas MERGED
- [ ] **Hito 2:** Review #2 completado → Script MERGED
- [ ] **Hito 3:** Review #3 completado → Tests MERGED
- [ ] **Hito 4:** Review #4 completado → Todas las PRs integradas
- [ ] **Hito 5:** Release v3.0.0-ao3 creada
- [ ] **Hito 6:** GitHub Pages actualizado con cambios

### 🎯 Métricas de Calidad

_Completar al terminar:_

- **Total de CHANGES_REQUESTED:** [ ] / 4 reviews
- **Promedio de cambios por review:** [ ] iteraciones
- **Tiempo total de coordinación:** [ ] horas/días
- **Problemas críticos encontrados:** [ ] (listar)
- **Mejoras aplicadas:** [ ] (listar)

---

## Obstáculos y Resoluciones

### 📝 Registro de Problemas Encontrados

Usar este formato para cada obstáculo:

```markdown
### Obstáculo #[N]: [Título Corto]

**Fecha encontrado:** [fecha]  
**Severidad:** 🔴 Crítica / 🟠 Alta / 🟡 Media / 🟢 Baja  
**Rol afectado:** [Arquitecto/Desarrollador/Tester/Coordinador]

**Descripción:**
[Explicación del problema]

**Impacto:**
[Qué aspectos del proyecto se ven afectados]

**Resolución:**
[Cómo se resolvió el problema]

**Aprendizaje:**
[Qué aprendimos para evitarlo en futuras entregas]

**Estado:** ✅ Resuelto / ⏳ Pendiente
```

### 🔴 Obstáculos Registrados

_(Completar durante la entrega cuando surjan problemas)_

---

### Obstáculo #1: (por completar)

**Fecha encontrado:** (por completar)  
**Severidad:** (por completar)  
**Rol afectado:** (por completar)

**Descripción:**
(por completar)

**Impacto:**
(por completar)

**Resolución:**
(por completar)

**Aprendizaje:**
(por completar)

**Estado:** ⏳ Pendiente

---

## 📋 Conclusión y Sign-Off

### Actividad Completada ✅

Cuando TODOS los hitos estén completados y aprobados:

- [ ] Especificación completada y documentada
- [ ] Todas las reviews ejecutadas con prompts exactos registrados
- [ ] CHANGES_REQUESTED aplicados y validados
- [ ] Release creada
- [ ] GitHub Pages activo y reflejando cambios
- [ ] Documentación final en `docs/03-specs/actividad-obligatoria-3/`

### 👤 Firma del Coordinador DevOps

**Nombre:** Gonzalo Barbano  
**Fecha de completado:** (por completar)  
**Aprobado por Docente:** (pendiente calificación)

---

**Fin del documento**
