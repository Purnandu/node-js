const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Get the file path from the request URL and add the public directory prefix
  const filePath = path.join(__dirname, 'public', req.url);

  // Check if the file exists
  fs.exists(filePath, (exists) => {
    if (exists) {
      // If the file exists, read it and send it back to the client
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // If there's an error reading the file, send a 500 error code
          res.writeHead(500);
          res.end('Server Error');
        } else {
          // Otherwise, set the Content-Type header and send the file data
          const ext = path.extname(filePath);
          let contentType = 'text/html';
          if (ext === '.css') {
            contentType = 'text/css';
          } else if (ext === '.js') {
            contentType = 'text/javascript';
          } else if (ext === '.json') {
            contentType = 'application/json';
          } else if (ext === '.png') {
            contentType = 'image/png';
          }
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    } else {
      // If the file doesn't exist, send a 404 error code
      res.writeHead(404);
      res.end('404 Not Found');
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});