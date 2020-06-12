const http = require("http");
console.log("http://localhost:8000/");
http.createServer((request, response) => {
    response.end("Hell Word\n");
}).listen(8000);
