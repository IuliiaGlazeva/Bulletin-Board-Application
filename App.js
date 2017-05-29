var pg = require('pg');
var express = require('express');
var app = express();

app.set('views', 'Views');
app.set('view engine', 'pug');

var connectionString = 'postgres://postgres:1q2w3e@localhost/postgres';

app.get('/', (req, res)=>{
	pg.connect(connectionString, function(err, client, done){
		if(err){
			throw err;
		};
		client.query('select * from messages', function(err,result){
			// console.log(result);
			console.log(result.rows);
			done();
			res.render('messages', {messages: result.rows
			});
		});
		
	});
	pg.end();
	
});
app.get('/messages', (req, res) =>{
	res.render('index');
});

app.post('/messages', (req, res)=> {
	//wo sind die Daten???
	var nachrichtTitle = req.body.title;
	var nachrichtBody = req.body.body;
	pg.connect(connectionString, function(err, client, done){
		if(err){
			throw err
		};

	client.query('insert into messsage (title, body) values (' + nachrichtTitle + "," + nachrichtBody + ')', function(err, result){
		console.log(result.rows);
		done();
		res.render('index', {yolo: result.rows});
	});

		
	});

	pg.end();
		

	
 });


var server = app.listen(3000, function(){
	console.log('userApp listening on port:'  + server.address().port);
})
