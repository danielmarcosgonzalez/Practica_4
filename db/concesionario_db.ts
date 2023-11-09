import mongoose from "npm:mongoose@7.6.3";
import { Concesionario } from "../type/concesionario.ts";
import { Coche } from "../type/coche.ts";

const Schema = mongoose.Schema;

const ConcesionarioSchema = new Schema({
    nombre:{type:String, required: true},
    direccion:{type:String, required: true},
    venta:{type:Array<Coche>, required: true},
    banco:{type:Number, required: true},
    permiso_venta:{type:Boolean, required: true, default:true}
});

export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "id">;
export default mongoose.model<ConcesionarioModelType>("Concesionario",ConcesionarioSchema);