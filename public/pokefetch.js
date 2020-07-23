// const { showResults } = require("./showResults");
import { showResults } from "./showResults.js";

export const pokeFetch = function (value) {
  // This is called
  // showResults(value);
  return fetch(`/search/${value}`)
    .then((response) => {
      /* TODO: create /search endpoint which fetches our text file, and compares it to our query
      which is given by our endpoint which is created by input.value */
      return response.text();
    })
    .then((data) => {
      showResults(data);
      // showResults(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
// module.exports = {
//   pokeFetch,
// };
