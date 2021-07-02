'use strict';
//default dependencies (import)
const http = require('http');
const fs = require("fs");
const url = require("url");
//server init vars
var hostname = '0.0.0.0'
var port = '8080'
var pathname = "/";
var statc = 200;
//misc vars
var contentss = "";

//cli args interpreter
const cliArgs = process.argv.slice(2);
if (cliArgs[0] != null) {hostname = cliArgs[0];} //hostname set
if (cliArgs[1] != null) {port = cliArgs[1];} //port set

var respt = null; //response time (unfinished)
//functionz

function fileread(filename) {
  contentss = "<h1>abc errors are free | Internal Server Error (500)</h1>";
  statc = 500; // in case of a null file or fileread failure
   if (filename.slice(-1)=="/") {filename = "." + filename + "index.html";} else {filename = "." + filename;}
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
    pathname = url.parse(req.url).pathname; //path for retreival
    statc = 200; //default stat code
    res.setHeader('Content-Type', 'text/html'); //html header
    fileread(pathname); //init file reading (sync for large files)
    var data = contentss; //set file to data to be sent
    data = data + "\n\n<script>\nconsole.log(\"Webserver Code Written in NodeJS by Sciencesid\");\nconsole.log(\"Code for server: https://github.com/Sid12323/nodehttpserver\");\n</script>";// ;) ;) subscrib to my yt;
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null; //ip for logging
    var time = new Date(); //time for logging
    console.log("Connection from "+ip+"@"+port+" ("+statc+") for "+pathname+" at "+time+" in "+respt+" ms !") //logging
    res.statusCode = statc; //final stat code
    res.end(data); //post for get response
    //
    //loop over
});
 
server.listen(port, hostname, () => { //port listener
    console.log(`Server running at http://${hostname}:${port}/`); //server info
    console.log("Written by Sciencesid \nWebserver in Node.js\n\n Code: https://github.com/Sid12323/nodehttpserver"); //credits / info
});