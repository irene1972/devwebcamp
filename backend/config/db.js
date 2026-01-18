import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',//process.env.DB_HOST, // o la IP del servidor
    user: 'root',//process.env.DB_USER,
    password: 'root',//process.env.DB_PASS,
    database: 'devwebcamp'//process.env.DB_NAME_DB
});

export default pool;