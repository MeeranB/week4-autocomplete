const http = require("http");
const router = require("./router");

const server = http.createServer()

server.listen(3000, () => console.log("Server is listening on port 3000, ready to accept requests"));