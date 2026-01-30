import pool from '../config/db.js';

export class EventoRegistro {
    constructor(evento_id,registro_id) {
        this.evento_id = evento_id;
        this.registro_id = registro_id;
    }
    async getEventosRegistros() {
        return await pool.query('SELECT * FROM eventos_registros');
    }
    async insertEventoRegistro() {
        await pool.query('INSERT INTO eventos_registros (evento_id,registro_id) VALUES (?,?)', [this.evento_id, this.registro_id]);
    }
}