'use strict'
var jwt= require('jwt-simple');
var moment = require('moment');
var secret='clave_check'

exports.ensureAuth = function (req,res,next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message:'La peticion no tiene la cabecera de autenticacion'})
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    try {
        var payLoad = jwt.decode(token,secret);
        console.log(payLoad);
        if (payLoad.exp <= moment().unix()) {
            return res.status(401).send({message:'Session ha expirado'})            
        }
        
    } catch (error) {       
        return res.status(404).send({message:'Token no valido'})
    }
    req.user = payLoad;

    next();
};