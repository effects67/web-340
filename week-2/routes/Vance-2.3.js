// set up req state for http lib and exp
var express = require('express');
var http=require('http');
//local variable for express app
var app=express();

// routes interceptor to catch msg and send data to user
// app.get / is root route, function request and response 
app.get('/', function(req,res){
    res.end('Welcome to the homepage!\n');
});

// get request abotu page
app.get('/about', function(req,res){
    res.end('Welcome to the about page!\n');
});

app.get('/contact', function(req,res){
    res.end('Welcome to the contact page!\n');
});
//route interceptor for any bad request
app.use(function(req,res)
{
    res.statsCode=404;
    res.end('404!\n');
});

//create server
http.createServer(app).listen(3001,function(){
    console.log('Application started on port %s',3001);
});