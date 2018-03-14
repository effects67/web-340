var express=require("express");
var http=require("http");
var app=express();
app.get("/hero/:id",function (request,response){
    var id=parseInt(request.params.id, 10);
    response.json({
        firstName:"Bruce",
        lastName:"Wayne",
        superName:id
    });
});




http.createServer(app).listen(8080,function(){
    console.log("Application started on port 8080");
});