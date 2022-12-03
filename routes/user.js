'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middelwares/authenticated')
var api = express.Router();

api.post('/register',md_auth.ensureAuth,UserController.saveUser);
api.post('/login',UserController.loginUser);

module.exports = api;