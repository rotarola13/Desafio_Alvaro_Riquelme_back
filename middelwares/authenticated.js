'use strict'
var jwt= require('jwt-simple');
var moment = require('moment');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var secret=process.env.passJwt;


exports.ensureAuth = function (req,res,next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message:'Request does not have authentication header'})
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
 
    try {
        
        var payLoad = jwt.decode(token,secret);
      
        if (payLoad.exp <= moment().unix()) {
            return res.status(401)          
        }
        
    } catch (error) {       
        return res.status(401)     
    }
    req.user = payLoad;

    next();
};