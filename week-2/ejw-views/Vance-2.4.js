var http=require("http");
var express=require("express");
var path=require("path");
var app=express();

// express knows views in views directory
app.set("views", path.resolve(__dirname, "views"));
//use EJS view engine
app.set("view engine","ejs");
app.get("/",function(reqest,response){
    response.render("index",{
        firstname:"Gabriel",
        lastname:"Vance",
        address:"Home",
    });
});
http.createServer(app).listen(8080,function(){
    console.log("EJS-Views app started on port 8080.");

});

