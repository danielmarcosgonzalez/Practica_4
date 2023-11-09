import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from"../db/cliente_db.ts"

const viewCochesdecliente = async(req: Response, res: Response)=>{
    try{
      const{dni}=req.params;
      if(!dni){
        res.status(400).json({
          code:"Dni_required",
          message:"Es necesario un dni para la peticion"});
        return;
      }
      if (typeof dni !== "string") {
        res.status(400).json({
          code:"Type_dni_not_string",
          message: "Please provide dni as string"});
        return;
      }
    
      const cliente = await ClienteModel.findOne({dni}).exec();
      if(!cliente){
        res.status(400).json({
          code:"Cliente not found",
          message:"No se ha encontrado un cliente con ese dni"});
        return;
      }
      const coches_cliente = cliente.garage;
      res.status(200).send(coches_cliente);
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default viewCochesdecliente;