'use strict'

var express = require('express');
var DestinatarioController = require('../controllers/destinatario');
var md_auth = require('../middelwares/authenticated')
var api = express.Router();

api.post('/registerDestinatario',md_auth.ensureAuth,DestinatarioController.saveDestinatario);
api.get('/getDestinatarios/:id',md_auth.ensureAuth,DestinatarioController.getdestinatarioFind);
api.put('/updateDestinatario',md_auth.ensureAuth,DestinatarioController.removeDestinatario);


module.exports = api;