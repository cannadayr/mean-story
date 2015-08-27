//LOAD CONFIG
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//console.log(config);

//EXPRESSJS
var express = require('express');
var app = express();

//MONGOJS
var mongojs = require('mongojs');
var db = mongojs('story', ['users']);
var db = mongojs(config.mongodb, ['users'])

db.users.find(function(err, docs){
	console.log(docs);
});

//BODYPARSER
var bodyparser = require('body-parser');
app.use(bodyparser.json());

//NODEMAILER
var nodemailer = require('nodemailer');

var url = config.mongodb;


var transporter = nodemailer.createTransport({
	service:  'Mailgun',
	auth: {
		user: config.user,
		pass: config.pass   
	}
});

//STATIC
app.use(express.static(__dirname + "/public"));

app.post('/submit', function(req, res){
	//console.log(req.body);
	db.users.insert(req.body, function(err,doc){
		res.json(doc);

		var mailOptions = {
			from: 'cannadayr@gmail.com', 
			to: req.body.email, 
			subject: 'Hilarious Story!', 
			text: req.body.html, 
			html: req.body.html 
		};
//		console.log(mailOptions);
		console.log(req.body.email);

		
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		});
		
	});
});

//LISTEN AND SERVE
app.listen(3000);
console.log("RUNNING ON PORT 3000");


