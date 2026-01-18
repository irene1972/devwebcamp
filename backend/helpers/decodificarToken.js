import jwt from 'jsonwebtoken';

const decodificarToken=function(token,secret){
    return jwt.verify(token,secret);
    
}

export {decodificarToken};