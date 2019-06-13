'use strict'

var Venta = require('../models/venta');


function AddVenta(req,res){


    var venta= new Venta();
    var params = req.body;


    if(params.producto && params.codigo && params.cantidad && params.precio){

        venta.producto = params.producto.toLowerCase();
        venta.codigo = params.codigo.toLowerCase();
        venta.cantidad = params.cantidad;
        venta.precio = params.precio;


        Venta.find({
            $or:[
                {producto:venta.producto.toLowerCase()},
                {codigo: venta.codigo.toLowerCase()}
            ]
        }).exec((err,ventas)=>{
            if (err) return res.status(500).send({ message: 'No se ha podido Realizar la Peticion' });
        
            if(ventas && ventas.length >=1){
                return res.status(500).send({message:'La venta ya se ha realizado'});
            }else{
                venta.save((err, ventaGuardada)=>{
                    if(err) return res.status(500).send({message:'Error al momento de Guardar el Usuario'})
                    
                    if(ventaGuardada){
                        res.status(200).send({ventaGuardada:ventaGuardada});
                    }else{
                        res.status(404).send({message:'no se ha podido guardar la venta'});
                    }
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe Rellenar los campos Necesarios'});
    }
}

function ListarVentas(req,res){
    Venta.find((err,Ven)=>{
        if(err) return res.status(500).send({message:'Error al Procesar La Peticion'});

        if(!Ven) return res.status(500).send({message:'No hay ninguna venta en la Base de Datos'});

        return res.status(200).send({Venta:Ven});
    })
}

function ActualizarVenta(req,res){v
    var VentaId = req.params.id;
    var VentaActu= req.body;

    Venta.findByIdAndUpdate(VentaId, VentaActu,{new:true},(err,VentaA)=>{
        if(err) return res.status(500).send({message:'No se Pudo Procesar la Solicitud'});
            
            if(!VentaA) return res.status(404).send({message:'No se Pudo Actualizar el Usuario'});
            
            return res.status(200).send({Venta:VentaA});
    })
}


function EliminarVenta(req,res){

    var VentaId = req.params.id;

    Venta.findByIdAndDelete(VentaId,(err,VentaE)=>{
        if(err) return res.status(500).send({message:'No se Pudo Procesar La Peticion'});

        if(!VentaE)
        return res.status(404).send({message:'No se a Podido Eliminar'});
        

        return res.status(200).send({Usuario:'La Venta Ha Sido Eliminada'});
    })
}

module.exports={

    AddVenta,
    ListarVentas,
    ActualizarVenta,
    EliminarVenta
}