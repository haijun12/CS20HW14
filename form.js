var http = require("http");
var fs = require('fs');
var qs = require('querystring');

const PORT = 8080;

http.createServer(function(req, res)
{
    if (req.url == "/process"){
        res.writeHeader(200, {"Content-Type" : "text/html"});
        res.write("Got here");
        res.end();
    }
    
}).listen(PORT);