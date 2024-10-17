async function obtenerDatosDelJSON() {
  try {
    let res = await fetch("data.json");

    if (!res.ok) {
      throw "Error al acceder al archivo JSON";
    }

    let json = await res.json();

    console.log(res, json);

    const $peliculas = document.querySelector("#peliculas");

    let html = "";

    json.peliculas.forEach((el) => {
      html += `
        <article>
          <img src="${el.poster}" alt="${el.nombre}" />
          <h4>${el.nombre}</h4> 
          <h5>${el.estreno}</h5> 
        </article>
      `;
    });

    $peliculas.innerHTML = html;
  } catch (error) {
    console.warn(error);
  }
}

async function obtenerDatosDeAPI() {
  try {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let res = await fetch(url);

    if (!res.ok) {
      throw "Error al acceder a la API";
    }

    let json = await res.json();

    console.log(res, json);

    const $posts = document.querySelector("#posts");

    let html = "";

    json.forEach((el) => {
      html += `
        <article>
          <h3>${el.title}</h3>
          <p>${el.body}</p> 
          <h5>ID: ${el.id} - User: ${el.userId}</h5> 
        </article>
      `;
    });

    $posts.innerHTML = html;
  } catch (error) {
    console.warn(error);
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  obtenerDatosDelJSON();
  obtenerDatosDeAPI();
});
