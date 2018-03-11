/*
============================================
; Title:  Program Header
; Author: Professor Krasso 
; Date:   25 June 2017
; Modified By: <Gabriel Vance>
; Description: Displays a formatted header
;===========================================
*/ 

/*
    This function accepts four parameters: 
        f = students first name
        l = students last name 
        a = assignment number
    and displays the results.
*/
var k="Professor Krasso"

module.exports = {
    display: function(a, f, l, d) {
        var msg = "\n" + "Title:" + " " + a + "\n" +  "Author:" + " "+ k 
             + "\nDate: " + new Date().toLocaleDateString() + "\n" + "Modified By:" + " " + f + " " + l  +
             "\n" + "Description:" + " " + d + "\n"
        return msg; 
    }
};

