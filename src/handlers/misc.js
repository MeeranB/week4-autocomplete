const fs = require("fs");

function miscHandler(request, response) {
  const endpoint = request.url;
  console.log(endpoint);

  const extension = endpoint.split(".")[1];
  const headers = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png",
    txt: "text/plain",
  };
  response.writeHead(200, { "Content-Type": headers[extension] });
  fs.readFile(__dirname + `/../../public${endpoint}`, function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "index/html" });
      response.end("<h1>Server Error</h1>");
    }
    response.end(file);
  });
}

module.exports = miscHandler;
