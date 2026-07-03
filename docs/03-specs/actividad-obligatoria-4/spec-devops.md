# Spec: Coordinador / DevOps — AO4

## Metadata

- **Rol:** Coordinador / DevOps
- **Autor:** @Naguirre0102 (Nicolás Aguirre)
- **Fecha inicio:** 2026-07-02
- **Entrega:** Actividad Obligatoria N°4 — Programación Web I (UCES)
- **Versión objetivo:** `v1.2-cuarta-entrega`

## Contexto

Cuarta entrega de la materia. El grupo se redujo a 2 personas tras el abandono de @GonzaloBarbano el 22/06/2026, por lo que los 4 roles de la consigna se redistribuyen entre @Naguirre0102 y @LucasFUces. El profe @MVelasquez98 ya aprobó AO3 con `LGTM` el 02/07/2026 (comentario en PR #117).

**Distribución final:**

- **@Naguirre0102** (Nico): Coordinador/DevOps + Tester QA + Dev JS Eventos+DOM.
- **@LucasFUces**: Dev JS POO + Dev JS Storage (retoma `feature/dev-storage` con `StorageUtil` previamente implementado y revertido de release/tercera-entrega por haber sido mergeado por error).

Este spec cubre las responsabilidades de Coordinación y DevOps. Las de Tester QA y Dev JS Eventos+DOM viven en sus specs propios (`spec-tester-qa.md` y `spec-dev-eventos-dom.md`).

---

## BEFORE — Plan de trabajo

### Objetivo

Coordinar la integración de los 4 PRs de la entrega (3 de Nico + 2 de Lucas, algunos combinados) hacia `develop`, generar `release/cuarta-entrega`, obtener el `LGTM` del docente (obligatorio antes del 2° parcial según instrucción del 02/07/2026), y cerrar formalmente la entrega con merge a `master`, backport a `develop` y publicación en campus + Slack.

### Filosofía

**Cirugía mínima:** solo lo que la rúbrica exige explícitamente, sin features de yapa. Reutilización máxima del código y estructura de AO3.

### Ramas y flujo Git

| Rama | Rol | Puntos rubrica |
|---|---|---|
| `feature/coord-devops-cuarta-entrega` | Nico — Coord/DevOps | 1.25 |
| `feature/tester-qa-specs` | Nico — Tester QA | 1.25 |
| `feature/dev-eventos-dom` | Nico — Dev JS Eventos+DOM | 2.5 |
| `feature/dev-poo-logica-negocio` | Lucas — Dev JS POO | 2.5 |
| `feature/dev-storage` (retomada) | Lucas — Dev JS Storage | 2.5 |
| `release/cuarta-entrega` | Entrega final (Nico) | — |

Cada feature apunta a `develop` (protegida, requiere aprobación de otro integrante). La release final apunta a `master`.

### Herramientas de coordinación

- **GitHub Copilot en modo Agente** (obligatorio por consigna sección 2.2.9) para code reviews de PRs de Lucas. Nico aporta los archivos del diff + este spec como contexto.
- **GitHub Projects** (Kanban) para trackear issues.
- **Slack `#2026-1er-cuat-pw1`** para notificaciones al docente y coordinación con Lucas.
- **Playwright MCP**: NO se usa por decisión del grupo. Ver justificación en `spec-tester-qa.md`.

### Orden de merge esperado

1. PR de Lucas — POO → `develop` (revisado por Nico).
2. PR de Lucas — Storage → `develop` (revisado por Nico, retoma `feature/dev-storage`).
3. PR de Nico — Dev JS Eventos+DOM → `develop` (revisado por Lucas; depende de las clases POO y de `StorageUtil`).
4. PR de Nico — Tester QA → `develop` (revisado por Lucas; depende de todo lo anterior).
5. PR de Nico — Coord/DevOps → `develop` (README, changelog, docs; se mergea al final).
6. PR final: `release/cuarta-entrega` → `master` con review del docente.

## Criterios de aceptación

Coordinación (0.15 pts del spec + 1.25 pts de coordinación):

- [ ] Este `spec-devops.md` commiteado antes que cualquier otra tarea de coordinación de la entrega (verificable en historial git).
- [ ] Correcciones de AO3 aplicadas antes de cerrar AO3 — ✅ HECHO (todos los RC + RCN resueltos, PR #118 mergeado a master, PR #137 backport a develop).
- [ ] Coordinación de PRs de features en `develop` con reviews cruzados (Nico revisa a Lucas y viceversa).
- [ ] `README.md` actualizado con info de la Cuarta Entrega.
- [ ] `changelog.md` actualizado con las contribuciones de ambos integrantes y links a PRs.
- [ ] Al menos 1 code review por Copilot Agent Mode documentado en la sección AT CLOSE de este spec.
- [ ] Rama `release/cuarta-entrega` creada desde `develop`.
- [ ] GitHub Pages activo sobre `release/cuarta-entrega`.
- [ ] Publicación de la entrega en Slack `#2026-1er-cuat-pw1` con mención a `@Matias Velasquez` y a `@LucasFUces`.
- [ ] Entrega en campus con los 2 links requeridos (PR + Pages).
- [ ] Limpieza de ramas obsoletas post-cierre.
- [ ] Issues asociadas a las tareas en GitHub Projects.

## Nota administrativa — ownership del repositorio

Este es un tema conocido del proyecto que impacta el trabajo de coordinación de esta entrega:

El repositorio `GonzaloBarbano/E-commerce` fue creado por @GonzaloBarbano, quien abandonó el grupo el 22/06/2026. @Naguirre0102 es collaborator con permisos de `Write` pero **sin acceso a Settings** (necesario para configurar GitHub Pages y ajustes del repo).

**Estrategia de mitigación:**

1. **Corto plazo (para AO3):** solicitud directa a @GonzaloBarbano por DM para activar GitHub Pages o promover el rol de @Naguirre0102 a `Admin`. Plazo interno 24-48h.
2. **Fallback si no responde (para AO4):** activar plan B — Netlify/Vercel bajo la cuenta de @Naguirre0102, o consulta explícita al docente sobre cómo proceder.
3. **Mediano plazo (para 2° parcial):** obtener el rol `Admin` de forma permanente o migrar a un fork bajo `@Naguirre0102`.

Este tema puede requerir un `spec-*.md` actualizado si se termina resolviendo por fork o cambio de hosting.

## Riesgos identificados

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Deadline apretado (~7 días efectivos) | Alta | Filosofía "cirugía mínima" + Copilot Agent para acelerar generación de código y specs. |
| Conflictos de merge entre features | Media | Orden de merge fijo (POO → Storage → DOM → Tests → Coord). |
| Lucas se ralentiza como en AO3 R2 | Media | Kickoff con deadlines de mini-hitos cada 2 días. Escalar temprano si hay bloqueo. |
| Reintroducir `prompt()`/`alert()` accidentalmente | Media-alta | Verificación pre-commit con `grep`. La rúbrica penaliza -0.5 pts al grupo si quedan. |
| GitHub Pages no se activa por ownership | Alta | Ver "Nota administrativa" arriba. |
| Bugs en integración POO ↔ DOM ↔ Storage | Alta | Testing manual continuo desde día 3, no dejar para el final. |

## Referencias

- Consigna oficial AO4 — sección 3.1.1 (Coordinador / DevOps + Tester QA).
- LGTM del docente sobre AO3: comentario del 02/07/2026 en PR #117.
- Regla del docente para AO4: *"Cuando tengan lista las feature branch y armen la release de la actividad obligatoria 4, deben crear una entrada en Slack para su code review, sin approve de esa release no pueden continuar con el segundo parcial."*

---

## AT CLOSE — (se completa al cerrar la entrega)

*Sección pendiente de completar cuando se termine el trabajo de coordinación. Debe incluir:*

- *Prompts exactos utilizados en Copilot Agent para cada code review, en bloque triple-backtick.*
- *Resumen de cada review: qué se validó, qué `CHANGES_REQUESTED` se cargaron.*
- *Obstáculos encontrados durante la coordinación y cómo se resolvieron.*
- *Resolución final del tema de ownership de GitHub Pages.*
