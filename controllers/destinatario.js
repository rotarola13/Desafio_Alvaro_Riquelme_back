'use strict'

var bcrypt = require('bcrypt-nodejs');
var Destinatario = require('../models/destinatario');
var TipoCuenta = require('../models/tipo_cuenta');
var jwt = require('../services/jwt');


function saveDestinatario(req, res) {
    var destinatario = new Destinatario();

    var params = req.body;
    
    destinatario.name = params.name;
    destinatario.rut = params.rut;
    destinatario.email = params.email;
    destinatario.telefono = params.telefono;
    destinatario.bancoDestino = params.bancoDestino;
    destinatario.tipoCuenta = params.tipoCuenta;
    destinatario.numeroCuenta = params.numeroCuenta;


    if (destinatario.name != null
        && destinatario.rut != null
        && destinatario.email != null
        && destinatario.telefono != null
        && destinatario.bancoDestino != null
        && destinatario.tipoCuenta != null
        && destinatario.numeroCuenta != null) {
            destinatario.save((err, destinatarioStored) => {
            if (err) {
                res.status(500).send({ message: 'Error en Guardado' });

            } else {
                if (!userStored) {
                    res.status(404).send({ message: 'No se ha registrado el destinatario' });

                } else {
                    res.status(200).send({ destinatario: destinatarioStored });

                }
            }
        })
    } else {
        res.status(200).send({ message: 'Introduce todos los campos' });

    }

}


module.exports = {
    saveDestinatario
};