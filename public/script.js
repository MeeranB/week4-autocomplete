function pokedexFetch() {
  fetch("../data/pokedex.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      searchPokedex(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function searchPokedex(input) {
  const query = document.getElementById("input").value;
  const splitInput = input.split("\n");
  const output = splitInput.filter((word) => {
    //if case insensitive query matches current search list index, return true
    if (!query) return false
    const testQuery = query.toLowerCase();
    const testWord = word.toLowerCase();
    return testWord.startsWith(testQuery)
  });
  showResults(output.join("\n"));
}

function showResults(searchOutput) {
  const results = document.getElementById("output");
  //console.log(searchOutput.length);
  if (searchOutput.length == 0) {
    results.innerText = "No Results Found";
  } else {
    results.innerHTML = searchOutput;
  }
}