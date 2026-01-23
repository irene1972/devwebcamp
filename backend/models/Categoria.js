import pool from '../config/db.js';

export class Categoria {
    async getCategorias() {
        return await pool.query('SELECT * FROM categorias');
    }
}