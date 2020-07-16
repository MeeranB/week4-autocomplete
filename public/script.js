// const { pokeFetch } = require("./pokefetch");
import { pokeFetch } from "./pokefetch.js";

const pokeinput = document.getElementById("poke-input");
pokeinput.addEventListener("keyup", () => pokeFetch(pokeinput.value));
