import mongoose from "npm:mongoose@7.6.3";
import { Coche } from "../type/coche.ts";

const Schema = mongoose.Schema;

const CocheSchema = new Schema({
    matricula:{type:String,required:true},
    modelo:{type:String,required:true},
    color:{type:String,required:true},
    precio:{type:Number,required:true}
});

export type CocheModelType = mongoose.Document & Omit<Coche, "id">;
export default mongoose.model<CocheModelType>("Coche",CocheSchema);