//Bulletin Board Application Create a website that allows people to post messages to a page. 
//A message consists of a title and a body. The site should have two pages:

var pg = require('pg');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')();

app.set('views', 'Views');
app.set('view engine', 'pug');


app.use('/', bodyParser);

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletin_board';


//The first page shows people a form where they can add a new message.

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


//The second page shows each of the messages people have posted. Make sure there's a way to navigate the site so users can access each page.

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
