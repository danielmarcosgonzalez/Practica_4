import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { Request, Response } from "npm:express@4.18.2";
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import addCoche  from "./resolvers/addcoche.ts";
import addCliente  from "./resolvers/addcliente.ts";
import addConcesionario  from "./resolvers/addconcesionario.ts";
import viewCochesdecliente from "./resolvers/viewcochesdecliente.ts";
import viewCochesdeconcesionario from "./resolvers/viewcochesdeconcesionario.ts";
import addDineroCliente from "./resolvers/adddinerocliente.ts";
import blockVentaConcesionario from "./resolvers/blockventaconcesionario.ts";
import sendCocheConcesionario from "./resolvers/sendcocheconcesionario.ts";
import eraseCocheConcesionario from "./resolvers/erasecocheconcesionario.ts";
import venderCocheCliente from "./resolvers/vendercochecliente.ts";
import eraseCocheCliente from "./resolvers/erasecochecliente.ts";
import transferCocheCliente from "./resolvers/transfercochecliente.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");//Primero la variable del archivo env y la otra variable de entorno del sistema operativo

if(!MONGO_URL){
    console.error("Url not found");
    Deno.exit(1);
}

try{

await mongoose.connect(MONGO_URL);
console.info("Mongo connected");
const app = express();
app.use(express.json());

app.get("/",async(req:Request, res: Response)=>{
  res.status(200).send("Bienvenido a la api de gestion de clientes, concesionarios y coches");
})
.post("/addCoche",addCoche)
.post("/addCliente",addCliente)
.post("/addConcesionario",addConcesionario)

.get("/viewCochesdeCliente/:dni",viewCochesdecliente)
.get("/viewCochesdeConcesionario/:_id",viewCochesdeconcesionario)

.put("/addDineroCliente/:dni",addDineroCliente)
.get("/blockVentaConcesionario/:_id/:permiso_venta",blockVentaConcesionario)

.get("/sendCocheConcesionario/:_id/:matricula",sendCocheConcesionario)
.get("/venderCocheCliente/:_id/:matricula/:dni",venderCocheCliente)
.get("/transferCocheCliente/:dni_vendedor/:matricula/:dni_comprador",transferCocheCliente)

.get("/eraseCocheCliente/:dni/:matricula",eraseCocheCliente)
.get("/eraseCocheConcesionario/:_id/:matricula",eraseCocheConcesionario)


app.listen(3000,()=>{
  console.log("Server started on port 3000")
})

}catch(e){
  console.error(e);
}
