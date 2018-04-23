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
var express=require("express");
var http=require("http");
var path=require("path");
var logger=require("morgan");
// add helmet
var helmet=require("helmet");
// add parsers - week 8
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var csrf=require("csurf");
// add mongoose - week 8
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

//setup csrf protection - week 8
var csrfProtection=csrf({cookie:true});


// app get

// init express from week 8
var app=express();

// use statements adding helmet week08
app.use(logger("short"));
//parser week 8 - CSRF
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(helmet.xssFilter());
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
app.set("port", process.env.PORT || 8080);


// http calls week -8



// routing examples


app.get("/", function (request, response){
    response.render("index",{
        title: "Home page"
    });
});


app.get("/new", function (request, response){
    response.render("new",{
        title: "New Employee"
    });
});

app.get("/list", function(request, response) {
    Employee.find({}, function(error, employees) {
       if (error) throw error;

       response.render("list", {
           title: "Employee List",
           employees: employees
       });
    });
});

app.post("/process", function(request, response) {

    if (!request.body.txtemployeeName) {
        response.status(400).send("Entries must have a name");
        return;
    }
    //form data
    var employeeFirst = request.body.txtfirstname;
    var employeeLast = request.body.txtlastname;
    var employeeName = employeeFirst + " " + employeeLast;
    

   // employee model

    var employee=new Employee({
        firstname:employeeFirst,
        lastname:employeeLast,
});

//saves the employee input

    employee.save(function (error) {
        if (error) throw error;

        console.log(employeeName + " saved successfully!");
    });

    response.redirect("/list");

});




app.get("/view/:queryName", function (request, response) {
    var queryName = request.params.queryName;

    employee.find({'name': queryName}, function(error, employees) {
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

http.createServer(app).listen(app.get("port"), function() {
    console.log("Application started on port " + app.get("port"));
});