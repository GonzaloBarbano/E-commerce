# Especificación de Testing & QA

**Proyecto:** E-commerce  
**Rol:** QA Tester / Documentador  
**Versión:** 1.0  
**Última actualización:** 13 de abril de 2026

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Herramientas Obligatorias](#herramientas-obligatorias)
3. [Plan de Testing](#plan-de-testing)
4. [Criterios de Aceptación](#criterios-de-aceptación)
5. [Momento 1: Testing Pre-Merge](#momento-1-testing-pre-merge)
6. [Momento 2: Testing Post-Merge](#momento-2-testing-post-merge)
7. [Test Cases Documentados](#test-cases-documentados)
8. [Proceso de Creación de Issues](#proceso-de-creación-de-issues)
9. [Resultados & Evidencia](#resultados--evidencia)

---

## 🎯 Resumen Ejecutivo

Este documento define el flujo de testing y aseguramiento de calidad (QA) para el proyecto E-commerce. El rol del QA Tester combina:

- **Ejecución de tests automatizados** asistidos por MCP contra el ambiente local (`http://localhost:3000`)
- **Gestión de issues de bugs** en el repositorio mediante GitHub MCP
- **Documentación de hallazgos** con capturas de pantalla y evidencia

El testing se ejecuta en **dos momentos clave**:

- **Momento 1:** Testing de integración parcial (pre-merge en develop)
- **Momento 2:** Testing de integración final (post-merge en develop)

---

## 🛠️ Herramientas Obligatorias

### 1. Playwright MCP (`@playwright/mcp`)

**Propósito:** Controlar un navegador real para ejecutar tests automatizados contra la URL local del proyecto.

**Justificación:**

- Permite simular interacciones reales del usuario (clicks, scrolls, inputs)
- Soporta viewport emulation para testing responsive
- Integración con Copilot Agent Mode para ejecución asistida
- Inyección de librerías (axe-core para accesibilidad, Performance API para métricas)

**Configuración:**

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

**Endpoints objetivo:**

- Local: `http://localhost:3000` (o puerto configurado por Live Preview)
- Producción: GitHubPages (cuando aplicable)

---

### 2. GitHub MCP (`@modelcontextprotocol/server-github`)

**Propósito:** Crear issues de tipo bug directamente desde Copilot Agent Mode sin acceso manual a GitHub.

**Justificación:**

- Automatización de creación de issues con template de bug
- Vinculación automática con PRs (issue linking)
- Notificación directa a responsables sin salir del editor
- Trazabilidad completa del hallazgo en el repositorio

**Configuración:**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "<token_with_repo_and_issues_permissions>"
      }
    }
  }
}
```

**Permisos requeridos:**

- `repo` (full control of private repositories)
- `issues` (read and write access)

---

## 📊 Plan de Testing

### Objetivo General

Validar que el proyecto E-commerce cumple con criterios de calidad en:

- **Compatibilidad:** navegadores y dispositivos
- **Rendimiento:** carga y velocidad
- **Accesibilidad:** WCAG 2.1 AA mínimo
- **Semántica:** estructura HTML válida según W3C

### Test Cases Planificados

| #   | Test Case                          | Propósito                                                 | Herramienta                          | Momento(s) |
| --- | ---------------------------------- | --------------------------------------------------------- | ------------------------------------ | ---------- |
| 1   | Compatibilidad Navegadores Desktop | Verificar funcionamiento en Chrome, Firefox, Safari, Edge | Playwright MCP                       | 1 y 2      |
| 2   | Responsive en Dispositivos Móviles | Validar adaptación a iPhone, Samsung Galaxy, iPad         | Playwright MCP (viewport emulation)  | 1 y 2      |
| 3   | Performance y Carga                | Medir métricas de rendimiento (FCP, LCP, CLS)             | Playwright MCP + Performance API     | 1 y 2      |
| 4   | Accesibilidad Web                  | Validar cumplimiento WCAG 2.1 AA con axe-core             | Playwright MCP + axe-core injection  | 1 y 2      |
| 5   | Validación HTML Semántica          | Verificar estructura HTML y CSS válidos W3C               | Playwright MCP + snapshot validation | 2          |

### Coordinaciones Requeridas

- **Frontend Developer:** Checkout de rama feature/, verificación de Live Preview, resolución de bugs pre-merge
- **Responsive Specialist:** Validación de viewport emulation, ajustes responsive, notificación de hallazgos
- **Coordinador:** Confirmación de merge a develop, notificación pre-release

---

## ✅ Criterios de Aceptación

### Checklist de Ejecución

- [ ] **Momento 1 Pre-Merge:**
  - [ ] 5 test cases ejecutados con Playwright MCP contra `http://localhost:3000` en rama feature/ del Frontend Developer
  - [ ] Mínimo 1 issue bug creado con GitHub MCP por cada hallazgo relevante
  - [ ] Todos los test cases documentados con capturas de pantalla
  - [ ] Frontend Developer y Responsive Specialist notificados de los bugs encontrados
  - [ ] Issues vinculados con la PR correspondiente

- [ ] **Momento 2 Post-Merge:**
  - [ ] 5 test cases ejecutados con Playwright MCP contra `http://localhost:3000` en rama develop
  - [ ] Nuevos issues bug identificados y creados con GitHub MCP
  - [ ] testing-doc.md completado con índice y resumen de issues
  - [ ] Coordinador y responsables notificados antes de creación de release

### Métricas de Éxito

- **Covertura de Testing:** 5/5 test cases ejecutados
- **Documentación:** 100% con capturas de pantalla
- **Trazabilidad:** Todos los bugs vinculados a issues en GitHub
- **Tiempo de Respuesta:** Bugs notificados dentro de 24h de hallazgo

---

## 🔄 Momento 1: Testing Pre-Merge

**Objetivo:** Testing de integración parcial en las ramas feature/ antes de merge a develop.  
**Timing:** Ejecutar cuando el Frontend Developer y Responsive Specialist hayan finalizado sus cambios.

### Flujo de Ejecución

#### Paso 1: Redactar y Commitear spec-qa.md

```bash
# Crear rama de testing
git checkout -b feature/doc-qa

# Redactar este spec-qa.md
# (Este documento)

# Commitear
git add docs/03-specs/spec-qa.md
git commit -m "docs: redactar spec-qa.md con plan de testing"
git push origin feature/doc-qa
```

**Evidencia de compleción:**

- ✅ Commit visible en historia de git
- ✅ spec-qa.md disponible en repositorio

---

#### Paso 2: Checkout de Ramas Feature del Equipo

```bash
# Coordinar con Frontend Developer
git checkout feature/frontend
git pull origin feature/frontend

# Coordinar con Responsive Specialist
git checkout feature/responsive
git pull origin feature/responsive
```

**Verificaciones:**

- ✅ Ambas ramas están actualizadas
- ✅ No hay conflictos locales
- ✅ Los cambios están listos para testing

---

#### Paso 3: Levantar Proyecto con Live Preview

1. **Abrir proyecto en VS Code**

   ```bash
   code .
   ```

2. **Instalar dependencias (si es necesario)**

   ```bash
   npm install
   ```

3. **Lanzar Live Preview**
   - Click derecho en `index.html`
   - Seleccionar "Open with Live Preview"
   - Verificar que el proyecto carga en `http://localhost:3000` (o puerto por defecto)

4. **Registro de puerto:**
   ```
   Puerto utilizado: ________
   URL base: http://localhost:____
   Timestamp de inicio: ________
   ```

**Criterios de aceptación:**

- ✅ Página carga sin errores 500
- ✅ Consola del navegador sin errores críticos
- ✅ Todos los assets está disponibles (CSS, JS, imágenes)

---

#### Paso 4: Conectar Playwright MCP en Copilot Agent Mode

1. **Verificar configuración en `.vscode/mcp.json`:**

   ```json
   {
     "mcpServers": {
       "playwright": {
         "command": "npx",
         "args": ["@playwright/mcp"]
       }
     }
   }
   ```

2. **Abrir Copilot Chat** (Cmd+Shift+I)

3. **Activar Agent Mode** en la esquina superior derecha

4. **Prompt inicial:**
   ```
   Activa Playwright MCP para testing contra http://localhost:3000.
   Leer spec-qa.md para contexto del plan de testing.
   Ejecutar test case 1: Compatibilidad en navegadores desktop.
   Documentar resultados en docs/04-testing/test-case-1.md con capturas de pantalla.
   ```

**Verificación:**

- ✅ Playwright MCP conectado (mostrar en tool calls de Copilot)
- ✅ Copilot puede acceder a spec-qa.md como contexto

---

#### Paso 5: Ejecutar Test Cases contra Feature Branches

Para **cada test case**:

1. **Preparar prompt especializado** (ver sección de Prompts)
2. **Ejecutar contra rama feature/ del Frontend Developer**
3. **Documentar hallazgos** con timestamp y screenshot
4. **Registrar en template de test case**

**Protocolo de ejecución por test case:**

**Test Case 1:** Compatibilidad Navegadores Desktop

```
Prompt (copy-paste a Copilot Agent):
"Ejecutar test de compatibilidad en navegadores desktop contra http://localhost:3000.
- Usar Chrome, Firefox, Safari, Edge vía Playwright MCP
- Verificar que la página carga sin errores en cada navegador
- Capturar screenshot de cada navegador
- Documentar cualquier discrepancia de rendering
- Guardar resultados en docs/04-testing/test-case-1.md"
```

**Test Case 2:** Responsive en Dispositivos Móviles

```
Prompt (copy-paste a Copilot Agent):
"Ejecutar test responsive contra http://localhost:3000 usando Playwright MCP.
- Emular viewports: iPhone 12 (390x844), iPhone SE (375x667), Samsung Galaxy S21 (360x800), iPad (768x1024)
- Verificar que layout responde correctamente en cada viewport
- Capturar screenshot de landing page en cada dispositivo
- Checar que no hay contenido oculto o truncado
- Documentar en docs/04-testing/test-case-2.md"
```

**Test Case 3:** Performance y Carga

```
Prompt (copy-paste a Copilot Agent):
"Ejecutar test de performance contra http://localhost:3000 con Playwright MCP.
- Medir Performance API: FCP (First Contentful Paint), LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift)
- Target: FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- Inyectar Web Vitals library y evaluar resultados
- Capturar Console logs con métricas
- Documentar en docs/04-testing/test-case-3.md"
```

**Test Case 4:** Accesibilidad Web

```
Prompt (copy-paste a Copilot Agent):
"Ejecutar test de accesibilidad contra http://localhost:3000 usando Playwright MCP + axe-core.
- Inyectar axe-core library en la página
- Ejecutar axe.run() y capturar JSON de resultados
- Clasificar violations: critical, serious, moderate, minor
- Documentar en docs/04-testing/test-case-4.md
- Generar issue por cada violation critical o serious"
```

**Test Case 5:** Validación HTML Semántica

```
Prompt (copy-paste a Copilot Agent):
"Ejecutar test de estructura HTML semántica contra http://localhost:3000.
- Validar HTML contra W3C HTML5 validator (API: https://validator.w3.org/nu/?out=json)
- Validar CSS en los inline styles
- Verificar meta tags, semantic HTML5 elements (header, nav, main, footer)
- Captura screenshot de validaición
- Documentar en docs/04-testing/test-case-5.md"
```

**Registro por test case:**

```markdown
## Test Case X: [Nombre]

**Fecha de ejecución:** YYYY-MM-DD HH:MM  
**Rama:** feature/[nombre]  
**Navegador/Dispositivo:** [X]  
**Status:** PASS / FAIL / WARNINGS

### Hallazgos

1. [Hallazgo 1]
   - Screenshot: ![alt](../../path/to/screenshot.png)
   - Severidad: 🔴 Critical / 🟡 Serious / 🟢 Minor
   - Issue creado: #XXX

...

### Conclusión
```

---

#### Paso 6: Crear Issues Bug con GitHub MCP

Para cada hallazgo relevante:

```bash
# Prompt a Copilot Agent Mode (con GitHub MCP activado):
"Crear issue de tipo bug en GitHub usando GitHub MCP con siguiente información:

Título: [Resumen breve del bug]
Descripción:
- Hallazgo: [Descripción detallada]
- Test case: [Número de test case donde se detectó]
- Navegador/Dispositivo: [Especs]
- URL: http://localhost:3000/[página afectada]
- Pasos para reproducir: [1. ... 2. ... 3. ...]
- Resultado esperado: [X]
- Resultado actual: [Y]
- Evidencia: [Screenshot/video adjunto]

Assignee: @[Frontend Developer o Responsive Specialist según corresponda]
Labels: bug, testing:momento1
Link a PR: feature/[rama correspondiente]"
```

**GitHub Issue Template (generado por GitHub MCP):**

```markdown
## 🐛 Bug Report

**Test Case:** Test Case X - [Nombre]  
**Momento:** Momento 1 - Pre-Merge  
**Rama:** feature/[nombre]

### 📝 Descripción

[Descripción clara del bug]

### 🔁 Pasos para Reproducir

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

### ✅ Resultado Esperado

[Qué debería ocurrir]

### ❌ Resultado Actual

[Qué ocurre realmente]

### 📸 Evidencia

[Screenshots/videos]

### 🔧 Contexto

- **Navegador:** [Chrome/Firefox/Safari/Edge]
- **Dispositivo:** [Desktop/Mobile/Tablet]
- **Viewport:** [1920x1080 / 390x844 / etc.]
- **URL:** http://localhost:3000
- **Console Errors:** [Si los hay]

### 📌 Linked PR

Closes: [Link a la feature PR]
```

**Notificación al responsable:**

```bash
# Una vez creado el issue (GitHub MCP genera URL):
"Notificar a @[Frontend Developer] sobre issue #XXX: [Título del bug]
Enlace: https://github.com/[owner]/[repo]/issues/XXX
Estado: Asignado a Momento 1 - Pre-Merge
Deadline: Resolver antes de mergear a develop"
```

---

## 🚀 Momento 2: Testing Post-Merge

**Objetivo:** Testing de integración final después de mergear todos los feature/ a develop.  
**Timing:** Ejecutar una vez confirmado que todos los cambios están mergeados.

### Flujo de Ejecución

#### Paso 1: Confirmar Merge con Coordinador

Verificar con el Coordinador que:

- ✅ `feature/frontend` mergeado a develop
- ✅ `feature/responsive` mergeado a develop
- ✅ Todos los conflictos resueltos
- ✅ Develop está actualizado con todos los cambios

**Slack/Email:**

```
"Confirmación: ¿Todos los feature branches están mergeados en develop y listo para testing Momento 2?"
```

---

#### Paso 2: Checkout de Develop y Live Preview

```bash
# Checkout develop
git checkout develop
git pull origin develop

# Instalar dependencias si hay cambios en package.json
npm install

# Lanzar Live Preview
# Verificar que http://localhost:3000 está disponible
```

**Verificaciones:**

- ✅ Rama develop está actualizada
- ✅ Página carga sin errores
- ✅ Todos los cambios de feature/ están visibles

---

#### Paso 3: Ejecutar Test Cases contra Develop

Repetir **Paso 5 del Momento 1** pero contra rama `develop`:

```bash
# Prompt a Copilot Agent Mode:
"Ejecutar todos los 5 test cases contra http://localhost:3000 en rama develop.
Documentar resultados en docs/04-testing/test-case-[1-5].md
Sección específica: 'Momento 2 - Post-Merge'

Comparar con resultados de Momento 1 para detectar problemas de integración."
```

**Enfoque especial en Momento 2:**

- Validar que la integración de **todos** los estilos juntos no genera conflictos
- Detectar efectos secundarios invisibles en Momento 1
- Verificar que los bugfixes del Momento 1 se mantienen

---

#### Paso 4: Crear Issues de Nuevos Hallazgos

Para cada hallazgo nuevo en Momento 2:

```bash
# Prompt a Copilot Agent Mode:
"Crear issue de tipo bug en GitHub usando GitHub MCP:

Título: [Bug detectado en Momento 2]
Descripción:
- Hallazgo: [Descripción]
- Test case: [X]
- Momento: Momento 2 - Post-Merge
- Rama: develop
- Pasos para reproducir: [...]

Labels: bug, testing:momento2
Assignee: @[Responsable del componente afectado]"
```

**Diferencia clave:** Si el bug fue introducido por la integración (no existía en Momento 1), debe crearse como alta prioridad.

---

#### Paso 5: Notificar a Coordinador y Responsables

```bash
# Mensaje a Coordinador:
"Momento 2 Testing completado contra develop.

Resultados:
- Test cases ejecutados: 5/5 ✅
- Bugs encontrados: X
- Issues creados: [#XXX, #YYY, #ZZZ]

Recomendación: [Proceder con release / Resolver X bugs antes de release]

Revisor: Checkout de develop y verificación de issues en GitHub."
```

---

#### Paso 6: Completar y Cerrar Spec-QA

Una vez que todos los hallazgos están documentados y los bugs están creados:

```bash
# Sección final en spec-qa.md
# Agregar bajo "Resultados & Evidencia"
```

---

#### Paso 7: Abrir PR con Documentación Actualizada

```bash
# Crear rama para documentation
git checkout -b feature/testing-documentation

# Agregar todos los test cases documentados
git add docs/04-testing/
git add docs/03-specs/spec-qa.md
git commit -m "docs: documentar 5 test cases y resultados de testing Momento 1 y 2"

# Abrir PR
git push origin feature/testing-documentation
# Crear PR en GitHub con descripción de hallazgos
```

**PR Description:**

```markdown
## 📋 Testing Documentation - Momento 1 & 2

### Resumen

- Test Cases ejecutados: 5/5
- Issues creados: [Cantidad]
- Documentación: Completar

### Test Cases Documentados

- [ ] test-case-1.md: Compatibilidad Desktop
- [ ] test-case-2.md: Responsive Mobile
- [ ] test-case-3.md: Performance
- [ ] test-case-4.md: Accesibilidad
- [ ] test-case-5.md: HTML Semántico

### Issues Relacionados

[Listar todos los issues creados con GitHub MCP]

### Reviewer

@frontend-developer @responsive-specialist @coordinator
```

---

## 📝 Test Cases Documentados

Los siguientes test cases deben ser documentados en `docs/04-testing/`:

### [test-case-1.md](../../04-testing/test-case-1.md) — Compatibilidad Navegadores Desktop

```markdown
# Test Case 1: Compatibilidad en Navegadores Desktop

**Objetivo:** Verificar que el E-commerce funciona correctamente en Chrome, Firefox, Safari y Edge.

**Navegadores:** Chrome, Firefox, Safari, Edge (últimas versiones)  
**URL:** http://localhost:3000  
**Ejecutado en:** [Momento 1 / Momento 2 / Ambos]

## Resultados

### Chrome

- Status: PASS/FAIL
- Screenshot: ![Chrome](../../../path/to/chrome.png)
- Notas: [Hallazgos]

### Firefox

- Status: PASS/FAIL
- Screenshot: ![Firefox](../../../path/to/firefox.png)
- Notas: [Hallazgos]

### Safari

- Status: PASS/FAIL
- Screenshot: ![Safari](../../../path/to/safari.png)
- Notas: [Hallazgos]

### Edge

- Status: PASS/FAIL
- Screenshot: ![Edge](../../../path/to/edge.png)
- Notas: [Hallazgos]

## Issues Creados

- #XXX: [Descripción bug 1]
- #YYY: [Descripción bug 2]

## Conclusión

[Resumen de hallazgos]
```

### [test-case-2.md](../../04-testing/test-case-2.md) — Responsive Dispositivos Móviles

```markdown
# Test Case 2: Responsive en Dispositivos Móviles

**Objetivo:** Validar que el E-commerce se adapta correctamente a dispositivos móviles.

**Dispositivos emulados:** iPhone 12, iPhone SE, Samsung Galaxy S21, iPad  
**URL:** http://localhost:3000  
**Herramienta:** Playwright MCP (viewport emulation)

## Resultados por Dispositivo

### iPhone 12 (390x844)

- Status: PASS/FAIL
- Screenshot: ![iPhone 12](../../../path/to/iphone12.png)
- Layout: [Notas sobre responsive]
- Interactividad: [Notas sobre touch]

### iPhone SE (375x667)

- Status: PASS/FAIL
- Screenshot: ![iPhone SE](../../../path/to/iphonese.png)

### Samsung Galaxy S21 (360x800)

- Status: PASS/FAIL
- Screenshot: ![Galaxy S21](../../../path/to/galaxy.png)

### iPad (768x1024)

- Status: PASS/FAIL
- Screenshot: ![iPad](../../../path/to/ipad.png)

## Issues Creados

- #XXX: [Layout issues]
- #YYY: [Touch interaction bugs]

## Conclusión

[Análisis de responsive design]
```

### [test-case-3.md](../../04-testing/test-case-3.md) — Performance y Carga

```markdown
# Test Case 3: Performance y Carga

**Objetivo:** Evaluar métricas de rendimiento del E-commerce.

**Métricas:** FCP, LCP, CLS, Load Time  
**URL:** http://localhost:3000  
**Herramienta:** Playwright MCP + Performance API

## Métricas Medidas

| Métrica                        | Valor | Target   | Status    |
| ------------------------------ | ----- | -------- | --------- |
| First Contentful Paint (FCP)   | XXXms | < 1500ms | PASS/FAIL |
| Largest Contentful Paint (LCP) | XXXms | < 2500ms | PASS/FAIL |
| Cumulative Layout Shift (CLS)  | X.XX  | < 0.1    | PASS/FAIL |
| Load Time (DOMContentLoaded)   | XXXms | < 3000ms | PASS/FAIL |

## Console Logs
```

[Pegar output de Performance API]

```

## Screenshot de Web Vitals
![Web Vitals](../../../path/to/webvitals.png)

## Issues Creados
- #XXX: [Performance issue 1]
- #YYY: [Performance issue 2]

## Conclusión
[Análisis de performance]
```

### [test-case-4.md](../../04-testing/test-case-4.md) — Accesibilidad Web

````markdown
# Test Case 4: Accesibilidad Web (WCAG 2.1 AA)

**Objetivo:** Validar cumplimiento de estándares de accesibilidad web.

**Standard:** WCAG 2.1 AA  
**URL:** http://localhost:3000  
**Herramienta:** Playwright MCP + axe-core

## Resultados axe-core

### Violations (Issues encontradas)

**Critical Issues:**

- [ ] Violation 1: [Descripción]
  - Elements: [count]
  - Fix: [Recomendación]
  - Issue: #XXX

**Serious Issues:**

- [ ] Violation 1: [Descripción]
  - Issue: #YYY

**Moderate Issues:**

- [ ] Violation 1: [Descripción]

## axe-core JSON Output

```json
{
  "violations": [...],
  "passes": [...],
  "inapplicable": [...]
}
```
````

## Screenshots

![axe-core Results](../../../path/to/axe-results.png)

## Issues Creados

- #XXX: Critical accessibility issue
- #YYY: Serious accessibility issue

## Conclusión

[Cumplimiento de WCAG 2.1 AA]

````

### [test-case-5.md](../../04-testing/test-case-5.md) — Validación HTML Semántica

```markdown
# Test Case 5: Validación Estructura HTML Semántica

**Objetivo:** Validar que el HTML es semántico y cumple con W3C standards.

**Standards:** HTML5 W3C, CSS Validation
**URL:** http://localhost:3000
**Herramienta:** Playwright MCP + W3C Validators

## Validación HTML (W3C)

**Status:** PASS/FAIL
**Errores:** X
**Warnings:** Y

### Errores encontrados
- Error 1: [Descripción]
  - Line: [X]
  - Fix: [Recomendación]

- Error 2: [Descripción]

### Warnings
- Warning 1: [Descripción]

## Validación CSS (W3C)

**Status:** PASS/FAIL
**Errores:** X

### Hallazgos de CSS
[Listar errores o warnings]

## Estructura Semántica HTML5

- [ ] `<header>` presente y correctamente anidado
- [ ] `<nav>` para navegación
- [ ] `<main>` para contenido principal
- [ ] `<article>` o `<section>` para contenido importante
- [ ] `<footer>` presente
- [ ] Meta tags (title, description, viewport) presentes
- [ ] Headings (`<h1>` a `<h6>`) en orden jerárquico

**Resultado:** [PASS / FAIL]

## W3C Validator Screenshot
![W3C Validation](../../../path/to/w3c-validation.png)

## Issues Creados
- #XXX: HTML validation errors
- #YYY: CSS validation errors

## Conclusión
[Cumplimiento de W3C standards]
````

---

## 🐛 Proceso de Creación de Issues

### Criterios para Registrar como Bug

✅ **Crear issue si:**

- El hallazgo viola el spec original del proyecto
- El hallazgo diferencia entre feature branch y develop
- El hallazgo afecta a más de un navegador/dispositivo
- El hallazgo violenta estándares (WCAG, W3C, etc.)
- El hallazgo causa error de usuario (crash, datos perdidos)

❌ **NO crear issue si:**

- El hallazgo es estético y está dentro de especificación
- El hallazgo es una característica futura (backlog)
- El hallazgo es una optimización menor (< 50ms)

### GitHub Issue Etiquetas Requeridas

```
Labels:
- bug (obligatorio)
- testing:momento1 o testing:momento2
- severity:critical|serious|moderate|minor
- component:[frontend|responsive|devops|ia]
```

### Vinculación a PRs

```bash
# En el issue, mencionar:
"Linked PR: #[feature_pr_number]"

# En la PR del bug fix, mencionar:
"Fixes: #[issue_number]"
```

---

## 📊 Resultados & Evidencia

### Resumen de Momento 1

**Fecha:** YYYY-MM-DD  
**Ramas testeadas:**

- feature/frontend (commit: XXXX)
- feature/responsive (commit: XXXX)

**Resultados:**

- ✅ Test Case 1 (Navegadores): PASS/FAIL - [Breve descripción]
- ✅ Test Case 2 (Responsive): PASS/FAIL - [Breve descripción]
- ✅ Test Case 3 (Performance): PASS/FAIL - [Breve descripción]
- ✅ Test Case 4 (Accesibilidad): PASS/FAIL - [Breve descripción]
- ✅ Test Case 5 (HTML): PASS/FAIL - [Breve descripción]

**Issues creados:**
| Issue | Severidad | Asignado a | Estado |
|-------|-----------|-----------|--------|
| #XXX | Critical | @frontend-dev | Open |
| #YYY | Serious | @responsive-spec | Open |

**Conclusión:** [Hallazgos generales, recomendación para merge]

---

### Resumen de Momento 2

**Fecha:** YYYY-MM-DD  
**Rama testeada:** develop (commit: XXXX)

**Resultados Comparativos:**

- Test Case 1: PASS (sin cambios vs Momento 1)
- Test Case 2: FAIL (nuevo issue de responsive)
- Test Case 3: FAIL (mejora de performance)
- Test Case 4: PASS (sin cambios)
- Test Case 5: FAIL (nuevos errores HTML)

**Nuevos issues en Momento 2:**
| Issue | Causa | Severidad | Asignado a |
|-------|-------|-----------|-----------|
| #ZZZ | Integración de estilos | Critical | @frontend-dev |
| #AAA | Conflicto de assets | Serious | @devops |

**Conclusión:** [Análisis de integración, recomendación para release]

---

### Testing-Doc.md (Índice Centralizado)

Referencia a [docs/04-testing/testing-doc.md](../../04-testing/testing-doc.md):

```markdown
# 📊 Documentación de Testing - E-commerce

**Última actualización:** YYYY-MM-DD

## 📋 Índice de Test Cases

1. [Test Case 1: Compatibilidad Navegadores Desktop](./test-case-1.md)
2. [Test Case 2: Responsive Dispositivos Móviles](./test-case-2.md)
3. [Test Case 3: Performance y Carga](./test-case-3.md)
4. [Test Case 4: Accesibilidad Web (WCAG 2.1 AA)](./test-case-4.md)
5. [Test Case 5: Validación HTML Semántica](./test-case-5.md)

## 🐛 Resumen de Issues

### Momento 1 - Pre-Merge (Total: X issues)

[Tabla de issues]

### Momento 2 - Post-Merge (Total: X issues)

[Tabla de issues]

### Estado General

- Bugs críticos pendientes: X
- Bugs en resolución: Y
- Bugs cerrados: Z

## 📈 Métricas

| Métrica               | Valor    |
| --------------------- | -------- |
| Test cases ejecutados | 5/5      |
| Coverage de testing   | 100%     |
| Issues creados        | XX       |
| Issues cerrados       | XX       |
| Tiempo de testing     | XX horas |

## 🚀 Checklist de Cierre

- [ ] Todos los 5 test cases ejecutados y documentados
- [ ] Screenshots en todos los test cases
- [ ] Issues creados con GitHub MCP
- [ ] PRs del responsable de bugs vinculadas a los issues
- [ ] Coordinador notificado del status
- [ ] testing-doc.md completado
```

---

## 📋 Plantilla de Prompt Final a Copilot Agent

### Ejecución Completa de Testing (Momento 1 o 2)

```
# TESTING COPILOT AGENT PROMPT

Contexto: Proyecto E-commerce, QA Testing Momento [1 / 2]

Leer archivo: docs/03-specs/spec-qa.md

Requiero que ejecutes los siguientes test cases contra http://localhost:3000
usando Playwright MCP:

1. **Test Case 1: Compatibilidad Navegadores Desktop**
   - Navegadores: Chrome, Firefox, Safari, Edge
   - Herramienta: Playwright MCP
   - Documentar: docs/04-testing/test-case-1.md
   - Screenshot: Un screenshot por navegador

2. **Test Case 2: Responsive Dispositivos Móviles**
   - Dispositivos: iPhone 12, iPhone SE, Samsung Galaxy S21, iPad
   - Viewport emulation con Playwright MCP
   - Documentar: docs/04-testing/test-case-2.md
   - Screenshot: Viewport por dispositivo

3. **Test Case 3: Performance y Carga**
   - Medir: FCP, LCP, CLS, Load Time
   - Performance API + Playwright MCP
   - Target: FCP<1.5s, LCP<2.5s, CLS<0.1, LoadTime<3s
   - Documentar: docs/04-testing/test-case-3.md
   - Screenshot: Console con métricas

4. **Test Case 4: Accesibilidad Web**
   - Inyectar axe-core en la página
   - Ejecutar axe.run() contra http://localhost:3000
   - Documentar violations en formato JSON
   - Por cada critical/serious violation: crear issue GitHub
   - Documentar: docs/04-testing/test-case-4.md
   - Usar GitHub MCP para crear issues

5. **Test Case 5: Validación HTML Semántica**
   - Validar contra W3C HTML5 Validator (API)
   - Validar CSS inline
   - Verificar semantic HTML tags (header, nav, main, footer)
   - Documentar: docs/04-testing/test-case-5.md
   - Screenshot: W3C validator results

Para CADA hallazgo relevante (critical o serious):
- Usar GitHub MCP para crear issue de tipo bug
- Incluir pasos para reproducir
- Vincular a la rama feature/ correspondiente
- Asignar a @frontend-developer o @responsive-specialist según corresponda
- Label: bug, testing:momento[1/2], severity:[critical/serious/moderate/minor]

Documentar TODO en docs/04-testing/ con paths relativos.
Crear/Actualizar docs/04-testing/testing-doc.md con índice y resumen.
```

---

## 📞 Contactos y Notificaciones

### Notificación a Frontend Developer

```
@frontend-developer

He completado testing de tu rama feature/frontend.

Test cases ejecutados: 5/5
Issues encontrados: X

📋 Revisar: https://github.com/[repo]/issues?labels=testing:momento1&assignee=@frontend-developer

Deadline para fixes (pre-merge): [Fecha/Hora]

Detalles: docs/04-testing/
```

### Notificación a Responsive Specialist

```
@responsive-specialist

He completado testing responsive de tu rama feature/responsive.

Dispositivos testeados: 4 (iPhone 12, iPhone SE, Galaxy S21, iPad)
Issues encontrados: X

📋 Revisar: https://github.com/[repo]/issues?labels=testing:momento1&assignee=@responsive-specialist

Detalles: docs/04-testing/test-case-2.md
```

### Notificación a Coordinador (Pre-Release)

```
@coordinator

Testing Momento 2 (Post-Merge) completado.

Status: READY / NEED_FIXES
Issues críticos pendientes: X

Recomendación: [Proceder con release / Resolver X issues antes de crear release]

📊 Reporte: docs/04-testing/testing-doc.md
Issues creados: [Lista de issue links]
```

---

## 🎯 Checklist de Cierre Final

Una vez completados ambos momentos:

- [ ] spec-qa.md redactado y commitado (feature/doc-qa)
- [ ] 5 test cases ejecutados en Momento 1 contra feature/frontend y feature/responsive
- [ ] 5 test cases ejecutados en Momento 2 contra develop
- [ ] test-case-1.md documentado con screenshots (Chrome, Firefox, Safari, Edge)
- [ ] test-case-2.md documentado con screenshots (4 dispositivos)
- [ ] test-case-3.md documentado con métricas de performance
- [ ] test-case-4.md documentado con axe-core results
- [ ] test-case-5.md documentado con W3C validation
- [ ] Mínimo 1 issue bug creado por cada test case con GitHub MCP
- [ ] Todos los issues vinculados a sus PRs correspondientes
- [ ] testing-doc.md completado con índice y resumen
- [ ] Frontend Developer notificado de issues asignados
- [ ] Responsive Specialist notificado de issues asignados
- [ ] Coordinador notificado antes de crear release
- [ ] PR feature/testing-documentation abierta con toda la documentación
- [ ] Changelog.md actualizado con entries de testing

---

## 📚 Referencias

- **Playwright MCP Docs:** https://playwright.dev/
- **axe-core Library:** https://github.com/dequelabs/axe-core
- **W3C HTML Validator:** https://validator.w3.org/
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Web Vitals:** https://web.dev/vitals/
- **GitHub Issue Linking:** https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue

---

**Versión:** 1.0  
**Estado:** En Ejecución  
**Próxima revisión:** Post Momento 2
