/*
    This is how to create an HTTP server in Node. Express will make this a lot easier. These are the basics, learn well.
*/

const http = require('http');

const hostname = 'localhost';
const port = 4000;

const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);


    // handling GET method
    if (req.method === 'GET') {
        let fileUrl = req.url;
        // if request comes for hostname then we'll send index.html
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        // absolute path for fileUrl
        const filePath = path.resolve('./public' + fileUrl);

        // we're going to check file extensions as we only want to return .html files
        const fileExt = path.extname(filePath);

        // checking if file extension is .html

        if (fileExt === '.html') {
            // file is a .html use fs.access to let's us know if file is available takes in a 'file path' and an 'error' as arguments
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    // add return so that we stop execution
                    return;
                }

                // Success! We have a GET method and it's an HTML file
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                // reads content of file in small chunks to make process faster use 'pipe()' method. by default when pipe is done it ends so no need to res.end
                fs.createReadStream(filePath).pipe(res);
            })

            // non HTML files will not be handled by this server
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }

        // non GET methods get this treatment
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})