const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");

$btnCompra.addEventListener("click", function (e) {
  //alert("Presionando Botón");
  console.log(e);

  if ($listaCarrito.children.length > 0) {
    $mensajeCompra.classList.remove("hidden");
    setTimeout(function () {
      $mensajeCompra.classList.add("hidden");
      $listaCarrito.innerHTML = "";
      $totalCarrito.textContent = "0";
    }, 3000);
  } else {
    alert("El carrito esta vacío");
  }
});

/* 
No apliques un evento a varios elementos mediante un loop, por que es una mala práctica, si quieres asinar un evento a varios elementos usa la DELEGACIÓN DE EVENTOS

const $productos = d.querySelectorAll(".producto");
console.log($productos);

$productos.forEach(function (el) {
  el.addEventListener("click", function (e) {
    alert("Presionando Producto");
  });
}); */

d.addEventListener("click", function (e) {
  if (e.target.matches(".producto")) {
    console.log(e);

    const $producto = e.target;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    // Crear un elemento de lista para el carrito
    const $itemCarrito = d.createElement("li");
    $itemCarrito.textContent = `${nombre} - $${precio}`;

    // Insertar el elemento al carrito
    $listaCarrito.appendChild($itemCarrito);

    // Actualizar el total del carrito
    let totalActual = parseFloat($totalCarrito.textContent);
    $totalCarrito.textContent = totalActual + precio;
  }

  return false;
});
