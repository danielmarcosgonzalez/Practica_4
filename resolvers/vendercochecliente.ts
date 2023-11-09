import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from"../db/cliente_db.ts"
import  ConcesionarioModel from"../db/concesionario_db.ts"

const venderCocheCliente = async(req: Response, res: Response)=>{
    try{
        const{_id,matricula,dni}= req.params;
        if(!_id || !matricula || !dni){
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
        if (typeof dni !== "string") {
            res.status(400).json({
              code:"Type_dni_not_string",
              message: "Please provide dni as string"});
            return;
        }
        const concesionario = await ConcesionarioModel.findOne({_id}).exec();
        if(!concesionario){
            res.status(404).json({
                code:"Concesionario_not _found",
                message:"El concesionario no se ha podido encontrar"})
            return;
        }
        if(concesionario.permiso_venta===false){
            res.status(400).json({
                code:"Concesionario_block_ventas",
                message:"El concesionario tiene bloqueada las ventas"})
            return;
        }

        const cliente = await ClienteModel.findOne({dni}).exec();
        if(!cliente){
            res.status(404).json({
                code:"Cliente_not_found",
                message:"Cliente con ese dni no se ha encontrado"})
            return;
        }

        const busqueda_coche = concesionario.venta.find((elem)=>elem.matricula===matricula);
        if(!busqueda_coche){
            res.status(404).json({
                code:"Coche_con_matricula_not_found",
                message:"Coche con esa matricula no esta en el concesionario"})
            return;
        }
        
        
        const dinero_coche = busqueda_coche.precio;
        if(dinero_coche>cliente.dinero){
            res.status(400).json({
                code:"cliente_sin_dinero",
                message:"Coche vale mas que el dinero que tiene el cliente"})
            return;
        }

        let index = concesionario.venta.findIndex((elem)=>elem.matricula===matricula);
        if(index==-1){
            res.status(404).json({
                code:"coche_en_concesionario_no_encontrado",
                message:"Concesionario no tiene el coche"})
            return;
        }else{
            concesionario.venta.splice(index,1);
        }
        
        cliente.dinero = cliente.dinero-dinero_coche;
        concesionario.banco = concesionario.banco+dinero_coche;
        cliente.garage.push(busqueda_coche)
        await cliente.save();
        await concesionario.save();


      res.status(200).send({
        dni: cliente.dni,
        nombre: cliente.nombre,
        dinero: cliente.dinero,
        garage: cliente.garage,
        id: cliente._id.toString()
      });
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default venderCocheCliente;