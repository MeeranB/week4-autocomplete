const fs = require("fs");

function searchHandler(request, response) {
  const query = request.url.split("/")[2]
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(__dirname + "/../../data/pokedex.txt", function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "index/html" });
      response.end("<h1>Server Error</h1>");
    } else {
      const searchList = file.toString();
      response.end(searchPokedex(searchList, query));
    }
  });
}

function searchPokedex(input, query) {
  const splitInput = input.split("\n");
  const output = splitInput.filter((word) => {
    //if case insensitive query matches current search list index, return true
    if (!query) return false
    const testQuery = query.toLowerCase();
    const testWord = word.toLowerCase();
    return testWord.startsWith(testQuery)
  });
  return output.join("\n");
}

module.exports = searchHandler;