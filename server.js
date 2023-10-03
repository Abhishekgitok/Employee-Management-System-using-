const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');

  // Determine the requested URL and map it to the corresponding HTML file
  let filePath;
  if (req.url === '/' || req.url === '/page.html') {
    filePath = path.join(__dirname, 'page.html');
  } else if (req.url === '/managemt.html') {
    filePath = path.join(__dirname, 'managemt.html');
  } else {
    // Handle other requests (e.g., 404 Not Found)
    res.writeHead(404);
    res.end('Page not found!');
    return;
  }

  // Read the HTML file and send it as the response
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server error');
    } else {
      res.writeHead(200);
      res.end(content);
    }
  });
});

// Start the server on port 3000
const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
