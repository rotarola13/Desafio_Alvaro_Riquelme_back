'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuentaSchema = Schema({
	descripcion:String,
	codeStatus:Boolean
});

module.exports = mongoose.model('TipoCuenta',TipoCuentaSchema);