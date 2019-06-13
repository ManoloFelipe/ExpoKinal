'use strict'

const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var VentaSchema = Schema({

    producto: String,
    codigo: Number,
    cantidad: Number,
    precio:Number


})