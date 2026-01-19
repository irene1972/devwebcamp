import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const decodificarToken=async function(token,secret){

    const response=await pool.query('SELECT * FROM usuarios WHERE token=?',[token]);
    console.log('ireneeeee7:',response);
    if(response[0][0]===undefined){
        return "error";
    }
    
    const decode= jwt.verify(token,secret);
    return decode;
    
    
}

export {decodificarToken};