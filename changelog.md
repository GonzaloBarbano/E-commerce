# Changelog

Este archivo se actualiza con cada Pull Request para registrar avances y correcciones.

---

## [Release Actividad Obligatoria N°3] - 2026-05-18

### Added

- [feature/tester-javascript-jasmine] Suite Jasmine 5.10 con 68 specs sobre las funciones puras de los 4 flujos del menú. Test-runner, spec-tester (BEFORE + AL CIERRE) y testing-doc completos.
  PR: [#117](https://github.com/GonzaloBarbano/E-commerce/pull/117) - @Naguirre0102 (Tester JavaScript / QA Engineer)

- [feature/dev-javascript-logica-negocio] Implementación lógica JavaScript: 4 flujos testeables (cotizador, compatibilidad, carrito, buscador) + funciones puras expuestas para Jasmine.
  PR: [#115](https://github.com/GonzaloBarbano/E-commerce/pull/115) - @LucasFUces (Desarrollador JavaScript)

- [feature/arq-diagramas-actividades] Actualizo spec, agrego 4 diagramas de actividades
  PR: [#112](https://github.com/GonzaloBarbano/E-commerce/pull/112) - @GonzaloBarbano (Arquitecto de diagramas de actividades)

- [feature/coord-devops-update-figma-and-readme] Actualizo spec
  PR: [#109](https://github.com/GonzaloBarbano/E-commerce/pull/109) - @GonzaloBarbano (Coordinador / DevOps)

### Fixed

- [fix/coord-devops-spec-devops] Resolución de RC29 × 6: reescritura completa de `spec-devops.md`
  PR: [#126](https://github.com/GonzaloBarbano/E-commerce/pull/126) - @Naguirre0102 (Coordinador / DevOps + Arquitecto de Diagramas)

- [fix/changelog-y-comentarios] Resolución de RC5, RC6, RC6(dup), RC7 y RC8: alineación de los comentarios `// FLUJO N —` de `js/script.js` con la numeración del menú real.
  PR: [#125](https://github.com/GonzaloBarbano/E-commerce/pull/125) - @Naguirre0102 (Coordinador / DevOps)

- [fix/coord-devops-renumeracion-puml] Resolución de RC10, RC10(dup), RC20 y RC23(dup).
  PR: [#124](https://github.com/GonzaloBarbano/E-commerce/pull/124) - @Naguirre0102 (Coordinador / DevOps + Arquitecto de Diagramas)

- [fix/dev-javascript-correcciones] Resolución de RC2, RC17, RC27, RC28 y RC33: JS embebido del modal movido a `script.js`, decremento real de stock al agregar al carrito, funciones orquestadoras renombradas (sin prefijo `flujoN`) y `spec-dev-javascript.md` completado.
  PR: [#123](https://github.com/GonzaloBarbano/E-commerce/pull/123) - @LucasFUces (Desarrollador JavaScript)

- [fix/coord-devops-puml] Resolución de RC11, RC12, RC13, RC18, RC19, RC25 y RC26
  PR: [#122](https://github.com/GonzaloBarbano/E-commerce/pull/122) - @Naguirre0102 (Coordinador / DevOps)

- [fix/coord-devops-readme-y-titles] Resolución de RC1, RC4, RC9, RC14, RC21, RC31 y RC32
  PR: [#121](https://github.com/GonzaloBarbano/E-commerce/pull/121) - @Naguirre0102 (Coordinador / DevOps)

- [fix/tester-correcciones] Resolución de RC3, RC22, RC29 y RC30
  PR: [#120](https://github.com/GonzaloBarbano/E-commerce/pull/120) - @Naguirre0102 (Tester JavaScript / QA Engineer)

## [ Release Recuperatorio Parcial 1] - 2026-05-05

### Added

- [feature/coord-devops-update-figma-and-readme] Actualizo spec
  PR: [#98](https://github.com/GonzaloBarbano/E-commerce/pull/98) - @GonzaloBarbano (Coordinador / DevOps)

- [feature/esp-com-bootstrap-add-component] Implemento Carousel en hero (reemplaza featured-gallery) y Modal compartido para detalle de producto en cada card + test-case-7.md (Carousel) y test-case-8.md (Modal) con análisis estático en iPhone 14 Pro, Galaxy S23 e iPad Air (closes #96)
  PR: [#97](https://github.com/GonzaloBarbano/E-commerce/pull/97) - @Naguirre0102 (Especialista en Componentes Bootstrap)

- [feature/dev-comp-html-avanzados-add-components] Creacion de nueva rama y test realizados
  PR: [#85](https://github.com/GonzaloBarbano/E-commerce/pull/85) - @LucasFUces ( Desarrollador de Componentes HTML Avanzados)

- [feature/dev-frontend-bootstrap-update-migration] Migración del layout a sistema de grilla Bootstrap 5.3 (CDN + bootstrap-overrides.css + sistema de columnas + tablas con .table-responsive) + test-case-6.md con análisis estático en iPhone 14 Pro, Galaxy S23 e iPad Air (closes #83)
  PR: [#93](https://github.com/GonzaloBarbano/E-commerce/pull/93) - @Naguirre0102 (Desarrollador Frontend/Bootstrap)

- [feature/coord-devops-update-figma-and-readme] Actualizo readme y mockup
  PR: [#82](https://github.com/GonzaloBarbano/E-commerce/pull/82) - @GonzaloBarbano (Coordinador / DevOps)

### Fixed

- [fix/menu-mobile-compacto] Compacta el menú hamburguesa en mobile
  PR: [#106](https://github.com/GonzaloBarbano/E-commerce/pull/106) - @Naguirre0102 (Especialista en Componentes Bootstrap)

- [fix/index-2] Fix alineado de navbar
  PR: [#105](https://github.com/GonzaloBarbano/E-commerce/pull/105) - @GonzaloBarbano (Coordinador / DevOps)

- [fix/index] Correccion visual en index.html
  PR: [#104](https://github.com/GonzaloBarbano/E-commerce/pull/104) - @GonzaloBarbano (Coordinador / DevOps)

- [fix/test-case] Correccion product card.
  PR: [#103](https://github.com/GonzaloBarbano/E-commerce/pull/103) - @LucasFUces (Desarrollador de Componentes HTML Avanzados)

- [fix/test-case] Correccion de test-case 6 al 10, testing-doc.md y Range en index.html
  PR: [#100](https://github.com/GonzaloBarbano/E-commerce/pull/100) - @GonzaloBarbano (Coordinador / DevOps)

- [fix/clean-merge-pr93] Elimino 3 líneas duplicadas en index.html introducidas por la resolución incorrecta de conflictos durante el merge del PR #93 (aperturas viejas de `.main-container`, `.sidebar` y `.products-grid` sin clases Bootstrap)
  PR: [#95](https://github.com/GonzaloBarbano/E-commerce/pull/95) - @Naguirre0102 (Desarrollador Frontend/Bootstrap)

- [fix/close-table-wrapper-specs-table] Cierro &lt;div class="table-wrapper"&gt; faltante en la specs-table de la sección Compatibilidad — resuelve HTML inválido detectado en el TC6 (closes #87)
  PR: [#91](https://github.com/GonzaloBarbano/E-commerce/pull/91) - @Naguirre0102 (Desarrollador Frontend/Bootstrap)

- [fix/align-breakpoint-sidebar-bootstrap] Alineo breakpoint del responsive.css con Bootstrap lg=992px — resuelve espacio vacío a la izquierda del main-content entre 992-1023px (closes #86)
  PR: [#90](https://github.com/GonzaloBarbano/E-commerce/pull/90) - @Naguirre0102 (Desarrollador Frontend/Bootstrap)
- [fix/html-avanzado] Correcciones generales
  PR: [#92](https://github.com/GonzaloBarbano/E-commerce/pull/92) - @LucasFUces ( Desarrollador de Componentes HTML Avanzados)

## [Release Actividad Obligatoria N°2] - 2026-04-19

### Fixed

- [fix/responsive-2] Resuelvo problemas de responsive
  PR: [#79](https://github.com/GonzaloBarbano/E-commerce/pull/79) - @GonzaloBarbano (QA tester)

- [fix/testing-doc-urls]agrego los link reales de los issues en testing-doc.md
  PR: [#78](https://github.com/GonzaloBarbano/E-commerce/pull/78) - @Naguirre0102 (Coordinador / DevOps)

- [fix/eliminar-js-inline-navbar] refactorizo navbar usando checkbox hack para eliminar dependencias de JS inline
  PR: [#77](https://github.com/GonzaloBarbano/E-commerce/pull/77) - @Naguirre0102 (Coordinador / DevOps)

- [fix/navbar-mobile-active] corrijo estilos del menu hamburguesa desplegable en mobile
  PR: [#76](https://github.com/GonzaloBarbano/E-commerce/pull/76) - @Naguirre0102 (Coordinador / DevOps)

- [fix/footer-responsive] ajusto margin del footer con media queries para no romper mobile
  PR: [#75](https://github.com/GonzaloBarbano/E-commerce/pull/75) - @Naguirre0102 (Coordinador / DevOps)

- [fix/responsive] correccion de responsive
  PR: [#74](https://github.com/GonzaloBarbano/E-commerce/pull/74) - @GonzaloBarbano (QA tester)

- [fix/estilos-btn-clear-filters] agrego estilos al botón de limpiar filtros
  PR: [#73](https://github.com/GonzaloBarbano/E-commerce/pull/73) - @Naguirre0102 (Coordinador / DevOps)

- [fix/eliminar-js-hamburger] extraigo script de menu hamburguesa a archivo externo
  PR: [#72](https://github.com/GonzaloBarbano/E-commerce/pull/72) - @Naguirre0102 (Coordinador / DevOps)

- [fix/hero-images-object-fit] ajusto height y object-fit para evitar recorte de imagenes
  PR: [#71](https://github.com/GonzaloBarbano/E-commerce/pull/71) - @Naguirre0102 (Coordinador / DevOps)

- [fix/tabla-overflow-mobile] agrego contenedor con overflow auto para evitar desbordamiento de la tabla en mobile
  PR: [#70](https://github.com/GonzaloBarbano/E-commerce/pull/70) - @Naguirre0102 (Coordinador / DevOps)

- [fix/estructura-nosotros-main-container] reubico cierre de main-content para envolver secciones
  PR: [#69](https://github.com/GonzaloBarbano/E-commerce/pull/69) - @Naguirre0102 (Coordinador / DevOps)

- [fix/estilos-paginacion] Correccion de estilos de paginacion
  PR: [#68](https://github.com/GonzaloBarbano/E-commerce/pull/68) - @Naguirre0102 (Coordinador / DevOps)

- [fix/renombrar-spec-frontend-a2-] renombra spec-frontend (1).md a spec-frontend.md en actividad-obligatoria-2 y correccion de changelog.md
  PR: [#66](https://github.com/GonzaloBarbano/E-commerce/pull/66) - @GonzaloBarbano (QA tester)

- [fix/completar-code-reviews] Documenta 4 code reviews asistidos por IA con GitHub Copilot (PR#21, #22, #25, #51)
  PR: [#62](https://github.com/GonzaloBarbano/E-commerce/pull/62) - @Naguirre0102 (Coordinador / DevOps)

- [fix/testing-doc-issue-links] Reemplaza URLs ficticias de issues por links reales a GitHub en testing-doc.md
  PR: [#61](https://github.com/GonzaloBarbano/E-commerce/pull/61) - @LucasFUces (Frontend CSS / Responsive Design)

- [fix/test-case-5] Correccion de responsive.css
  PR: [#60](https://github.com/GonzaloBarbano/E-commerce/pull/60) - @Naguirre0102 (Coordinador / DevOps)

- [fix/responsive.css] Correccion de responsive.css max y archivo changelog.md
  PR: [#59](https://github.com/GonzaloBarbano/E-commerce/pull/59) - @GonzaloBarbano (QA tester)

- [fix/corregir-estructura-html] Correccion de la estructura html
  PR: [#58](https://github.com/GonzaloBarbano/E-commerce/pull/58) - @GonzaloBarbano (QA tester)

- [fix/alinear-clases-css-html] Alineacion html y css para estilos, incorporacion de menu hamburguesa
  PR: [#57](https://github.com/GonzaloBarbano/E-commerce/pull/57) - @GonzaloBarbano (QA tester)

- [fix/mover-mediaqueries-a-responsive] Movi queries de styles a responsive
  PR: [#56](https://github.com/GonzaloBarbano/E-commerce/pull/56) - @GonzaloBarbano (QA tester)

- [fix/resolver-conflictos-responsive] Correccion de responsive.css
  PR: [#55](https://github.com/GonzaloBarbano/E-commerce/pull/55) - @GonzaloBarbano (QA tester)

### Added

- [feature/css-y-responsive] Corrección de diseño adaptable, accesibilidad y CSS
  PR: [#52](https://github.com/GonzaloBarbano/E-commerce/pull/52) - @LucasFUces (Desarrollador Frontend/CSS)

- [feature/doc-qa-tester-add-test-case] Creación de test-case.md
  PR: [#51](https://github.com/GonzaloBarbano/E-commerce/pull/51) - @GonzaloBarbano (QA tester)

- [feature/doc-qa] Creación de spec-qa.md y configuración de MCPs para testing
  Archivos: spec-qa.md, .env.example, .gitignore, MCP-SETUP.md, actualización .vscode/mcp.json
  Instalaciones: @playwright/mcp, @modelcontextprotocol/server-github
  PR: [#25](https://github.com/GonzaloBarbano/E-commerce/pull/25) - @GonzaloBarbano (QA Tester)

- [feature/responsive-design-add-responsive-styles] Generación de responsive.css con media queries mobile, tablet y desktop usando Copilot Agent
  PR: [#22](https://github.com/GonzaloBarbano/E-commerce/pull/22) - @LucasFUces (Especialista en Responsive Design)

- [feature/dev-frontend-css-add-styles] Generación de styles.css y components.css desde mockup Figma usando Copilot Agent
  PR: [#21](https://github.com/GonzaloBarbano/E-commerce/pull/21) - @LucasFUces (Desarrollador Frontend/CSS)

- [feature/coord-dev-ops-repo-update-readme-md] Creación de spec-devops.md y actualización de plan.md, readme y mockup
  PR: [#20](https://github.com/GonzaloBarbano/E-commerce/pull/20) - @Naguirre0102 (Coordinador / DevOps)

---

## [Release Actividad Obligatoria N°1] - 2026-03-25

### Added

- [feature/coordinador-setup-repo-and-pages] Estructura de plan.md  
  PR: [#2](https://github.com/GonzaloBarbano/E-commerce/pull/2) - @GonzaloBarbano (Coordinador / DevOps)

- [feature/ia-add-prompts-1-to-5] Agrego metodología SDD, template y spec inicial
  PR: [#4](https://github.com/GonzaloBarbano/E-commerce/pull/4) - @Naguirre0102 (Especialista IA)

- [feature/doc-ux-add-readme-and-mockup] Realizacion de readme.md y mockup
  PR: [#10](https://github.com/GonzaloBarbano/E-commerce/pull/10) - @LucasFUces(Documentador / UX)
- [feature/frontend-add-html-structure] Estructura de index.html
  PR: [#12](https://github.com/GonzaloBarbano/E-commerce/pull/12) - @GonzaloBarbano (Desarrollador Frontend)

### Fixed

- [fix/prompts] Correcciones generales
  PR: [#14](https://github.com/GonzaloBarbano/E-commerce/pull/14) - @Naguirre0102 (Especialista IA)

- [fix/prompts] Correcciones y agregado de spec-devops.md
  PR: [#15](https://github.com/GonzaloBarbano/E-commerce/pull/15) - @GonzaloBarbano (Coordinador / DevOps)

- [fix/prompts] Correccion changelog
  PR: [#16](https://github.com/GonzaloBarbano/E-commerce/pull/16) - @GonzaloBarbano (Coordinador / DevOps)

---
