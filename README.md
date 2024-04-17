# nodehttpserver v3.0
A simple HTTP server written in NodeJS, useful for quickly serving files for testing purposes (such as opening ports).

# Usage
Run the JS file (server.js) [and put your HTML file (index.html) in the same directory]

# Syntax
`node server.js [ip] [port]`

Having a custom IP and port are optional

# Installation Method 1 (Simple Installer)
- Windows x64: [currently outdated]
  1) Download and extract https://github.com/Sid12323/nodehttpserver/releases/download/v2.2-public/nhsi.zip (NHSI.zip [NodeHttpServerInstaller)
  2) Run install.bat
  3) Enjoy!
  3.1) If you want more customization and want to run it later, continue at ##3 for installation method 2, but use "node-v16.4.2-win-x64/node.exe" instead of "node".

 - Other: Use Installation Method 2

# Installation Method 2 ("Advanced")
## 1. Download &| Install NodeJS
CLI:
- Linux: `sudo apt install nodejs && node server.js`
+ Tip: To open a port in Ubuntu VPSs, you can run `sudo ufw open {port} && sudo ufw enable` 
- Windows: download and extract https://nodejs.org/en/download/prebuilt-binaries via your favorite download manager, then open CMD/PS in the server.js directory and run `{PATH TO NODE BINARIES}\node.exe .\server.js`

GUI Node Installation: Follow the instructions at https://nodejs.org/en/download/

## 2. Download the server.js file
## 3. Create a index.html file under the same root directory at some point (optional if you just want any form of output)
## 4. Open a command window in said root directory (the folder with server.js)
## 5. Run "node server.js" (For default info, or you can use something with CLI Args (e.x. "node server.js 0.0.0.0 80")
## 6. Enjoy!

# Other Features
- Built in response page
- Verbose CLI
- Dynamically accessed files
- Easily modifiable MIME headers and response codes
- Compact, one file
- No dependencies, can drop in a directory and get started

# Changes (2.2 -> 3.0):
+ major clean up: readability, more efficient
+ added more support for file types
+ added error and status handler
