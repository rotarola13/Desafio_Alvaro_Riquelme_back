'use strict'
var jwt= require('jwt-simple');
var moment = require('moment');
var secret='clave_check'

exports.createToken = function (user) {
  var payLoad ={
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,   
    iat: moment().unix(),
    exp: moment().add(10,'d').unix()
  };  

  return jwt.encode(payLoad,secret);
};
