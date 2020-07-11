//Onkeyup when focussed on search input field, send a get request to an endpoint
const searchField = document.getElementById(input);
input.addEventListener("keyup", () => {
  fetch(`/search/${input.value}`)
    .then((response) => {
      /* TODO: create /search endpoint which fetches our text file, and compares it to our query
      which is given by our endpoint which is created by input.value */
      return response.text();
    })
    .then((data) => {
      showResults(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function showResults(searchOutput) {
  const results = document.getElementById("output");
  if (searchOutput.length == 0) {
    results.innerText = "No Results Found";
  } else {
    results.innerHTML = searchOutput;
  }
}
