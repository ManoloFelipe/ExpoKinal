'use strict'

var express = require("express");
var UserController = require("../controllers/userController");
 
var api = express.Router();
api.post('/user/register', UserController.registrar);
api.post('/user/login', UserController.login);
api.put('/user/edit/:id', UserController.editarUsuario);
api.put('/user/search/:palabra', UserController.buscar);

module.exports = api;