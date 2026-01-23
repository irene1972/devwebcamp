import pool from '../config/db.js';

export class Evento {
    constructor(datos){
        this.nombre=datos.nombre;
        this.descripcion=datos.descripcion;
        this.disponible=datos.disponible;
        this.categoria_id=datos.categoria_id;
        this.dia=datos.dia;
        this.hora=datos.hora;
        this.ponente_id=datos.ponente_id;
    }
    async getEventos() {
        return await pool.query('SELECT * FROM eventos');
    }
    
    validar(){
        if(!this.nombre){
            return 'El nombre es obligatorio';
        }
        if(!this.descripcion){
            return 'La descripción es obligatoria';
        }
        if(!this.categoria_id){
            return 'Elige una categoría';
        }
        if(!this.dia){
            return 'Elige el día del evento';
        }
        if(!this.hora){
            return 'Elige la hora del evento';
        }
        if(!this.disponible){
            return 'Añade una cantidad de lugares disponibles';
        }
        if(!this.ponente_id){
            return 'Selecciona a la persona encargada del evento';
        }
    }
}