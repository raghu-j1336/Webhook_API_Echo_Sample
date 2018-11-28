"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();


restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
      var temp = 1;
 // var speech = temp;
    /*req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText?
       req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";*/
 let url = 'http://api.openweathermap.org/data/2.5/weather?q=Melbourne,uk&appid=a707631010fd6300d47d98e6e038151c';
 request(url, function (err, response, body) {
    if(err){
     temp = "error";
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
          temp = undefined;
      } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          temp = weatherText;
      }
    }
    });
  
  return res.json({
        fulfillmentText: temp,
    source: "EchoService"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
