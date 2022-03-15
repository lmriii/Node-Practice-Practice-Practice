const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = '4000';

// express app running under the name app
const app = express();
// uses morgan middleware. 'dev' gives more data for devs
app.use(morgan('dev'));

// this let's express serve files from public folder
// __dirname special node variable refers to absolute path of current directory of the file that's in
app.use(express.static(__dirname + '/public'));

app.use((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});




app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})