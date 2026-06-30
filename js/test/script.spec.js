/**
 * @file script.spec.js
 * @description Suite de tests Jasmine para js/script.js — Actividad Obligatoria N°3.
 *              4 suites describe(), una por cada flujo del menú principal.
 *              Cubre happy path, casos borde, validación de errores y
 *              operaciones sobre arrays/objetos.
 * @author Nicolás Aguirre — Tester JavaScript / QA Engineer
 */

// =============================================================================
// SUITE 1 — FLUJO COTIZADOR (flujo1Cotizador)
// =============================================================================

describe("Flujo 1 — Cotizador de Productos", function () {

  describe("validarCategoria()", function () {
    // Tests separados por condición distinta para que Jasmine reporte
    // exactamente cuál normalización falla si algo se rompe (CR Hallazgo #4).
    it("acepta categorías existentes en minúsculas", function () {
      expect(validarCategoria("cpu")).toBe(true);
    });

    it("acepta categorías en mayúsculas (normaliza case)", function () {
      expect(validarCategoria("GPU")).toBe(true);
    });

    it("acepta categorías con espacios en blanco (normaliza trim)", function () {
      expect(validarCategoria("  ram  ")).toBe(true);
    });

    it("rechaza una categoría inexistente", function () {
      expect(validarCategoria("teclado")).toBe(false);
    });

    it("rechaza null, undefined y strings vacíos", function () {
      expect(validarCategoria(null)).toBeFalsy();
      expect(validarCategoria(undefined)).toBeFalsy();
      expect(validarCategoria("")).toBeFalsy();
    });

    it("rechaza valores no string (number, object)", function () {
      expect(validarCategoria(123)).toBe(false);
      expect(validarCategoria({})).toBe(false);
    });
  });

  describe("validarCantidad()", function () {
    it("acepta enteros positivos dentro del rango 1-100", function () {
      expect(validarCantidad(1)).toBe(true);
      expect(validarCantidad("50")).toBe(true);
      expect(validarCantidad(100)).toBe(true);
    });

    // Separado por borde distinto para reporte explícito en caso de falla (CR #4).
    it("rechaza el valor cero (borde inferior)", function () {
      expect(validarCantidad(0)).toBe(false);
    });

    it("rechaza valores negativos", function () {
      expect(validarCantidad(-5)).toBe(false);
    });

    it("rechaza valores mayores a 100 (borde superior)", function () {
      expect(validarCantidad(101)).toBe(false);
    });

    it("rechaza strings no numéricos y vacíos", function () {
      expect(validarCantidad("abc")).toBeFalsy();
      expect(validarCantidad("")).toBeFalsy();
    });
  });

  describe("calcularDescuento()", function () {
    it("devuelve 0% para cantidades menores a 3", function () {
      expect(calcularDescuento(1)).toBe(0);
      expect(calcularDescuento(2)).toBe(0);
    });

    it("aplica los tramos correctos según cantidad (borde inferior de cada tramo)", function () {
      expect(calcularDescuento(3)).toBe(5);
      expect(calcularDescuento(5)).toBe(10);
      expect(calcularDescuento(10)).toBe(15);
    });

    it("mantiene 15% para cantidades muy altas", function () {
      expect(calcularDescuento(1000)).toBe(15);
    });

    it("lanza Error si la cantidad es 0 o negativa", function () {
      expect(function () { calcularDescuento(0); }).toThrow();
      expect(function () { calcularDescuento(-2); }).toThrow();
    });
  });

  describe("calcularSubtotal()", function () {
    it("calcula correctamente sin descuento (cantidad < 3)", function () {
      expect(calcularSubtotal(100, 2)).toBe(200);
    });

    it("aplica el descuento por volumen del 10% para 5 unidades", function () {
      // 100 * 5 * 0.90 = 450
      expect(calcularSubtotal(100, 5)).toBe(450);
    });

    it("redondea a 2 decimales absorbiendo imprecisión IEEE-754", function () {
      // 99.99 × 3 × 0.95 ≈ 284.9715 en aritmética exacta.
      // En IEEE-754 puede dar 284.97150000000003 por la representación
      // binaria de 99.99; Math.round(... * 100) / 100 absorbe la imprecisión
      // y devuelve 284.97 de forma estable (CR Hallazgo #3).
      expect(calcularSubtotal(99.99, 3)).toBe(284.97);
    });

    it("lanza Error si el precio es negativo", function () {
      expect(function () { calcularSubtotal(-10, 5); }).toThrow();
    });

    it("lanza Error si la cantidad es 0 o negativa", function () {
      expect(function () { calcularSubtotal(100, 0); }).toThrow();
      expect(function () { calcularSubtotal(100, -3); }).toThrow();
    });
  });

  describe("generarResumenCotizacion()", function () {
    it("devuelve un string con la información de la cotización", function () {
      var resumen = generarResumenCotizacion("cpu", 2, 599.99);
      expect(typeof resumen).toBe("string");
      expect(resumen).toContain("CPU");
      expect(resumen).toContain("$599.99");
    });

    it("incluye la línea final 'TOTAL: $...' con el monto correcto con IVA", function () {
      // El resumen contiene 3 líneas con cifras:
      //   "Subtotal s/IVA: $...", "IVA (21%): $..." y "TOTAL: $..." (final).
      // Validamos la línea final exacta para evitar falso positivo por
      // subcadena con la línea de subtotal (CR Hallazgo #2). En JS includes()
      // es case-sensitive: "Subtotal" (minúscula) no matchea "TOTAL".
      // 599.99 × 2 = 1199.98 → IVA 21% → 1451.98
      var resumen = generarResumenCotizacion("cpu", 2, 599.99);
      expect(resumen).toContain("TOTAL: $1451.98");
    });

    it("incluye la línea explícita de IVA al 21%", function () {
      var resumen = generarResumenCotizacion("cpu", 2, 599.99);
      expect(resumen).toContain("IVA (21%):");
    });

    it("incluye el porcentaje de descuento cuando aplica", function () {
      var resumen = generarResumenCotizacion("gpu", 5, 1000);
      expect(resumen).toContain("10%");
    });
  });
});

// =============================================================================
// SUITE 2 — FLUJO VERIFICADOR DE COMPATIBILIDAD (flujo2Compatibilidad)
// =============================================================================

describe("Flujo 2 — Verificador de Compatibilidad", function () {

  describe("calcularConsumoTotal()", function () {
    it("suma TDPs + 100W de base y aplica margen de seguridad del 20%", function () {
      // (125 + 450 + 100) * 1.2 = 810 → Math.ceil(810) = 810
      expect(calcularConsumoTotal(125, 450)).toBe(810);
    });

    it("devuelve un número entero (usa Math.ceil)", function () {
      var resultado = calcularConsumoTotal(65, 75);
      expect(Number.isInteger(resultado)).toBeTruthy();
    });

    it("lanza Error si el TDP de CPU es negativo", function () {
      expect(function () { calcularConsumoTotal(-10, 100); }).toThrow();
    });

    it("lanza Error si el TDP de GPU es negativo", function () {
      expect(function () { calcularConsumoTotal(100, -50); }).toThrow();
    });

    it("acepta TDPs en cero (build mínimo)", function () {
      // (0 + 0 + 100) * 1.2 = 120
      expect(calcularConsumoTotal(0, 0)).toBe(120);
    });
  });

  describe("recomendarFuente()", function () {
    it("devuelve la fuente más chica que cubra el consumo (caso normal)", function () {
      var fuente = recomendarFuente(700);
      expect(fuente).not.toBeNull();
      expect(fuente.potencia).toBe(750);
      expect(fuente.nombre).toBe("Corsair RM750x");
    });

    it("devuelve la fuente exacta cuando el consumo coincide con un tramo (borde)", function () {
      var fuente = recomendarFuente(650);
      expect(fuente.potencia).toBe(650);
    });

    it("devuelve la fuente más chica disponible si el consumo es bajo", function () {
      var fuente = recomendarFuente(100);
      expect(fuente.potencia).toBe(550);
    });

    it("devuelve null si el consumo supera la fuente máxima (1000W)", function () {
      expect(recomendarFuente(1500)).toBeNull();
    });

    it("la fuente recomendada incluye nombre y precio (estructura del objeto)", function () {
      var fuente = recomendarFuente(800);
      expect(fuente).toEqual(jasmine.objectContaining({
        potencia: jasmine.any(Number),
        nombre: jasmine.any(String),
        precio: jasmine.any(Number)
      }));
    });
  });

  describe("validarTdp()", function () {
    it("acepta valores numéricos en el rango 1-1000", function () {
      expect(validarTdp(125)).toBe(true);
      expect(validarTdp("450")).toBe(true);
      expect(validarTdp(1000)).toBe(true);
    });

    it("rechaza valores fuera de rango o no numéricos", function () {
      expect(validarTdp(0)).toBe(false);
      expect(validarTdp(-50)).toBe(false);
      expect(validarTdp(1001)).toBe(false);
      expect(validarTdp("abc")).toBeFalsy();
    });
  });

  describe("generarInformeCompatibilidad()", function () {
    it("incluye la fuente recomendada en el informe cuando hay coincidencia", function () {
      var fuente = recomendarFuente(800);
      var informe = generarInformeCompatibilidad(125, 450, fuente);
      expect(informe).toContain("Corsair");
      expect(informe).toContain("Fuente recomendada");
    });

    it("muestra advertencia si no hay fuente recomendada (consumo > 1000W)", function () {
      var informe = generarInformeCompatibilidad(500, 600, null);
      expect(informe).toContain("supera 1000W");
    });
  });
});

// =============================================================================
// SUITE 3 — FLUJO SIMULADOR DE CARRITO (flujo3Carrito)
// =============================================================================

describe("Flujo 3 — Simulador de Carrito", function () {

  var productoBase;
  var carritoVacio;

  beforeEach(function () {
    productoBase = { id: 1, nombre: "Intel Core i9", precio: 599.99 };
    carritoVacio = [];
  });

  describe("agregarAlCarrito()", function () {
    it("agrega un producto nuevo al carrito (happy path)", function () {
      var carrito = agregarAlCarrito(carritoVacio, productoBase, 2);
      expect(carrito.length).toBe(1);
      expect(carrito[0]).toEqual({
        id: 1,
        nombre: "Intel Core i9",
        precio: 599.99,
        cantidad: 2
      });
    });

    it("incrementa la cantidad si el producto ya existe en el carrito", function () {
      var carrito = agregarAlCarrito(carritoVacio, productoBase, 2);
      carrito = agregarAlCarrito(carrito, productoBase, 3);
      expect(carrito.length).toBe(1);
      expect(carrito[0].cantidad).toBe(5);
    });

    it("no muta el carrito original (inmutabilidad)", function () {
      var original = [];
      agregarAlCarrito(original, productoBase, 1);
      expect(original.length).toBe(0);
    });

    it("lanza Error si el producto es null o la cantidad es inválida", function () {
      expect(function () { agregarAlCarrito([], null, 1); }).toThrow();
      expect(function () { agregarAlCarrito([], productoBase, 0); }).toThrow();
      expect(function () { agregarAlCarrito([], productoBase, -1); }).toThrow();
    });

    it("permite tener múltiples productos distintos", function () {
      var otroProducto = { id: 2, nombre: "RTX 4090", precio: 1799.99 };
      var carrito = agregarAlCarrito(carritoVacio, productoBase, 1);
      carrito = agregarAlCarrito(carrito, otroProducto, 1);
      expect(carrito.length).toBe(2);
      expect(carrito).toContain(jasmine.objectContaining({ id: 1 }));
      expect(carrito).toContain(jasmine.objectContaining({ id: 2 }));
    });

    it("no muta el producto original al agregarlo al carrito", function () {
      var productoOriginal = { id: 3, nombre: "SSD", precio: 100, stock: 5 };
      agregarAlCarrito(carritoVacio, productoOriginal, 2);
      expect(productoOriginal.stock).toBe(5);
    });
  });

  describe("calcularTotalCarrito()", function () {
    it("devuelve 0 para un carrito vacío (caso borde)", function () {
      expect(calcularTotalCarrito([])).toBe(0);
    });

    it("suma correctamente precio × cantidad de cada item", function () {
      var carrito = [
        { id: 1, nombre: "A", precio: 100, cantidad: 2 },
        { id: 2, nombre: "B", precio: 50.5, cantidad: 3 }
      ];
      // 100 * 2 + 50.5 * 3 = 200 + 151.5 = 351.5
      expect(calcularTotalCarrito(carrito)).toBe(351.5);
    });

    it("redondea a 2 decimales", function () {
      var carrito = [{ id: 1, nombre: "X", precio: 0.1, cantidad: 3 }];
      // 0.1 * 3 = 0.30000000000000004 → 0.3
      expect(calcularTotalCarrito(carrito)).toBe(0.3);
    });

    it("lanza Error si un item tiene precio o cantidad inválido", function () {
      expect(function () { calcularTotalCarrito([{ id: 1, precio: "100", cantidad: 2 }]); }).toThrow();
      expect(function () { calcularTotalCarrito([{ id: 1, precio: 100, cantidad: "2" }]); }).toThrow();
    });
  });

  describe("aplicarIva()", function () {
    it("aplica IVA 21% correctamente", function () {
      expect(aplicarIva(100)).toBe(121);
      expect(aplicarIva(1000)).toBe(1210);
    });

    it("redondea a 2 decimales", function () {
      expect(aplicarIva(99.99)).toBe(120.99);
    });

    it("devuelve 0 al aplicar IVA sobre 0", function () {
      expect(aplicarIva(0)).toBe(0);
    });

    it("lanza Error si el monto es negativo", function () {
      expect(function () { aplicarIva(-50); }).toThrow();
    });
  });

  describe("generarResumenCarrito()", function () {
    it("informa carrito vacío cuando no hay items", function () {
      expect(generarResumenCarrito([])).toContain("vacío");
    });

    it("incluye nombre, precio, cantidad y total con IVA", function () {
      var carrito = [{ id: 1, nombre: "RTX 4090", precio: 1000, cantidad: 1 }];
      var resumen = generarResumenCarrito(carrito);
      expect(resumen).toContain("RTX 4090");
      expect(resumen).toContain("IVA");
      expect(resumen).toContain("TOTAL");
    });
  });

  describe("obtenerProductoPorOpcion()", function () {
    it("devuelve el producto correcto para opciones válidas (1-6)", function () {
      var producto = obtenerProductoPorOpcion(1);
      expect(producto).not.toBeNull();
      expect(producto.id).toBe(1);
    });

    it("devuelve null para opciones fuera de rango", function () {
      expect(obtenerProductoPorOpcion(0)).toBeNull();
      expect(obtenerProductoPorOpcion(99)).toBeNull();
      expect(obtenerProductoPorOpcion(-1)).toBeNull();
    });
  });
});

// =============================================================================
// SUITE 4 — FLUJO BUSCADOR DE PRODUCTOS (flujo4Buscador)
// =============================================================================

describe("Flujo 4 — Buscador de Productos", function () {

  var miniCatalogo;

  beforeEach(function () {
    miniCatalogo = [
      { id: 1, nombre: "Producto A", categoria: "cpu", marca: "X", precio: 100, stock: 5 },
      { id: 2, nombre: "Producto B", categoria: "gpu", marca: "Y", precio: 500, stock: 3 },
      { id: 3, nombre: "Producto C", categoria: "cpu", marca: "Z", precio: 300, stock: 8 },
      { id: 4, nombre: "Producto D", categoria: "ram", marca: "X", precio: 80,  stock: 12 }
    ];
  });

  describe("filtrarProductos()", function () {
    it("filtra por categoría y precio máximo (happy path)", function () {
      var resultado = filtrarProductos(miniCatalogo, "cpu", 200);
      expect(resultado.length).toBe(1);
      expect(resultado[0].id).toBe(1);
    });

    it("acepta 'todas' como wildcard de categoría", function () {
      var resultado = filtrarProductos(miniCatalogo, "todas", 1000);
      expect(resultado.length).toBe(4);
    });

    it("devuelve array vacío si ningún producto cumple los filtros", function () {
      var resultado = filtrarProductos(miniCatalogo, "cpu", 10);
      expect(resultado).toEqual([]);
    });

    it("no muta el catálogo original (inmutabilidad)", function () {
      var copia = miniCatalogo.slice();
      filtrarProductos(miniCatalogo, "cpu", 1000);
      expect(miniCatalogo).toEqual(copia);
    });

    it("lanza Error si productos no es un array", function () {
      expect(function () { filtrarProductos(null, "cpu", 100); }).toThrow();
      expect(function () { filtrarProductos("texto", "cpu", 100); }).toThrow();
    });

    it("lanza Error si el precio máximo es negativo", function () {
      expect(function () { filtrarProductos(miniCatalogo, "cpu", -1); }).toThrow();
    });

    it("lanza Error si la categoría no es string ni null/undefined", function () {
      expect(function () { filtrarProductos(miniCatalogo, 123, 100); }).toThrow();
      expect(function () { filtrarProductos(miniCatalogo, { categoria: "cpu" }, 100); }).toThrow();
    });

    it("acepta precio máximo exactamente igual al precio del producto (borde)", function () {
      var resultado = filtrarProductos(miniCatalogo, "cpu", 100);
      expect(resultado).toContain(jasmine.objectContaining({ id: 1 }));
    });

    it("trata null/undefined como categoría 'todas' (caso borde — CR #7)", function () {
      // filtrarProductos() normaliza con: categoria ? categoria.trim().toLowerCase() : "todas"
      // null y undefined son falsy → cae en la rama "todas".
      var resNull = filtrarProductos(miniCatalogo, null, 1000);
      var resUndef = filtrarProductos(miniCatalogo, undefined, 1000);
      expect(resNull.length).toBe(4);
      expect(resUndef.length).toBe(4);
    });
  });

  describe("ordenarPorPrecio()", function () {
    it("ordena de menor a mayor precio", function () {
      var ordenado = ordenarPorPrecio(miniCatalogo);
      expect(ordenado[0].precio).toBe(80);
      expect(ordenado[ordenado.length - 1].precio).toBe(500);
    });

    it("no muta el array original", function () {
      var copia = miniCatalogo.slice();
      ordenarPorPrecio(miniCatalogo);
      expect(miniCatalogo).toEqual(copia);
    });

    it("devuelve array vacío al recibir array vacío", function () {
      expect(ordenarPorPrecio([])).toEqual([]);
    });
  });

  describe("generarResultadosBusqueda()", function () {
    it("incluye encabezado con categoría y precio máximo", function () {
      var texto = generarResultadosBusqueda(miniCatalogo, "cpu", 500);
      expect(texto).toContain("cpu");
      expect(texto).toContain("$500.00");
    });

    it("indica explícitamente cuando no hay resultados", function () {
      var texto = generarResultadosBusqueda([], "cpu", 100);
      expect(texto).toContain("No se encontraron");
    });

    it("lista cada producto con marca, precio y stock", function () {
      var texto = generarResultadosBusqueda(miniCatalogo, "todas", 1000);
      expect(texto).toContain("Marca: X");
      expect(texto).toContain("Stock:");
    });

    it("muestra los resultados ordenados de menor a mayor precio (CR #7)", function () {
      // generarResultadosBusqueda() llama internamente a ordenarPorPrecio()
      // antes de armar el texto. Verificamos que en el output el producto
      // más barato ($80) aparezca ANTES que el más caro ($500).
      var texto = generarResultadosBusqueda(miniCatalogo, "todas", 1000);
      var idx80 = texto.indexOf("$80.00");
      var idx500 = texto.indexOf("$500.00");
      expect(idx80).toBeGreaterThan(-1);
      expect(idx500).toBeGreaterThan(-1);
      expect(idx80).toBeLessThan(idx500);
    });
  });
});

// =============================================================================
// SUITE 5 — ORQUESTADOR: cotizadorInteractivo() con spyOn de prompt/alert
// =============================================================================
//
// RCN7 R1 del 2° review del docente: cubrir la capa de UI (prompt/alert) con
// spies de Jasmine para que las líneas de los orquestadores también queden
// testeadas. Cada suite mockea prompt/alert/console y verifica que el flujo
// invoque las funciones puras correctas, maneje cancelaciones y capture
// excepciones via el try/catch global agregado por Lucas (RCN8 R2).

describe("Suite 5 — Orquestador cotizadorInteractivo()", function () {
  beforeEach(function () {
    spyOn(window, "alert");
    spyOn(console, "log");
    spyOn(console, "error");
  });

  it("happy path: con categoría y cantidad válidas muestra el resumen final con alert()", function () {
    spyOn(window, "prompt").and.returnValues("cpu", "5");
    cotizadorInteractivo();
    expect(window.prompt).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalledTimes(1);
    var msg = window.alert.calls.mostRecent().args[0];
    expect(msg).toContain("COTIZACIÓN");
    expect(msg).toContain("CPU");
    expect(msg).toContain("5 unidades");
  });

  it("sale silenciosamente si el usuario cancela el primer prompt (devuelve null)", function () {
    spyOn(window, "prompt").and.returnValue(null);
    cotizadorInteractivo();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("muestra error con alert() si la categoría es inválida", function () {
    spyOn(window, "prompt").and.returnValues("teclado", "5");
    cotizadorInteractivo();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Categoría inválida/));
  });

  it("sale silenciosamente si el usuario cancela el segundo prompt (cantidad)", function () {
    spyOn(window, "prompt").and.returnValues("cpu", null);
    cotizadorInteractivo();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("muestra error con alert() si la cantidad es inválida", function () {
    spyOn(window, "prompt").and.returnValues("cpu", "abc");
    cotizadorInteractivo();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Cantidad inválida/));
  });

  it("registra en console.log() el resumen del happy path", function () {
    spyOn(window, "prompt").and.returnValues("gpu", "3");
    cotizadorInteractivo();
    expect(console.log).toHaveBeenCalledWith(
      "[Flujo 1 - Cotizador]",
      jasmine.stringMatching(/COTIZACIÓN/)
    );
  });

  it("RCN8 R2: captura excepciones internas con try/catch y muestra 'Error: …'", function () {
    spyOn(window, "prompt").and.returnValues("cpu", "5");
    spyOn(window, "generarResumenCotizacion").and.throwError("Error simulado en resumen");
    cotizadorInteractivo();
    expect(window.alert).toHaveBeenCalledWith("Error: Error simulado en resumen");
    expect(console.error).toHaveBeenCalled();
  });
});

// =============================================================================
// SUITE 6 — ORQUESTADOR: verificadorCompatibilidad() con spyOn de prompt/alert
// =============================================================================

describe("Suite 6 — Orquestador verificadorCompatibilidad()", function () {
  beforeEach(function () {
    spyOn(window, "alert");
    spyOn(console, "log");
    spyOn(console, "error");
  });

  it("happy path: con TDPs válidos muestra el informe con alert()", function () {
    spyOn(window, "prompt").and.returnValues("125", "450");
    verificadorCompatibilidad();
    expect(window.prompt).toHaveBeenCalledTimes(2);
    var msg = window.alert.calls.mostRecent().args[0];
    expect(msg).toContain("VERIFICADOR DE COMPATIBILIDAD");
    expect(msg).toContain("Corsair");
  });

  it("sale silenciosamente si el usuario cancela el primer prompt (TDP CPU)", function () {
    spyOn(window, "prompt").and.returnValue(null);
    verificadorCompatibilidad();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("muestra error si el TDP de CPU es inválido (string no numérico)", function () {
    spyOn(window, "prompt").and.returnValues("abc", "450");
    verificadorCompatibilidad();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/TDP de CPU inválido/));
  });

  it("muestra error si el TDP de GPU está fuera de rango (>1000)", function () {
    spyOn(window, "prompt").and.returnValues("125", "9999");
    verificadorCompatibilidad();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/TDP de GPU inválido/));
  });

  it("muestra advertencia cuando el consumo supera 1000 W (no hay fuente disponible)", function () {
    spyOn(window, "prompt").and.returnValues("500", "600");
    verificadorCompatibilidad();
    var msg = window.alert.calls.mostRecent().args[0];
    expect(msg).toContain("supera 1000W");
  });

  it("RCN8 R2: captura excepciones internas y muestra 'Error: …' por alert", function () {
    spyOn(window, "prompt").and.returnValues("125", "450");
    spyOn(window, "generarInformeCompatibilidad").and.throwError("fallo del informe");
    verificadorCompatibilidad();
    expect(window.alert).toHaveBeenCalledWith("Error: fallo del informe");
    expect(console.error).toHaveBeenCalled();
  });
});

// =============================================================================
// SUITE 7 — ORQUESTADOR: carritoSimulador() con spyOn de prompt/alert
// =============================================================================

describe("Suite 7 — Orquestador carritoSimulador()", function () {
  beforeEach(function () {
    spyOn(window, "alert");
    spyOn(console, "log");
    spyOn(console, "error");
  });

  it("salida inmediata con '0': muestra resumen 'carrito vacío'", function () {
    spyOn(window, "prompt").and.returnValue("0");
    carritoSimulador();
    var ultima = window.alert.calls.mostRecent().args[0];
    expect(ultima).toContain("vacío");
  });

  it("salida con null en el primer prompt: muestra resumen vacío", function () {
    spyOn(window, "prompt").and.returnValue(null);
    carritoSimulador();
    var ultima = window.alert.calls.mostRecent().args[0];
    expect(ultima).toContain("vacío");
  });

  it("agrega un producto válido y luego sale: aparece producto agregado + resumen con total", function () {
    // Seleccionar producto 1 (Intel i9-13900K, stock 12), cantidad 2, luego salir
    spyOn(window, "prompt").and.returnValues("1", "2", "0");
    carritoSimulador();
    var llamadas = window.alert.calls.allArgs().map(function (a) { return a[0]; });
    expect(llamadas.some(function (m) { return /agregado al carrito/.test(m); })).toBeTruthy();
    expect(llamadas.some(function (m) { return /TOTAL: \$/.test(m); })).toBeTruthy();
  });

  it("muestra error 'Opción inválida' con número fuera de rango", function () {
    spyOn(window, "prompt").and.returnValues("99", "0");
    carritoSimulador();
    var llamadas = window.alert.calls.allArgs().map(function (a) { return a[0]; });
    expect(llamadas.some(function (m) { return /Opción inválida/.test(m); })).toBeTruthy();
  });

  it("muestra error 'Stock insuficiente' al pedir más unidades que el stock del producto", function () {
    // Producto 2 (RTX 4090, stock 5). Pido 10.
    spyOn(window, "prompt").and.returnValues("2", "10", "0");
    carritoSimulador();
    var llamadas = window.alert.calls.allArgs().map(function (a) { return a[0]; });
    expect(llamadas.some(function (m) { return /Stock insuficiente/.test(m); })).toBeTruthy();
  });

  it("muestra error 'Cantidad inválida' cuando se ingresa un valor no numérico", function () {
    spyOn(window, "prompt").and.returnValues("1", "abc", "0");
    carritoSimulador();
    var llamadas = window.alert.calls.allArgs().map(function (a) { return a[0]; });
    expect(llamadas.some(function (m) { return /Cantidad inválida/.test(m); })).toBeTruthy();
  });

  it("RCN8 R2: captura excepciones internas y muestra 'Error: …'", function () {
    spyOn(window, "prompt").and.returnValues("1", "2", "0");
    spyOn(window, "agregarAlCarrito").and.throwError("fallo en agregar");
    carritoSimulador();
    var llamadas = window.alert.calls.allArgs().map(function (a) { return a[0]; });
    expect(llamadas.some(function (m) { return /^Error: fallo en agregar$/.test(m); })).toBeTruthy();
    expect(console.error).toHaveBeenCalled();
  });
});

// =============================================================================
// SUITE 8 — ORQUESTADOR: buscadorProductos() con spyOn de prompt/alert
// =============================================================================

describe("Suite 8 — Orquestador buscadorProductos()", function () {
  beforeEach(function () {
    spyOn(window, "alert");
    spyOn(console, "log");
    spyOn(console, "error");
  });

  it("happy path con categoría 'cpu' y precio máx 1000: muestra resultados con alert()", function () {
    spyOn(window, "prompt").and.returnValues("cpu", "1000");
    buscadorProductos();
    var msg = window.alert.calls.mostRecent().args[0];
    expect(msg).toContain("RESULTADOS DE BÚSQUEDA");
    expect(msg).toContain("cpu");
  });

  it("happy path con categoría 'todas': lista todos los productos bajo el precio máx", function () {
    spyOn(window, "prompt").and.returnValues("todas", "10000");
    buscadorProductos();
    var msg = window.alert.calls.mostRecent().args[0];
    expect(msg).toContain("Resultados encontrados: 6");
  });

  it("sale silenciosamente si el usuario cancela el primer prompt", function () {
    spyOn(window, "prompt").and.returnValue(null);
    buscadorProductos();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("muestra error con alert() si la categoría es inválida", function () {
    spyOn(window, "prompt").and.returnValues("teclado", "1000");
    buscadorProductos();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Categoría inválida/));
  });

  it("sale silenciosamente si el usuario cancela el segundo prompt (precio)", function () {
    spyOn(window, "prompt").and.returnValues("cpu", null);
    buscadorProductos();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("muestra error con alert() si el precio máximo es 0 o negativo", function () {
    spyOn(window, "prompt").and.returnValues("cpu", "0");
    buscadorProductos();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringMatching(/Precio inválido/));
  });

  it("RCN8 R2: captura excepciones internas y muestra 'Error: …'", function () {
    spyOn(window, "prompt").and.returnValues("cpu", "1000");
    spyOn(window, "filtrarProductos").and.throwError("fallo al filtrar");
    buscadorProductos();
    expect(window.alert).toHaveBeenCalledWith("Error: fallo al filtrar");
    expect(console.error).toHaveBeenCalled();
  });
});
