//inport reqs
var express=require('express');
var http=require('http');
var logger=require('morgan');
var mongoose=require("mongoose");

//connection string with username/pass (alternate)
var mongoDB="mongodb://charlie:brown@dbh42.mlab.com:27427/ems";
mongoose.connect(mongoDB,{
    useMongoClient:true
});

mongoose.Promise=global.Promise;
//create DB variable
var db=mongoose.connection;
db.on("error",console.error.bind(console,"MongoDB connected error:"));
//once it opens, write msg
db.once("open",function(){
    console.log("Application connected to mLab MongoDB instance");
});

var app=express();
app.use(logger('dev'));

//create http server

http.createServer(app).listen(8080,function(){
    console.log('Application started and listening on port 8080!!!');
});