/**
 * @file models.spec.js
 * @description Suite Jasmine para las clases del dominio (js/models/):
 *              Producto, Carrito, Cotizacion.
 *              Testea constructores, métodos de negocio, validaciones,
 *              inmutabilidad y serialización (toJSON/fromJSON).
 * @author Nicolás Aguirre — Tester QA / AO4
 *
 * Nota: los tests referencian las clases que provee @LucasFUces en la rama
 * feature/dev-poo-logica-negocio. Estos specs están escritos contra la API
 * acordada en spec-dev-poo.md antes de que el código exista, por lo que
 * al mergear POO deberían ejecutarse sin cambios (o con ajustes mínimos).
 */

// =============================================================================
// SUITE 1 — Producto
// =============================================================================

describe("Producto", function () {

  var datosValidos = {
    id: 1,
    nombre: "Intel Core i9-13900K",
    categoria: "cpu",
    marca: "Intel",
    precio: 599.99,
    stock: 12,
    tdp: 125,
  };

  describe("constructor", function () {
    it("crea una instancia con todas las propiedades", function () {
      var p = new Producto(datosValidos);
      expect(p.id).toBe(1);
      expect(p.nombre).toBe("Intel Core i9-13900K");
      expect(p.categoria).toBe("cpu");
      expect(p.marca).toBe("Intel");
      expect(p.precio).toBe(599.99);
      expect(p.stock).toBe(12);
      expect(p.tdp).toBe(125);
    });

    it("acepta productos sin tdp (default 0)", function () {
      var datos = Object.assign({}, datosValidos, { tdp: undefined });
      delete datos.tdp;
      var p = new Producto(datos);
      expect(p.tdp).toBe(0);
    });

    it("lanza Error si el id no es un número", function () {
      var datos = Object.assign({}, datosValidos, { id: "abc" });
      expect(function () { new Producto(datos); }).toThrow();
    });

    it("lanza Error si el precio es 0 o negativo", function () {
      var datosCero = Object.assign({}, datosValidos, { precio: 0 });
      var datosNeg = Object.assign({}, datosValidos, { precio: -5 });
      expect(function () { new Producto(datosCero); }).toThrow();
      expect(function () { new Producto(datosNeg); }).toThrow();
    });

    it("lanza Error si el stock es negativo", function () {
      var datos = Object.assign({}, datosValidos, { stock: -1 });
      expect(function () { new Producto(datos); }).toThrow();
    });

    it("permite stock en cero (producto agotado pero listado)", function () {
      var datos = Object.assign({}, datosValidos, { stock: 0 });
      expect(function () { new Producto(datos); }).not.toThrow();
    });
  });

  describe("toJSON() / fromJSON() — round trip", function () {
    it("toJSON() devuelve un objeto plano con todas las propiedades", function () {
      var p = new Producto(datosValidos);
      var json = p.toJSON();
      expect(json.id).toBe(1);
      expect(json.nombre).toBe("Intel Core i9-13900K");
      expect(json.categoria).toBe("cpu");
      expect(json.precio).toBe(599.99);
      expect(json.stock).toBe(12);
    });

    it("Producto.fromJSON(p.toJSON()) devuelve una instancia equivalente", function () {
      var p1 = new Producto(datosValidos);
      var p2 = Producto.fromJSON(p1.toJSON());
      expect(p2 instanceof Producto).toBeTruthy();
      expect(p2.id).toBe(p1.id);
      expect(p2.precio).toBe(p1.precio);
    });
  });
});

// =============================================================================
// SUITE 2 — Carrito
// =============================================================================

describe("Carrito", function () {

  var productoCpu, productoGpu;

  beforeEach(function () {
    productoCpu = new Producto({
      id: 1, nombre: "Intel Core i9-13900K", categoria: "cpu",
      marca: "Intel", precio: 599.99, stock: 12, tdp: 125,
    });
    productoGpu = new Producto({
      id: 2, nombre: "NVIDIA RTX 4090", categoria: "gpu",
      marca: "NVIDIA", precio: 1799.99, stock: 5, tdp: 450,
    });
  });

  describe("constructor + estado inicial", function () {
    it("crea un carrito vacío", function () {
      var c = new Carrito();
      expect(c.items).toEqual([]);
      expect(c.estaVacio()).toBeTruthy();
    });
  });

  describe("agregar()", function () {
    it("agrega un producto nuevo con estructura {id, nombre, precio, cantidad}", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 2);
      expect(c.items.length).toBe(1);
      expect(c.items[0].id).toBe(1);
      expect(c.items[0].cantidad).toBe(2);
      expect(c.items[0].precio).toBe(599.99);
    });

    it("incrementa la cantidad si el producto ya existe", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 2);
      c.agregar(productoCpu, 3);
      expect(c.items.length).toBe(1);
      expect(c.items[0].cantidad).toBe(5);
    });

    it("permite tener múltiples productos distintos", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 1);
      c.agregar(productoGpu, 1);
      expect(c.items.length).toBe(2);
    });

    it("lanza Error si el producto es null", function () {
      var c = new Carrito();
      expect(function () { c.agregar(null, 1); }).toThrow();
    });

    it("lanza Error si la cantidad es 0 o negativa", function () {
      var c = new Carrito();
      expect(function () { c.agregar(productoCpu, 0); }).toThrow();
      expect(function () { c.agregar(productoCpu, -3); }).toThrow();
    });

    it("no muta el producto original al agregarlo (inmutabilidad)", function () {
      var c = new Carrito();
      var stockOriginal = productoCpu.stock;
      c.agregar(productoCpu, 3);
      expect(productoCpu.stock).toBe(stockOriginal);
    });
  });

  describe("eliminar()", function () {
    it("remueve un item por id de producto", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 1);
      c.agregar(productoGpu, 1);
      c.eliminar(1);
      expect(c.items.length).toBe(1);
      expect(c.items[0].id).toBe(2);
    });

    it("no falla si el id no existe", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 1);
      expect(function () { c.eliminar(999); }).not.toThrow();
      expect(c.items.length).toBe(1);
    });
  });

  describe("vaciar()", function () {
    it("deja el carrito vacío", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 1);
      c.agregar(productoGpu, 1);
      c.vaciar();
      expect(c.estaVacio()).toBeTruthy();
    });
  });

  describe("calcularSubtotal()", function () {
    it("devuelve 0 para un carrito vacío", function () {
      var c = new Carrito();
      expect(c.calcularSubtotal()).toBe(0);
    });

    it("suma correctamente precio × cantidad de cada item", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 2);        // 599.99 * 2 = 1199.98
      c.agregar(productoGpu, 1);        // 1799.99 * 1 = 1799.99
      // Total esperado: 2999.97
      expect(c.calcularSubtotal()).toBe(2999.97);
    });

    it("redondea a 2 decimales absorbiendo imprecisión IEEE-754", function () {
      var pBarato = new Producto({
        id: 99, nombre: "widget", categoria: "cpu", marca: "X",
        precio: 0.1, stock: 100
      });
      var c = new Carrito();
      c.agregar(pBarato, 3);            // 0.1 * 3 = 0.30000000000000004 → 0.3
      expect(c.calcularSubtotal()).toBe(0.3);
    });
  });

  describe("aplicarIva()", function () {
    it("aplica IVA del 21% correctamente", function () {
      var c = new Carrito();
      expect(c.aplicarIva(100)).toBe(121);
      expect(c.aplicarIva(1000)).toBe(1210);
    });

    it("redondea a 2 decimales", function () {
      var c = new Carrito();
      // 99.99 × 1.21 = 120.9879 → redondeado 120.99
      expect(c.aplicarIva(99.99)).toBe(120.99);
    });

    it("devuelve 0 al aplicar IVA sobre 0", function () {
      var c = new Carrito();
      expect(c.aplicarIva(0)).toBe(0);
    });

    it("lanza Error si el monto es negativo", function () {
      var c = new Carrito();
      expect(function () { c.aplicarIva(-50); }).toThrow();
    });
  });

  describe("calcularTotal()", function () {
    it("devuelve subtotal + IVA consistente", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 1);            // subtotal 599.99
      var esperado = c.aplicarIva(c.calcularSubtotal());
      expect(c.calcularTotal()).toBe(esperado);
    });

    it("devuelve 0 para carrito vacío", function () {
      var c = new Carrito();
      expect(c.calcularTotal()).toBe(0);
    });
  });

  describe("toJSON() / fromJSON() — round trip", function () {
    it("toJSON() devuelve objeto con items", function () {
      var c = new Carrito();
      c.agregar(productoCpu, 2);
      var json = c.toJSON();
      expect(json.items).toBeDefined();
      expect(json.items.length).toBe(1);
      expect(json.items[0].id).toBe(1);
    });

    it("Carrito.fromJSON(c.toJSON()) devuelve carrito equivalente", function () {
      var c1 = new Carrito();
      c1.agregar(productoCpu, 3);
      c1.agregar(productoGpu, 1);
      var c2 = Carrito.fromJSON(c1.toJSON());
      expect(c2 instanceof Carrito).toBeTruthy();
      expect(c2.items.length).toBe(2);
      expect(c2.calcularSubtotal()).toBe(c1.calcularSubtotal());
    });

    it("Carrito.fromJSON(null o {}) devuelve carrito vacío", function () {
      var c = Carrito.fromJSON({});
      expect(c.estaVacio()).toBeTruthy();
    });
  });
});

// =============================================================================
// SUITE 3 — Cotizacion
// =============================================================================

describe("Cotizacion", function () {

  describe("constructor", function () {
    it("crea instancia con las 3 propiedades", function () {
      var c = new Cotizacion("cpu", 5, 599.99);
      expect(c.categoria).toBe("cpu");
      expect(c.cantidad).toBe(5);
      expect(c.precioUnitario).toBe(599.99);
    });

    it("lanza Error si la categoría no es string válida", function () {
      expect(function () { new Cotizacion("", 5, 100); }).toThrow();
      expect(function () { new Cotizacion(null, 5, 100); }).toThrow();
      expect(function () { new Cotizacion(123, 5, 100); }).toThrow();
    });

    it("lanza Error si la cantidad no es un entero", function () {
      expect(function () { new Cotizacion("cpu", 5.5, 100); }).toThrow();
      expect(function () { new Cotizacion("cpu", "abc", 100); }).toThrow();
    });

    it("lanza Error si la cantidad está fuera del rango 1-100", function () {
      expect(function () { new Cotizacion("cpu", 0, 100); }).toThrow();
      expect(function () { new Cotizacion("cpu", -1, 100); }).toThrow();
      expect(function () { new Cotizacion("cpu", 101, 100); }).toThrow();
    });

    it("lanza Error si el precio unitario es 0 o negativo", function () {
      expect(function () { new Cotizacion("cpu", 5, 0); }).toThrow();
      expect(function () { new Cotizacion("cpu", 5, -100); }).toThrow();
    });
  });

  describe("calcularDescuento()", function () {
    it("devuelve 0% para cantidades menores a 3", function () {
      expect(new Cotizacion("cpu", 1, 100).calcularDescuento()).toBe(0);
      expect(new Cotizacion("cpu", 2, 100).calcularDescuento()).toBe(0);
    });

    it("aplica los tramos correctos en cada borde inferior", function () {
      expect(new Cotizacion("cpu", 3, 100).calcularDescuento()).toBe(5);
      expect(new Cotizacion("cpu", 5, 100).calcularDescuento()).toBe(10);
      expect(new Cotizacion("cpu", 10, 100).calcularDescuento()).toBe(15);
    });

    it("mantiene 15% para cantidades muy altas", function () {
      expect(new Cotizacion("cpu", 100, 100).calcularDescuento()).toBe(15);
    });
  });

  describe("calcularSubtotal()", function () {
    it("calcula correctamente sin descuento (cantidad < 3)", function () {
      // 100 * 2 * 1.0 = 200
      expect(new Cotizacion("cpu", 2, 100).calcularSubtotal()).toBe(200);
    });

    it("aplica descuento por volumen del 10% para 5 unidades", function () {
      // 100 * 5 * 0.90 = 450
      expect(new Cotizacion("cpu", 5, 100).calcularSubtotal()).toBe(450);
    });

    it("aplica descuento por volumen del 15% para 10 unidades", function () {
      // 100 * 10 * 0.85 = 850
      expect(new Cotizacion("cpu", 10, 100).calcularSubtotal()).toBe(850);
    });

    it("redondea a 2 decimales absorbiendo imprecisión IEEE-754", function () {
      // 99.99 * 3 * 0.95 = 284.9715 → 284.97 (evita 284.97150000000003)
      expect(new Cotizacion("cpu", 3, 99.99).calcularSubtotal()).toBe(284.97);
    });
  });

  describe("aplicarIva()", function () {
    it("aplica IVA del 21% al subtotal", function () {
      var c = new Cotizacion("cpu", 2, 100);
      expect(c.aplicarIva(200)).toBe(242);
    });

    it("lanza Error si el subtotal es negativo", function () {
      var c = new Cotizacion("cpu", 2, 100);
      expect(function () { c.aplicarIva(-50); }).toThrow();
    });
  });

  describe("calcularTotal()", function () {
    it("devuelve subtotal + IVA (21%)", function () {
      // subtotal = 100 * 2 = 200 → IVA 21% → 242
      expect(new Cotizacion("cpu", 2, 100).calcularTotal()).toBe(242);
    });

    it("aplica descuento antes del IVA", function () {
      // 100 * 5 * 0.90 = 450 → IVA 21% → 544.5
      expect(new Cotizacion("cpu", 5, 100).calcularTotal()).toBe(544.5);
    });
  });

  describe("generarResumen()", function () {
    it("devuelve un string con la información de la cotización", function () {
      var resumen = new Cotizacion("cpu", 2, 599.99).generarResumen();
      expect(typeof resumen).toBe("string");
      expect(resumen).toContain("COTIZACIÓN");
      expect(resumen).toContain("CPU");
      expect(resumen).toContain("$599.99");
    });

    it("incluye la línea final 'TOTAL: $...' con el monto correcto", function () {
      // 599.99 × 2 = 1199.98 → IVA 21% → 1451.98
      var resumen = new Cotizacion("cpu", 2, 599.99).generarResumen();
      expect(resumen).toContain("TOTAL: $1451.98");
    });

    it("incluye la línea explícita de IVA al 21%", function () {
      var resumen = new Cotizacion("cpu", 2, 599.99).generarResumen();
      expect(resumen).toContain("IVA (21%):");
    });

    it("incluye el porcentaje de descuento cuando aplica", function () {
      var resumen = new Cotizacion("gpu", 5, 1000).generarResumen();
      expect(resumen).toContain("10%");
    });
  });

  describe("toJSON() / fromJSON() — round trip", function () {
    it("toJSON() devuelve objeto con categoria, cantidad, precioUnitario", function () {
      var c = new Cotizacion("cpu", 5, 599.99);
      var json = c.toJSON();
      expect(json.categoria).toBe("cpu");
      expect(json.cantidad).toBe(5);
      expect(json.precioUnitario).toBe(599.99);
    });

    it("Cotizacion.fromJSON(c.toJSON()) devuelve instancia equivalente", function () {
      var c1 = new Cotizacion("gpu", 3, 1799.99);
      var c2 = Cotizacion.fromJSON(c1.toJSON());
      expect(c2 instanceof Cotizacion).toBeTruthy();
      expect(c2.calcularTotal()).toBe(c1.calcularTotal());
    });
  });
});
