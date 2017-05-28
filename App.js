var pg = require('pg');
var express = require('express');
var app = express();

app.set('views', 'Views');
app.set('view engine', 'pug');

var connectionString = 'postgres://postgres:1q2w3e@localhost/postgres';

app.get('/', (req, res)=>{
	response.render('index')
})

app.post('/', (req, res)=> {
	pg.connect(connectionString, function(err, client, done){

		client.query('select * from messages', function(err, result){
			console.log('messages');
			console.log(result.rows);
			done();
			res.render('index', {yolo: result.rows})
		});

		pg.end();
		
	});

	
});
// pg.connect(connectionString, function(err, client, done){
// 	client.query('select * from MESSAGES', function(err, result){
// 		console.log(result.rows);

// 	})

// })

var server = app.listen(3000, function(){
	console.log('userApp listening on port:'  + server.address().port);
})
