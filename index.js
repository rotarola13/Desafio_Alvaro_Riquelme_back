'use strict'

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongoConnect, (err, res) => {
	if (err) {
		throw err;
	}
	else {
		console.log('correcto');
		app.listen(port, function () {
			console.log('Servidor del api rest en: PORT ' + port)
		});
	}
})