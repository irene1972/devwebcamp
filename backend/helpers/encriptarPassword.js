import bcrypt from 'bcrypt';

const encriptarPassword = async function(password) {
    const rondasDeSal = 10;
    try {
        const hashPass = await bcrypt.hash(password, rondasDeSal);
        return hashPass;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

export { encriptarPassword }
