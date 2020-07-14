const { pokeFetch } = require("./pokefetch");

//Onkeyup when focussed on search input field, send a get request to an endpoint
document.onreadystatechange = function () {
  const pokeinput = document.getElementById("poke-input");
  pokeinput.addEventListener("keyup", () => {
    pokeFetch(pokeinput.value);
  });
};
