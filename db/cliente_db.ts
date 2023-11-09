import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../type/cliente.ts";
import { Coche } from "../type/coche.ts";

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    dni:{type:String, required:true},
    nombre:{type:String, required:true},
    dinero:{type:Number, required:true},
    garage:{type:Array<Coche>, required:true}
});

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">;
export default mongoose.model<ClienteModelType>("Cliente",ClienteSchema);