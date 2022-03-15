const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter.route('/')
    // these are the same routes that came from server.js path is defined ('/') so no need to pass this, only callback functions
    // chaining all methods removing the 'app' and only using the .whatever
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); // we're sending plain text in the response body
        next(); // passes control to app routing to the next after this one
    })
    .get((req, res) => {
        // response status code and headers are done by app.all
        res.end('Will send all the campsites to you');
    })
    .post((req, res) => {
        //here we're just echoing back what we have under res.body obj
        res.end(`Will send the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403; // this server does not allow PUT requests, ergo 403 code assignation
        res.end('PUT operation not supported on /campsites');
    })
    .delete((req, res) => {
        res.end('Deleting all campsites');
    });

// adding new route
campsiteRouter.route('/:campsiteId')
    .get((req, res) => {
        res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
    })
    .put((req, res) => {
        res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
        res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting campsite: ${req.params.campsiteId}`);
    });



module.exports = campsiteRouter;