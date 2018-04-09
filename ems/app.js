var header = require('../header.js');
console.log(header.display("Assignment 6.4", "Gabriel", "Vance", "User Interface Submission")); 

//required statements
var express=require("express");
var http=require("http");
var path=require("path");
var logger=require("morgan");

var mongoose = require("mongoose");
var Employee = require("./models/employee");

//adding the DB

var mongoDB="mongodb://charlie:brown@dbh42.mlab.com:27427/ems";
mongoose.connect(mongoDB,{
    useMongoClient:true
});
//mongo promises
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
    console.log("Application connected to mLab MongoDB instance");
});


// expressapplication 
var app=express();

app.use(logger("short"));

// set statements
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");


app.get("/",function(request,response){
    response.render("index",{
        message:"home page"
    });
});

app.get("/about",function(request,response){
    response.render("about",{
        message:"about page"
    });
});

app.get("/contact",function(request,response){
    response.render("contact",{
        message:"contact page"
    });
});

// employee model

var employee=new Employee({
    firstname:"John",
    lastname:"Wick"
});




http.createServer(app).listen(8080,function(){
    console.log("Application started on port 8080");
});