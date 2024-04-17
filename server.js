'use strict';
const http = require('http');
const fs = require("fs");
const url = require("url");
const path = require('path');

let current_err = "";
let currentStatusCode = 500;
let hostname = '0.0.0.0'
let loadTime,time;

let charset = "utf-8";
let port = '8080'

const issueUnknown = "<h1>abc errors are free | Internal Server Error (500)</h1>";
let bodyResponses = {
  403: "403: Forbidden",
  404: "<h1>404: Not Found</h1>",
  500: issueUnknown,
  501: "501: Method not implemented",
  blank: "There's nothing here"
}

let dir = path.join(__dirname, 'public');
let mime = {
    html: 'text/html', //common text based
    htm: 'text/html',
    css: 'text/css',
    txt: 'text/plain',
    csv: 'text/csv',
    gif: 'image/gif', //images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript', //functionality
    xml: 'application/xml',
    json: 'application/json',
    pdf: 'application/pdf',
    mp4: 'video/mp4', //video/audio
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    mp3: 'audio/mp3',
    wav: 'audio/wav',
    zip: 'application/zip', //compression
    tar: 'application/x-tar',
    rar: 'application/x-rar-compressed',
    "7z": 'application/x-7z-compressed',
    ttf: 'font/ttf', //fonts
    otf: 'font/otf',
    woff: 'font/woff',
    woff2: 'font/woff2',
    xls: 'application/vnd.ms-excel', //specific applications
    doc: 'application/msword',
    ppt: 'application/vnd.ms-powerpoint'
    // Add more MIME types as needed
};




//functionz
function startloadingtimer() {
  time = Date.now();
}
function stoploadingtimer() {
  loadTime = Date.now() - time;
}

function formatDate(date) {
    const dateString = date.toString();
    const parts = dateString.split(' ');
    let timezoneSuffix = parts[7].endsWith('Daylight');
    timezoneSuffix = (timezoneSuffix) ? "DT" : "ST";
    return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3].substr(2)} ${parts[4]} ${parts[5]} (${parts[6].substr(1,1)}${timezoneSuffix})`;
}

function fileread(filename) {
  currentStatusCode = 500; // in case of fatal exception
  let contents;
   if (filename.substr(filename.length - 1) == "/") { filename = `.${filename}index.html`; } else if (filename.substr(1,1) != "/") {filename = `./${filename}`} else {filename = `.${filename}`;}
   if (filename.includes("//")) { filename = filename.replace('//','/'); } //cleanup
      try {
        contents = fs.readFileSync(filename, charset) ?? bodyResponses["blank"];
      } catch (err) {
      current_err = err;
      if (err.toString().includes("ENOENT: no such file or directory")) {
        currentStatusCode = 404;
      }
      contents = bodyResponses[currentStatusCode];
    }
    if (contents != null && currentStatusCode != 404) { currentStatusCode = 200 };
    console.log("Serving: "+filename);
  return contents;
}

//cli args interpreter
const cliArgs = process.argv.slice(2);
if (cliArgs[0] != null) { hostname = cliArgs[0]; }
if (cliArgs[1] != null) { port = cliArgs[1]; }

const error = new Proxy({ value: current_err }, {
    set: function (target, key, value) {
        if (value !== target[key]) { // Only set if the new value is different
            target[key] = value;
            console.error("> Error: " + current_err);
        }
        return true;
    }
});

console.time("Init Time: ");
const server = http.createServer((req, res) => { //server loop
    startloadingtimer();
    try {
      let pathname = url.parse(req.url).pathname || "/"; //path to retreive
      let data = fileread(pathname) ?? issueUnknown;


      let file = path.join(dir, req.url.toString().split('?')[0].replace(/\/$/, '/index.html'));

      if (file.indexOf(dir + path.sep) !== 0) {
          currentStatusCode = 403;
      }
      if (req.method !== 'GET') { currentStatusCode = 501; }

      let type = mime[path.extname(file).slice(1)] || 'text/html';
      res.setHeader('Content-Type', type);
      res.statusCode = currentStatusCode;

      if (type == "text/html") { data += "\n\n<script>\nconsole.log(\"NodeJS HTTP ~ Sciencesid\\nRepo: https://github.com/Sid12323/nodehttpserver\");\n</script>"; }// ;) ;) subscrib to my yt;}
      if (currentStatusCode == 200) { res.end(data); } else { res.end(bodyResponses[currentStatusCode]); }

      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
      stoploadingtimer();
      console.log("+ Connection at "+formatDate(new Date())+" from "+ip+":"+port+" ("+currentStatusCode+") for "+pathname+" {"+loadTime+'ms}'); //logging
  } catch (e) { current_err = e; }
    error.value = current_err;
});

server.listen(port, hostname, function () { //port listener
    console.log(`Server running at http://${hostname}:${port}/`); //server info
    console.log("Written by Sciencesid \nWebserver in Node.js\n\nCode: https://github.com/Sid12323/nodehttpserver"); //credits / info
    console.timeEnd("Init Time: ");
    // console.log("Init Time: "+loadTime+'ms'+'\n');
});
