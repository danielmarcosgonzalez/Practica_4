import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "../db/concesionario_db.ts"

const blockVentaConcesionario = async (req: Request, res:Response)=>{
    try {
        const{_id,permiso_venta}= req.params;
        if(!permiso_venta||!_id){
            res.status(400).json({
                code:"perimiso_venta__id_required",
                message:"Permiso_venta _id are required"});
            return;
        }
        if (typeof _id !== "string") {
            res.status(400).json({
              code:"Type__id_not_string",
              message: "Please provide _id as string"});
            return;
        }
        const updateventa = await ConcesionarioModel.findOneAndUpdate({_id},{permiso_venta},{ new: true }).exec();
        if (!updateventa) {
            res.status(404).json({
                code:"concesionario_no_encontrado",
                message:"Concesionario not found"});
            return;
        }
        
        res.status(200).send({
            nombre:updateventa.nombre,
            direccion:updateventa.direccion,
            venta:updateventa.venta,
            banco:updateventa.banco,
            permiso_venta:updateventa.permiso_venta,
            _id:updateventa._id.toString()
        });
    } catch (error) {
        res.status(500).send(error.message);
        return
    }
};
export default blockVentaConcesionario;