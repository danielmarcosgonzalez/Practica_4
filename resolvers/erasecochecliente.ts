import { Request, Response } from "npm:express@4.18.2";
import  ClienteModel from "../db/cliente_db.ts"

const eraseCocheCliente = async (req:Request, res:Response)=>{
    try {
        const{dni,matricula}= req.params;
        if(!dni||!matricula){
            res.status(400).json({
                code:"faltan_datos_para_peticion",
                message:"Es necesario introducir los datos"})
            return;  
        }
        if (typeof dni !== "string") {
            res.status(400).json({
              code:"Type_dni_not_string",
              message: "Please provide dni as string"});
            return;
        }
        if (typeof matricula !== "string") {
            res.status(400).json({
              code:"Type_matricula_not_string",
              message: "Please provide matricula as string"});
            return;
        }
        const cliente = await ClienteModel.findOne({dni}).exec();
        if(!cliente){
            res.status(404).json({
                code:"cliente_no_encontrado",
                message:"Cliente not found"})
            return;
        }
        
        const index = cliente.garage.findIndex((elem)=>elem.matricula===matricula);
        if(index==-1){
            res.status(404).json({
                code:"cliente_sin_coche",
                message:"Cliente no tiene el coche"})
            return;
        }else{
            cliente.garage.splice(index,1);
        }
        await cliente.save();

        res.status(200).send({
            dni: cliente.dni,
            nombre: cliente.nombre,
            dinero: cliente.dinero,
            garage: cliente.garage,
            id: cliente._id.toString()
        });
    } catch (error) {
        res.status(500).send(error.message);
        return;  
    }
};
export default eraseCocheCliente;