import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from"../db/concesionario_db.ts"

const viewCochesdeconcesionario = async(req: Response, res: Response)=>{
    try{
      const{_id}=req.params;
      if(!_id){
        res.status(400).json({
          code:"Dni_required",
          message:"Es necesario un dni para la peticion"});
        return;
      }
      if (typeof _id !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide _id as string"
        });
        return;
      }
      const concesionario = await ConcesionarioModel.findOne({_id}).exec();
      if(!concesionario){
        res.status(404).json({
          code:"Concesionario_not_found",
          message:"No se ha encontrado el concesionario"});
        return;
      }
      const coches_concesionario = concesionario.venta;
      res.status(200).send(coches_concesionario);
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default viewCochesdeconcesionario;