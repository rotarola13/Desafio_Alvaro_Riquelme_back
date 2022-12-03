'use strict'

var bcrypt = require('bcrypt-nodejs');
var Destinatario = require('../models/destinatario');
var TipoCuenta = require('../models/tipocuenta');
var jwt = require('../services/jwt');


function saveDestinatario(req, res) {
    var destinatario = new Destinatario();

    var params = req.body;
    console.log(req.body);
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
                res.status(500).send({ message: 'Saving error' });

            } else {
                if (!destinatarioStored) {
                    res.status(404).send({ message: 'Recipient not registered' });

                } else {
                    res.status(200).send({ destinatario: destinatarioStored });

                }
            }
        })
    } else {
        res.status(200).send({ message: 'Enter all the fields' });

    }

}

function getdestinatarioFind(req, res) {
    var mysort = { name: -1 };
    var find= Destinatario.find({}).sort(mysort);
	
    find.populate({path:'tipoCuenta'}).exec((err,destinatario)=>{
        if (err) {
	        res.status(500).send({message:'Error obtaining recipient'});           
        } else {
            if (!destinatario) {
	            res.status(404).send({message:'There are no recipients'});               
            } else {
	            res.status(200).send({destinatario});                
            }
        }
    });   

}


module.exports = {
    saveDestinatario,
    getdestinatarioFind
};