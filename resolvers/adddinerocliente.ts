import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente_db.ts"

const addDineroCliente = async (req: Request, res:Response)=>{
    try {
        const{dni}= req.params;
        const{dinero}=req.body;
        if(!dinero||!dni){
            res.status(400).json({
                code:"dinero_dni_requieren_peticion",
                message:"Dinero dni are required"});
            return;
        }
        if (typeof dni !== "string") {
            res.status(400).json({
              code:"Type_dni_not_string",
              message: "Please provide dni as string"});
            return;
        }
        if (typeof dinero !== "number") {
            res.status(400).json({
              code:"Type_dinero_not_number",
              message: "Please provide dni as number"
            });
            return;
          }
        
        const updateDinero = await ClienteModel.findOne({dni}).exec();
        if (!updateDinero) {
            res.status(404).json({
                code:"cliente_not_found",
                message:"Cliente no encontrado"});
            return;
        }
        updateDinero.dinero = updateDinero.dinero+dinero;
        await updateDinero.save();
        


        res.status(200).send({
            dni: updateDinero.dni,
            nombre: updateDinero.nombre,
            dinero: updateDinero.dinero,
            garage: updateDinero.garage,
            id: updateDinero._id.toString()
        });
    } catch (error) {
        res.status(500).send(error.message);
        return
    }
};
export default addDineroCliente;