var http = require('http');
var url = require('url');
var fs = require('fs');
const Datastore = require('nedb');
var express = require('express')
var app = express()
console.log("Starting server...")
 // Use this after the variable declaration
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
        const headers = {
          'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
          'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
          'Access-Control-Max-Age': 2592000, // 30 days
          /** add other headers as per requirement */
        };
        res.writeHead(200, headers);
  var q = url.parse(req.url, true).query;
  var getoradd = q.getoradd;
  if (getoradd == "get") {
    response = (GlobalDebtAmount);
    console.log(response);
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

    console.log(response);
    }
    else if (getoradd == "addmany") {
        GlobalDebtAmount += 3;
    database.update({
        name: 'GlobalDebtAmount'
    }, {
        $set: { value: GlobalDebtAmount }
    })
    response = GlobalDebtAmount
    }
    else {
     response = "Error 400: Bad Request";
    }
    console.log(response);
    fixedresponse = response.toString();
    res.end(fixedresponse);
}).listen(80);