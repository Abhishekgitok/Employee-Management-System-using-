// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//   fs.readFile('page.html',  function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080);

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Parse the URL to determine the requested path
    // ? '/page.html' : req.url;: This is a ternary operator (? :) used for conditional assignment
    const url = req.url === '/' ? '/loginform.html' : req.url;
    const filePath = path.join(__dirname, url);

    // Check if the requested file exists
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            // Determine the content type based on the file extension
            let contentType = 'text/html';
            if (filePath.endsWith('.css')) {
                contentType = 'text/css';
            } else if (filePath.endsWith('.js')) {
                contentType = 'application/javascript';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const port = 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
