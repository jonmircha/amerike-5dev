# Introducción a JavaScript

En esta sesión aprenderás los fundamentos de JavaScript, el lenguaje de programación que permite agregar interactividad y dinamismo a tus páginas web. Desde la manipulación de datos hasta la creación de funciones y estructuras de control, conocerás las bases que necesitarás para construir aplicaciones web.

---

## ¿Qué es JavaScript?

JavaScript es un lenguaje de programación interpretado, ligero y versátil, diseñado principalmente para ejecutar en navegadores web. Gracias a JavaScript, podemos:

- Responder a las acciones del usuario (como clics o desplazamientos).
- Validar formularios.
- Manipular y actualizar el contenido de una página sin necesidad de recargarla.
- Crear animaciones y experiencias visuales avanzadas.

JavaScript es compatible con los estándares **ECMAScript (ES)**, cuya versión moderna más utilizada es ES6 o superior.

---

### Estructura Básica

El código JavaScript puede colocarse directamente en un archivo HTML dentro de la etiqueta `<script>` o en un archivo externo con extensión `.js`.

Ejemplo:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Ejemplo con JavaScript</title>
  </head>
  <body>
    <h1 id="titulo">Hola Mundo</h1>
    <script src="script.js"></script>
  </body>
</html>
```

En el archivo `script.js`:

```javascript
console.log("JavaScript cargado correctamente");
```

---

### Declaración de Variables

Las variables se utilizan para almacenar información que puede ser usada posteriormente. En JavaScript, las principales palabras clave para declarar variables son `let` y `const`.

JavaScript utiliza tres palabras clave principales para declarar variables:

- **`var`**: Declaración antigua, con ámbito global o de función.
- **`let`**: Declaración moderna, con ámbito de bloque.
- **`const`**: Declaración moderna para constantes (valores que no cambian).

Ejemplo:

```javascript
let nombre = "Juan"; // Variable que puede cambiar
let edad = 25;
const PI = 3.1416; // Variable constante (no cambia)

console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años.`);
```

### Tipos de Datos

JavaScript es dinámico, lo que significa que puedes asignar cualquier tipo de dato a una variable.

1. **Primitivos:**

   - `String`: Cadenas de texto.
   - `Number`: Números.
   - `Boolean`: Verdadero o falso.
   - `Null`: Sin valor.
   - `Undefined`: Variable declarada pero sin valor asignado.

2. **Referenciados:**
   - `Array`: Listas de elementos.
   - `Object`: Conjuntos de pares clave-valor.

#### Ejemplo:

```javascript
let cadena = "Hola, mundo";
let numero = 42;
let booleano = true;
let lista = [1, 2, 3, 4];
let objeto = { nombre: "Ana", edad: 25 };
```

### Operadores

Los operadores se usan para realizar cálculos o comparaciones.

1. **Aritméticos:** `+`, `-`, `*`, `/`, `%`
2. **Asignación:** `=`, `+=`, `-=`
3. **Comparación:** `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
4. **Lógicos:** `&&`, `||`, `!`

#### Ejemplo:

```javascript
let suma = 10 + 5; // Resultado: 15
let comparacion = 10 > 5; // Resultado: true
let logico = true && false; // Resultado: false
```

---

## Estructuras de Control

Las estructuras de control permiten decidir qué acciones realizar en función de condiciones específicas o repetir bloques de código.

### Condicionales: `if`, `else`

Se utilizan para ejecutar bloques de código basados en una condición.

Usamos `if`, `else if`, y `else` para ejecutar bloques de código dependiendo de una condición.

Ejemplo:

```javascript
let hora = 10;
if (hora < 12) {
  console.log("Buenos días");
} else if (hora < 18) {
  console.log("Buenas tardes");
} else {
  console.log("Buenas noches");
}
```

### Ciclos: `for`, `while`

Se utilizan para ejecutar repetidamente un bloque de código mientras una condición sea verdadera.

- **`for`**: Para iteraciones conocidas.
- **`while`** y **`do...while`**: Para condiciones indeterminadas.

#### Ciclo `for`:

```javascript
for (let i = 0; i < 5; i++) {
  console.log("Iteración:", i);
}
```

#### Ciclo `while`:

```javascript
let contador = 0;

while (contador < 5) {
  console.log("Contador:", contador);
  contador++;
}
```

---

## Funciones

Las funciones son bloques de código reutilizables que realizan una tarea específica. Puedes declarar funciones con la palabra clave `function` o como funciones flecha.

### Declaración de Funciones

```javascript
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

console.log(saludar("Carlos")); // Resultado: Hola, Carlos
```

### Funciones Flecha

Son una sintaxis más compacta para escribir funciones.

```javascript
const sumar = (a, b) => a + b;

console.log(sumar(5, 3)); // Resultado: 8
```

### Parámetros y Argumentos

Puedes pasar datos a una función como parámetros y recibir un valor de retorno.

```javascript
function calcularArea(base, altura) {
  return (base * altura) / 2;
}

console.log(calcularArea(10, 5)); // Resultado: 25
```

---

## Temporizadores

Los temporizadores permiten ejecutar funciones después de un intervalo de tiempo o repetidamente cada cierto tiempo. En JavaScript, se utilizan `setTimeout` y `setInterval` para este propósito.

### `setTimeout`

Ejecuta una función después de un tiempo determinado (en milisegundos).

```javascript
setTimeout(() => {
  console.log("Esto se ejecuta después de 3 segundos");
}, 3000);
```

### `setInterval`

Ejecuta una función repetidamente con un intervalo de tiempo especificado.

```javascript
let contador = 0;
const intervalo = setInterval(() => {
  contador++;
  console.log(`Contador: ${contador}`);
  if (contador === 5) {
    clearInterval(intervalo); // Detiene el intervalo cuando el contador llega a 5
  }
}, 1000);
```

---
