/**
 * @file Carrito.js
 * @description Carrito de compras del dominio PC Hardware.
 * @author Lucas Ivan Fischer — Matrícula 152159
 * @version 1.0.0
 */

/**
 * Item interno del carrito.
 * @typedef {object} ItemCarrito
 * @property {number} id
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 */

/**
 * Carrito de compras. Contiene items {id, nombre, precio, cantidad}.
 */
class Carrito {
  constructor() {
    /** @type {ItemCarrito[]} */
    this.items = [];
  }

  /**
   * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
   * No muta el producto original.
   * @param {Producto} producto
   * @param {number} cantidad
   */
  agregar(producto, cantidad) {
    if (!producto || typeof cantidad !== "number" || cantidad <= 0) {
      throw new Error("Carrito.agregar: producto o cantidad inválidos");
    }
    const idx = this.items.findIndex((i) => i.id === producto.id);
    if (idx >= 0) {
      this.items[idx] = {
        ...this.items[idx],
        cantidad: this.items[idx].cantidad + cantidad
      };
    } else {
      this.items.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
      });
    }
  }

  /**
   * Elimina un producto del carrito por id.
   * @param {number} idProducto
   */
  eliminar(idProducto) {
    this.items = this.items.filter((i) => i.id !== idProducto);
  }

  /**
   * Vacía completamente el carrito.
   */
  vaciar() {
    this.items = [];
  }

  /**
   * Indica si el carrito no tiene items.
   * @returns {boolean}
   */
  estaVacio() {
    return this.items.length === 0;
  }

  /**
   * Calcula el subtotal (sin IVA) de todos los items.
   * @returns {number}
   */
  calcularSubtotal() {
    return (
      Math.round(
        this.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0) * 100
      ) / 100
    );
  }

  /**
   * Aplica el 21% de IVA a un monto.
   * @param {number} subtotal
   * @returns {number}
   */
  aplicarIva(subtotal) {
    if (typeof subtotal !== "number" || subtotal < 0) {
      throw new Error("Carrito.aplicarIva: el monto no puede ser negativo");
    }
    return Math.round(subtotal * 1.21 * 100) / 100;
  }

  /**
   * Calcula el total del carrito (subtotal + IVA).
   * @returns {number}
   */
  calcularTotal() {
    return this.aplicarIva(this.calcularSubtotal());
  }

  /**
   * Serializa el carrito a un objeto plano.
   * @returns {object}
   */
  toJSON() {
    return { items: this.items };
  }

  /**
   * Crea una instancia de Carrito a partir de un objeto plano.
   * @param {object} json
   * @returns {Carrito}
   */
  static fromJSON(json) {
    const c = new Carrito();
    c.items = json && Array.isArray(json.items) ? json.items : [];
    return c;
  }
}