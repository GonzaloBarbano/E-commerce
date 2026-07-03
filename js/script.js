/**
 * @file script.js
 * @description Controlador principal — AO4. Sin lógica de negocio: solo maneja
 *              eventos del DOM e invoca métodos de las clases del dominio
 *              (Producto, Carrito, Cotizacion en js/models/) y de la capa de
 *              persistencia (StorageUtil en js/utils/storage.js).
 *              Sin prompt() ni alert(): toda la interacción va por HTML.
 * @author @Naguirre0102 (Nico) — refactor sobre el trabajo previo de @LucasFUces
 * @version 2.0.0 — AO4
 */

// =============================================================================
// DATOS DEL CATÁLOGO (temporales — pueden migrar a clase Catalogo si aplica)
// =============================================================================

var catalogo = [
  { id: 1, nombre: "Intel Core i9-13900K",       categoria: "cpu",     marca: "Intel",   precio: 599.99,  stock: 12, tdp: 125 },
  { id: 2, nombre: "NVIDIA RTX 4090",            categoria: "gpu",     marca: "NVIDIA",  precio: 1799.99, stock: 5,  tdp: 450 },
  { id: 3, nombre: "Corsair Vengeance DDR5 32GB",categoria: "ram",     marca: "Corsair", precio: 249.99,  stock: 28, tdp: 0 },
  { id: 4, nombre: "Kingston NV2 1TB SSD",       categoria: "storage", marca: "Kingston",precio: 89.99,   stock: 45, tdp: 0 },
  { id: 5, nombre: "Corsair RM850x Gold",        categoria: "psu",     marca: "Corsair", precio: 179.99,  stock: 19, potencia: 850 },
  { id: 6, nombre: "Corsair H150i ELITE",        categoria: "cooling", marca: "Corsair", precio: 159.99,  stock: 8,  tdp: 0 },
];

var preciosPorCategoria = {
  cpu: 599.99, gpu: 1799.99, ram: 249.99,
  storage: 89.99, psu: 179.99, cooling: 159.99,
};

var fuentesRecomendadas = [
  { potencia: 550,  nombre: "Corsair CV550",       precio: 79.99 },
  { potencia: 650,  nombre: "Corsair RM650x",      precio: 119.99 },
  { potencia: 750,  nombre: "Corsair RM750x",      precio: 139.99 },
  { potencia: 850,  nombre: "Corsair RM850x Gold", precio: 179.99 },
  { potencia: 1000, nombre: "Corsair HX1000",      precio: 249.99 },
];

// =============================================================================
// ESTADO GLOBAL MÍNIMO
// =============================================================================

/** @type {Carrito|null} Instancia del carrito, se crea en init() */
var carrito = null;

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

document.addEventListener("DOMContentLoaded", init);

/**
 * Punto de entrada. El modal del Primer Parcial se inicializa siempre (no
 * depende de POO/Storage); el simulador se inicializa solo si las clases del
 * dominio ya están cargadas (evita crash cuando POO/Storage aún no mergearon).
 */
function init() {
  inicializarModalProducto();
  if (!dependenciasPOOStorageDisponibles()) {
    console.warn(
      "[script.js] Clases del dominio (Producto/Carrito/Cotizacion) o " +
      "StorageUtil no disponibles. El simulador queda deshabilitado hasta " +
      "que se mergeen los PRs de POO + Storage."
    );
    return;
  }
  restaurarCarrito();
  restaurarUltimaCotizacion();
  poblarSelectProductos();
  renderCarrito();
  configurarEventos();
}

/**
 * @returns {boolean} true si Producto, Carrito, Cotizacion y StorageUtil están cargados.
 */
function dependenciasPOOStorageDisponibles() {
  return (
    typeof Producto !== "undefined" &&
    typeof Carrito !== "undefined" &&
    typeof Cotizacion !== "undefined" &&
    typeof StorageUtil !== "undefined"
  );
}

function restaurarCarrito() {
  try {
    var carritoData = StorageUtil.obtener("pc:carrito", "local");
    carrito = carritoData ? Carrito.fromJSON(carritoData) : new Carrito();
  } catch (err) {
    console.error("Error al restaurar carrito desde localStorage:", err);
    carrito = new Carrito();
  }
}

function restaurarUltimaCotizacion() {
  try {
    var cotData = StorageUtil.obtener("pc:ultimaCotizacion", "session");
    if (cotData) {
      var cot = Cotizacion.fromJSON(cotData);
      var contenedor = document.getElementById("resultado-cotizador");
      if (contenedor) contenedor.innerHTML = renderResumenCotizacion(cot);
    }
  } catch (err) {
    console.error("Error al restaurar última cotización:", err);
  }
}

function configurarEventos() {
  document.getElementById("form-cotizador")
    .addEventListener("submit", handleCotizadorSubmit);
  document.getElementById("form-compatibilidad")
    .addEventListener("submit", handleCompatibilidadSubmit);
  document.getElementById("form-carrito-agregar")
    .addEventListener("submit", handleCarritoAgregarSubmit);
  document.getElementById("form-buscador")
    .addEventListener("submit", handleBuscadorSubmit);
  document.getElementById("btn-vaciar-carrito")
    .addEventListener("click", handleVaciarCarrito);
}

// =============================================================================
// HANDLERS DE EVENTOS — 4 flujos + vaciar carrito
// =============================================================================

/**
 * Flujo 1 — Cotizador. Toma categoría + cantidad, crea Cotizacion, muestra
 * resumen y persiste en sessionStorage.
 */
function handleCotizadorSubmit(event) {
  event.preventDefault();
  var contenedor = document.getElementById("resultado-cotizador");
  try {
    var categoria = document.getElementById("cot-categoria").value;
    var cantidad = parseInt(document.getElementById("cot-cantidad").value, 10);
    var precio = preciosPorCategoria[categoria];
    if (typeof precio !== "number") {
      throw new Error("Categoría inválida");
    }
    var cot = new Cotizacion(categoria, cantidad, precio);
    contenedor.innerHTML = renderResumenCotizacion(cot);
    StorageUtil.guardar("pc:ultimaCotizacion", cot.toJSON(), "session");
  } catch (err) {
    mostrarError(contenedor, err.message);
    console.error(err);
  }
}

/**
 * Flujo 2 — Verificador de compatibilidad. Calcula consumo y busca fuente.
 * No requiere clase del dominio: la lógica es simple y usa fuentesRecomendadas.
 */
function handleCompatibilidadSubmit(event) {
  event.preventDefault();
  var contenedor = document.getElementById("resultado-compatibilidad");
  try {
    var tdpCpu = parseInt(document.getElementById("comp-tdp-cpu").value, 10);
    var tdpGpu = parseInt(document.getElementById("comp-tdp-gpu").value, 10);
    if (isNaN(tdpCpu) || tdpCpu < 1 || tdpCpu > 1000) {
      throw new Error("TDP de CPU inválido (1-1000)");
    }
    if (isNaN(tdpGpu) || tdpGpu < 1 || tdpGpu > 1000) {
      throw new Error("TDP de GPU inválido (1-1000)");
    }
    var base = tdpCpu + tdpGpu + 100;
    var consumo = Math.ceil(base * 1.2);
    var fuente = fuentesRecomendadas.find(function (f) {
      return f.potencia >= consumo;
    }) || null;
    contenedor.innerHTML = renderResumenCompatibilidad(tdpCpu, tdpGpu, consumo, fuente);
  } catch (err) {
    mostrarError(contenedor, err.message);
    console.error(err);
  }
}

/**
 * Flujo 3 — Simulador de carrito (agregar). Persiste el carrito en localStorage.
 */
function handleCarritoAgregarSubmit(event) {
  event.preventDefault();
  var contenedor = document.getElementById("resultado-carrito");
  try {
    var idProducto = parseInt(document.getElementById("car-producto").value, 10);
    var cantidad = parseInt(document.getElementById("car-cantidad").value, 10);
    var productoRaw = catalogo.find(function (p) { return p.id === idProducto; });
    if (!productoRaw) throw new Error("Producto no encontrado en el catálogo");
    if (cantidad > productoRaw.stock) {
      throw new Error("Stock insuficiente. Hay " + productoRaw.stock + " unidades disponibles");
    }
    var producto = new Producto(productoRaw);
    carrito.agregar(producto, cantidad);
    renderCarrito();
    StorageUtil.guardar("pc:carrito", carrito.toJSON(), "local");
    event.target.reset();
  } catch (err) {
    mostrarError(contenedor, err.message);
    console.error(err);
  }
}

/**
 * Handler del botón "Vaciar carrito".
 */
function handleVaciarCarrito() {
  carrito.vaciar();
  renderCarrito();
  StorageUtil.guardar("pc:carrito", carrito.toJSON(), "local");
}

/**
 * Flujo 4 — Buscador. Filtra el catálogo por categoría + precio máx, ordena por precio.
 */
function handleBuscadorSubmit(event) {
  event.preventDefault();
  var contenedor = document.getElementById("resultado-buscador");
  try {
    var categoria = document.getElementById("bus-categoria").value;
    var precioMax = parseFloat(document.getElementById("bus-precio-max").value);
    if (isNaN(precioMax) || precioMax <= 0) {
      throw new Error("Precio inválido — ingresá un número mayor a 0");
    }
    var resultados = catalogo.filter(function (p) {
      var matchCategoria = categoria === "todas" || p.categoria === categoria;
      return matchCategoria && p.precio <= precioMax;
    });
    resultados.sort(function (a, b) { return a.precio - b.precio; });
    contenedor.innerHTML = renderResultadosBusqueda(resultados, categoria, precioMax);
  } catch (err) {
    mostrarError(contenedor, err.message);
    console.error(err);
  }
}

// =============================================================================
// RENDERERS — helpers de manipulación del DOM
// =============================================================================

/**
 * Renderiza el resumen de una cotización como bloque <pre> dentro de un alert.
 */
function renderResumenCotizacion(cot) {
  return '<pre class="alert alert-success mb-0">' + escaparHTML(cot.generarResumen()) + '</pre>';
}

function renderResumenCompatibilidad(tdpCpu, tdpGpu, consumo, fuente) {
  var html = '<div class="alert alert-info mb-0">';
  html += '<h5 class="alert-heading">Informe de compatibilidad</h5>';
  html += '<p class="mb-1">TDP CPU: <strong>' + tdpCpu + ' W</strong> · TDP GPU: <strong>' + tdpGpu + ' W</strong></p>';
  html += '<p class="mb-1">Consumo estimado (margen 20 %): <strong>' + consumo + ' W</strong></p>';
  if (fuente) {
    html += '<hr>';
    html += '<p class="mb-0">Fuente recomendada: <strong>' + fuente.nombre + '</strong> — ';
    html += fuente.potencia + ' W — $' + fuente.precio.toFixed(2) + '</p>';
  } else {
    html += '<hr>';
    html += '<p class="mb-0 text-danger">⚠ El consumo supera 1000 W. Consultá con un especialista.</p>';
  }
  html += '</div>';
  return html;
}

function renderCarrito() {
  var contenedor = document.getElementById("resultado-carrito");
  if (!contenedor) return;
  if (carrito.estaVacio()) {
    contenedor.innerHTML = '<p class="text-muted mb-0">El carrito está vacío.</p>';
    return;
  }
  var html = '<h5>Contenido del carrito</h5>';
  html += '<ul class="list-group mb-3">';
  carrito.items.forEach(function (item) {
    var subtotalItem = item.precio * item.cantidad;
    html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
    html += '<span>' + escaparHTML(item.nombre) + ' × ' + item.cantidad + '</span>';
    html += '<span class="badge bg-primary">$' + subtotalItem.toFixed(2) + '</span>';
    html += '</li>';
  });
  html += '</ul>';
  var subtotal = carrito.calcularSubtotal();
  var total = carrito.calcularTotal();
  html += '<div class="alert alert-secondary mb-0">';
  html += '<p class="mb-1">Subtotal: <strong>$' + subtotal.toFixed(2) + '</strong></p>';
  html += '<p class="mb-1">IVA (21 %): <strong>$' + (total - subtotal).toFixed(2) + '</strong></p>';
  html += '<p class="mb-0">Total: <strong>$' + total.toFixed(2) + '</strong></p>';
  html += '</div>';
  contenedor.innerHTML = html;
}

function renderResultadosBusqueda(resultados, categoria, precioMax) {
  var html = '<div class="alert alert-info">';
  html += '<h5 class="alert-heading">Resultados de búsqueda (' + resultados.length + ')</h5>';
  html += '<p class="mb-0">Categoría: <strong>' + escaparHTML(categoria) + '</strong> · Precio máximo: <strong>$' + precioMax.toFixed(2) + '</strong></p>';
  html += '</div>';
  if (resultados.length === 0) {
    html += '<p class="text-warning">No se encontraron productos con esos filtros.</p>';
    return html;
  }
  html += '<div class="table-responsive">';
  html += '<table class="table table-sm table-striped">';
  html += '<thead><tr><th>Producto</th><th>Marca</th><th class="text-end">Precio</th><th class="text-end">Stock</th></tr></thead>';
  html += '<tbody>';
  resultados.forEach(function (p) {
    html += '<tr>';
    html += '<td>' + escaparHTML(p.nombre) + '</td>';
    html += '<td>' + escaparHTML(p.marca) + '</td>';
    html += '<td class="text-end">$' + p.precio.toFixed(2) + '</td>';
    html += '<td class="text-end">' + p.stock + '</td>';
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

/**
 * Popula el <select id="car-producto"> del carrito con los productos del catálogo.
 * Se ejecuta en el init(), una sola vez.
 */
function poblarSelectProductos() {
  var select = document.getElementById("car-producto");
  if (!select) return;
  catalogo.forEach(function (p) {
    var opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.nombre + " — $" + p.precio.toFixed(2) + " (" + p.stock + " en stock)";
    select.appendChild(opt);
  });
}

function mostrarError(contenedor, mensaje) {
  if (!contenedor) return;
  contenedor.innerHTML = '<div class="alert alert-danger mb-0">Error: ' + escaparHTML(mensaje) + '</div>';
}

/**
 * Escapa HTML entities de un string para prevenir inyección al usar innerHTML.
 */
function escaparHTML(str) {
  var div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// =============================================================================
// MODAL DEL PRIMER PARCIAL (heredado — fuera del alcance de AO4)
// =============================================================================

/**
 * Valida que una ruta de imagen sea segura (bloquea path traversal).
 * Heredada de AO3, sigue siendo necesaria para el modal del catálogo.
 */
function validarRutaImagenProducto(ruta) {
  return (
    typeof ruta === "string" &&
    ruta.indexOf("..") === -1 &&
    /^assets\/[a-zA-Z0-9._\/\-]+\.(png|jpg|jpeg|webp|svg)$/i.test(ruta)
  );
}

function inicializarModalProducto() {
  var modalElement = document.getElementById("product-modal");
  if (!modalElement) return; // El modal no existe en el DOM

  modalElement.addEventListener("show.bs.modal", function (event) {
    var button = event.relatedTarget;
    var data = button.dataset;

    document.getElementById("product-modal-label").textContent = data.productName;

    var img = document.getElementById("modal-product-image");
    var allowedSrc = validarRutaImagenProducto(data.productImage) ? data.productImage : "";
    img.src = allowedSrc;
    img.alt = data.productName;

    document.getElementById("modal-product-brand").textContent = data.productBrand;
    document.getElementById("modal-product-specs").textContent = data.productSpecs;
    document.getElementById("modal-product-stock").textContent = data.productStock;
    document.getElementById("modal-product-price").textContent = data.productPrice;
  });
}
