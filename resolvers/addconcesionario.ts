import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from"../db/concesionario_db.ts"

const addConcesionario = async(req: Response, res: Response)=>{
    try{
    const {nombre ,direccion, venta, banco, permiso_venta} = req.body;
    if(!nombre || !direccion || !venta || !banco || !permiso_venta){
        res.status(400).json({
            code:"faltan_datos",
            message:"banco nombre direccion venta bloqueo_venta are required"});
        return;
    }
    if (typeof nombre !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide nombre as string"
        });
        return;
    }
    if (typeof direccion !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide direccion as string"
        });
        return;
    }
    if (typeof banco !== "number") {
        res.status(400).json({
          code:"not_type_number",
          message: "Please provide nombre as number"
        });
        return;
    }
    if (typeof permiso_venta !== "boolean") {
        res.status(400).json({
          code:"not_type_boolean",
          message: "Please provide nombre as boolea"
        });
        return;
    }
    const alreadyExists = await ConcesionarioModel.findOne({nombre}).exec();
    if(alreadyExists){
        res.status(400).json({
            code:"concesionario_ya_existe",
            message:"Concesionario already exists"});
        return;
    }

    const newConcesionario = new ConcesionarioModel({nombre, direccion, venta, banco, permiso_venta});
    await newConcesionario.save();

    res.status(200).send({
        nombre: newConcesionario.nombre,
        direccion: newConcesionario.direccion,
        venta: newConcesionario.venta,
        banco: newConcesionario.banco,
        permiso_venta: newConcesionario.permiso_venta,
        _id: newConcesionario._id.toString()
    });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addConcesionario;