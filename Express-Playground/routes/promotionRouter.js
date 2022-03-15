const express = require('express');
const promotionRouter = express.Router();


// initial route to '/' and in server app.use() pass in route as first parameter
promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); // we're sending plain text in the response body
        next();
    })
    .get((req, res) => {
        res.end('Will send all the promotions to you');
    })
    .post((req, res) => {
        res.end(`Will send the promotion: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403; // this server does not allow PUT requests, ergo 403 code assignation
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res) => {
        res.end('Deleting all promotions');
    });

promotionRouter.route('/:promotionId')
    .get((req, res)=>{
        res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
    })
    .post((req, res)=>{
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })
    .put((req, res)=>{
        res.write(`Updating the promotion: ${req.params.promotionId}\n\n`);
        res.end(`Will update the promotion: ${req.body.name} with description: ${req.body.description}`);
    })
    .delete((req, res)=>{
        res.end(`Deleting promotion: ${req.params.promotionId}`);
    });


    module.exports = promotionRouter;