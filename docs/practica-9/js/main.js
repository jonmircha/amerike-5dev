async function obtenerDatosDeGitHub() {
  let apiURL = "https://api.github.com/users/jonmircha";
  let response = await fetch(apiURL);
  let data = await response.json();
  console.log(response, data);

  const $sectionGitHub = document.querySelector("#github");

  let content = `
    <h4>${data.name}</h4>
    <h5>${data.location}</h5>
    <p>${data.bio}</p>
    <img alt="${data.name}" src="${data.avatar_url}">
  `;

  $sectionGitHub.innerHTML = content;
}

async function obtenerDatosPeliculas() {
  let apiURL = "./js/data.json";
  let response = await fetch(apiURL);
  let data = await response.json();
  console.log(response, data);

  const $sectionMovies = document.querySelector("#movies");

  let content = "";

  data.peliculas.forEach(function (el) {
    content += `
      <article>
        <h4>${el.nombre}</h4>
        <h5>${el.estreno}</h5>
        <img alt="${el.nombre}" src="${el.poster}" /> 
      </article>
    `;
  });

  $sectionMovies.innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function (e) {
  console.log(e);
  obtenerDatosDeGitHub();
  obtenerDatosPeliculas();
});
