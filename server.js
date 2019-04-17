// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/timestamp/:date_string?',function(req,res){
  let date = new Date();
  let obj = {};
  let utc = "";
  let unix= "";
  if(req.params.date_string!==undefined){
    date = new Date(req.params.date_string);
    if(req.params.date_string.length == 13){
    date = new Date(parseInt(req.params.date_string));
  } 
    utc=date.toUTCString();
    unix=date.getTime();
    const check = new Date("10-1000-10");
    if(date==check){
      utc="Invalid Date";
    }
    console.log({"test":check});
    obj={"unix":unix,"utc":utc};
  } 
  
  res.json(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
