import { Coche } from "./coche.ts"
export type Cliente={
    dni: string,
    nombre: string,
    dinero: number,
    garage: Array<Coche>
}