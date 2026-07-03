# Documentación — StorageUtil (AO4)

## Rol
Desarrollador Storage — @LucasFUces (Lucas Fischer)

## Objetivo
Proveer una capa de abstracción reutilizable sobre `localStorage` y
`sessionStorage`, con operaciones CRUD, manejo de errores y
serialización/deserialización automática de JSON, para que el resto
de los roles (POO, Eventos+DOM) puedan persistir datos sin conocer
los detalles de la Storage API del navegador.

## Ubicación
`js/utils/storage.js`

## Claves utilizadas en el dominio PC Hardware

| Clave                         | Storage         | Propósito                                  |
|--------------------------------|------------------|---------------------------------------------|
| `pc:carrito`                   | localStorage     | Estado del carrito persistente entre sesiones |
| `pc:ultimaCotizacion`          | sessionStorage   | Última cotización generada en la sesión actual |
| `pchardware:catalogo:stock`    | localStorage     | Estado del stock del catálogo                |
| `pchardware:cotizaciones`      | localStorage     | Historial completo de cotizaciones generadas |
| `pchardware:sesion:busqueda`   | sessionStorage   | Últimos filtros de búsqueda usados           |

## API de StorageUtil

### Operaciones CRUD genéricas

- **`guardar(clave, valor, tipo = 'local')`** — Serializa `valor` a JSON y lo guarda. Devuelve `true`/`false`.
- **`obtener(clave, tipo = 'local')`** — Deserializa y devuelve el valor guardado, o `null` si no existe o hay error.
- **`actualizar(clave, valor, tipo = 'local')`** — Alias de `guardar`; si la clave no existe, la crea (con warning en consola).
- **`eliminar(clave, tipo = 'local')`** — Elimina la clave indicada. Devuelve `true`/`false`.
- **`listar(prefijo = '', tipo = 'local')`** — Devuelve un array con todas las claves que empiezan con el prefijo dado.
- **`limpiar(tipo = 'local')`** — Limpia por completo el storage indicado (`clear()`).

`tipo` acepta `'local'` (default, usa `localStorage`) o `'session'` (usa `sessionStorage`).

### Funciones específicas del dominio

- `guardarCarrito(carrito)` / `obtenerCarrito()` — usan `pc:carrito` en localStorage.
- `guardarUltimaCotizacion(cotizacion)` / `obtenerUltimaCotizacion()` — usan `pc:ultimaCotizacion` en sessionStorage.
- `guardarStock(catalogo)` / `obtenerStock()` — usan `pchardware:catalogo:stock` en localStorage.
- `guardarCotizacion(cotizacion)` / `obtenerCotizaciones()` — mantienen un historial completo en `pchardware:cotizaciones` (localStorage).
- `guardarFiltrosBusqueda(filtros)` / `obtenerFiltrosBusqueda()` — usan `pchardware:sesion:busqueda` en sessionStorage.

## Manejo de errores

Todas las operaciones están envueltas en `try/catch`. El caso de
`QuotaExceededError` (storage lleno) se detecta explícitamente y se
loguea por separado del resto de los errores. Ningún método lanza
excepción hacia el llamador: siempre devuelven `false`/`null`/`[]`
según corresponda, dejando el registro del error en consola.

## Integración con el rol POO

Las clases del dominio (`Producto`, `Carrito`, `Cotizacion`) exponen
`toJSON()` / `fromJSON()`. `StorageUtil` no conoce estas clases
directamente: el llamador es responsable de serializar/deserializar
usando esos métodos antes y después de pasar los datos a
`guardar`/`obtener`.

Ejemplo de integración esperada:

```js
// Guardar
StorageUtil.guardar('pc:carrito', carrito.toJSON(), 'local');

// Recuperar
const datos = StorageUtil.obtener('pc:carrito', 'local');
const carrito = datos ? Carrito.fromJSON(datos) : new Carrito();
```

## Referencias

- Spec BEFORE: `docs/03-specs/actividad-obligatoria-4/spec-dev-storage.md`
- Consigna AO4, sección 3.1.4