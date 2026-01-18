import jwt from 'jsonwebtoken';

const crearToken=function(user){
    let token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '48h' });
    return token;
}

export {crearToken};