const express = require('express');
const partnerRouter = express.Router();


// initial route to '/' and in server app.use() pass in route as first parameter
partnerRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); // we're sending plain text in the response body
        next();
    })
    .get((req, res) => {
        res.end('Will send all the partners to you');
    })
    .post((req, res) => {
        res.end(`Will send the partner: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403; // this server does not allow PUT requests, ergo 403 code assignation
        res.end('PUT operation not supported on /partners');
    })
    .delete((req, res) => {
        res.end('Deleting all partners');
    });

partnerRouter.route('/:partnerId')
    .get((req, res)=>{
        res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
    })
    .post((req, res)=>{
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put((req, res)=>{
        res.write(`Updating the partner: ${req.params.partnerId}\n\n`);
        res.end(`Will update the partner: ${req.body.name} with description: ${req.body.description}`);
    })
    .delete((req, res)=>{
        res.end(`Deleting partner: ${req.params.partnerId}`);
    });


    module.exports = partnerRouter;