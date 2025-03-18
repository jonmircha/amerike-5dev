# Manipulación del DOM

## Desarrollo _Frontend_

### Manipulación del _DOM_

En esta sección, aprenderás a interactuar con el _DOM_ (_Document Object Model_).

#### ¿Qué es el DOM?

El Modelo de Objetos del Documento es un _API JavaScript_ para manipular documentos _HTML_ y _XML_.

Proveé una representación estructural del documento, permitiendo modificar su contenido, presentación visual e interactividad mediante el control de eventos.

El _DOM_ no es parte de la especificación de _JavaScript_, es una _API_ para los navegadores.

Puedes revisar la documentación completa del _DOM_ en el sitio [_MDN Web Docs_](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model).

##### Conceptos clave:

- **Nodo:** Cada elemento, atributo o texto dentro del DOM es un nodo.
- **Árbol _DOM_:** La estructura jerárquica que organiza todos los nodos de una página.

El _DOM_ tiene 3 objetos importantes:

1. **`window`**: hace referencia a toda la ventana del navegador.
1. **`document`**: hace refencia a la estructura del documento _HTML_.
1. **`navigator`**: hace referencia a la información que se puede obtener del navegador del usuario, por ejemplo: geolocalización, estado de conexión, tipo de navegador, sistema operativo, etc.

```js
console.log(window);
console.log(document);
console.log(navigator);
```

_JavaScript_ puede acceder y manipular el _DOM_ usando el objeto `document`:

```js
console.log(document);
console.log(document.head);
console.log(document.body);
console.log(document.documentElement);
console.log(document.doctype);
console.log(document.charset);
console.log(document.title);
console.log(document.links);
console.log(document.images);
console.log(document.forms);
console.log(document.styleSheets);
console.log(document.scripts);
```

[🔼 Regresar](#temas)

---

#### Seleccionando Elementos

##### `querySelector`

Selecciona el primer elemento que coincide con el selector _CSS_ dado.

```js
const $firstParagraph = document.querySelector("p");
const $firstPaleGreenItem = document.querySelector(".bg-palegreen ");
const $idTitle = document.querySelector("#title");

console.log($firstParagraph);
console.log($firstPaleGreenItem);
console.log($idTitle);
```

##### `querySelectorAll`

Selecciona todos los elementos que coinciden con el selector _CSS_ dado y devuelve una _NodeList_.

```javascript
const $paragraphs = document.querySelectorAll("p");
const $paleGreenItems = document.querySelectorAll(".bg-palegreen ");

console.log($paragraphs);
console.log($paragraphs.length);
console.log($paragraphs[3]);
console.log($paleGreenItems.length);
console.log($paleGreenItems[0]);
```

> **Nota:** Es una buena práctica, que todas las variables que declares para almacenar elementos del _DOM_ comiencen con el símbolo de **$**, con esto las puedes diferenciar de las variables normales del flujo de la programación.

[🔼 Regresar](#temas)

---

#### Modificando Contenido y Atributos

##### Modificando Contenido

- **`textContent`**: Permite obtener y modificar el texto dentro de un elemento.
- **`innerHTML`**: Permite obtener y modificar el contenido _HTML_ de un elemento.

```js
const $linkDOM = document.querySelector("#link-dom");

//Obtener el valor actual
console.log($linkDOM.textContent);
console.log($linkDOM.innerHTML);

//Establecer un nuevo valor
$linkDOM.textContent = "Acceso a la documentación del DOM en MDN";
$linkDOM.innerHTML = "Acceso a la documentación del <i>DOM</i> en <i>MDN</i>";
```

##### Modificando Atributos

Puedes leer, modificar, eliminar o validar la existencia de atributos en los elementos _HTML_, mediante los siguientes métodos:

- **`hasAttribute`**: Valida que el atributo exista.
- **`getAttribute`**: Obtiene el valor actual del atributo.
- **`setAttribute`**: Establece un nuevo valor al atributo.
- **`removeAttribute`**: Elimina el atributo del elemento.

```js
// Valida que el atributo exista
console.log($linkDOM.hasAttribute("target"));
console.log($linkDOM.hasAttribute("href"));

// Obtener el valor actual del atributo
console.log($linkDOM.getAttribute("href"));

// Elimina el atributo del elemento
$linkDOM.removeAttribute("download");

let urlDoc =
  "https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model";

// Establecer un nuevo valor al atributo
$linkDOM.setAttribute("href", urlDoc);
$linkDOM.setAttribute("target", "_blank");
```

[🔼 Regresar](#temas)

---

#### Modificando Estilos

Puedes modificar los estilos de los elementos directamente desde _JavaScript_ usando la propiedad `style` o manipulando sus clases.

##### Modificando la propiedad `style`

```js
// Modificamos los estilos de un elemento mediante la propiedad style
const $subtitleCSS = document.querySelector("#subtitle-css");

// Cualquiera de las 2 opciones son válidas:
//    1) usar el método setProperty o
//    2) acceder a la propiedad directa
$subtitleCSS.style.setProperty("color", "red");
$subtitleCSS.style.color = "red";
$subtitleCSS.style.setProperty("background-color", "black");
$subtitleCSS.style.backgroundColor = "black";

$subtitleCSS.style.padding = "1rem";
$subtitleCSS.style.borderRadius = "0.5rem";
$subtitleCSS.style.textAlign = "center";
$subtitleCSS.style.fontSize = "2rem";

// Para modificar los estilos de varios elementos a la vez, nos ayudamos del método forEach
const $thumbnails = document.querySelectorAll(".thumbnail");

$thumbnails.forEach((el) => {
  el.style.borderRadius = "50%";
  el.style.filter = "grayscale(1)";
  el.style.transform = "rotate(45deg)";
});
```

##### Modificando clases _CSS_

Puedes leer, modificar, eliminar, validar, intercambiar o reemplazar las clases _CSS_ de los elementos _HTML_.

- **`className`**: Permite acceder a las clases de un elemento, en formato de cadena de texto.
- **`classList`**: Permite acceder a las clases de un elemento en formato de lista. Contiene varios métodos que nos permiten manipular las clases de un elemento:
  - **`contains`**: Permite verificar si un elemento tiene una clase en específico.
  - **`add`**: Permite añadir una clase al elemento.
  - **`remove`**: Permite eliminar una clase al elemento.
  - **`toggle`**: Permite añadir o eliminar una clase al elemento, dependiendo de si la clase ya existe o no en el elemento.
  - **`replace`**: Permite reemplazar una clase del elemento por otra.

```js
// Accediendo a las clases de un elemento
const $p5 = document.querySelector("#p5");

// La propiedad className nos permite acceder a las clases de un elemento, en formato de cadena de texto
console.log($p5.className);

// La propiedad classList nos permite acceder a las clases de un elemento en formato de lista
console.log($p5.classList);

// La propiedad classList contiene varios métodos que nos permiten manipular las clases de un elemento

// El método contains nos permite verificar si un elemento tiene una clase en específico
console.log($p5.classList.contains("bg-palegreen"));
console.log($p5.classList.contains("bg-skyblue"));

// El método add nos permite añadir una clase al elemento
$p5.classList.add("text-black");

// El método remove nos permite eliminar una clase al elemento
$p5.classList.remove("text-black");

// El método toggle nos permite añadir o eliminar una clase al elemento, dependiendo de si la clase ya existe o no en el elemento
$p5.classList.toggle("text-black");

// El método replace nos permite reemplazar una clase del elemento por otra
$p5.classList.replace("bg-palegreen", "bg-skyblue");
```

[🔼 Regresar](#temas)

---

#### Recorriendo el _DOM_

El _**DOM Traversing**_ es el proceso de recorrer o navegar a través del _**DOM**_ para acceder, modificar o manipular elementos dentro de un documento _HTML_ utilizando _JavaScript_.

Cuando manipulamos el _DOM_, a menudo necesitamos encontrar elementos relacionados entre sí, como padres, hijos o hermanos. _DOM Traversing_ nos proporciona métodos para desplazarnos por estos elementos sin necesidad de realizar nuevas consultas con `document.querySelector` o `document.querySelectorAll`.

Aquí algunos métodos clave para recorrer el _DOM_:

- **`parentElement`**: Devuelve el elemento padre del nodo actual.
- **`children`**: Devuelve la colección de los hijos del nodo actual.
- **`firstElementChild`**: Primer hijo del nodo actual.
- **`lastElementChild`**: Último hijo del nodo actual.
- **`previousElementSibling`**: Hermano previo al nodo actual.
- **`nextElementSibling`**: Hermano siguiente del nodo actual.

##### Ejemplo:

```js
const $list = document.querySelector("#list");

console.log($list.parentElement);
console.log($list.children);
console.log($list.children[1]);
console.log($list.children[1].textContent);
console.log($list.firstElementChild);
console.log($list.lastElementChild);
console.log($list.previousElementSibling);
console.log($list.nextElementSibling);
```

[🔼 Regresar](#temas)

---

#### Insertando en el _DOM_

La inserción al _DOM_ es el proceso mediante el cual se crean y agregan nuevos elementos al documento _HTML_ utilizando _JavaScript_. Para ello, se emplean diferentes métodos que permiten agregar elementos en distintas posiciones dentro del documento.

Aquí algunos métodos clave para la inserción al _DOM_:

- **`createElement`**: Crea un nuevo elemento _HTML_ del tipo indicado pero no lo inserte en el _DOM_.
- **`before`**: Insertar el elemento antes del nodo de referencia.
- **`after`**: Insertar el elemento después del nodo de referencia.
- **`prepend`**: Inserta el elemento al principio dentro del nodo de referencia.
- **`append`**: Inserta el elemento al final dentro del nodo de referencia.
- **`remove`**: Elimina un el elemento del _DOM_.

```js
const $insertDOM = document.querySelector("#dom-insert");

// Crea un nuevo elemento HTML del tipo indicado pero no lo inserte en el DOM
const $languagesList = document.createElement("ol");
$languagesList.setAttribute("id", "languages");

// Insertar el elemento antes del nodo de referencia
$insertDOM.before($languagesList);
// Insertar el elemento después del nodo de referencia
$insertDOM.after($languagesList);
// Inserta el elemento al principio dentro del nodo de referencia
$insertDOM.prepend($languagesList);
// Inserta el elemento al final dentro del nodo de referencia
$insertDOM.append($languagesList);

const languages = ["JavaScript", "HTML", "CSS", "PHP", "Python", "JAVA"];

languages.forEach((el) => {
  const $item = document.createElement("li");
  $item.textContent = el;
  $languagesList.append($item);
});

// Elimina un elemento del DOM
$languagesList.lastElementChild.remove();
```

[🔼 Regresar](#temas)

---

#### Manejo de Eventos

Los eventos son los mecanismos que tiene _JavaScript_ para controlar las acciones del usuario y definir el comportamiento del documento en cierto momento o cuando se cumplan ciertas condiciones.

Lista de todos los eventos existentes en _JavaScript_ en [_MDN Web Docs_](https://developer.mozilla.org/es/docs/Web/Events).

Las funciones que se ejecutan en un evento se llaman _**Event Handler**_ o manejador del evento y sólo puede recibir como parámetro el propio evento, del cuál podemos obtener mucha información del mismo como por ejemplo el objeto que lo origino.

##### Asignación de Eventos

Para registrar un evento a un elemento se usa el método **`addEventListener`**:

```javascript
const $btnPushMe = document.querySelector("#push-me");

$btnPushMe.addEventListener("click", function (e) {
  alert("¡Has pulsado el botón!");
  // El objeto event (e) contiene información sobre el evento que se ha producido
  console.log(e);
  // La propiedad type nos indica el tipo de evento que se ha producido
  console.log(e.type);
  // La propiedad target nos indica el elemento que ha disparado el evento
  console.log(e.target);

  e.target.textContent = "Me has presionado 👊🏻😎";

  setTimeout(() => {
    e.target.textContent = "Púlsame 🤗";
  }, 3000);
});

const $ball = document.querySelector("#ball");
let x = 0;
let y = 0;
let speed = 10;

document.addEventListener("keydown", (e) => {
  console.log(e);
  console.log(e.type);
  // La propiedad key nos indica la tecla que se ha pulsado
  console.log(e.key);
  // La propiedad code nos indica el código de la tecla que se ha pulsado
  console.log(e.code);

  // Previene la acción por defecto del evento
  e.preventDefault();

  switch (e.key) {
    case "ArrowUp":
      y -= speed;
      break;
    case "ArrowDown":
      y += speed;
      break;
    case "ArrowLeft":
      x -= speed;
      break;
    case "ArrowRight":
      x += speed;
      break;
  }

  // La función requestAnimationFrame nos permite ejecutar una función antes de que se realice el repintado de la pantalla
  requestAnimationFrame(() => {
    $ball.style.transform = `translate(${x}px, ${y}px)`;
  });
});
```

##### Delegación de Eventos

La **delegación de eventos** es una técnica en _JavaScript_ que permite manejar eventos de múltiples elementos **usando un solo _event listener_** en un **elemento padre**.

En lugar de asignar eventos a cada elemento individualmente, el evento se escucha en el padre y se propaga hasta el objetivo específico.

Este enfoque es eficiente cuando trabajamos con elementos dinámicos, ya que no es necesario adjuntar eventos a cada nuevo elemento que se agregue al _DOM_.

Algunas ventajas de la delegación son:

- **Mejora el rendimiento**: Reduce el número de _event listeners_, lo que optimiza el uso de memoria.
- **Facilita la manipulación de elementos dinámicos**: Permite manejar eventos en elementos que aún no existen en el _DOM_ en el momento de la carga del documento.
- **Código más limpio y organizado**: Evita la necesidad de asignar eventos a cada elemento individualmente.

###### Ejemplo:

Supongamos que tenemos una lista de elementos y queremos manejar el _click_ en cada `<li>`. En lugar de asignar un evento a cada `<li>`, lo asignamos al `<ul>` o incluso al mismo `document` y usamos la delegación de eventos:

```js
// Delegación de eventos
// El evento se delega al document y no a cada una de las etiquetas li del id another-list
document.addEventListener("click", (e) => {
  // Sólo cuando el elemento coincida con el selector indicado, se ejecutará el código
  if (e.target.matches("#color-list li")) {
    console.log(e.target);
    console.log(e.target.textContent);
    document.body.style.backgroundColor = e.target.textContent;
  }

  // En cualquier otro caso, no se ejecutará el evento
  return false;
});
```

[🔼 Regresar](#temas)

---
