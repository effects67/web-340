/*
INSTRUCTIONS:

Create a new subdirectory in the ems home directory and name it models
Install Mongoose (npm install mongoose --save)
Create a new JavaScript file and name it employee.js and add it to the models directory

Following the courses repositories fms fruit.js example, create an employeeSchema with two (2) fields, first name and last name

Map the employeeSchema to an Employee model

Make the module accessible from other JavaScript files (module.exports = Employee;)
Update the app.js file with your mLab connection string, mongoose connection code, and Employee model
Run and test the server in a web browser

*/


// Following the courses repositories fms fruit.js example, 

//required and schema

var mongoose=require("mongoose");
var Schema=mongoose.Schema;

//create an employeeSchema with two (2) fields, first name and last name

var employeeSchema=new Schema({
    First:String,
    Last:String,
});

//employee model added, maps the schema

var Employee=mongoose.model("Employee",employeeSchema);

//exports models

module.exports=Employee;

