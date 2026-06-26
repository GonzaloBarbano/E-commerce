# spec-dev-storage.md
## Desarrollador JS Local y Session Storage
**Autor:** Lucas Ivan Fischer — Matrícula 152159  
**Proyecto:** PC Hardware E-commerce  
**Rama:** feature/dev-storage  
**Fecha:** 25/06/2026

---

## SECCIÓN BEFORE
*(Commiteado antes de escribir cualquier línea de código)*

### Estrategia de almacenamiento

#### localStorage (persistente entre sesiones)
| Clave | Descripción | Justificación |
|-------|-------------|---------------|
| `pchardware:carrito` | Items del carrito del usuario | El usuario espera que su carrito persista si cierra y vuelve a abrir el navegador |
| `pchardware:catalogo:stock` | Estado del stock del catálogo | El stock decrementado debe mantenerse entre sesiones |
| `pchardware:cotizaciones` | Historial de cotizaciones realizadas | Permite al usuario revisar cotizaciones anteriores |
| `pchardware:preferencias` | Preferencias del usuario (última categoría, filtros) | Mejora la experiencia recordando las últimas búsquedas |

#### sessionStorage (temporal, solo sesión actual)
| Clave | Descripción | Justificación |
|-------|-------------|---------------|
| `pchardware:sesion:busqueda` | Últimos filtros de búsqueda aplicados | Solo relevante para la sesión actual, no necesita persistir |
| `pchardware:sesion:compatibilidad` | Último resultado de compatibilidad | Dato temporal de la sesión de navegación |

### Convención de nombres de claves
```
pchardware:<dominio>:<entidad>
```
- Prefijo fijo: `pchardware` — identifica la app y evita colisiones
- Dominio: `carrito`, `catalogo`, `cotizaciones`, `preferencias`, `sesion`
- Entidad: descripción específica del dato

Ejemplos:
```
pchardware:carrito
pchardware:catalogo:stock
pchardware:sesion:busqueda
pchardware:cotizaciones
```

### Diseño preliminar de schemas JSON

**pchardware:carrito**
```json
[
  {
    "id": 1,
    "nombre": "Intel Core i9-13900K",
    "precio": 599.99,
    "cantidad": 2
  }
]
```

**pchardware:catalogo:stock**
```json
{
  "1": 10,
  "2": 5,
  "3": 28
}
```

**pchardware:cotizaciones**
```json
[
  {
    "fecha": "2026-06-25T10:30:00Z",
    "categoria": "cpu",
    "cantidad": 3,
    "precioUnitario": 599.99,
    "total": 1709.97
  }
]
```

**pchardware:sesion:busqueda**
```json
{
  "categoria": "gpu",
  "precioMaximo": 2000
}
```

### Criterios de aceptación

- [ ] `spec-dev-storage.md` commiteado antes que `js/utils/storage.js`
- [ ] Funciones CRUD completas: `guardar`, `obtener`, `actualizar`, `eliminar`, `listar`, `limpiar`
- [ ] Manejo de errores con try-catch en todas las operaciones
- [ ] Serialización/deserialización automática de JSON
- [ ] Soporte para `localStorage` y `sessionStorage` mediante parámetro `tipo`
- [ ] Documentación completa en `docs/06-storage/storage-doc.md`
- [ ] Código documentado con JSDoc

### Herramientas a utilizar
- **GitHub Copilot Agent Mode**: para generar `js/utils/storage.js` usando `js/script.js` y este spec como contexto
- **Justificación**: Copilot Agent permite adjuntar múltiples archivos como contexto y generar código coherente con la arquitectura existente

---

## SECCIÓN AT CLOSE
*(Completado al finalizar la implementación)*

### Prompt exacto utilizado en Copilot Agent

```
Contexto adjunto: js/script.js, docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md

Prompt:
"Usando el archivo script.js del proyecto PC Hardware e-commerce como contexto,
y siguiendo la estrategia definida en spec-dev-storage.md, generá el archivo
js/utils/storage.js con las siguientes características:
- Objeto StorageUtil con funciones CRUD: guardar, obtener, actualizar, eliminar, listar, limpiar
- Parámetro tipo: 'local' para localStorage, 'session' para sessionStorage
- Serialización/deserialización automática de JSON en todas las operaciones
- Manejo de errores con try-catch en cada función, incluyendo QuotaExceededError
- Logs informativos con prefijo [StorageUtil] para debugging
- Funciones auxiliares específicas del dominio: guardarCarrito, obtenerCarrito,
  guardarStock, obtenerStock, guardarCotizacion, obtenerCotizaciones,
  guardarFiltrosBusqueda, obtenerFiltrosBusqueda
- Documentación JSDoc completa en cada función
- Convención de claves: pchardware:<dominio>:<entidad>"
```

### Fragmento generado por Copilot para función CRUD

```javascript
guardar(clave, valor, tipo = 'local') {
  try {
    const storage = tipo === 'session' ? sessionStorage : localStorage;
    const serializado = JSON.stringify(valor);
    storage.setItem(clave, serializado);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('[StorageUtil] Storage lleno. No se pudo guardar:', clave);
    } else {
      console.error('[StorageUtil] Error al guardar "' + clave + '":', error.message);
    }
    return false;
  }
}
```

### Ajustes manuales realizados

- Se agregaron funciones auxiliares de dominio (`guardarCarrito`, `obtenerStock`, etc.)
  porque Copilot generó solo las funciones CRUD genéricas sin considerar las entidades
  específicas de PC Hardware.
- Se ajustó `guardarCotizacion` para agregar automáticamente el campo `fecha` con
  `new Date().toISOString()`, ya que el output original requería pasarla manualmente.
- Se reforzaron los mensajes de `console.error` para incluir el prefijo `[StorageUtil]`
  de forma consistente en todas las funciones.

### Decisiones finales sobre estrategia de storage

- **localStorage** para carrito, stock e historial de cotizaciones: estos datos deben
  sobrevivir al cierre del navegador para no perder el trabajo del usuario.
- **sessionStorage** para filtros de búsqueda y resultados de compatibilidad: son datos
  temporales relevantes solo para la sesión actual de navegación.
- La función `actualizar` emite un `console.warn` cuando la clave no existe en lugar
  de lanzar un error, para no interrumpir el flujo.
- Las funciones auxiliares de dominio encapsulan las claves específicas para que el
  resto del código no necesite conocer la convención de nombres.