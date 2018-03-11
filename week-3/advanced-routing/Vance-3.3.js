var header = require('../../header.js');
console.log(header.display("Exercise 3.3", "Gabriel", "Vance", "Advanced Routing")); 




// creating require statements with morgan
//pack installed with "npm install express morgan ejs --save"
var express=require("express");
var http=require("http");
var path=require("path");
var logger=require("morgan");

// app variable
var app = express();

// views folder+engine
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

app.use(logger('dev'));

app.get("/:employeeId",function(req,res){
    var employeeId=parseInt(req.params.employeeId,10);
    
    res.render('index',{
        employeeId:employeeId
    });
});

http.createServer(app).listen(3001, function(){
    console.log('Application started and listening on port %s', 3001)
});