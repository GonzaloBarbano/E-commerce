/**
 * @file Producto.js
 * @description Representa un producto del catálogo de PC Hardware.
 * @author Lucas Ivan Fischer — Matrícula 152159
 * @version 1.0.0
 */

/**
 * Representa un producto del catálogo de PC Hardware.
 */
class Producto {
  /**
   * @param {object} datos
   * @param {number} datos.id
   * @param {string} datos.nombre
   * @param {string} datos.categoria - cpu | gpu | ram | storage | psu | cooling
   * @param {string} datos.marca
   * @param {number} datos.precio
   * @param {number} datos.stock
   * @param {number} [datos.tdp=0]
   */
  constructor({ id, nombre, categoria, marca, precio, stock, tdp = 0 }) {
    if (typeof id !== "number") {
      throw new Error("Producto: id inválido");
    }
    if (typeof nombre !== "string" || !nombre) {
      throw new Error("Producto: nombre inválido");
    }
    if (typeof categoria !== "string" || !categoria) {
      throw new Error("Producto: categoria inválida");
    }
    if (typeof marca !== "string" || !marca) {
      throw new Error("Producto: marca inválida");
    }
    if (typeof precio !== "number" || precio <= 0) {
      throw new Error("Producto: precio inválido");
    }
    if (typeof stock !== "number" || stock < 0) {
      throw new Error("Producto: stock inválido");
    }

    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.marca = marca;
    this.precio = precio;
    this.stock = stock;
    this.tdp = tdp;
  }

  /**
   * Serializa el producto a un objeto plano.
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      categoria: this.categoria,
      marca: this.marca,
      precio: this.precio,
      stock: this.stock,
      tdp: this.tdp
    };
  }

  /**
   * Crea una instancia de Producto a partir de un objeto plano.
   * @param {object} json
   * @returns {Producto}
   */
  static fromJSON(json) {
    return new Producto(json);
  }
}