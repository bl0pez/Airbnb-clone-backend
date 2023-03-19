const jwt = require('jsonwebtoken');

/**
 * Recibe el id y el email del usuario y genera un token
 * @param {*} id - id del usuario
 * @param {*} email - email del usuario
 * @returns - retorna el token
 */
const generarJWT = (id, email) => {

    return new Promise((resolve, reject) => {
        const payload = { id, email};

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT,
}