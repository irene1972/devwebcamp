import pool from '../config/db.js';

export class Evento {
    constructor(datos) {
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.disponible = datos.disponible;
        this.categoria_id = datos.categoria_id;
        this.dia = datos.diaHidden;
        this.hora = datos.horaHidden;
        this.ponente_id = datos.ponenteHidden;
    }
    async getEventos() {
        return await pool.query('SELECT * FROM eventos');
    }

    async getEventosConJoin() {
        return await pool.query(`SELECT e.*,
                                        d.id as dia_id,
                                        d.nombre as dia_nombre,
                                        h.id as hora_id,
                                        h.hora as hora_hora,
                                        p.id as ponente_id,
                                        p.nombre as ponente_nombre,
                                        p.apellido as ponente_apellido,
                                        c.id as categoria_id,
                                        c.nombre as categoria_nombre
                                    FROM eventos as e
                                    JOIN dias AS d ON e.dia_id=d.id
                                    JOIN horas AS h ON e.hora_id=h.id
                                    JOIN ponentes AS p ON e.ponente_id=p.id
                                    JOIN categorias AS c ON e.categoria_id=c.id;`);
    }

    async getEventosConJoinById(id) {
        return await pool.query(`SELECT e.*,
                                        d.id as dia_id,
                                        d.nombre as dia_nombre,
                                        h.id as hora_id,
                                        h.hora as hora_hora,
                                        p.id as ponente_id,
                                        p.nombre as ponente_nombre,
                                        p.apellido as ponente_apellido,
                                        c.id as categoria_id,
                                        c.nombre as categoria_nombre
                                    FROM eventos as e
                                    JOIN dias AS d ON e.dia_id=d.id
                                    JOIN horas AS h ON e.hora_id=h.id
                                    JOIN ponentes AS p ON e.ponente_id=p.id
                                    JOIN categorias AS c ON e.categoria_id=c.id
                                    WHERE e.id=?;`, [id]);
    }

    async getEventoHorarioByCategoriaYDia(categoria, dia) {
        /*return await pool.query('SELECT id,categoria_id,dia_id,hora_id FROM eventos WHERE categoria_id=? AND dia_id=?', [categoria, dia]);*/
        return await pool.query(`SELECT e.*,
                                        h.id as hora_id, 
                                        h.hora as hora_hora,
                                        p.nombre as ponente_nombre,
                                        p.apellido as ponente_apellido,
                                        p.imagen as ponente_imagen
                                        FROM eventos e 
	                                    JOIN horas h ON e.hora_id=h.id 
                                        JOIN ponentes p ON e.ponente_id=p.id
                                        WHERE categoria_id=? AND dia_id=?`, [categoria, dia]);
    }

    async insertEvento() {
        await pool.query('INSERT INTO eventos (nombre,descripcion,disponibles,categoria_id,dia_id,hora_id,ponente_id) VALUES (?,?,?,?,?,?,?)', [this.nombre, this.descripcion, this.disponible, this.categoria_id, this.dia, this.hora, this.ponente_id]);
    }

    async actualizarEvento(id) {
        await pool.query('UPDATE eventos SET nombre=?,descripcion=?,disponibles=?,categoria_id=?,dia_id=?,hora_id=?,ponente_id=? WHERE id=?', [this.nombre, this.descripcion, this.disponible, this.categoria_id, this.dia, this.hora, this.ponente_id, id]);
    }

    async eliminarEvento(id){
        await pool.query('DELETE FROM eventos WHERE id=?',[id]);
    }

    validar() {
        if (!this.nombre) {
            return [0, 'El nombre es obligatorio'];
        }
        if (!this.descripcion) {
            return [0, 'La descripción es obligatoria'];
        }
        if (!this.categoria_id) {
            return [0, 'Elige una categoría'];
        }
        if (!this.dia) {
            return [0, 'Elige el día del evento'];
        }
        if (!this.hora) {
            return [0, 'Elige la hora del evento'];
        }
        if (!this.disponible) {
            return [0, 'Añade una cantidad de lugares disponibles'];
        }
        if (!this.ponente_id) {
            return [0, 'Selecciona a la persona encargada del evento'];
        }
        return [1, 'Validado correctamente'];
    }
}