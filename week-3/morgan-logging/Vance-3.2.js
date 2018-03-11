var header = require('../../header.js');
console.log(header.display("Exercise 3.2", "Gabriel", "Vance", "Logging")); 

// req statements
var express=require("express");
var http=require("http");
var path=require("path");
var logger=require("morgan");

var app=express();

//assign express obj to variable. set view engine+logger
//tells exp to look in views folder for files
app.set("views", path.resolve(__dirname, "views"));
//tells exp to use view engine
app.set("view engine", "ejs");
// add logger
app.use(logger("short"));
//creates get req with response
app.get("/", function (request,response){
    response.render("index",{
        message:"Welcome to the Morgan Logger Example!"
    });
});



//creates server, uses http obj and listens on that port

http.createServer(app).listen(8080,function(){
    console.log("Application started on port 8080");
});