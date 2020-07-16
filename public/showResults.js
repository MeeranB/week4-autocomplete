export const showResults = function (searchOutput) {
  console.log(searchOutput);
  const results = document.getElementById("output");
  if (searchOutput.length == 0) {
    results.innerText = "No Results Found";
  } else {
    results.innerHTML = searchOutput;
  }
};

// module.exports = { showResults };
