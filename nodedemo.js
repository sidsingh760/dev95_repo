var express = require('express');
var app = express();
var fs = require("fs");

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

//show all
app.get('/listUsers', function (req, res) {
   fs.readFile("user.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

//insert
var user = {
   "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
   }
}
app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

//show particular
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       user = JSON.parse( data );
       var use = user["user" + req.params.id]
       console.log( use );
       res.end( JSON.stringify(use));
   });
})
var id = 2;


//delete
app.delete('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];

       console.log( data );
       res.end( JSON.stringify(data));
   });
})