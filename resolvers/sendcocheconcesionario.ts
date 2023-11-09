import { Request, Response } from "npm:express@4.18.2";
import  ConcesionarioModel from "../db/concesionario_db.ts"
import CocheModel from "../db/coche_db.ts"

const sendCocheConcesionario = async (req:Request, res:Response)=>{
    try {
        const{_id,matricula}= req.params;
        if(!_id||!matricula){
            res.status(400).json({
                code:"faltan_datos_para_peticion",
                message:"Es necesario introducir los datos"})
            return;  
        }
        if (typeof _id !== "string") {
            res.status(400).json({
              code:"Type__id_not_string",
              message: "Please provide _id as string"});
            return;
        }
        if (typeof matricula !== "string") {
            res.status(400).json({
              code:"Type_matricula_not_string",
              message: "Please provide matricula as string"});
            return;
        }
        const coche = await CocheModel.findOneAndDelete({matricula}).exec();
        if(!coche){
            res.status(404).json({
                code:"coche_no_encontrado",
                message:"Coche not found"})
            return;
        }
        const concesionario = await ConcesionarioModel.findOne({_id}).exec();
        if(!concesionario){
            res.status(404).json({
                code:"concesionario_not_found",
                message:"Concesionario not found"})
            return;
        }
        if(concesionario.venta.length>10){
            res.status(400).json({
                code:"concesionario_mas_10_coches",
                message:"Concesionario con mas de 10 coches"})
            return;
        }
        const busqueda_coche = concesionario.venta.some((elem)=>elem.matricula===coche.matricula);
        if(busqueda_coche===true){
            res.status(404).json({
                code:"concesionario_con_coche",
                message:"Concesionario ya tiene el coche"})
            return;
        }
        concesionario.venta.push(coche);
        await concesionario.save();

        res.status(200).send({
            nombre:concesionario.nombre,
            direccion:concesionario.direccion,
            venta:concesionario.venta,
            banco:concesionario.banco,
            bloqueo_venta:concesionario.bloqueo_venta,
            _id: concesionario._id.toString()
        });
    } catch (error) {
        res.status(404).send(error.message);
        return;  
    }
};
export default sendCocheConcesionario;