const fs = require("fs");

function textHandler(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  fs.readFile(__dirname + `/../../data/pokedex.txt`, function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "index/html" });
      response.end("<h1>Server Error</h1>");
      return;
    }
    response.end(file);
  });
}

module.exports = textHandler;
