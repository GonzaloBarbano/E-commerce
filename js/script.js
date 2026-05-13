/**
 * @file script.js
 * @description Lógica de negocio principal del e-commerce PC Hardware.
 *              Implementa 4 flujos de trabajo simulados con prompt/alert.
 *              Las funciones de negocio son puras y testeables con Jasmine.
 * @author Lucas — Matrícula 152159
 * @version 1.0.0
 */

// =============================================================================
// DATOS DEL CATÁLOGO
// =============================================================================

/**
 * Catálogo de productos de PC Hardware.
 * Array de objetos con las propiedades relevantes de cada producto.
 */
var catalogo = [
  {
    id: 1,
    nombre: "Intel Core i9-13900K",
    categoria: "cpu",
    marca: "Intel",
    precio: 599.99,
    stock: 12,
    tdp: 125,
  },
  {
    id: 2,
    nombre: "NVIDIA RTX 4090",
    categoria: "gpu",
    marca: "NVIDIA",
    precio: 1799.99,
    stock: 5,
    tdp: 450,
  },
  {
    id: 3,
    nombre: "Corsair Vengeance DDR5 32GB",
    categoria: "ram",
    marca: "Corsair",
    precio: 249.99,
    stock: 28,
    tdp: 0,
  },
  {
    id: 4,
    nombre: "Kingston NV2 1TB SSD",
    categoria: "storage",
    marca: "Kingston",
    precio: 89.99,
    stock: 45,
    tdp: 0,
  },
  {
    id: 5,
    nombre: "Corsair RM850x Gold",
    categoria: "psu",
    marca: "Corsair",
    precio: 179.99,
    stock: 19,
    potencia: 850,
  },
  {
    id: 6,
    nombre: "Corsair H150i ELITE",
    categoria: "cooling",
    marca: "Corsair",
    precio: 159.99,
    stock: 8,
    tdp: 0,
  },
];

/**
 * Precios de referencia por categoría para el cotizador.
 * Objeto con las categorías como keys y precio base como value.
 */
var preciosPorCategoria = {
  cpu: 599.99,
  gpu: 1799.99,
  ram: 249.99,
  storage: 89.99,
  psu: 179.99,
  cooling: 159.99,
};

/**
 * Tabla de fuentes de alimentación recomendadas según consumo total.
 * Array de objetos ordenados de menor a mayor potencia.
 */
var fuentesRecomendadas = [
  { potencia: 550, nombre: "Corsair CV550", precio: 79.99 },
  { potencia: 650, nombre: "Corsair RM650x", precio: 119.99 },
  { potencia: 750, nombre: "Corsair RM750x", precio: 139.99 },
  { potencia: 850, nombre: "Corsair RM850x Gold", precio: 179.99 },
  { potencia: 1000, nombre: "Corsair HX1000", precio: 249.99 },
];

// =============================================================================
// FLUJO 1 — COTIZADOR DE PRODUCTOS
// =============================================================================

/**
 * Valida que una categoría ingresada exista en el catálogo.
 * @param {string} categoria - Categoría a validar (ej: "cpu", "gpu").
 * @returns {boolean} true si la categoría es válida, false si no.
 */
function validarCategoria(categoria) {
  if (!categoria || typeof categoria !== "string") return false;
  var categoriaNorm = categoria.trim().toLowerCase();
  return preciosPorCategoria.hasOwnProperty(categoriaNorm);
}

/**
 * Valida que una cantidad sea un número entero positivo.
 * @param {number|string} cantidad - Cantidad a validar.
 * @returns {boolean} true si es válida, false si no.
 */
function validarCantidad(cantidad) {
  var num = parseInt(cantidad);
  return !isNaN(num) && num > 0 && num <= 100;
}

/**
 * Calcula el descuento por volumen según la cantidad de unidades.
 * @param {number} cantidad - Cantidad de unidades.
 * @returns {number} Porcentaje de descuento (0, 5, 10 o 15).
 */
function calcularDescuento(cantidad) {
  if (cantidad >= 10) return 15;
  if (cantidad >= 5) return 10;
  if (cantidad >= 3) return 5;
  return 0;
}

/**
 * Calcula el subtotal de una compra aplicando descuento por volumen.
 * @param {number} precioUnitario - Precio unitario del producto.
 * @param {number} cantidad - Cantidad de unidades.
 * @returns {number} Subtotal con descuento aplicado, redondeado a 2 decimales.
 */
function calcularSubtotal(precioUnitario, cantidad) {
  if (precioUnitario < 0 || cantidad <= 0) {
    throw new Error("Precio y cantidad deben ser valores positivos");
  }
  var descuento = calcularDescuento(cantidad);
  var subtotal = precioUnitario * cantidad * (1 - descuento / 100);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Genera el resumen de cotización como texto.
 * @param {string} categoria - Categoría del producto.
 * @param {number} cantidad - Cantidad solicitada.
 * @param {number} precioUnitario - Precio por unidad.
 * @returns {string} Texto con el resumen de la cotización.
 */
function generarResumenCotizacion(categoria, cantidad, precioUnitario) {
  var descuento = calcularDescuento(cantidad);
  var subtotal = calcularSubtotal(precioUnitario, cantidad);
  return (
    "=== COTIZACIÓN PC HARDWARE ===\n" +
    "Categoría: " + categoria.toUpperCase() + "\n" +
    "Precio unitario: $" + precioUnitario.toFixed(2) + "\n" +
    "Cantidad: " + cantidad + " unidades\n" +
    "Descuento por volumen: " + descuento + "%\n" +
    "SUBTOTAL: $" + subtotal.toFixed(2)
  );
}

/**
 * Flujo 1 — Cotizador interactivo con prompt/alert.
 * Entrada → proceso → salida usando las funciones puras del flujo.
 */
function flujo1Cotizador() {
  var categorias = "cpu | gpu | ram | storage | psu | cooling";
  var categoria = prompt(
    "=== COTIZADOR PC HARDWARE ===\n" +
    "Categorías disponibles:\n" + categorias + "\n\n" +
    "Ingresá la categoría que querés cotizar:"
  );

  if (categoria === null) return; // usuario canceló

  if (!validarCategoria(categoria)) {
    alert("Categoría inválida. Opciones: " + categorias);
    return;
  }

  var categoriaNorm = categoria.trim().toLowerCase();
  var cantidadStr = prompt("¿Cuántas unidades querés? (1-100):");

  if (cantidadStr === null) return;

  if (!validarCantidad(cantidadStr)) {
    alert("Cantidad inválida. Ingresá un número entre 1 y 100.");
    return;
  }

  var cantidad = parseInt(cantidadStr);
  var precio = preciosPorCategoria[categoriaNorm];
  var resumen = generarResumenCotizacion(categoriaNorm, cantidad, precio);
  alert(resumen);
  console.log("[Flujo 1 - Cotizador]", resumen);
}

// =============================================================================
// FLUJO 2 — VERIFICADOR DE COMPATIBILIDAD
// =============================================================================

/**
 * Calcula el consumo total estimado del sistema sumando TDP de CPU y GPU
 * más un margen de seguridad del 20%.
 * @param {number} tdpCpu - TDP de la CPU en watts.
 * @param {number} tdpGpu - TDP de la GPU en watts.
 * @returns {number} Consumo total recomendado en watts.
 */
function calcularConsumoTotal(tdpCpu, tdpGpu) {
  if (tdpCpu < 0 || tdpGpu < 0) {
    throw new Error("Los valores de TDP no pueden ser negativos");
  }
  var base = tdpCpu + tdpGpu + 100; // +100W para placa madre, RAM, etc.
  return Math.ceil(base * 1.2); // margen de seguridad 20%
}

/**
 * Determina la fuente de alimentación recomendada para un consumo dado.
 * @param {number} consumoWatts - Consumo total en watts.
 * @returns {object|null} Objeto fuente recomendada, o null si supera las disponibles.
 */
function recomendarFuente(consumoWatts) {
  for (var i = 0; i < fuentesRecomendadas.length; i++) {
    if (fuentesRecomendadas[i].potencia >= consumoWatts) {
      return fuentesRecomendadas[i];
    }
  }
  return null;
}

/**
 * Valida que un valor de TDP sea un número positivo razonable.
 * @param {string|number} valor - Valor a validar.
 * @returns {boolean} true si es válido.
 */
function validarTdp(valor) {
  var num = parseInt(valor);
  return !isNaN(num) && num > 0 && num <= 1000;
}

/**
 * Genera el informe de compatibilidad como texto.
 * @param {number} tdpCpu - TDP CPU en watts.
 * @param {number} tdpGpu - TDP GPU en watts.
 * @param {object|null} fuente - Fuente recomendada o null.
 * @returns {string} Texto del informe.
 */
function generarInformeCompatibilidad(tdpCpu, tdpGpu, fuente) {
  var consumo = calcularConsumoTotal(tdpCpu, tdpGpu);
  var informe =
    "=== VERIFICADOR DE COMPATIBILIDAD ===\n" +
    "TDP CPU: " + tdpCpu + "W\n" +
    "TDP GPU: " + tdpGpu + "W\n" +
    "Consumo estimado (con margen 20%): " + consumo + "W\n\n";

  if (fuente) {
    informe +=
      "✅ Fuente recomendada: " + fuente.nombre + "\n" +
      "   Potencia: " + fuente.potencia + "W\n" +
      "   Precio estimado: $" + fuente.precio.toFixed(2);
  } else {
    informe += "⚠️ Tu sistema supera 1000W. Consultá con un especialista.";
  }
  return informe;
}

/**
 * Flujo 2 — Verificador de compatibilidad interactivo.
 */
function flujo2Compatibilidad() {
  var tdpCpuStr = prompt(
    "=== VERIFICADOR DE COMPATIBILIDAD ===\n" +
    "Ingresá el TDP de tu CPU en watts\n" +
    "(Ej: i9-13900K = 125, Ryzen 9 7950X = 170):"
  );

  if (tdpCpuStr === null) return;

  if (!validarTdp(tdpCpuStr)) {
    alert("TDP de CPU inválido. Ingresá un número entre 1 y 1000.");
    return;
  }

  var tdpGpuStr = prompt(
    "Ingresá el TDP de tu GPU en watts\n" +
    "(Ej: RTX 4090 = 450, RX 7900 XTX = 355):"
  );

  if (tdpGpuStr === null) return;

  if (!validarTdp(tdpGpuStr)) {
    alert("TDP de GPU inválido. Ingresá un número entre 1 y 1000.");
    return;
  }

  var tdpCpu = parseInt(tdpCpuStr);
  var tdpGpu = parseInt(tdpGpuStr);
  var fuente = recomendarFuente(calcularConsumoTotal(tdpCpu, tdpGpu));
  var informe = generarInformeCompatibilidad(tdpCpu, tdpGpu, fuente);

  alert(informe);
  console.log("[Flujo 2 - Compatibilidad]", informe);
}

// =============================================================================
// FLUJO 3 — SIMULADOR DE CARRITO
// =============================================================================

/**
 * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
 * @param {Array} carrito - Array actual del carrito.
 * @param {object} producto - Producto a agregar (debe tener id, nombre, precio).
 * @param {number} cantidad - Cantidad a agregar.
 * @returns {Array} Nuevo array del carrito actualizado.
 */
function agregarAlCarrito(carrito, producto, cantidad) {
  if (!producto || cantidad <= 0) {
    throw new Error("Producto o cantidad inválidos");
  }

  var carritoActualizado = carrito.slice(); // copia sin mutar el original
  var encontrado = false;

  for (var i = 0; i < carritoActualizado.length; i++) {
    if (carritoActualizado[i].id === producto.id) {
      carritoActualizado[i] = {
        id: carritoActualizado[i].id,
        nombre: carritoActualizado[i].nombre,
        precio: carritoActualizado[i].precio,
        cantidad: carritoActualizado[i].cantidad + cantidad,
      };
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    carritoActualizado.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
    });
  }

  return carritoActualizado;
}

/**
 * Calcula el total del carrito sin IVA.
 * @param {Array} carrito - Array de items del carrito.
 * @returns {number} Total sin IVA, redondeado a 2 decimales.
 */
function calcularTotalCarrito(carrito) {
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  return Math.round(total * 100) / 100;
}

/**
 * Aplica IVA del 21% a un monto.
 * @param {number} monto - Monto base sin IVA.
 * @returns {number} Monto con IVA incluido.
 */
function aplicarIva(monto) {
  if (monto < 0) throw new Error("El monto no puede ser negativo");
  return Math.round(monto * 1.21 * 100) / 100;
}

/**
 * Genera el resumen del carrito como texto.
 * @param {Array} carrito - Array de items.
 * @returns {string} Texto con el resumen del carrito.
 */
function generarResumenCarrito(carrito) {
  if (!carrito || carrito.length === 0) {
    return "El carrito está vacío.";
  }

  var resumen = "=== MI CARRITO — PC HARDWARE ===\n\n";

  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    var subtotal = Math.round(item.precio * item.cantidad * 100) / 100;
    resumen +=
      (i + 1) + ". " + item.nombre + "\n" +
      "   $" + item.precio.toFixed(2) + " x " + item.cantidad +
      " = $" + subtotal.toFixed(2) + "\n";
  }

  var totalSinIva = calcularTotalCarrito(carrito);
  var totalConIva = aplicarIva(totalSinIva);

  resumen +=
    "\nSubtotal: $" + totalSinIva.toFixed(2) +
    "\nIVA (21%): $" + (totalConIva - totalSinIva).toFixed(2) +
    "\nTOTAL: $" + totalConIva.toFixed(2);

  return resumen;
}

/**
 * Busca un producto en el catálogo por número de opción del menú.
 * @param {number} opcion - Número de opción (1-6).
 * @returns {object|null} Producto encontrado o null.
 */
function obtenerProductoPorOpcion(opcion) {
  var indice = opcion - 1;
  if (indice < 0 || indice >= catalogo.length) return null;
  return catalogo[indice];
}

/**
 * Flujo 3 — Simulador de carrito interactivo.
 */
function flujo3Carrito() {
  var carrito = [];
  var continuar = true;

  while (continuar) {
    var menuProductos =
      "=== SIMULADOR DE CARRITO ===\n\n" +
      "Productos disponibles:\n" +
      "1. Intel Core i9-13900K — $599.99\n" +
      "2. NVIDIA RTX 4090 — $1799.99\n" +
      "3. Corsair Vengeance DDR5 32GB — $249.99\n" +
      "4. Kingston NV2 1TB SSD — $89.99\n" +
      "5. Corsair RM850x Gold — $179.99\n" +
      "6. Corsair H150i ELITE — $159.99\n\n" +
      "Items en carrito: " + carrito.length + "\n" +
      "0. Ver resumen y finalizar\n\n" +
      "Elegí un producto (0-6):";

    var opcionStr = prompt(menuProductos);

    if (opcionStr === null || opcionStr === "0") {
      continuar = false;
    } else {
      var opcion = parseInt(opcionStr);
      var producto = obtenerProductoPorOpcion(opcion);

      if (!producto) {
        alert("Opción inválida. Elegí entre 1 y 6.");
      } else {
        var cantStr = prompt("¿Cuántas unidades de " + producto.nombre + "? (1-10):");
        var cant = parseInt(cantStr);

        if (isNaN(cant) || cant < 1 || cant > 10) {
          alert("Cantidad inválida. Ingresá entre 1 y 10.");
        } else if (cant > producto.stock) {
          alert("Stock insuficiente. Solo hay " + producto.stock + " unidades.");
        } else {
          carrito = agregarAlCarrito(carrito, producto, cant);
          alert("✅ " + producto.nombre + " agregado al carrito.");
        }
      }
    }
  }

  var resumen = generarResumenCarrito(carrito);
  alert(resumen);
  console.log("[Flujo 3 - Carrito]", resumen);
}

// =============================================================================
// FLUJO 4 — BUSCADOR DE PRODUCTOS
// =============================================================================

/**
 * Filtra el catálogo por categoría y precio máximo.
 * @param {Array} productos - Array de productos a filtrar.
 * @param {string} categoria - Categoría a filtrar ("todas" para no filtrar).
 * @param {number} precioMaximo - Precio máximo permitido.
 * @returns {Array} Array de productos que cumplen los filtros.
 */
function filtrarProductos(productos, categoria, precioMaximo) {
  if (!Array.isArray(productos)) {
    throw new Error("El parámetro productos debe ser un array");
  }
  if (precioMaximo < 0) {
    throw new Error("El precio máximo no puede ser negativo");
  }

  var resultado = [];
  var categoriaNorm = categoria ? categoria.trim().toLowerCase() : "todas";

  for (var i = 0; i < productos.length; i++) {
    var prod = productos[i];
    var coincideCategoria =
      categoriaNorm === "todas" || prod.categoria === categoriaNorm;
    var coincidePrecio = prod.precio <= precioMaximo;

    if (coincideCategoria && coincidePrecio) {
      resultado.push(prod);
    }
  }

  return resultado;
}

/**
 * Ordena un array de productos por precio de menor a mayor.
 * @param {Array} productos - Array de productos.
 * @returns {Array} Nuevo array ordenado por precio ascendente.
 */
function ordenarPorPrecio(productos) {
  return productos.slice().sort(function (a, b) {
    return a.precio - b.precio;
  });
}

/**
 * Genera el texto de resultados de búsqueda.
 * @param {Array} resultados - Array de productos encontrados.
 * @param {string} categoria - Categoría buscada.
 * @param {number} precioMaximo - Precio máximo aplicado.
 * @returns {string} Texto con los resultados.
 */
function generarResultadosBusqueda(resultados, categoria, precioMaximo) {
  var ordenados = ordenarPorPrecio(resultados);
  var texto =
    "=== RESULTADOS DE BÚSQUEDA ===\n" +
    "Categoría: " + (categoria || "Todas") + "\n" +
    "Precio máximo: $" + precioMaximo.toFixed(2) + "\n" +
    "Resultados encontrados: " + ordenados.length + "\n\n";

  if (ordenados.length === 0) {
    texto += "No se encontraron productos con esos filtros.";
  } else {
    for (var i = 0; i < ordenados.length; i++) {
      var p = ordenados[i];
      texto +=
        (i + 1) + ". " + p.nombre + "\n" +
        "   Marca: " + p.marca + " | Precio: $" + p.precio.toFixed(2) +
        " | Stock: " + p.stock + " uds.\n";
    }
  }

  return texto;
}

/**
 * Flujo 4 — Buscador de productos interactivo.
 */
function flujo4Buscador() {
  var categorias = "cpu | gpu | ram | storage | psu | cooling | todas";
  var categoria = prompt(
    "=== BUSCADOR DE PRODUCTOS ===\n" +
    "Categorías: " + categorias + "\n\n" +
    "Ingresá una categoría (o 'todas' para ver todo):"
  );

  if (categoria === null) return;

  var categoriaNorm = categoria.trim().toLowerCase();
  var categoriaValida =
    categoriaNorm === "todas" || validarCategoria(categoriaNorm);

  if (!categoriaValida) {
    alert("Categoría inválida. Opciones: " + categorias);
    return;
  }

  var precioMaxStr = prompt("Ingresá el precio máximo en USD (ej: 500):");

  if (precioMaxStr === null) return;

  var precioMax = parseFloat(precioMaxStr);

  if (isNaN(precioMax) || precioMax <= 0) {
    alert("Precio inválido. Ingresá un número mayor a 0.");
    return;
  }

  var resultados = filtrarProductos(catalogo, categoriaNorm, precioMax);
  var texto = generarResultadosBusqueda(resultados, categoriaNorm, precioMax);

  alert(texto);
  console.log("[Flujo 4 - Buscador]", texto);
}

// =============================================================================
// MENÚ PRINCIPAL
// =============================================================================

/**
 * Inicia el menú principal de la aplicación.
 * Permite al usuario elegir entre los 4 flujos disponibles.
 * Se repite hasta que el usuario ingresa 0 para salir.
 */
function iniciarMenu() {
  var salir = false;

  while (!salir) {
    var opcion = prompt(
      "╔══════════════════════════════╗\n" +
      "║     PC HARDWARE — MENÚ      ║\n" +
      "╚══════════════════════════════╝\n\n" +
      "1. Cotizador de productos\n" +
      "2. Verificador de compatibilidad\n" +
      "3. Simulador de carrito\n" +
      "4. Buscador de productos\n" +
      "0. Salir\n\n" +
      "Elegí una opción:"
    );

    if (opcion === null || opcion === "0") {
      salir = true;
      alert("¡Gracias por usar PC Hardware! 👋");
    } else {
      switch (opcion) {
        case "1":
          flujo1Cotizador();
          break;
        case "2":
          flujo2Compatibilidad();
          break;
        case "3":
          flujo3Carrito();
          break;
        case "4":
          flujo4Buscador();
          break;
        default:
          alert("Opción inválida. Elegí entre 0 y 4.");
      }
    }
  }
}

// Iniciar aplicación al cargar el script
iniciarMenu();