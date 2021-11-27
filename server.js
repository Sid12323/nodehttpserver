'use strict';
//default dependencies (import)
const http = require('http');
const fs = require("fs");
const url = require("url");
const path = require('path');
//server init vars
var hostname = '0.0.0.0'
var port = '8080'
var current_err = "";
//var path = ""; //
var pathname = "/";
var statc = 200;
//misc vars
var contentss = "";
var loadTime,a;

//mime
var dir = path.join(__dirname, 'public');
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    ico: 'image/x-icon'
};

//cli args interpreter
const cliArgs = process.argv.slice(2);
if (cliArgs[0] != null) {hostname = cliArgs[0];} //hostname set
if (cliArgs[1] != null) {port = cliArgs[1];} //port set

//functionz
function startloadingtimer() {
  var b = Date.now();
  a = b;
}

startloadingtimer();

function stoploadingtimer() {
  var e = Date.now();
  var c = e-a;
  loadTime = c;
}

function fileread(filename) {
  contentss = "<h1>abc errors are free | Internal Server Error (500)</h1>";
  statc = 500; // in case of a null file or fileread failure
  console.log(filename)
   if (filename.substr(filename.length - 1)=="/") {filename = "." + filename + "index.html";} else if (filename.substr(1,1) != "/") {filename = "./" + filename} else {filename = "." + filename;}
   if ((filename.substr(1,1) == "/") && (filename.substr(2,1) == "/")) {filename = filename.replace('//','/');}
      try { //error handling
        var contents = fs.readFileSync(filename, 'utf8');
      } catch (err) { //file missing or forbidden
      contentss = "<h1>404 Not Found</h1>";
      contents = contentss;
      console.log("Error: "+err); //error reporter
      statc = 404; //status code
    }
    contentss = contents;
    if (contentss != null && statc != 404) { statc = 200 };
    console.log(filename);
  return contentss;
}

const server = http.createServer((req, res) => { //server loop
    startloadingtimer();
    pathname = url.parse(req.url).pathname; //path for retreival
    statc = 200; //default stat code
    res.setHeader('Content-Type', 'text/html'); //html header
    fileread(pathname); //init file reading (sync for large files)
    var data = contentss; //set file to data to be sent
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null; //ip for logging
    res.statusCode = statc; //final stat code
    var reqpath = req.url.toString().split('?')[0];
    if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Method not implemented');
    }
    var file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/html';
    res.setHeader('Content-Type', type);
    if (type == "text\html") { data = data + "\n\n<script>\nconsole.log(\"Webserver Code Written in NodeJS by Sciencesid\");\nconsole.log(\"Code for server: https://github.com/Sid12323/nodehttpserver\");\n</script>"; }// ;) ;) subscrib to my yt;}
    res.end(data); //post for get response
    stoploadingtimer();
    var time = new Date(); //time for logging
    console.log("Connection from "+ip+"@"+port+" ("+statc+") for "+pathname+" at "+time+" in "+loadTime+'ms'+' on '+pathname); //logging
    //
    //loop over
});

server.listen(port, hostname, function () { //port listener
    console.log(`Server running at http://${hostname}:${port}/`); //server info
    console.log("Written by Sciencesid \nWebserver in Node.js\n\n Code: https://github.com/Sid12323/nodehttpserver"); //credits / info
    stoploadingtimer();
    console.log("Init Time: "+loadTime+'ms'+'\n');
});
