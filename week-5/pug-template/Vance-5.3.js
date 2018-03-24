var header = require('../../header.js');

console.log(header.display("Exercise 5.3", "Gabriel", "Vance", "Pug Templates")); 




var express=require("express");
var http=require("http");
var pug=require("pug");
var path=require("path");

var app=express();

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","pug");

// routes
app.get("/",function(request,response){
    response.render("index",{
        message:"Onwards to victory!"
    });
});

http.createServer(app).listen(8080,function(){
    console.log("Application started on port 8080!");
});



