# spec-html-avanzados.md

## Rol: Desarrollador de Componentes HTML Avanzados
**Integrante:** Lucas Fischer  
**Matrícula:** 152159  
**Fecha:** 2026-04-XX  

---

## ANTES DE COMENZAR

### Componentes a implementar

#### Componente 1: `<details>` y `<summary>` — Especificaciones técnicas por producto
**Justificación:** Las fichas de producto de hardware requieren mostrar specs
técnicas extensas. El elemento `<details>/<summary>` permite ocultarlas por defecto
y expandirlas a demanda, mejorando la UX sin necesidad de JavaScript ni clases
complejas de Bootstrap. Se implementa en los 6 productos de la sección #tienda.

#### Componente 2: `<input type="range">` + `<datalist>` — Filtros mejorados
**Justificación:** Mejoran drásticamente la experiencia de filtrado en la barra
lateral existente.
- `input type="range"`: reemplaza los inputs numéricos de precio por una barra
  deslizable intuitiva para definir presupuesto mínimo y máximo.
- `datalist`: agrega sugerencias predefinidas al buscador existente (NVIDIA, AMD,
  Intel, Corsair, Kingston) mientras el usuario escribe, sin necesidad de JS.
Ambos se integran coherentemente con Bootstrap y los estilos CSS existentes.

---

### Plan de testing con Playwright MCP
- Testear que el iframe de YouTube renderiza correctamente en viewport móvil y desktop
- Testear que el elemento `<details>` se abre y cierra correctamente
- Verificar responsividad en iPhone 14 Pro, Samsung Galaxy S23 y iPad Air
- Crear issues bug con GitHub MCP por cada hallazgo

---

### Criterios de aceptación
- [ ] iframe visible y con ratio 16:9 en todos los breakpoints
- [ ] `<details>` funcional sin JavaScript
- [ ] Componentes integrados con Bootstrap sin romper estilos existentes
- [ ] Modificaciones en `styles.css` o `components.css` solo si son necesarias
- [ ] test-case-9.md y test-case-10.md documentados
- [ ] Issues creados, vinculados y cerrados

---

## AL CERRAR LA TAREA

*(Completar al finalizar)*

### Prompt exacto usado con Copilot Agent