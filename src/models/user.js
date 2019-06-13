'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    carnet: String,
    email: String,
    password: String,
    rol: String,
    vendido: [{
        producto: String,
        codigo: String,
        cantidad: Number,
        precioU: Number,
        total: Number
    }]
});

module.exports = mongoose.model('User', UserSchema);