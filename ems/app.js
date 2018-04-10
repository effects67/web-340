var header = require('../header.js');
console.log(header.display("EMS", "Gabriel", "Vance", "User Interface Submission")); 

//required statements
var express=require("express");
var http=require("http");
var path=require("path");
var logger=require("morgan");
// add mongoose - week 8
var mongoose = require("mongoose");
var Employee = require("./models/employee");
// add helmet - week 8
var helmet=require("helmet";
// add parsers - week 8
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var csrf=require("csurf");

//setup csrf protection - week 8
var csrfProtection=csrf({cookie:true});

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


// init express from week 8
var app=express();

// use statements adding helmet week08
app.use(logger("short"));
app.use(helmet.xssFilter());
//parser week 8
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(csrfProtection);
app.use(function(request,response, next){
    var token=request.csrfToken();
    response.cookie('XSRF-TOKEN',token);
    response.locals.csrfToken=token;
    next();
});


// set statements
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

// http calls week -8

/* this is similar to the below function. both are added
but I think I'm only keeping one.
app.get("/",function(request,response){
    response.render("index",{
        message:"XSS Prevention Example"
    });
});
*/

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
