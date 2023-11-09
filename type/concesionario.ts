import { Coche } from "./coche.ts"
export type Concesionario={
    nombre:string,
    direccion:string,
    venta:Array<Coche>,
    banco:number,
    permiso_venta:boolean
}