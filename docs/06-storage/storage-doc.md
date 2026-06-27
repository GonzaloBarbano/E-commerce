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

- Prefijo fijo: `pchardware` — identifica la app y evita colisiones
- Dominio: `carrito`, `catalogo`, `cotizaciones`, `preferencias`, `sesion`
- Entidad: descripción específica del dato

Ejemplos: pchardware:carrito

pchardware:catalogo:stock

pchardware:sesion:busqueda

pchardware:cotizaciones 

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
- [ ] Funciones CRUD completas implementadas: `guardar`, `obtener`, `actualizar`, `eliminar`, `listar`, `limpiar`
- [ ] Manejo de errores con try-catch en todas las operaciones
- [ ] Serialización/deserialización automática de JSON
- [ ] Soporte para `localStorage` y `sessionStorage` mediante parámetro `tipo`
- [ ] Documentación completa en `docs/06-storage/storage-doc.md`
- [ ] Código documentado con JSDoc

### Herramientas a utilizar
- **GitHub Copilot Agent Mode**: para generar `js/utils/storage.js` usando las clases de `js/models/` y este spec como contexto
- **Justificación**: Copilot Agent permite adjuntar múltiples archivos como contexto y generar código coherente con la arquitectura existente del proyecto

---

## SECCIÓN AT CLOSE
*(Completar al finalizar la implementación)*

### Prompt exacto utilizado en Copilot Agent



### Fragmento generado por Copilot para función CRUD

```javascript
[COMPLETAR AL CERRAR]
```

### Ajustes manuales realizados

[COMPLETAR AL CERRAR]

### Decisiones finales sobre estrategia de storage

[COMPLETAR AL CERRAR]



# Documentación de Storage — PC Hardware E-commerce

**Autor:** Lucas Ivan Fischer — Matrícula 152159  
**Módulo:** `js/utils/storage.js`  
**Fecha:** 25/06/2026

---

## 1. Qué datos se almacenan

### localStorage (persistente entre sesiones)

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `pchardware:carrito` | Array | Items del carrito del usuario |
| `pchardware:catalogo:stock` | Object | Estado del stock por ID de producto |
| `pchardware:cotizaciones` | Array | Historial de cotizaciones realizadas |

### sessionStorage (temporal, solo sesión actual)

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `pchardware:sesion:busqueda` | Object | Últimos filtros de búsqueda aplicados |
| `pchardware:sesion:compatibilidad` | Object | Último resultado de compatibilidad |

---

## 2. Estructura de claves

Convención: `pchardware:<dominio>:<entidad>`

- **Prefijo fijo:** `pchardware` — identifica la app y evita colisiones con otras apps en el mismo dominio
- **Dominio:** área funcional (`carrito`, `catalogo`, `cotizaciones`, `sesion`)
- **Entidad:** dato específico dentro del dominio

---

## 3. Schemas JSON

### pchardware:carrito
```json
[
  {
    "id": 1,
    "nombre": "Intel Core i9-13900K",
    "precio": 599.99,
    "cantidad": 2
  },
  {
    "id": 3,
    "nombre": "Corsair Vengeance DDR5 32GB",
    "precio": 249.99,
    "cantidad": 1
  }
]
```

### pchardware:catalogo:stock
```json
{
  "1": 10,
  "2": 5,
  "3": 27,
  "4": 45,
  "5": 19,
  "6": 8
}
```

### pchardware:cotizaciones
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

### pchardware:sesion:busqueda
```json
{
  "categoria": "gpu",
  "precioMaximo": 2000
}
```

---

## 4. localStorage vs sessionStorage en este proyecto

| Criterio | localStorage | sessionStorage |
|----------|-------------|----------------|
| **Persistencia** | Entre sesiones (hasta que el usuario la borre) | Solo durante la pestaña/sesión actual |
| **Uso en PC Hardware** | Carrito, stock, cotizaciones | Filtros de búsqueda, resultado compatibilidad |
| **Justificación** | El carrito y el historial deben sobrevivir al cierre del navegador | Los filtros son temporales, no tiene sentido recordarlos entre sesiones |

---

## 5. Ejemplos de uso

### Guardar y recuperar el carrito
```javascript
// Guardar
StorageUtil.guardarCarrito(carrito);

// Recuperar
const carritoGuardado = StorageUtil.obtenerCarrito();
```

### Guardar stock después de una compra
```javascript
StorageUtil.guardarStock(catalogo);
```

### Registrar una cotización
```javascript
StorageUtil.guardarCotizacion({
  categoria: 'cpu',
  cantidad: 3,
  precioUnitario: 599.99,
  total: 1709.97
});
```

### Guardar filtros de búsqueda de la sesión
```javascript
StorageUtil.guardarFiltrosBusqueda({
  categoria: 'gpu',
  precioMaximo: 2000
});
```

### Usar CRUD genérico
```javascript
// Guardar dato genérico
StorageUtil.guardar('pchardware:preferencias', { tema: 'oscuro' }, 'local');

// Obtener
const prefs = StorageUtil.obtener('pchardware:preferencias', 'local');

// Listar todas las claves del dominio
const claves = StorageUtil.listar('pchardware:', 'local');

// Eliminar
StorageUtil.eliminar('pchardware:carrito', 'local');

// Limpiar todo el localStorage
StorageUtil.limpiar('local');
```

---

## 6. Manejo de errores

Todas las operaciones están envueltas en `try-catch`. Los errores posibles son:

- **QuotaExceededError**: storage lleno — se loguea en consola y retorna `false`
- **JSON inválido**: datos corruptos al hacer `JSON.parse` — retorna `null`
- **Clave inexistente**: `obtener` retorna `null`, no lanza error
- **Clave no existente en actualizar**: se crea nueva y se loguea un warning

Todos los errores se registran con `console.error('[StorageUtil] ...')` para facilitar el debugging.