# Manipulación del DOM

En esta sesión, aprenderás a interactuar con el DOM (Document Object Model) utilizando JavaScript. Esto te permitirá seleccionar elementos, modificar su contenido, manejar eventos y trabajar dinámicamente con el contenido de la página.

---

## ¿Qué es el DOM y cómo interactuar con él?

El DOM es una representación estructurada de un documento HTML o XML que permite a los lenguajes de programación, como JavaScript, interactuar y manipular los elementos de una página web.

### Conceptos clave:

- **Nodo:** Cada elemento, atributo o texto dentro del DOM es un nodo.
- **Árbol DOM:** La estructura jerárquica que organiza todos los nodos de una página.

JavaScript puede acceder y manipular el DOM usando el objeto `document`.

---

## Métodos de Selección

### `getElementById`

Selecciona un elemento por su atributo `id`.

```javascript
const titulo = document.getElementById("mi-titulo");
console.log(titulo.textContent);
```

### `querySelector`

Selecciona el primer elemento que coincide con un selector CSS.

```javascript
const parrafo = document.querySelector(".mi-clase");
console.log(parrafo.textContent);
```

### `querySelectorAll`

Selecciona todos los elementos que coinciden con un selector CSS y devuelve una NodeList.

```javascript
const items = document.querySelectorAll("li");
items.forEach((item) => console.log(item.textContent));
```

---

## Modificación de Contenido

### `innerHTML`

Permite modificar el contenido HTML de un elemento.

```javascript
document.getElementById("contenedor").innerHTML = "<p>Nuevo contenido</p>";
```

### `textContent`

Modifica o obtiene el texto dentro de un elemento.

```javascript
document.querySelector("h1").textContent = "Título actualizado";
```

---

## Aplicación de Estilos CSS Dinámicos

Puedes modificar los estilos de los elementos directamente desde JavaScript usando la propiedad `style` o manipulando clases.

### Modificar Estilos con `style`

```javascript
const elemento = document.querySelector("div");
elemento.style.color = "blue";
elemento.style.fontSize = "20px";
```

### Modificar Estilos con Clases

```javascript
const elemento = document.querySelector("div");
elemento.classList.add("nueva-clase");
```

---

## Manipulación de Atributos y Clases

### Atributos

Puedes leer, modificar o eliminar atributos.

```javascript
const enlace = document.querySelector("a");
console.log(enlace.getAttribute("href"));
enlace.setAttribute("href", "https://ejemplo.com");
enlace.removeAttribute("target");
```

### Data-Atributos

Son atributos personalizados que comienzan con `data-`.

```javascript
const elemento = document.querySelector("[data-id]");
console.log(elemento.dataset.id);
elemento.dataset.id = "nuevo-valor";
```

### Clases

Agregar, eliminar o comprobar clases de un elemento.

```javascript
const div = document.querySelector(".mi-div");
div.classList.add("nueva-clase");
div.classList.remove("mi-clase");
console.log(div.classList.contains("otra-clase"));
```

---

## Recorrido del DOM

Puedes navegar entre nodos relacionados usando propiedades como:

### Métodos de Nodos

- **`parentNode`:** Nodo padre.
- **`childNodes`:** Lista de nodos hijos.
- **`firstChild` y `lastChild`:** Primer y último nodo hijo.
- **`nextSibling` y `previousSibling`:** Hermanos del nodo.

### Métodos de Elementos

- **`parentElement`:** Devuelve el elemento padre del nodo actual.
- **`children`:** Colección de los hijos que son elementos.
- **`firstElementChild` y `lastElementChild`:** Primer y último hijo que son elementos.
- **`previousElementSibling` y `nextElementSibling`:** Hermanos del nodo que son elementos.

### Método `closest`

Busca el ancestro más cercano que coincida con un selector dado.

```javascript
const elemento = document.querySelector(".mi-clase");
const ancestro = elemento.closest("div");
console.log(ancestro);
```

Ejemplo:

```javascript
const lista = document.querySelector("ul");
console.log(lista.parentElement);
console.log(lista.firstElementChild);
console.log(lista.lastElementChild);
```

---

## Inserción al DOM

### Métodos de Inserción

- **`prepend`:** Inserta contenido al inicio de un elemento.
- **`append`:** Inserta contenido al final de un elemento.
- **`before`:** Inserta contenido antes de un elemento.
- **`after`:** Inserta contenido después de un elemento.
- **`createElement`:** Crea un nuevo elemento.
- **`appendChild`:** Agrega un elemento hijo al final de un elemento.

Ejemplo:

```javascript
const contenedor = document.getElementById("contenedor");
const nuevoElemento = document.createElement("p");
nuevoElemento.textContent = "Nuevo párrafo";
contenedor.appendChild(nuevoElemento);
contenedor.append("Contenido final");
contenedor.prepend("Contenido inicial");
contenedor.after("Contenido después");
contenedor.before("Contenido antes");
```

---

## Manejo de Eventos

### `addEventListener`

Asocia un evento a un elemento.

```javascript
const boton = document.querySelector("button");
boton.addEventListener("click", () => {
  alert("Botón clickeado");
});
```

### Delegación de Eventos

Permite manejar eventos de elementos dinámicos usando un contenedor común.

```javascript
const lista = document.querySelector("ul");
lista.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    alert(`Item clickeado: ${event.target.textContent}`);
  }
});
```

---
