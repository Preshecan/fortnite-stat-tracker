var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser'); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/public', express.static('static'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/static/index.html'));
});

//GET https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}  Platforms: pc, xbl, psn
//https://api.fortnitetracker.com/v1/profile/account/{accountId}/matches
//TRN-Api-Key: 091e4f73-8477-4fa8-8340-b3f764deaba5
var uri = 'https://api.fortnitetracker.com/v1/profile/';

app.post('/', function(req,res){
	request.get(uri + req.body.dropDownValue + '/' + req.body.epicNickName,{
		headers: {
			'TRN-Api-Key': '091e4f73-8477-4fa8-8340-b3f764deaba5'
		}},function(error, response, body){
			console.log(body);
			res.json(body);
	});
});

var port = process.env.PORT || 3000;
app.listen(port);
