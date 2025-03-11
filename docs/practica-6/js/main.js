//1. Crear un Arreglo de Productos:
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalón", precio: 25, stock: 8 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Sombrero", precio: 10, stock: 20 },
  { nombre: "Vestido", precio: 30, stock: 15 },
];

//2. Agregar Productos al Carrito:
let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) {
  for (let producto of productos) {
    if (producto.nombre === productoNombre) {
      if (producto.stock >= cantidad) {
        carrito.push({
          nombre: productoNombre,
          cantidad: cantidad,
          precio: producto.precio,
        });

        producto.stock -= cantidad;
        console.log(
          `* ${cantidad} ${productoNombre}(s) agregado(s) al carrito.`
        );
        console.log(productos);
        console.log(carrito);
        console.log("***************************");
      } else {
        console.log(
          `No hay suficiente stock del producto "${productoNombre}".`
        );
        return;
      }
    }
  }
}

//3. Calcular el Total del Carrito:
function calcularTotal() {
  let total = 0;
  for (let item of carrito) {
    total += item.precio * item.cantidad;
  }

  return total;
}

let imprimirTotal = calcularTotal();
//console.log(`Venta Total: $${imprimirTotal}`);

// 4.Aplicar Descuentos:
function aplicarDescuento(total) {
  if (total > 100) {
    return total * 0.9;
  }

  return total;
}

let imprimirDescuento = aplicarDescuento(imprimirTotal);
//console.log(`Venta con Descuento del 10%: $${imprimirDescuento}`);

//5. Simular el Proceso de Compra
function procesarCompra() {
  console.log("Procesando compra...");
  setTimeout(function () {
    let total = calcularTotal();
    total = aplicarDescuento(total);
    console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
  }, 3000);
}

//6. Ejecuta el Código:
agregarAlCarrito("Sombrero", 10);
agregarAlCarrito("Zapatos", 3);
agregarAlCarrito("Sombrero", 10);
agregarAlCarrito("Zapatos", 8);
procesarCompra();
