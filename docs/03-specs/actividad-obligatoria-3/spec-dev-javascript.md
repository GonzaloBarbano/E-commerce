# spec-dev-javascript.md

**Rol:** Desarrollador JavaScript  
**Integrante:** Lucas — Matrícula 152159  
**Proyecto:** PC Hardware E-commerce  
**Actividad:** Obligatoria N°3 — Programación Web I  
**Fecha:** Mayo 2026

---

## BEFORE — Plan previo al desarrollo

> Este archivo fue commiteado antes de escribir cualquier línea de `js/script.js`, como evidencia del proceso de diseño previo.

### Descripción de los 4 flujos a implementar

El proyecto es un e-commerce de componentes de PC. Los 4 flujos representan las funcionalidades centrales de negocio de la tienda, simuladas con `prompt()` y `alert()`.

| # | Flujo | Descripción |
|---|-------|-------------|
| 1 | **Cotizador de productos** | El usuario elige una categoría (CPU, GPU, RAM, SSD, PSU, Cooling) y una cantidad. El sistema calcula el subtotal aplicando descuentos por volumen. |
| 2 | **Verificador de compatibilidad** | El usuario ingresa el TDP de su CPU y su GPU. El sistema determina qué fuente de alimentación necesita y si hay alguna disponible en stock. |
| 3 | **Simulador de carrito** | El usuario puede agregar productos al carrito, ver el resumen con subtotales y obtener el total final con IVA (21%). |
| 4 | **Buscador de productos** | El usuario filtra el catálogo por categoría y precio máximo. El sistema devuelve los productos que coinciden. |

### Estructura del menú principal

```
prompt("Bienvenido a PC Hardware\n1. Cotizador\n2. Compatibilidad\n3. Carrito\n4. Buscador\nElegí una opción (1-4):")
```

El menú se repite con un `while` hasta que el usuario ingresa "0" para salir.

---

### Decisiones de arquitectura para testabilidad

El punto más importante de esta entrega es que el **Tester (compañero de equipo) pueda escribir tests con Jasmine sobre nuestras funciones**. Para eso:

**Separación lógica/UI:**  
Las funciones de negocio **no llaman a `prompt()` ni `alert()` directamente**. Reciben parámetros y retornan valores. El `prompt()` y `alert()` solo aparecen en la función de menú principal (`iniciarMenu()`), que no es testeable por naturaleza.

**Funciones puras expuestas globalmente:**  
Todas las funciones de negocio se declaran en el scope global (no dentro de una IIFE) para que Jasmine pueda accederlas directamente desde `script.spec.js`.

**Ejemplo de separación:**
```js
// ✅ Función pura — testeable
function calcularSubtotal(precioUnitario, cantidad) { ... }

// ✅ Función de UI — no testeable, pero usa la pura
function flujo1Cotizador() {
  const cat = prompt("...");
  const cant = parseInt(prompt("..."));
  const resultado = calcularSubtotal(precio, cant); // llama a la pura
  alert(resultado);
}
```

---

### Criterios de aceptación — Checklist

- [ ] 4 flujos completos con validación de entrada
- [ ] Funciones con nombres descriptivos en camelCase, parámetros y retornos explícitos
- [ ] Lógica de negocio separada de UI: las funciones puras no llaman a `prompt()` ni `alert()`
- [ ] Funciones expuestas globalmente para testing (no encapsuladas en IIFE)
- [ ] Arrays de productos definidos como datos del catálogo
- [ ] Objetos con propiedades relevantes al contexto del proyecto
- [ ] Uso de `if/else if`, `switch`, `for`, `while` según corresponda
- [ ] Comentarios JSDoc en todas las funciones de negocio
- [ ] Código referenciado correctamente desde `index.html`
- [ ] Sin manipulación del DOM ni uso de eventos

---

## AT CLOSE — Evidencia del proceso

> Esta sección se completa al finalizar la tarea.

### Prompt exacto utilizado en Copilot Agent

```
Adjunté como contexto: los archivos .puml del Arquitecto de Diagramas (flujo-1 al flujo-4) y este archivo spec-dev-javascript.md.

Prompt utilizado:
"Basándote en los diagramas de actividades .puml adjuntos y en el spec-dev-javascript.md, generá el archivo js/script.js para el e-commerce PC Hardware. 
El código debe:
- Implementar los 4 flujos descritos en el spec usando prompt() y alert() solo en las funciones de menú
- Separar la lógica de negocio en funciones puras testeables con Jasmine
- Usar arrays de productos y objetos como estructuras de datos
- Incluir validación de entradas y comentarios JSDoc
- No usar manipulación del DOM ni addEventListener"
```

### Fragmento generado por Copilot y ajustes manuales

*(Completar al finalizar — incluir fragmento del flujo 1 generado y los cambios aplicados)*

### Decisiones finales de estructura

*(Completar al finalizar — explicar por qué quedó organizado como está y cómo facilita el trabajo del Tester)*
