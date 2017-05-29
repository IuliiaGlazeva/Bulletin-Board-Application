var pg = require('pg');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')();

app.set('views', 'Views');
app.set('view engine', 'pug');


app.use('/', bodyParser);

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletin_board';

app.get('/', (req, res)=>{
	pg.connect(connectionString, function(err, client, done){
		if(err){
			throw err;
		};
		client.query('select * from messages', function(err,result){
			// console.log(result);
			console.log(result.rows);
			done();
			res.render('messages', {messages: result.rows});
		});
	});
	pg.end();
	
});


app.get('/messages', (req, res) =>{
	res.render('index');
});

app.post('/messages', (req, res)=> {
	pg.connect(connectionString, function(err, client, done){
		if(err){
			throw err;
		};
		
		client.query(`insert into messages (title, body) values ('${req.body.title}', '${req.body.body}')`, function(err, result){
			client.query('select * from messages', function(err, result){
				console.log(result.rows);
				res.render('messages', {messages: result.rows});
				done()
			});
		});
	pg.end();	
	});		
});

var server = app.listen(3000, function(){
	console.log('userApp listening on port:'  + server.address().port);
})
