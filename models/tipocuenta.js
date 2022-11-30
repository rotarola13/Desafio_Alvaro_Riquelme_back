'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuentaSchema = Schema({
	descripcion:String	
});

module.exports = mongoose.model('TipoCuenta',TipoCuentaSchema);