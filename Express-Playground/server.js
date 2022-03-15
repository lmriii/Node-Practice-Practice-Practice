const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');

const hostname = 'localhost';
const port = '4000';

// express app running under the name app
const app = express();
// uses morgan middleware. 'dev' gives more data for devs
app.use(morgan('dev'));
// express middleware - this will parse any json data 
app.use(express.json());

// this uses express router. by getting 'campsites' as first parameter we're saying this is root path
app.use('/campsites', campsiteRouter);

// THESE HAVE BEEN MOVED TO A ROUTER MODULE
// // catchall method for all http verbs
// app.all('/campsites', (req, res, next) =>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html'); // we're sending plain text in the response body
//     next(); // passes control to app routing to the next after this one
// });

// app.get('/campsites', (req, res) =>{
//     // response status code and headers are done by app.all
//     res.end('Will send all the campsites to you');
// }); 

// //express.json gets this data parsed for us and part of the res.body object.
// app.post('/campsites', (req, res) => {
//     //here we're just echoing back what we have under res.body obj
//     res.end(`Will send the campsite: ${req.body.name} with description: ${req.body.description}`);
// });

// //
// app.put('/campsites', (req, res) =>{
//     res.statusCode = 403; // this server does not allow PUT requests, ergo 403 code assignation
//     res.end('PUT operation not supported on /campsites');
// });

// //RECOMMENDATION - only for privileged users
// app.delete('/campsites', (req, res)=>{
//     res.end('Deleting all campsites');
// });

// app routing for individual campsites the ":" in '/campsites/:campsiteId' saves the path as campsiteId under the req.params.campsiteId

// app.get('/campsites/:campsiteId', (req, res) => {
//     res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
// });

// app.post('/campsites/:campsiteId', (req, res) =>{
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
// });

// app.put('/campsites/:campsiteId', (req, res) => {
//     res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
//     res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
// });

// app.delete('/campsites/:campsiteId', (req, res) =>{
//     res.end(`Deleting campsite: ${req.params.campsiteId}`);
// });


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