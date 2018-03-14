var header = require('../../header.js');

console.log(header.display("Exercise 4.3", "Gabriel", "Vance", "Status-Code")); 



//while updating status codes can be done, you need to have a REALLY good reason for doing so

var express=require("express");
var http=require("http");
var logger=require("morgan");

var app=express();

app.use(logger('dev'));

app.get("/not-found",function(request,response){
    response.status(404);
    response.json({
        error:"404, not found!"

    });
});
app.get("/ok",function(request,response){
    response.status(200);
    response.json({
        error:"Everything worked fine!"

    });
});

app.get("/not-implemented",function(request,response){
    response.status(501);
    response.json({
        error:"Resource not implemented!"

    })
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!");
});