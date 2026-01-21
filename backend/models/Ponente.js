import pool from '../config/db.js';

export class Ponente {
    async getPonentes() {
        return await pool.query('SELECT * FROM ponentes');
    }

    async getPonenteById(id) {
        return await pool.query('SELECT * FROM ponentes WHERE id=?', [id]);
    }

    async updatePonenteWithoutImage(nombre, apellido, ciudad, pais, tags, redes,id){
        await pool.query('UPDATE ponentes SET nombre=?,apellido=?,ciudad=?,pais=?,tags=?,redes=? WHERE id=?', [nombre, apellido, ciudad, pais, tags, redes,id]);
    }

    async updatePonenteAndImage(nombre, apellido, ciudad, pais, nombreArchivoSinExtension, tags, redes,id){
        pool.query('UPDATE ponentes SET nombre=?,apellido=?,ciudad=?,pais=?,imagen=?,tags=?,redes=? WHERE id=?', [nombre, apellido, ciudad, pais, nombreArchivoSinExtension, tags, redes,id]);
    }

    async insertPonente(nombre, apellido, ciudad, pais, nombreArchivoSinExtension, tags, redes) {
        await pool.query('INSERT INTO ponentes (nombre,apellido,ciudad,pais,imagen,tags,redes) VALUES (?,?,?,?,?,?,?)', [nombre, apellido, ciudad, pais, nombreArchivoSinExtension, tags, redes]);
    }

    async deletePonenteById(id){
        await pool.query('DELETE FROM ponentes WHERE id=?', [id]);
    }
}