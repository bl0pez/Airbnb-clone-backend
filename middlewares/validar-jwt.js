const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validarJWT = async(req, res, next) => {
    
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({
            msj: 'No hay token en la petición'
        });
    }

    try {
        
        const { _id, email} = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        //Validamos que exista el usuario
        const userDoc = await User.findById(_id).select('-password');

        if(!userDoc) {
            return res.status(401).json({
                msj: 'Token no válido - usuario no existe en DB'
            });
        }

        req.user = userDoc;
        next();

        

        

        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msj: "Internal server error"
        })
    }


}

module.exports = {
    validarJWT,
}