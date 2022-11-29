'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistoricoSchema = Schema({
	name:String,
	rut: String,
	telefono:String,
    bancoDestino:String,
    tipoCuenta:{type:Schema.ObjectId, ref: 'TipoCuenta'},
	monto:Number
});

module.exports = mongoose.model('Historico',HistoricoSchema);