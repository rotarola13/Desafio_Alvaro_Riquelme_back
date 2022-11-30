'use strict'

var express = require('express');
var DestinatarioController = require('../controllers/destinatario');
var md_auth = require('../middelwares/authenticated')
var api = express.Router();

api.post('/registerDestinatario',md_auth.ensureAuth,DestinatarioController.saveDestinatario);


module.exports = api;