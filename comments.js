// Create web Server
// 1. Create a server
// 2. Create a request handler
// 3. Listen to the port

const http = require('http');
const fs = require('fs');
const url = require('url');

// 1. Create a server
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;
    console.log(query);

    // 2. Create a request handler
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else if (pathName === '/api') {
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            // console.log(productData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>Page not found</h1>');
    }
});

// 3. Listen to the port
server.listen(8000, 'server running on port 8000');