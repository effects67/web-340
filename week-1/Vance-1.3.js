var header = require('../header.js');

console.log(header.display("Exercise 1.3", "Gabriel", "Vance", "Parses URL")); 



var url = require("url");

// var parsed URL to personal GitHub
var parsedURL = url.parse("https://github.com?name=vance");


// calls 3 seperate parsedURL
console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.query);