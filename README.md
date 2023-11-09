# Practica_4
Para la practica4 de Arquitectura y Programacion de sistemas en Internet vamos a desarrollar una api que va a tener los siguientes endpoints:

.post("/addCoche") Nos permitira añadir a nuestra api un coche

.post("/addCliente") Nos permitira añadir a nuestra api un cliente

.post("/addConcesionario") Nos permitira añadir a nuestra api un concesionario


.get("/viewCochesdeCliente/:dni") Introduciendo el dni del cliente podremos ver los vehiculos de su garage

.get("/viewCochesdeConcesionario/:_id") Introduciendo del _id del concesionario podremos ver los vehiculos a la venta


.put("/addDineroCliente/:dni") Introduciendo el dni del cliente añadimos dinero a su cuenta introducir el dinero por body{"dinero":example_dinero}

.get("/blockVentaConcesionario/:_id/:permiso_venta") Introduciendo el _id del concesionario podemos activar o desactibar el bloqueo de venta introducir el valor por parametros /example_id/false El bloqueo se realiza cuando esta en falso el valor


.get("/sendCocheConcesionario/:_id/:matricula") Introduciendo el valor de _id del concesionario y la matricula del coche lo podemos enviar a la venta para que el concesionario venda el vehiculo

.get("/venderCocheCliente/:_id/:matricula/:dni") Introduciendo el valor de _id del concesionario la matricula del vehiculo que esta a la venta en el concesionario y el dni del cliente, se realizara la venta del vehiculo al cliente donde pasara a su garage y se le restara el dinero 

.get("/transferCocheCliente/:dni_vendedor/:matricula/:dni_comprador") Introduciendo el valor del dni_vendedor del cliente que vende el vehiculo, la matricula del vehiculo que esta en su garage y el dni_comprador del cliente comprador del vehiculo, se transpasara el vehiculo del garaje del vendedor al comprador realizando la operacion del coste del vehiculo


.get("/eraseCocheCliente/:dni/:matricula") Introduciendo el dni del cliente y la matricula del vehiculo de su garage puede enviarlo al desguace(eliminarlo) su vehiculo

.get("/eraseCocheConcesionario/:_id/:matricula") Introduciendo el _id del concesionario y la matricula del vehiculo que esta en venta puede descatalogar el vehiculo(eliminarlo) de su exposicion

Nuestros obgetos tendran los siguientes atributos en la base de datos:

- Coche = {_id:identificador_bd,matricula:string,modelo:string,color:string,precio:number}

- Cliente = {_id:identificador_bd,dni:string,nombre:string,dinero:number,garage:array<Coche>}

- Concesionario = {_id:identificador_bd,nombre:string,direccion:string,venta:array<Coche>,banco:number,permiso_venta:boolean}

