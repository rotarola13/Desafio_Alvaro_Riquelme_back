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
    destinatario.user = params.user;
    destinatario.codeStatus = true;

    if (destinatario.name != null
        && destinatario.rut != null
        && destinatario.email != null
        && destinatario.telefono != null
        && destinatario.bancoDestino != null
        && destinatario.tipoCuenta != null
        && destinatario.numeroCuenta != null
        && destinatario.user != null) {
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
    var idUser = req.params.id;
    var mysort = { name: -1 };
    var find= Destinatario.find({user:idUser,codeStatus:true}).sort(mysort);
	
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

function removeDestinatario(req, res) {
    var destinatarioId = req.body._id;
    var update = req.body;
    update.codeStatus=false;

    Destinatario.findByIdAndUpdate(destinatarioId, update, (err, destUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error when updating recipient' });
        } else {
            if (!destUpdate) {
                res.status(404).send({ message: 'Recipient has not been updated' });

            } else {
                return res.status(200).send({ destinatario: destUpdate });
            }
        }
    });
}


module.exports = {
    saveDestinatario,
    getdestinatarioFind,
    removeDestinatario
};