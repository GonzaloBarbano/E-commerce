/**
 * @file Cotizacion.js
 * @description Cotización de N unidades de una categoría de producto,
 *              con descuento por volumen e IVA.
 * @author Lucas Ivan Fischer — Matrícula 152159
 * @version 1.0.0
 */

/**
 * Representa una cotización de N unidades de una categoría de producto
 * con descuento por volumen aplicado.
 */
class Cotizacion {
  /**
   * @param {string} categoria
   * @param {number} cantidad - entera, entre 1 y 100
   * @param {number} precioUnitario
   */
  constructor(categoria, cantidad, precioUnitario) {
    if (typeof categoria !== "string" || !categoria) {
      throw new Error("Cotizacion: categoría inválida");
    }
    if (!Number.isInteger(cantidad) || cantidad <= 0 || cantidad > 100) {
      throw new Error("Cotizacion: cantidad debe ser entera entre 1 y 100");
    }
    if (typeof precioUnitario !== "number" || precioUnitario <= 0) {
      throw new Error("Cotizacion: precio unitario inválido");
    }
    this.categoria = categoria;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }

  /**
   * Descuento por volumen: 15% ≥10 uds, 10% ≥5, 5% ≥3, 0% < 3.
   * @returns {number} porcentaje de descuento
   */
  calcularDescuento() {
    if (this.cantidad >= 10) return 15;
    if (this.cantidad >= 5) return 10;
    if (this.cantidad >= 3) return 5;
    return 0;
  }

  /**
   * Calcula el subtotal (sin IVA) aplicando el descuento por volumen.
   * @returns {number}
   */
  calcularSubtotal() {
    const desc = this.calcularDescuento();
    return (
      Math.round(
        this.precioUnitario * this.cantidad * (1 - desc / 100) * 100
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
      throw new Error("Cotizacion.aplicarIva: el monto no puede ser negativo");
    }
    return Math.round(subtotal * 1.21 * 100) / 100;
  }

  /**
   * Calcula el total (subtotal + IVA).
   * @returns {number}
   */
  calcularTotal() {
    return this.aplicarIva(this.calcularSubtotal());
  }

  /**
   * Genera un resumen legible de la cotización.
   * @returns {string}
   */
  generarResumen() {
    const desc = this.calcularDescuento();
    const sub = this.calcularSubtotal();
    const total = this.calcularTotal();
    return (
      "=== COTIZACIÓN PC HARDWARE ===\n" +
      "Categoría: " + this.categoria.toUpperCase() + "\n" +
      "Precio unitario: $" + this.precioUnitario.toFixed(2) + "\n" +
      "Cantidad: " + this.cantidad + " unidades\n" +
      "Descuento por volumen: " + desc + "%\n" +
      "Subtotal s/IVA: $" + sub.toFixed(2) + "\n" +
      "IVA (21%): $" + (total - sub).toFixed(2) + "\n" +
      "TOTAL: $" + total.toFixed(2)
    );
  }

  /**
   * Serializa la cotización a un objeto plano.
   * @returns {object}
   */
  toJSON() {
    return {
      categoria: this.categoria,
      cantidad: this.cantidad,
      precioUnitario: this.precioUnitario
    };
  }

  /**
   * Crea una instancia de Cotizacion a partir de un objeto plano.
   * @param {object} json
   * @returns {Cotizacion}
   */
  static fromJSON(json) {
    return new Cotizacion(json.categoria, json.cantidad, json.precioUnitario);
  }
}