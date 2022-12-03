'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DestSchema = Schema({
	name:String,
	rut: String,
	email:String,
	telefono:String,
    bancoDestino:String,
    tipoCuenta:{type:Schema.ObjectId, ref: 'TipoCuenta'},
	numeroCuenta:String,
	user:{type:Schema.ObjectId, ref: 'User'},
	codeStatus:Boolean
});

module.exports = mongoose.model('Destinatario',DestSchema);