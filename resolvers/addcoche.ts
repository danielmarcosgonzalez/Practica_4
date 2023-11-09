import { Request, Response } from "npm:express@4.18.2";
import CocheModel from"../db/coche_db.ts"

const addCoche = async(req: Response, res: Response)=>{
    try{
    const {matricula, modelo, color, precio} = req.body;
    if(!matricula || !modelo || !color || !precio){
        res.status(400).json({
            code:"faltan_datos_peticion",
            message:"Matricula modelo color precio are required"});
        return;
    }
    if (typeof matricula !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide matricula as string"
        });
        return;
    }
    if (typeof modelo !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide modelo as string"
        });
        return;
    }
    if (typeof color !== "string") {
        res.status(400).json({
          code:"not_type_string",
          message: "Please provide color as string"
        });
        return;
    }
    if (typeof precio !== "number") {
        res.status(400).json({
          code:"not_type_number",
          message: "Please provide precio as number"
        });
        return;
    }
    const alreadyExists = await CocheModel.findOne({matricula}).exec();
    if(alreadyExists){
        res.status(400).json({
            code:"coche_con_misma_matricula",
            message:"Car already exists"});
        return;
    }

    const newCoche = new CocheModel({matricula, modelo, color, precio});
    await newCoche.save();

    res.status(200).send({
        matricula: newCoche.matricula,
        modelo: newCoche.modelo,
        color: newCoche.color,
        precio: newCoche.precio,
        id: newCoche._id.toString()
    });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addCoche;