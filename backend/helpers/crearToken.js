import jwt from 'jsonwebtoken';

const crearToken=function(user){
    let token = jwt.sign({ user }, 'superIrene', { expiresIn: '48h' });
    return token;
}

export {crearToken};