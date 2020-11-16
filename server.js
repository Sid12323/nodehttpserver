const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

function fileread(filename)
{            
   var contents= fs.readFileSync(filename);
   return contents;
}        
var fs = require("fs");  // file system        
var data = fileread("index.html");
data = data + "<script>console.log(\"Webserver Code Written in NodeJS by Sciencesid\");console.log(\"Code for server: https://github.com/Sid12323/nodehttpserver\");</script>"

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(data);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("Written by Sciencesid \nWebserver in Node.js\n\n Code: https://github.com/Sid12323/nodehttpserver");
});
