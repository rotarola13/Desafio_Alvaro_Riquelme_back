'use strict'

var bcrypt = require('bcrypt-nodejs');
var TipoCuenta = require('../models/tipocuenta');
var jwt = require('../services/jwt');


function getTipoCuenta(req,res) {
	
	TipoCuenta.find({codeStatus:true},(err,tipoCuenta)=>{
		if (err) {
			res.status(500).send({message:'Error obtaining account type'})
		} else {
			if (!tipoCuenta) {
				res.status(404).send({message:'There are no account types'})
				
			} else {
				res.status(200).send({tipoCuenta})
				
			}
		}

	});

}

module.exports = {	
	getTipoCuenta
};