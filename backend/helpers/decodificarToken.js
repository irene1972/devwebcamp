import jwt from 'jsonwebtoken';
import { Auth } from '../models/Auth.js';

const auth=new Auth();

const decodificarToken=async function(token,secret){

    const response=await auth.getUserByToken(token);
    
    if(response[0][0]===undefined){
        return "error";
    }
    
    const decode= jwt.verify(token,secret);
    return decode;
    
    
}

export {decodificarToken};