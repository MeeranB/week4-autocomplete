console.log("test");

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    fetch("../data/pokedex.txt")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        searchPokedex(data);
        //raw text file is logged here
      });
  }
};

function searchPokedex(input, query = "A") {
  //Returns filtered list for a specific query
  const splitInput = input.split("\n");
  const output = splitInput.filter((word) => {
    return word.startsWith(query);
  });
  console.log(output.join("\n"));
}

// const input = document.getElementById('input')

// input.addEventListener('keyup', function(event) {
//     searchPokedex(event.target.in)
// })
