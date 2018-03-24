var header = require('../../header.js');

console.log(header.display("Exercise 5.2", "Gabriel", "Vance", "If-Else-Render")); 





//requires

var express = require ("express");
var http=require("http");
var path=require("path");
var app=express();

// app functions
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

//local zeppelin names array

var zeppelin=[
    "Larry",
    "John",
    "Jones",
    "Robert",
];

// routes, speicifes root domain of app.
//within body returns list of composers
app.get("/", function(request,response){
    response.render("index",{
        names:zeppelin
    });
});


// creates server
http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!")
})