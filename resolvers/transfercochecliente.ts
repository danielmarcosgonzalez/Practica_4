import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from"../db/cliente_db.ts"

const transferCocheCliente = async(req: Response, res: Response)=>{
    try {
        const{dni_comprador,matricula,dni_vendedor}=req.params;
        if(!dni_comprador||!matricula||!dni_vendedor){
            res.status(400).json({
                code:"faltan_datos_para_peticion",
                message:"Es necesario introducir los datos"})
            return; 
        }
        if (typeof dni_comprador !== "string") {
            res.status(400).json({
              code:"Type_dni_comprador_not_string",
              message: "Please provide dni_comprador as string"});
            return;
        }
        if (typeof matricula !== "string") {
            res.status(400).json({
              code:"Type_matricula_not_string",
              message: "Please provide matricula as string"});
            return;
        }
        if (typeof dni_vendedor !== "string") {
            res.status(400).json({
              code:"Type_dni_vendedor_not_string",
              message: "Please provide dni_vendedor as string"});
            return;
        }
        let dni = dni_comprador;
        const comprador = await ClienteModel.findOne({dni}).exec();
        if(!comprador){
            res.status(404).json({
                code:"dni_no_encontrado_comprador",
                message:"Dni no encontrado para comprador"});
            return;
        }

        dni = dni_vendedor;
        const vendedor = await ClienteModel.findOne({dni}).exec();
        if(!vendedor){
            res.status(404).json({
                code:"dni_no_encontrado_vendedor",
                message:"Dni no encontrado para vendedor"});
            return;
        }

        const busqueda_coche = vendedor.garage.find((elem)=>elem.matricula===matricula);
        if(!busqueda_coche){
            res.status(404).json({
                code:"coche_matricula_no_encontrado_garage",
                message:"Coche con esa matricula no esta en el garage del vendedor"})
            return;
        }

        const dinero_coche = busqueda_coche.precio;
        if(dinero_coche>comprador.dinero){
            res.status(400).json({
                code:"comprador_sin_dinero",
                message:"Coche vale mas que el dinero que tiene el comprador"})
            return;
        }

        const index = vendedor.garage.findIndex((elem)=>elem.matricula===matricula);
        if(index==-1){
            res.status(404).json({
                code:"vendedor_sin_coche",
                message:"Vendedor no tiene el coche"})
            return;
        }else{
            vendedor.garage.splice(index,1);
        }
        
        comprador.dinero = comprador.dinero-dinero_coche;
        vendedor.dinero = vendedor.dinero+dinero_coche;
        comprador.garage.push(busqueda_coche)
        await comprador.save();
        await vendedor.save();

        res.status(200).send("Transacion realizada con exito");

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};
export default transferCocheCliente;