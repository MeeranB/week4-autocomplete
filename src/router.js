var http = require('http');
var fs = require('fs');

function router(request, response) {
  const endpoint = request.url;
  if (endpoint === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/../public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else {
    console.log(endpoint);
    const extension = endpoint.split(".")[1]
    const headers = {
        "html": "text/html",
        "css": "text/css",
        "js":"application/javascript",
        "ico": "image/x-icon",
        "jpg": "image/jpeg",
        "png": "image/png",
        "txt": "text/plain"
    }
    response.writeHead(200, {"Content-Type": headers[extension]})
    fs.readFile(__dirname + `/../public${endpoint}`, function(error, file) {
        if (error) {
            console.log(error);
            return;
        }
        response.end(file);
    })
  }
}

module.exports = router;