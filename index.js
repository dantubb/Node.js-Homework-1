/*
* Simple HTTP API server
*
*/

// Dependencies
const http = require('http');
const url = require('url');

// HTTP server
const server = http.createServer(function(req, res){

   // Parse the URL and extract the path
   const parsedURL = url.parse(req.url);
   const path = parsedURL.pathname.replace(/^\/+|\/+$/g, '');

   const method = req.method.toLowerCase();

   //Temp Log
   console.log('We have a request. Method: ' + method + ' path: ' + path);


   // Create Data object
   const data = {};
   data.method = method;
   data.path = path;

   // Call Handler
   responseHandler(data, function(status, payload){
       // Validate parameters
       const statusCode = typeof (status) === 'number' ? status : 400;
       const payloadObject = typeof (payload) === 'object' ? payload : {};

       // Turn payload into a string
       const payloadString = JSON.stringify(payloadObject);

       //Send response
       res.setHeader('Content-Type', 'application/JSON');
       res.writeHead(statusCode);
       res.end(payloadString);

       //Log response
       console.log('sending..... Status: ' + statusCode + ' - Payload: ' + payloadString);

   });


});

// Response Handler
const responseHandler = function (data, callback){
    if(data.method === 'post' && data.path === 'hello') {
        callback(200, {'msg': 'Hello, nice to meet you'});
    } else {
        callback(404);
    }
};

// Start the server on port 3000
server.listen(3000, function(){
    console.log('The HTTP server is running on port 3000');
});
