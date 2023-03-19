const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../helpers/jwt");

const register = async(req, res) => {

    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password
        });
    
        res.status(201).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msj: "Internal server error"
        });
    }

}

const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const userDoc = await User.findOne({ email });

        // Validar si el usuario existe
        if (!userDoc) {
            return res.status(404).json({
                msj: "Credenciales incorrectas - (email)"
            });
        }

        //Comparar el password
        const validPassword = await userDoc.comparePassword(password);

        // Validar si el password es correcto
        if(!validPassword) {
            return res.status(404).json({
                msj: "Credenciales incorrectas - (password)"
            });
        }

        //Generar el JWT
        const token = await generarJWT(userDoc.id, userDoc.email);

        res.cookie('token', token).json({
            msj: "Login correcto",
        })





    }catch (error) {
        console.log(error.message);
        res.status(500).json({
            msj: "Internal server error"
        });
    }

}

module.exports = {
    register,
    login,
}