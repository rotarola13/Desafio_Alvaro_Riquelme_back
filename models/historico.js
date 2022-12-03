'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoricoSchema = Schema({
	name:String,
	rut: String,	
    bancoDestino:String,
    tipoCuenta:{type:Schema.ObjectId, ref: 'TipoCuenta'},
	monto:String,
	fechaTransferencia:Date,
	user:{type:Schema.ObjectId, ref: 'User'},
	codeStatus:Boolean
});

module.exports = mongoose.model('Historico',HistoricoSchema);