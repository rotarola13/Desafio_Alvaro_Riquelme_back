'use strict'

var bcrypt = require('bcrypt-nodejs');
var Historico = require('../models/historico');
var User = require('../models/user');

function saveTransferencia(req,res) {
    var userId= req.body._id;
    var update = req.body;

    User.findByIdAndUpdate(userId,update,(err,userUpdate)=>{
        if (err) {
	        res.status(500).send({message:'Error en realizar transferencia'});
            
        } else {
            if (!userUpdate) {
	            res.status(404).send({message:'La transferencia no ha podido completarse'});
                
            } else {
                return res.status(200).send({user:userUpdate}); 
            }
        }
    });
}

function saveHistoricoTransferencia(req, res) {
    var historico = new Historico();

    var params = req.body;

    let now= new Date();

    historico.name = params.name;
    historico.rut = params.rut;
    historico.bancoDestino = params.bancoDestino;
    historico.tipoCuenta = params.tipoCuenta;
    historico.monto = params.monto;
    historico.fechaTransferencia = now;

    if (historico.name != null
        && historico.rut != null
        && historico.bancoDestino != null
        && historico.tipoCuenta != null
        && historico.monto != null) {
            historico.save((err, historicoStored) => {
            if (err) {
                res.status(500).send({ message: 'Error en Guardado' });

            } else {
                if (!userStored) {
                    res.status(404).send({ message: 'No se ha registrado el historico' });

                } else {
                    res.status(200).send({ historico: historicoStored });

                }
            }
        })
    } else {
        res.status(200).send({ message: 'Introduce todos los campos' });

    }


}


module.exports = {
    saveHistoricoTransferencia,
    saveTransferencia
};