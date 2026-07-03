# Spec: Desarrollador JS POO — AO4

## Metadata
- **Rol:** Desarrollador JS POO (Lógica de Negocio)
- **Autor:** @LucasFUces (Lucas Fischer)
- **Fecha inicio:** 2026-07-03
- **Rama:** feature/dev-poo-logica-negocio

## BEFORE — Plan de trabajo

### Objetivo
Migrar la lógica de negocio de `js/script.js` (funciones puras de AO3) a
clases del dominio en `js/models/`, aplicando POO con encapsulamiento,
métodos de instancia y serialización JSON.

### Filosofía
Cirugía mínima. La lógica ya está probada por 99 specs Jasmine de AO3.
Las funciones puras se convierten en métodos de clase; los tests solo
cambian de sintaxis.

### Entidades del dominio identificadas
- **Producto:** representa un item del catálogo (id, nombre, categoria,
  marca, precio, stock, tdp).
- **Carrito:** colección de items agregados con métodos para agregar,
  eliminar, calcular subtotal + IVA + total.
- **Cotizacion:** representa una cotización con descuento por volumen
  aplicado (categoria, cantidad, precio unitario) + métodos para calcular
  descuento, subtotal, IVA y generar resumen.

### Relaciones
- Carrito *compone* N items (cada item envuelve un Producto + cantidad).
- Cotizacion es independiente (no depende de Carrito ni Producto directamente).

### Serialización
Cada clase implementa `toJSON()` (devuelve objeto plano) y `fromJSON(json)`
(constructor estático) para integrarse con el `StorageUtil` del rol Storage.

### Herramientas
- GitHub Copilot en modo Agente (obligatorio por consigna 2.2.9).
- PlantUML para diagrama de clases.

### Prompt esperado para Copilot Agent
"Con los 4 diagramas de actividades .puml adjuntos + index.html +
este spec + las funciones puras de js/script.js de AO3, generá las
clases del dominio en js/models/ (Producto, Carrito, Cotizacion).
Cada una con constructor validado, JSDoc, métodos de negocio (los
mismos que están en las funciones puras de AO3), y métodos toJSON()
y fromJSON(). Sin lógica de DOM ni prompt/alert."

## Criterios de aceptación

- [ ] Este spec-dev-poo.md commiteado ANTES que cualquier archivo en
      js/models/ (verificable en historial git).
- [ ] 3 clases mínimas creadas: Producto, Carrito, Cotizacion.
- [ ] Cada clase con JSDoc en constructor y métodos públicos.
- [ ] Cada clase con toJSON() y fromJSON() implementados.
- [ ] Validaciones internas (throw Error en argumentos inválidos).
- [ ] Diagrama de clases UML en PlantUML (.puml + .png).
- [ ] Documentado en docs/04-diagramas/02-diagrama-de-clases/diagrama-clases-doc.md.
- [ ] Ninguna clase manipula DOM ni usa prompt/alert.

## AT CLOSE (pendiente de completar al cerrar la tarea)