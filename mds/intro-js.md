# Introducción a JavaScript

## Desarrollo _Frontend_

### Fundamentos de _JavaScript_

En esta sección aprenderás los fundamentos esenciales del lenguaje de programación de la web.

#### ¿Qué es _JavaScript_?

_JavaScript_ es un lenguaje de programación interpretado, ligero y versátil, diseñado inicialmente para ejecutarse en los navegadores web.

Sin embargo, actualmente _JavaScript_, es el único lenguaje capaz de ejecutarse en las 3 capas de una aplicación:

1. _Frontend_ (con _JavaScript_ de los navegadores).
1. _Backend_ (con _Node.js_, _Deno_, _Bun_, etc).
1. Persistencia de Datos (con _MongoDB_, _Couch DB_, _Firebase_, etc).

Con JavaScript puedes hacer:

- Diseño y Desarrollo Web.
- Videojuegos.
- Experiencias _3D_.
- Realidad Aumentada y/o Virtual.
- Controlar _Hardware_ (drones, _robots_, electrodomésticos, _wearables_, etc).
- Aplicaciones Híbridas y Móviles.
- Aprendizaje Automático.
- etc.

![Esto es JavaScript](https://jonmircha.com/img/blog/this-is-javascript.jpg)

---

#### Sintaxis Básica

##### Estructura Básica

El código _JavaScript_ puede colocarse directamente en un archivo _HTML_ dentro de la etiqueta `<script>` o en un archivo externo con extensión `.js`.

###### Ejemplo:

En el archivo `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fundamentos de JavaScript</title>
  </head>
  <body>
    <h1>Fundamentos de JavaScript</h1>
    <script>
      console.log("Hola Mundo desde HTML");
    </script>
    <script src="./js/main.js" type="module"></script>
  </body>
</html>
```

En el archivo `main.js`:

```js
console.log("Hola Mundo desde JavaScript");
```

##### Comentarios en _JS_

```js
/* Esto es un comentario js por lo cual no se verá */

/*
  Esto es otro
  comentario js,
  en varías
  líneas de código
*/
```

##### Escritura de código

Los nombres de variables, funciones o clases deben comenzar con:

- Una letra
- O un signo de dolar **\$**
- O un guión bajo **\_**
- Pero **nunca** con números o caracteres especiales.

Usa **<i>snake_case</i>** en:

- Nombre de archivos:

```js
mi_archivo_javascript.js;
```

Usa **<i>UPPER_CASE</i>** en:

- Constantes:

```js
const UNA_CONSTANTE = "Soy una constante",
  PI = 3.141592653589793;
```

Usa **<i>UpperCamelCase</i>** en:

- Clases:

```js
class SerHumano {
  constructor(nombre, genero) {
    this.nombre = nombre;
    this.genero = genero;
  }

  decirNombre() {
    return `Mi nombre es ${this.nombre}`;
  }
}
```

Usa **<i>lowerCamelCase</i>** en:

- Objetos:

```js
const unObjeto = {
  nombre: "Jonathan",
  email: "jonmircha@gmail.com",
};
```

- Primitivos:

```js
let unaCadena = "Hola Mundo",
  unNumero = 19,
  unBoolean = true;
```

- Funciones:

```js
function saludarA(nombre) {
  alert(`Hola mundo ${nombre}`);
}

saludarA("Jonathan");
```

- Instancias:

```js
const ajax = new XMLHttpRequest(),
  jon = new SerHumano("Jonathan", "Hombre");
```

##### Palabras reservadas

```js
A: abstract
B: boolean, break, byte
C: case, catch, char, class, const, continue
D: debugger, default, delete, do, double
E: else, enum, export, extends
F: false, final, finally, float, for, function
G: goto
I: if, implements, import, in, instanceof, int, interface
L: let, long
N: native, new, null
P: package, private, protected, public
R: return
S: short, static, super, switch, synchronized
T: this, throw, throws, transient, true, try, typeof
V: var, volatile, void
W: while, with
```

##### Ordenamiento de código

Dentro de tus _scripts_ de programación manten el siguiente orden:

1. **Importación de Módulos.**
1. **Declaración de Variables.**
1. **Declaración de Funciones.**
1. **Ejecución de Código.**

###### Ejemplo:

En el archivo `main.js`:

```js
// Importación de módulos: se importan las funciones de la calculadora
import { sumar, restar, multiplicar, dividir } from "./calculadora.js";

// Declaración de variables (por ejemplo, dos números a operar)
let num1 = 10;
let num2 = 5;

// Declaración de función adicional para mostrar resultados en consola
function mostrarResultados(a, b) {
  console.log(`Suma: ${sumar(a, b)}`);
  console.log(`Resta: ${restar(a, b)}`);
  console.log(`Multiplicación: ${multiplicar(a, b)}`);

  try {
    console.log(`División: ${dividir(a, b)}`);
  } catch (error) {
    console.error("Error en la división:", error.message);
  }
}

// Ejecución de código: se llama a la función para mostrar resultados
mostrarResultados(num1, num2);
```

En el archivo `calculadora.js`:

```js
// calculadora.js

// Declaración de funciones para operaciones básicas

/**
 * Suma dos números.
 * @param {number} a
 * @param {number} b
 * @returns {number} La suma de a y b.
 */
export function sumar(a, b) {
  return a + b;
}

/**
 * Resta el segundo número del primero.
 * @param {number} a
 * @param {number} b
 * @returns {number} La resta de a y b.
 */
export function restar(a, b) {
  return a - b;
}

/**
 * Multiplica dos números.
 * @param {number} a
 * @param {number} b
 * @returns {number} El producto de a y b.
 */
export function multiplicar(a, b) {
  return a * b;
}

/**
 * Divide el primer número entre el segundo.
 * @param {number} a
 * @param {number} b
 * @returns {number} El cociente de a y b.
 * @throws {Error} Si b es 0.
 */
export function dividir(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir entre cero");
  }
  return a / b;
}
```

##### Documentación de Código _JavaScript_

El formato de documentación utilizado en el archivo `calculadora.js` del ejemplo anterior se llama [_JSDoc_](https://jsdoc.app/).

Es un estándar en _JavaScript_ que permite documentar funciones, parámetros y valores de retorno mediante comentarios estructurados.

Esto facilita la generación automática de documentación y mejora la comprensión del código, lo cual es especialmente útil para que otros desarrolladores comprendan rápidamente el propósito y el comportamiento del código.

##### Importación y Exportación de Código

Como lo vimos en el ejemplo anterior en _JavaScript_ podemos exportar variables y funciones que vayamos a usar en otros archivos, simplemente hay que anteponer al nombre de las variables o funciones a exportar la palabra **`export`**;

```js
export let myVariable = "Esto es una variable que se exporta";

export function myFunction() {
  console.log("Esto es una función que se exporta");
}
```

Para usar las variables o funciones en otro archivo hay que usar la palabra **`import`** con la siguiente sintaxis:

```js
import { myVariable, myFunction } from "./ruta/del/archivo.js"`
```

Para que la importación funcione, es necesario que la invocación del _script_ de programación en el documento _HTML_ tenga el atributo **`type="module"`**.

```html
<script src="./js/main.js" type="module"></script>
```

[🔼 Regresar](#temas)

---

#### Variables y Tipos

##### Variables

Las variables se utilizan para almacenar información que puede ser usada posteriormente. _JavaScript_ utiliza tres palabras clave para declarar variables:

- **`var`**: Declaración antigua, con ámbito global o de función, ya no se usa, se considera una mala práctica.
- **`let`**: Declaración moderna para variables primitivas, con ámbito de bloque.
- **`const`**: Declaración moderna para:
  - Constantes primitivas (valores que no cambian)
  - Variables referenciadas que no cambiarán su tipo de dato como los objetos, arreglos, funciones o elementos del _DOM_.

###### Ejemplo:

```js
// Variables que pueden cambiar
let name = "Jon";
let age = 40;
let isHappy = true;
console.log(name, age, isHappy);

// Constantes (no cambian su valor)
const PI = 3.141592653589793;
const GRAVITY = 9.81;
console.log(PI, GRAVITY);

// Variables referenciadas, no cambiarán su tipo de dato
const colors = ["rojo", "verde", "azul"];
const contactInfo = {
  email: "jonmircha@gmail.com",
  phone: "5512345678",
};
console.log(colors, contactInfo);

// Interpolación de Variables
console.log(`Hola, mi nombre es ${name} y tengo ${age} años.`);
```

##### Tipos de Datos

_JavaScript_ es dinámico, lo que significa que puedes asignar cualquier tipo de dato a una variable.

###### 1. Primitivos:

- [`String`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String): Cadenas de texto.
- [`Number`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number): Números (enteros y decimales).
- [`Boolean`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Boolean): Verdadero (_`true`_) o falso (_`false`_).
- [`Null`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/null): Sin valor.
- [`Undefined`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/undefined): Variable declarada pero sin valor asignado.

###### 2. Referenciados:

- [`Array`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array): Listas de elementos.
- [`Object`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object): Conjuntos de pares clave-valor.

Ejemplo:

```js
// Cadenas de texto (string)
let fullName = "Jonathan Ulises Miranda Charles";
let alias = "jonmircha";
let email = `jonmircha@gmail.com`;
console.log(fullName, alias, email);

// Números (number)
let myAge = 40; // Entero
let myHeight = 1.71; // Decimal
console.log(myAge, myHeight);

// Booleanos (boolean)
let isTeacher = true;
let isStudent = false;
console.log(isTeacher, isStudent);

// No definidos (undefined)
let undefinedValue;
console.log(undefinedValue);

// Nulos (null)
let nullValue = null;
console.log(nullValue);

// Arreglos (arrays)
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);
console.log(numbers.length);
console.log(numbers[3]);

const hobbies = [
  "Estar con mi familia",
  "Caminar",
  "Hacer ejercicio",
  "Enseñar",
  "Programar",
  ["Anime", "Manga"],
];
console.log(hobbies);
console.log(hobbies.length);
console.log(hobbies[2]);
console.log(hobbies[5][0]);

// Objetos (object)
const myDaughter = { name: "Renata", age: 0.6 };
console.log(myDaughter);
console.log(myDaughter.name);
console.log(myDaughter.age);

const myContactInfo = {
  email: "jonmircha@gmail.com",
  phone: "5512345678",
  web: "https://jonmircha.com",
  socialAlias: "@jonmircha",
};
console.log(myContactInfo);
console.log(myContactInfo.email);
console.log(myContactInfo.phone);
console.log(myContactInfo["web"]);
console.log(myContactInfo["socialAlias"]);
```

[🔼 Regresar](#temas)

---

#### Operadores

Los operadores se usan para realizar cálculos o comparaciones y se clasifican en:

1. **Aritméticos:** `+`, `-`, `*`, `/`, `%`,`**`, `++`, `--`
2. **Asignación:** `=`, `+=`, `-=`, `*=`, `/?`, `%=`,`**=`
3. **Comparación:** `<`, `>`, `<=`, `>=`, `==`, `===`, `!=`
4. **Lógicos:** `&&`, `||`, `!`
5. **Ternario:** `(condition) ? true : false`

##### Aritméticos

```js
// Operadores Aritméticos

let a = 5;
let b = 10;

console.log(a + b); // Suma
console.log(a - b); // Resta
console.log(a * b); // Multiplicación
console.log(a / b); // División
console.log(a % b); // Módulo
console.log(a ** b); // Exponente

a++; // Incremento
console.log(a);

b--; // Decremento
console.log(b);
```

##### Asignación

```js
// Operadores de Asignacion

let c = 2; // Asignación de valor
console.log(c);

c += 2; // Suma con asignación
console.log(c);

c -= 2; // Resta con asignación
console.log(c);

c *= 2; // Multiplicación con asignación
console.log(c);

c /= 2; // División con asignación
console.log(c);

c %= 4; // Módulo con asignación
console.log(c);

c **= 2; // Exponente con asignación
console.log(c);
```

##### Comparación

```js
// Operadores de comparación

let d = 5;
let e = 10;

console.log(`${d} > ${e}`, d > e); // Mayor que
console.log(`${d} < ${e}`, d < e); // Menor que
console.log(`${d} >= ${e}`, d >= e); // Mayor o igual que
console.log(`${d} <= ${e}`, d <= e); // Menor o igual que
console.log(`${d} == ${e}`, d == e); // Igualdad por valor
console.log(`${d} === ${e}`, d === e); // Igualdad por identidad (por tipo y valor) o igualdad estricta
console.log(`${d} == ${d}`, d == d);
console.log(`${d} == "${d}"`, d == `${d}`);
console.log(`${d} === ${d}`, d === d);
console.log(`${d} === "${d}"`, d === `${d}`);
console.log(`${d} != ${e}`, d != e); // Desigualdad por valor
console.log(`${d} !== ${e}`, d !== e); // Desigualdad por identidad (por tipo y valor) o desigualdad estricta
console.log(`${d} != ${d}`, d != d);
console.log(`${d} != "${d}"`, d != `${d}`);
console.log(`${d} !== ${d}`, d !== d);
console.log(`${d} !== "${d}"`, d !== `${d}`);
```

##### _Truthy & Falsy Values_

En _JavaScript_ existen valores que al compararlos tienden a ser verdaderos (_truthy values_) y otros que tienden a ser falsos (_falsy values_). Aquí la lista de valores:

###### _Truthy Values_:

- Todos los numeros positivos y negativos menos el cero.
- Todas las cadenas de texto menos las vacías.
- El _boolean true_.

###### _Falsy Values_:

- 0 (cero)
- -0 (cero negativo)
- 0n (cero _BigInt_)
- _null_
- _undefined_
- _NaN_ (_Not a Number_)
- Cadenas de texto vacías.
- El _boolean false_.

```js
// Los siguientes valores retornan `false`
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(""));
console.log(Boolean(""));
console.log(Boolean(``));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));

// Los siguientes valores retornan `true`
console.log(Boolean(true));
console.log(Boolean(42));
console.log(Boolean(-42));
console.log(Boolean(3.14));
console.log(Boolean(-3.14));
console.log(Boolean(Infinity));
console.log(Boolean(-Infinity));
console.log(Boolean("0"));
console.log(Boolean(" "));
console.log(Boolean("Hola mundo"));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean(new Date()));
```

##### Lógicos

**Tabla de verdad operador _AND_:** Todas las condiciones deben ser verdaderas.

| condición a | condición b | a && b   |
| ----------- | ----------- | -------- |
| false       | false       | false ❌ |
| false       | true        | false ❌ |
| true        | false       | false ❌ |
| true        | true        | true ✅  |

**Tabla de verdad operador _OR_:** Al menos una de las condiciones debe ser verdadera.

| condición a | condición b | a \|\| b |
| ----------- | ----------- | -------- |
| false       | false       | false ❌ |
| false       | true        | true ✅  |
| true        | false       | true ✅  |
| true        | true        | true ✅  |

**Tabla de verdad Operador _NOT_:** Lo que es verdadero se vuelve falso y lo falso se vuelve verdadero.

| a     | !a       |
| ----- | -------- |
| false | true ✅  |
| true  | false ❌ |

```js
// Operadores lógicos

// and - &&
console.log("Operador and - &&");
console.log(`4 < 8 && 16 < 24`, 4 < 8 && 16 < 24);
console.log(`4 > 8 && 16 > 24`, 4 > 8 && 16 > 24);
console.log(`4 < 8 && 16 > 24`, 4 < 8 && 16 > 24);
console.log(`4 < 8 && 16 < 24 && 32 > 40`, 4 < 8 && 16 < 24 && 32 > 40);

// or - ||
console.log("Operador or - ||");
console.log(`4 > 8 || 16 > 24`, 4 > 8 || 16 > 24);
console.log(`4 < 8 || 16 < 24`, 4 < 8 || 16 < 24);
console.log(`4 < 8 || 16 > 24`, 4 < 8 || 16 > 24);
console.log(`4 > 8 || 16 > 24 || 32 < 40`, 4 > 8 || 16 > 24 || 32 < 40);

// and - && y or - || juntos
console.log("Operador and - && y or - || juntos");
console.log(`(4 > 8 && 16 > 24) || 32 < 40`, (4 > 8 && 16 > 24) || 32 < 40);
console.log(`4 > 8 && (16 > 24 || 32 < 40)`, 4 > 8 && (16 > 24 || 32 < 40));

// not - !
console.log("Operador not - !");
console.log(`!true`, !true);
console.log(`!false`, !false);
```

##### Operador Ternario:

Es un operador que evalúa una expresión condicional y devuelve un valor verdadero o falso. Su estructura es la siguiente:

**`condición ? expresiónVerdadera : expresiónFalsa;`**

```js
// Operador Ternario
// condición ? expresiónVerdadera : expresiónFalsa;

let f = 10;
let g = 11;
console.log(f % 2 ? `${f} es Par` : `${f} es Impar`);
console.log(g % 2 ? `${g} es Par` : `${g} es Impar`);
```

[🔼 Regresar](#temas)

---

#### Estructuras de Control

Las estructuras de control permiten decidir qué acciones realizar o repetir en función de condiciones específicas.

Existen de 3 tipos:

1. **Secuenciales**: Sucesión lineal de instrucciones, se ejecuta una detrás de la otra.
1. **Condicionales**: Dada una(s) condición(es), permiten ejecutar una acción de 2 o más posibles.
1. **Iterativas**: Dada una(s) condición(es), permiten repetir una acción un determinado número de veces.

##### Estructuras Secuenciales

Se ejecuta una instrucción detrás de la otra, justo como hemos programado hasta ahora.

```js
console.log("Hola 😀");
console.log("Instrucción 1");
console.log("Instrucción 2");
console.log("Instrucción 3");
console.log("Adios 👋🏻");
```

##### Estructuras Condicionales

Se utilizan para ejecutar bloques de código basados en una condición.

Usamos **`if`**, **`else if`**, y **`else`** para ejecutar bloques de código dependiendo de una condición. Y usamos **`switch case`** para evaluar más de un caso y seleccionar una opción entre varias.

###### `if - else`

```js
let userAge = 40;

// Cuando utilizamos >= o <=, se incluye de la condición el valor contra el que se compara
if (userAge >= 18) {
  console.log(`Tienes ${userAge} años, entonces eres mayor de edad`);
} else {
  console.log(`Tienes ${userAge} años, entonces eres menor de edad`);
}

if (userAge <= 17) {
  console.log(`Tienes ${userAge} años, entonces eres menor de edad`);
} else {
  console.log(`Tienes ${userAge} años, entonces eres mayor de edad`);
}

// Cuando utilizamos > o <, se excluye de la condición el valor contra el que se compara
if (userAge > 17) {
  console.log(`Tienes ${userAge} años, entonces eres mayor de edad`);
} else {
  console.log(`Tienes ${userAge} años, entonces eres menor de edad`);
}

if (userAge < 18) {
  console.log(`Tienes ${userAge} años, entonces eres menor de edad`);
} else {
  console.log(`Tienes ${userAge} años, entonces eres mayor de edad`);
}

// Versión operador ternario
const isAdult = userAge >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
console.log(isAdult);
```

###### `ifs anidados`

```js
/* 
  ifs anidados

  Si la edad del usuario esta entre:
    0-3 bebé
    4-10 infante
    11-17 adolescente
    18-30 joven
    31-59 adulto
    +60 adulto mayor
*/

if (userAge <= 3) {
  console.log("Bebé 👶🏻");
} else if (userAge >= 4 && userAge <= 10) {
  console.log("Infante 👧🏻👦🏻");
} else if (userAge >= 11 && userAge <= 17) {
  console.log("Adolescente 👩🏻‍🎤👨🏻‍🎤");
} else if (userAge >= 18 && userAge <= 30) {
  console.log("Jovén 👩🏻🧑🏻");
} else if (userAge >= 31 && userAge <= 59) {
  console.log("Adulto 👩🏻‍💼👨🏻‍💼");
} else {
  console.log("Adulto Mayor 🧓🏻👴🏻");
}
```

###### `switch - case`

```js
// switch - case

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
let day = new Date().getDay();
let dayName;

switch (day) {
  case 0:
    dayName = "Domingo";
    break;
  case 1:
    dayName = "Lunes";
    break;
  case 2:
    dayName = "Martes";
    break;
  case 3:
    dayName = "Miércoles";
    break;
  case 4:
    dayName = "Jueves";
    break;
  case 5:
    dayName = "Viernes";
    break;
  case 6:
    dayName = "Sábado";
    break;
  default:
    dayName = "El número de día es incorrecto";
    break;
}

console.log(`Hoy es ${dayName}`);
```

##### Estructuras Iterativas

Se utilizan para repetir la ejecución de bloques de código basados en una condición. También se les llaman estructuras repetitivas, ciclos, bucles o _loops_. Usamos:

- **`while`** y **`do while`**: Para condiciones indeterminadas.
- **`for`**, **`for of`** y **`for in`**: Para iteraciones conocidas.

###### `while y do while`

La diferencia entre los bucles _while_ y _do while_ es el momento en que se evalúa la condición:

- _while_, evalúa la condición antes de ejecutar el código.
- _do while_, ejecuta el código al menos una vez y luego evalúa la condición.

```js
// while
let h = 0;

while (h <= 5) {
  console.log(`Hola while ${h}`);
  h++;
}

// do while
h = 7;
do {
  console.log(`Hola do while ${h}`);
  h++;
} while (h <= 5);
```

###### `for`

El ciclo _for_ tiene 3 partes:

1. Inicialización de la variable que controla el ciclo.
1. Condición a evaluar.
1. Incremento o decremento de la variable que controla el ciclo.

```js
// for
for (let i = 0; i <= 5; i++) {
  console.log(`Hola for ${i}`);
}
```

###### `for of y for in`

Los ciclos _for of_ y _for in_ se utilizan para recorrer objetos, arreglos, cadenas de caracteres y otros tipos de estructuras de datos. La diferencia entre ambos es que _for of_ trabaja sobre elementos iterables como arreglos y cadenas de texto mientras que _for in_ lo hace sobre las propiedades de un objeto.

```js
// for of
let aString = "Hola Mundo";

for (let value of aString) {
  console.log(value);
}

const anArray = ["Uno", "Dos", "Tres", "Cuatro", "Cinco"];

for (let value of anArray) {
  console.log(value);
}

//for in
let aObject = {
  name: "Jon",
  age: 40,
  isTeacher: true,
};

for (let key in aObject) {
  let value = aObject[key];
  console.log(`Clave: ${key}, Valor: ${value}`);
}
```

[🔼 Regresar](#temas)

---

#### Funciones

Las funciones son bloques de código reutilizables que realizan una tarea específica. Puedes declarar funciones con la palabra clave `function`.

Pueden recibir o no parámetros. Los parámetros son los datos que puede necesitar la función para internamente ejecutar su código.

Las funciones pueden o no retornar un valor, eso dependerá del propósito de la función.

```js
// Definición
function sayHi() {
  console.log("Hola Mundo desde una función en JS");
  console.log("Bienvenidos al maravilloso mundo de la Programación Web");
  console.log("JavaScript es el lenguaje de la Web");
}

// Ejecución o Invocación
sayHi();

// Función que recibe parámetros y retorna un valor.
function add(a, b) {
  let c = a + b;
  return c;
}

// Al retornar el valor y no imprimirlo o guardarlo, este se pierde en la ejecución
add(2, 4);
console.log(add(2, 1));

// Almacenando el valor retornado en una variable
let result = add(3, 4);
console.log(result);

function calculateSpeed(d, t) {
  let v = d / t;
  return `La velocidad es ${v} m/s`;
}

console.log(calculateSpeed(100, 8));

// Función que inicializa un valor por defecto a sus parámetros
function sayHelloTo(name = "Desconocid@") {
  console.log(`Hola ${name}, ¿cómo estás?`);
}

sayHelloTo();
sayHelloTo("Jon");
sayHelloTo("Irma");
```

##### _Arrow Functions_

Una expresión de función flecha (_arrow function_) es una alternativa compacta a una expresión de función tradicional.

Su sintaxis simplifica y vuelve más expresiva la escritura de las funciones, sin embargo son limitadas y no se pueden utilizar en todas las situaciones. Para más información consulta la documentación de las _arrow functions_ en [_MDN Web Docs_](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

Veamos como quedarían algunas de las funciones anteriores en formato de _arrow function_:

```js
// Función flecha sin parámetros
const sayHiWithArrow = () => {
  console.log("Hola Mundo desde una función flecha en JS");
  console.log("Bienvenidos al maravilloso mundo de la Programación Web");
  console.log("JavaScript es el lenguaje de la Web");
};

sayHiWithArrow();

// Función flecha con parámetros
const addWithArrow = (a, b) => {
  let c = a + b;
  return c;
};

console.log(addWithArrow(2, 1));

// Funciones flecha con return implícito
const substract = (a, b) => a - b;
console.log(substract(8, 4));

const multiply = (a, b) => a * b;
console.log(multiply(8, 4));
```

[🔼 Regresar](#temas)

---

#### Temporizadores

Los temporizadores permiten ejecutar funciones después de un cierto tiempo o repetidamente cada determinado intervalo detiempo. En _JavaScript_, se utilizan [`setTimeout`](https://developer.mozilla.org/es/docs/Web/API/setTimeout) y [`setInterval`](https://developer.mozilla.org/es/docs/Web/API/setInterval) respectivamente para estos propósitos.

**`setTimeout`**

Ejecuta una función después de un tiempo determinado (en milisegundos).

```js
setTimeout(function () {
  console.log("Esto se ejecuta después de 3 segundos");
  console.log("Sólo una vez");
}, 3000);
```

**`setInterval`**

Ejecuta una función repetidamente con un intervalo de tiempo especificado.

```js
setInterval(function () {
  console.log(`${new Date().toLocaleString()}`);
}, 1000);
```

[🔼 Regresar](#temas)

---
