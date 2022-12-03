'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function saveUser(req,res){
	var user = new User();

	var params = req.body;

	console.log(params);

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
    user.saldo = params.saldo;
	user.role = 'ROLE_USER';

	if (params.password) {
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password = hash;
			if (user.name != null 
				&& user.surname != null 
				&& user.email != null) {
				user.save((err,userStored)=>{
					if (err) {
						res.status(500).send({message:'Error en Guardado'});
						
					} else {
						if (!userStored) {
							res.status(404).send({message:'No se ha registrado el usuario'});
							
						} else {
							res.status(200).send({user: userStored});
							
						}
					}
				})
			}else{
				res.status(200).send({message:'Introduce todos los campos'});

			}
		});
	}else{
		res.status(500).send({message:'Introduce la password'});
	}

}

function loginUser(req,res) {
	var params = req.body;

	var email= params.email;
	var password = params.password;

	User.findOne({email:email.toLowerCase()},(err,user)=>{
		if (err) {
			res.status(500).send({message:'Error obtaining user'})
		} else {
			if (!user) {
				res.status(404).send({message:'The user does not exist'})
				
			} else {
				bcrypt.compare(password, user.password, function(err,check){
					if (check) {
						//devolver datos usuario logeado
						if (params.gethash) {
							//devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});

						} else {
							res.status(200).send({user})
						}
					} else {
						res.status(404);						
					}
				});
			}
		}
	});

}

module.exports = {	
	saveUser,
	loginUser	
};