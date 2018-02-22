var url = require("url");

var parsedURL = url.parse("https://github.com?name=vance");

console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.query);