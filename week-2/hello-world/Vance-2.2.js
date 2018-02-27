// navigates to assn file
var express= require('express');
//require statement for http to add library for server
var http = require('http');

//placeholder for express app
var app=express();


app.use(function(req,res)
{
    // console msg
    console.log('In comes a request to: %s', req.url);
    //value when client accesses url
    res.end('Hello World\n');
})

//creates server, outputs msg. listening to port 8080
http.createServer(app).listen(8080, function()
{
    console.log('Application started on port %s', 8080);
});