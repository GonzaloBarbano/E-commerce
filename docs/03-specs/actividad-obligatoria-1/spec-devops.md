# Spec: DevOps

## 1. Meta y Contexto

- **Tarea asignada (según plan.md):** Configurar la infraestructura, despliegue y automatización de la plataforma E-commerce de hardware para PC. Establecer la base para CI/CD, versionado, documentación de despliegue y preparación del entorno para la primera entrega.

- **Objetivo:** Garantizar que el proyecto tenga una estructura de desarrollo y despliegue profesional, con automatización de procesos, control de versiones adecuado, y documentación de infraestructura que permita un desarrollo ágil y sostenible.

---

## 2. Requerimientos Técnicos y Funcionales

### RF-D1: Control de Versiones y Ramas (Git)

- [ ] Inicializar repositorio Git con estructura de ramas clara (main, develop, feature/_, bugfix/_)
- [ ] Documentar convención de commits siguiendo estándar (tipo: descripción)
- [ ] Crear rama `develop` como rama base de desarrollo
- [ ] Configurar protecciones en rama `main` (solo merge desde PR, requiere revisión)

### RF-D2: Automatización CI/CD Básica

- [ ] Preparar estructura para GitHub Actions (o similar) para validaciones automáticas
- [ ] Crear workflow que ejecute en cada push:
  - Validación de HTML con validador W3C o similar
  - Verificación de sintaxis de código (linting básico)
  - Construcción de artefactos si aplica
- [ ] Configurar ambiente de staging para pruebas pre-producción
- [ ] Documentar proceso de despliegue manual paso a paso

---

## 3. Criterios de Aceptación (Definición de "Terminado")

_Para que esta tarea se considere lista y la IA entienda cuándo detenerse, debe cumplir con:_

- [ ] **Convención de commits clara**: Existe documento describiendo el formato (type: feat/fix/docs/style/refactor)
- [ ] **Validación automática funcional**: Al menos un workflow de GitHub Actions ejecutándose sin errores
- [ ] **Headers de seguridad documentados**: Al menos un artefacto de configuración de seguridad base

---

## 4. Estrategia de Prompts (Para Agentes IA)

- **Herramienta a utilizar:** GitHub Copilot Chat integrado en VS Code, o Claude para tareas de arquitectura

- **Contexto a proveer a la IA:**
  - "Actúa como un DevOps/SRE especializado en proyectos web moderna con buenas prácticas"
  - "El proyecto es un E-commerce académico de hardware para PC"
  - "Enfócate en automatización, confiabilidad y documentación clara"
  - "Usa estándares de la industria: Git Flow, semantic versioning, convenciones de commits"
  - "La primera entrega es HTML5 semántico, sin framework aún"

- **Archivos de referencia:**
  - [plan.md](../../plan.md) - Contexto general del proyecto
  - [spec-frontend.md](spec-frontend.md) - Requerimientos del frontend
  - [spec-ux.md](spec-ux.md) - Requerimientos de UX
  - [spec-ia.md](spec-ia.md) - Requerimientos de IA (prompts)

---

## 5. Tareas Específicas por Entrega

### Primera Entrega (Actual)

#### 5.1 Control de Versiones

- [x] Crear rama `develop` desde `main`
- [x] Crear rama `feature/docs` para esta tarea específica de specs
- [x] Establecer nomenclatura de ramas: `feature/*`, `bugfix/*`, `hotfix/*`, `release/*`

---

## 6. Checklist de Entregables

- [ ] Repositorio Git inicializado con estructura clara
- [ ] Rama `develop` protegida y lista para uso
- [ ] README actualizado reflejando estructura DevOps
