'use strict'

var bcrypt = require('bcrypt-nodejs');
var Historico = require('../models/historico');
var User = require('../models/user');

function saveTransferencia(req, res) {
    var userId = req.body._id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Transfer error' });

        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'Transfer could not be completed' });

            } else {
                return res.status(200).send({ user: userUpdate });
            }
        }
    });
}

function saveHistoricoTransferencia(req, res) {
    var historico = new Historico();

    var params = req.body;

    let now = new Date();

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
                res.status(500).send({ message: 'Saving error' });

            } else {
                if (!historicoStored) {
                    res.status(404).send({ message: 'The history has not been registered' });

                } else {
                    res.status(200).send({ historico: historicoStored });

                }
            }
        })
    } else {
        res.status(200).send({ message: 'Enter all the fields' });

    }


}

function historicoFind(req, res) {
    var mysort = { fechaTransferencia: 1 };
    var find = Historico.find({}).sort(mysort);

    find.populate({ path: 'tipoCuenta' }).exec((err, historico) => {
        if (err) {
            res.status(500).send({ message: 'Error obtaining history' });
        } else {
            if (!historico) {
                res.status(404).send({ message: 'There is no history' });
            } else {
                res.status(200).send({ historico });
            }
        }
    });
}

module.exports = {
    saveHistoricoTransferencia,
    saveTransferencia,
    historicoFind
};