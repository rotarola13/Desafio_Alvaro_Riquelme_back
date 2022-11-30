'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

var user_routes = require('./routes/user')
var destinatario_routes = require('./routes/destinatario')
var tipoCuenta_routes = require('./routes/tipoCuenta')



app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

	next();
});

app.use('/api',user_routes);
app.use('/api',destinatario_routes);
app.use('/api',tipoCuenta_routes);



module.exports = app;
