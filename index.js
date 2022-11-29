'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port= process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://ariquelo:qpOJQeehytPgR8UA@bdcheck.syutrhj.mongodb.net/bdcheck?retryWrites=true&w=majority',(err,res)=>{
	if (err) {
        throw err;
	}else
	{
		console.log('correcto');
		app.listen(port, function(){
			console.log('Servidor del api rest de musica escuchando en MongoBD'+port)
		});
	}
})