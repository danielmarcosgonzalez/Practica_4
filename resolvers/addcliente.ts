import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from"../db/cliente_db.ts"

const addCliente = async(req: Response, res: Response)=>{
    try{
    const {dni, nombre, dinero, garage} = req.body;
    if(!dni || !nombre || !dinero || !garage){
        res.status(400).json({
            code:"datos_necesarios_peticion",
            message:"Dni nombre dinero garage are required"});
        return;
    }
    if (typeof dni !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide dni as string"
        });
        return;
    }
    if (typeof nombre !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide nombre as string"
        });
        return;
    }
    if (typeof dinero !== "number") {
        res.status(400).json({
          code:"not_type_number",
          message: "Please provide number as string"
        });
        return;
    }
    const alreadyExists = await ClienteModel.findOne({dni}).exec();
    if(alreadyExists){
        res.status(400).json({
            code:"cliente_con_mismo_dni",
            message:"Cliente already exists"});
        return;
    }

    const newCliente = new ClienteModel({dni, nombre, dinero, garage});
    await newCliente.save();

    res.status(200).send({
        dni: newCliente.dni,
        nombre: newCliente.nombre,
        dinero: newCliente.dinero,
        garage: newCliente.garage,
        id: newCliente._id.toString()
    });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addCliente;