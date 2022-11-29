'use strict'

var bcrypt = require('bcrypt-nodejs');
var Destinatario = require('../models/destinatario');
var TipoCuenta = require('../models/tipo_cuenta');
var jwt = require('../services/jwt');


function saveUser(req, res) {
    var destinatario = new Destinatario();

    var params = req.body;

    //console.log(params);
    destinatario.name = params.name;
    destinatario.rut = params.rut;
    destinatario.email = params.email;
    destinatario.telefono = params.telefono;
    destinatario.bancoDestino = params.bancoDestino;
    destinatario.tipoCuenta = params.tipoCuenta;
    destinatario.numeroCuenta = params.numeroCuenta;


    if (user.name != null
        && user.surname != null
        && user.email != null) {
        user.save((err, userStored) => {
            if (err) {
                res.status(500).send({ message: 'Error en Guardado' });

            } else {
                if (!userStored) {
                    res.status(404).send({ message: 'No se ha registrado el usuario' });

                } else {
                    res.status(200).send({ user: userStored });

                }
            }
        })
    } else {
        res.status(200).send({ message: 'Introduce todos los campos' });

    }

}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!user) {
                res.status(404).send({ message: 'No existe el usuario' })

            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        //devolver datos usuario logeado
                        if (params.gethash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });

                        } else {
                            res.status(200).send({ user })
                        }
                    } else {
                        res.status(404).send({ message: 'Fallo logeo user' })

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