var http = require('http');
var url = require('url');
var fs = require('fs');
const Datastore = require('nedb');
console.log(Datastore);
var response = "Error 500: Internal Server Error";
var GlobalDebtAmount = 14000
const database = new Datastore('database.db');
database.loadDatabase();
database.find({}, function (err, docs) {
    if (docs.length == 0) {
        database.insert({name: 'GlobalDebtAmount', value: GlobalDebtAmount});
    }
    else {
        GlobalDebtAmount = docs[0].value;
    }
});
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var getoradd = q.getoradd;
  if (getoradd == "get") {
    response = (GlobalDebtAmount);
    console.log(response + "get");
  }
    else if (getoradd == "add") {
    GlobalDebtAmount += 1;
    database.update({
        name: 'GlobalDebtAmount'
    }, {
        $set: { value: GlobalDebtAmount }
    })
    response = GlobalDebtAmount
    //save to a file

    console.log(response + "add");
    }
    else {
     response = "Error 400: Bad Request";
     console.log(response + "400");
    }
    console.log(response);
    fixedresponse = response.toString();
    res.end(fixedresponse);
}).listen(80);