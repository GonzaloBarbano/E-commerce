/**
 * @file storage.spec.js
 * @description Suite Jasmine para js/utils/storage.js (StorageUtil).
 *              Testea las 6 funciones CRUD/auxiliares, serialización JSON
 *              automática, manejo de errores y diferenciación entre
 *              localStorage y sessionStorage.
 * @author Nicolás Aguirre — Tester QA / AO4
 *
 * Nota: los tests referencian el StorageUtil provisto por @LucasFUces en la
 * rama feature/dev-storage. Escritos contra la API acordada en
 * spec-dev-storage.md.
 *
 * IMPORTANTE: cada suite limpia localStorage y sessionStorage en beforeEach
 * para asegurar aislamiento entre tests.
 */

describe("StorageUtil", function () {

  beforeEach(function () {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(function () {
    localStorage.clear();
    sessionStorage.clear();
  });

  // ===========================================================================
  // guardar() + obtener() — round trip básico
  // ===========================================================================

  describe("guardar() + obtener() — round trip", function () {
    it("guarda y recupera un string en localStorage", function () {
      StorageUtil.guardar("test:key", "hola mundo", "local");
      expect(StorageUtil.obtener("test:key", "local")).toBe("hola mundo");
    });

    it("guarda y recupera un objeto complejo (serialización JSON automática)", function () {
      var obj = { nombre: "Nico", edad: 30, roles: ["dev", "tester"] };
      StorageUtil.guardar("test:usuario", obj, "local");
      var recuperado = StorageUtil.obtener("test:usuario", "local");
      expect(recuperado).toEqual(obj);
      expect(recuperado.roles).toEqual(["dev", "tester"]);
    });

    it("guarda y recupera un array", function () {
      var arr = [1, 2, 3, "cuatro"];
      StorageUtil.guardar("test:array", arr, "local");
      expect(StorageUtil.obtener("test:array", "local")).toEqual(arr);
    });

    it("guarda y recupera un número", function () {
      StorageUtil.guardar("test:num", 42, "local");
      expect(StorageUtil.obtener("test:num", "local")).toBe(42);
    });

    it("devuelve null al obtener una clave inexistente", function () {
      expect(StorageUtil.obtener("no:existe", "local")).toBeNull();
    });

    it("no confunde localStorage con sessionStorage", function () {
      StorageUtil.guardar("test:x", "valor-local", "local");
      StorageUtil.guardar("test:x", "valor-session", "session");
      expect(StorageUtil.obtener("test:x", "local")).toBe("valor-local");
      expect(StorageUtil.obtener("test:x", "session")).toBe("valor-session");
    });
  });

  // ===========================================================================
  // actualizar() — sobrescritura
  // ===========================================================================

  describe("actualizar()", function () {
    it("sobrescribe un valor existente", function () {
      StorageUtil.guardar("test:k", "v1", "local");
      StorageUtil.actualizar("test:k", "v2", "local");
      expect(StorageUtil.obtener("test:k", "local")).toBe("v2");
    });

    it("crea el valor si la clave aún no existe (comportamiento upsert)", function () {
      StorageUtil.actualizar("test:nueva", "hola", "local");
      expect(StorageUtil.obtener("test:nueva", "local")).toBe("hola");
    });
  });

  // ===========================================================================
  // eliminar() — remoción
  // ===========================================================================

  describe("eliminar()", function () {
    it("remueve una clave existente", function () {
      StorageUtil.guardar("test:k", "v", "local");
      StorageUtil.eliminar("test:k", "local");
      expect(StorageUtil.obtener("test:k", "local")).toBeNull();
    });

    it("no falla si se elimina una clave inexistente", function () {
      expect(function () { StorageUtil.eliminar("no:existe", "local"); }).not.toThrow();
    });
  });

  // ===========================================================================
  // listar() — enumeración con prefijo
  // ===========================================================================

  describe("listar()", function () {
    it("lista todas las claves con un prefijo específico", function () {
      StorageUtil.guardar("pc:a", 1, "local");
      StorageUtil.guardar("pc:b", 2, "local");
      StorageUtil.guardar("otro:c", 3, "local");
      var claves = StorageUtil.listar("pc:", "local");
      expect(claves.length).toBe(2);
      expect(claves).toContain("pc:a");
      expect(claves).toContain("pc:b");
    });

    it("devuelve array vacío si ningún key matchea el prefijo", function () {
      StorageUtil.guardar("pc:a", 1, "local");
      expect(StorageUtil.listar("nada:", "local")).toEqual([]);
    });

    it("con prefijo vacío devuelve todas las claves del storage", function () {
      StorageUtil.guardar("k1", "v1", "local");
      StorageUtil.guardar("k2", "v2", "local");
      var claves = StorageUtil.listar("", "local");
      expect(claves.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ===========================================================================
  // limpiar() — clear total
  // ===========================================================================

  describe("limpiar()", function () {
    it("borra todo el localStorage al invocar con tipo 'local'", function () {
      StorageUtil.guardar("k1", "v1", "local");
      StorageUtil.guardar("k2", "v2", "local");
      StorageUtil.limpiar("local");
      expect(StorageUtil.obtener("k1", "local")).toBeNull();
      expect(StorageUtil.obtener("k2", "local")).toBeNull();
    });

    it("borra sessionStorage sin afectar localStorage", function () {
      StorageUtil.guardar("k:local", "v-local", "local");
      StorageUtil.guardar("k:session", "v-session", "session");
      StorageUtil.limpiar("session");
      expect(StorageUtil.obtener("k:local", "local")).toBe("v-local");
      expect(StorageUtil.obtener("k:session", "session")).toBeNull();
    });
  });

  // ===========================================================================
  // Manejo de errores
  // ===========================================================================

  describe("Manejo de errores", function () {
    it("obtener() devuelve null si el JSON del storage está corrupto", function () {
      // Simular JSON inválido escribiendo directamente en el storage
      localStorage.setItem("test:corrupt", "{esto no es JSON válido");
      // StorageUtil.obtener no debe lanzar, debe devolver null
      var resultado;
      expect(function () {
        resultado = StorageUtil.obtener("test:corrupt", "local");
      }).not.toThrow();
      expect(resultado).toBeNull();
    });

    it("guardar() maneja objetos con referencias circulares sin crashear", function () {
      var circular = { nombre: "x" };
      circular.self = circular;   // referencia circular
      // JSON.stringify tira TypeError; el StorageUtil debe atrapar y no propagar.
      expect(function () {
        StorageUtil.guardar("test:circular", circular, "local");
      }).not.toThrow();
    });
  });

  // ===========================================================================
  // Integración con clases POO (round trip)
  // ===========================================================================

  describe("Integración con clases del dominio", function () {
    it("permite persistir y restaurar un Carrito vía toJSON/fromJSON", function () {
      var producto = new Producto({
        id: 1, nombre: "Test", categoria: "cpu", marca: "X",
        precio: 100, stock: 10,
      });
      var carrito1 = new Carrito();
      carrito1.agregar(producto, 3);

      StorageUtil.guardar("pc:carrito", carrito1.toJSON(), "local");
      var data = StorageUtil.obtener("pc:carrito", "local");
      var carrito2 = Carrito.fromJSON(data);

      expect(carrito2 instanceof Carrito).toBeTruthy();
      expect(carrito2.items.length).toBe(1);
      expect(carrito2.calcularSubtotal()).toBe(carrito1.calcularSubtotal());
    });

    it("permite persistir y restaurar una Cotizacion vía toJSON/fromJSON", function () {
      var cot1 = new Cotizacion("gpu", 3, 1799.99);
      StorageUtil.guardar("pc:ultimaCotizacion", cot1.toJSON(), "session");
      var data = StorageUtil.obtener("pc:ultimaCotizacion", "session");
      var cot2 = Cotizacion.fromJSON(data);

      expect(cot2 instanceof Cotizacion).toBeTruthy();
      expect(cot2.calcularTotal()).toBe(cot1.calcularTotal());
    });
  });
});
