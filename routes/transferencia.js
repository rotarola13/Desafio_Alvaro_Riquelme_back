'use strict'

var express = require('express');
var TransferenciaController = require('../controllers/transferencia');
var md_auth = require('../middelwares/authenticated')
var api = express.Router();

api.post('/historico',md_auth.ensureAuth,TransferenciaController.saveHistoricoTransferencia);
api.post('/transferencia',md_auth.ensureAuth,TransferenciaController.saveTransferencia);


module.exports = api;