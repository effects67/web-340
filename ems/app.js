/*
============================================
; Title: APP for EMS
; Author: Professor Krasso
; Date: 15 April 2018
; Modified By: Gabriel Vance
; Description: App.js is the JS file for our
EMS file.
;===========================================
*/

var header = require('../header.js');
console.log(header.display("EMS", "Gabriel", "Vance", "User Interface Submission")); 

//required statements
var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
//adding helmet for week 8
var helmet = require("helmet");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var mongoose = require("mongoose");
var employee = require("./models/employee");
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
//parser week 8 - CSRF

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(csrfProtection);
app.use(function(request, response, next) {
    var token = request.csrfToken();
    response.cookie('XSRF-TOKEN', token);
    response.locals.csrfToken = token;
    next();
});


// set statements
app.set("views",path.resolve(__dirname, "views"));
app.set("view engine","ejs");
app.set("port",process.env.PORT || 8080);


// http calls week -8

/* this is similar to the below function. both are added
but I think I'm only keeping one.
app.get("/",function(request,response){
    response.render("index",{
        message:"XSS Prevention Example"
    });
});
*/

/* routing examples
*/

app.get("/",function(request,response){
    response.render("index",{
        title:"home page"
    });
});


app.get("/new", function (request, response) {
    response.render("new", {
        title: "new employee"
    });
});

app.post("/process", function(request, response) {

    if (!request.body.txtName) {
        response.status(400).send("Entries must have a name");
        return;
    }

// employee model

   // get the request's form data
   var employeeName = request.body.txtName;
   console.log(employeeName);


   var employee = new Employee({
       name: employeeName
   });
//saves the employee input

employee.save(function (error) {
    if (error) throw error;

    console.log(employeeName  + " saved successfully!");
});

response.redirect("/");
});

app.get("/list", function(request, response) {
    employee.find({}, function(error, employees) {
       if (error) throw error;

       response.render("list", {
           title: "Employee List",
           employees: employees
       });
    });
});

//query names
app.get("/view/:queryName", function (request, response) {
    var queryName = request.params.queryName;

    Employee.find({'name': queryName}, function(error, employees) {
        if (error) throw error;

        console.log(employees);

        if (employees.length > 0) {
            response.render("view", {
                title: "Employee Record",
                employee: employees
            })
        }
        else {
            response.redirect("/list")
        }
    });
});





http.createServer(app).listen(8080,function(){
    console.log("Application started on port 8080");
});
