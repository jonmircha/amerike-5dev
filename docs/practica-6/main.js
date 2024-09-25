const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");

d.addEventListener("click", function (e) {
  if (!e.target.matches(".producto")) {
    return false;
  }

  //console.log(e);
  const $producto = e.target;
  let nombre = $producto.getAttribute("data-nombre");
  let precio = parseFloat($producto.getAttribute("data-precio"));

  const $itemCarrito = d.createElement("li");
  $itemCarrito.innerText = `${nombre} - $${precio}`;

  $listaCarrito.appendChild($itemCarrito);

  let totalActual = parseFloat($totalCarrito.innerText);
  $totalCarrito.innerText = (totalActual + precio).toFixed(2);
});

$listaCarrito.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const $item = e.target;
    $item.remove();

    let precio = parseFloat($item.innerText.split("- $")[1]);
    //console.log($item.innerText.split("- $"));

    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual - precio).toFixed(2);
  }
});

$btnCompra.addEventListener("click", function (e) {
  console.log($listaCarrito.children);
  if ($listaCarrito.children.length > 0) {
    $mensajeCompra.classList.remove("hidden");
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
