'use strict'

var bcrypt = require('bcrypt-nodejs');
var TipoCuenta = require('../models/tipocuenta');
var jwt = require('../services/jwt');


function getTipoCuenta(req,res) {
	
	TipoCuenta.find({},(err,tipoCuenta)=>{
		if (err) {
			res.status(500).send({message:'Error en la peticion'})
		} else {
			if (!tipoCuenta) {
				res.status(404).send({message:'No existe el usuario'})
				
			} else {
				res.status(200).send({tipoCuenta})
				
			}
		}

	});

}

module.exports = {	
	getTipoCuenta
};