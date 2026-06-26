/**
 * @file storage.js
 * @description Capa de abstracción para localStorage y sessionStorage.
 *              Provee operaciones CRUD reutilizables con manejo de errores
 *              y serialización/deserialización automática de JSON.
 * @author Lucas Ivan Fischer — Matrícula 152159
 * @version 1.0.0
 */

const StorageUtil = {

  /**
   * Guarda un valor en storage. Serializa objetos/arrays a JSON automáticamente.
   * @param {string} clave - Clave del dato.
   * @param {any} valor - Valor a guardar.
   * @param {string} tipo - 'local' para localStorage, 'session' para sessionStorage.
   * @returns {boolean} true si se guardó correctamente, false si falló.
   */
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
  },

  /**
   * Obtiene un valor de storage. Deserializa JSON automáticamente.
   * @param {string} clave - Clave del dato.
   * @param {string} tipo - 'local' o 'session'.
   * @returns {any|null} Valor deserializado, o null si no existe o hay error.
   */
  obtener(clave, tipo = 'local') {
    try {
      const storage = tipo === 'session' ? sessionStorage : localStorage;
      const item = storage.getItem(clave);
      if (item === null) return null;
      return JSON.parse(item);
    } catch (error) {
      console.error('[StorageUtil] Error al obtener "' + clave + '":', error.message);
      return null;
    }
  },

  /**
   * Actualiza un valor existente en storage. Si no existe, lo crea.
   * @param {string} clave - Clave del dato.
   * @param {any} valor - Nuevo valor.
   * @param {string} tipo - 'local' o 'session'.
   * @returns {boolean} true si se actualizó correctamente.
   */
  actualizar(clave, valor, tipo = 'local') {
    try {
      const storage = tipo === 'session' ? sessionStorage : localStorage;
      if (storage.getItem(clave) === null) {
        console.warn('[StorageUtil] La clave "' + clave + '" no existe. Se creará nueva.');
      }
      return this.guardar(clave, valor, tipo);
    } catch (error) {
      console.error('[StorageUtil] Error al actualizar "' + clave + '":', error.message);
      return false;
    }
  },

  /**
   * Elimina un valor de storage.
   * @param {string} clave - Clave del dato a eliminar.
   * @param {string} tipo - 'local' o 'session'.
   * @returns {boolean} true si se eliminó correctamente.
   */
  eliminar(clave, tipo = 'local') {
    try {
      const storage = tipo === 'session' ? sessionStorage : localStorage;
      storage.removeItem(clave);
      return true;
    } catch (error) {
      console.error('[StorageUtil] Error al eliminar "' + clave + '":', error.message);
      return false;
    }
  },

  /**
   * Lista todas las claves que coinciden con un prefijo dado.
   * @param {string} prefijo - Prefijo a buscar (ej: 'pchardware:').
   * @param {string} tipo - 'local' o 'session'.
   * @returns {string[]} Array de claves que coinciden con el prefijo.
   */
  listar(prefijo = '', tipo = 'local') {
    try {
      const storage = tipo === 'session' ? sessionStorage : localStorage;
      const claves = [];
      for (let i = 0; i < storage.length; i++) {
        const clave = storage.key(i);
        if (clave && clave.startsWith(prefijo)) {
          claves.push(clave);
        }
      }
      return claves;
    } catch (error) {
      console.error('[StorageUtil] Error al listar claves con prefijo "' + prefijo + '":', error.message);
      return [];
    }
  },

  /**
   * Limpia todo el storage del tipo indicado.
   * @param {string} tipo - 'local' o 'session'.
   * @returns {boolean} true si se limpió correctamente.
   */
  limpiar(tipo = 'local') {
    try {
      const storage = tipo === 'session' ? sessionStorage : localStorage;
      storage.clear();
      return true;
    } catch (error) {
      console.error('[StorageUtil] Error al limpiar storage:', error.message);
      return false;
    }
  },

  // ============================================================
  // FUNCIONES AUXILIARES ESPECÍFICAS DEL DOMINIO PC HARDWARE
  // ============================================================

  /**
   * Guarda el carrito completo en localStorage.
   * @param {Array} carrito - Array de items del carrito.
   * @returns {boolean} true si se guardó correctamente.
   */
  guardarCarrito(carrito) {
    return this.guardar('pchardware:carrito', carrito, 'local');
  },

  /**
   * Recupera el carrito desde localStorage.
   * @returns {Array} Array de items del carrito, o [] si no existe.
   */
  obtenerCarrito() {
    return this.obtener('pchardware:carrito', 'local') || [];
  },

  /**
   * Guarda el estado del stock del catálogo en localStorage.
   * @param {Array} catalogo - Array de productos con stock actualizado.
   * @returns {boolean} true si se guardó correctamente.
   */
  guardarStock(catalogo) {
    const stockMap = {};
    catalogo.forEach(function(producto) {
      stockMap[producto.id] = producto.stock;
    });
    return this.guardar('pchardware:catalogo:stock', stockMap, 'local');
  },

  /**
   * Recupera el estado del stock guardado.
   * @returns {Object|null} Objeto con id → stock, o null si no existe.
   */
  obtenerStock() {
    return this.obtener('pchardware:catalogo:stock', 'local');
  },

  /**
   * Guarda una cotización en el historial.
   * @param {Object} cotizacion - Objeto con datos de la cotización.
   * @returns {boolean} true si se guardó correctamente.
   */
  guardarCotizacion(cotizacion) {
    const historial = this.obtener('pchardware:cotizaciones', 'local') || [];
    cotizacion.fecha = new Date().toISOString();
    historial.push(cotizacion);
    return this.guardar('pchardware:cotizaciones', historial, 'local');
  },

  /**
   * Recupera el historial de cotizaciones.
   * @returns {Array} Array de cotizaciones, o [] si no existe.
   */
  obtenerCotizaciones() {
    return this.obtener('pchardware:cotizaciones', 'local') || [];
  },

  /**
   * Guarda los últimos filtros de búsqueda en sessionStorage.
   * @param {Object} filtros - Objeto con categoria y precioMaximo.
   * @returns {boolean} true si se guardó correctamente.
   */
  guardarFiltrosBusqueda(filtros) {
    return this.guardar('pchardware:sesion:busqueda', filtros, 'session');
  },

  /**
   * Recupera los últimos filtros de búsqueda de la sesión.
   * @returns {Object|null} Objeto con filtros, o null si no existe.
   */
  obtenerFiltrosBusqueda() {
    return this.obtener('pchardware:sesion:busqueda', 'session');
  }
};