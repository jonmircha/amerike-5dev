// Instrucción Uno
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalones", precio: 25, stock: 8 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Sombrero", precio: 10, stock: 20 },
];

// Instrucción Dos
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
        console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
      } else {
        console.error(`No hay suficiente stock de ${productoNombre}`);
      }
      return;
    }
  }
  console.error(`El producto "${productoNombre}" no existe.`);
}

// Instrucción 3
function calcularTotal() {
  let total = 0;
  for (let item of carrito) {
    total += item.precio * item.cantidad;
  }

  return total;
}

agregarAlCarrito("Pantalones", 3);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Zapatos", 2);
agregarAlCarrito("Camisetas", 3);
agregarAlCarrito("Camiseta", 3);
agregarAlCarrito("Pantalones", 2);
console.log(carrito);

let total = calcularTotal();
console.log(total);
