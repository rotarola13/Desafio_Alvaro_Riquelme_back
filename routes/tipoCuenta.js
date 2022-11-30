'use strict'

var express = require('express');
var TipoCuentaController = require('../controllers/tipoCuenta');
var md_auth = require('../middelwares/authenticated')
var api = express.Router();

api.get('/getTipoCuenta',md_auth.ensureAuth,TipoCuentaController.getTipoCuenta);

module.exports = api;