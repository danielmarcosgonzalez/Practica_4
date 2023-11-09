import { Request, Response } from "npm:express@4.18.2";
import  ConcesionarioModel from "../db/concesionario_db.ts"

const eraseCocheConcesionario = async (req:Request, res:Response)=>{
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
        const concesionario = await ConcesionarioModel.findOne({_id}).exec();
        if(!concesionario){
            res.status(404).json({
                code:"concesionario_no_encontrado",
                message:"Concesionario not found"})
            return;
        }
        
        const index = concesionario.venta.findIndex((elem)=>elem.matricula===matricula);
        if(index==-1){
            res.status(404).json({
                code:"concesionario_sin_coche",
                message:"Concesionario no tiene el coche"})
            return;
        }else{
            concesionario.venta.splice(index,1);
        }
        await concesionario.save();

        res.status(200).send({
            nombre:concesionario.nombre,
            direccion:concesionario.direccion,
            venta:concesionario.venta,
            banco:concesionario.banco,
            permiso_venta:concesionario.permiso_venta,
            _id: concesionario._id.toString()
        });
    } catch (error) {
        res.status(500).send(error.message);
        return;  
    }
};
export default eraseCocheConcesionario;