const { pokeFetch } = require("./pokefetch");

const pokeinput = document.getElementById("poke-input");
console.log(pokeinput);
pokeinput.addEventListener("keyup", () => {
  console.log(pokeinput.value);
  pokeFetch(pokeinput.value);
});
