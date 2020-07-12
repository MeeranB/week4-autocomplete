const homeHandler = require("./handlers/home");
const miscHandler = require("./handlers/misc");
const searchHandler = require("./handlers/search");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.startsWith("/search")) {
    searchHandler(request, response);
  } else {
    miscHandler(request, response);
  }
}

module.exports = router;
