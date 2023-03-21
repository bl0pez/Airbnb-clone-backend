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

        const userDoc = await User.findOne({ email }).select("+password");

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
        const token = await generarJWT(userDoc._id);

        res.cookie('token', token).json({
            msj: "Login correcto",
            user: {
                _id: userDoc._id,
                name: userDoc.name,
                email: userDoc.email,
            },
        })





    }catch (error) {
        console.log(error.message);
        res.status(500).json({
            msj: "Internal server error"
        });
    }

}

const renewToken = async(req, res) => {
    try {
        

        res.json({
            msj: "Renew token",
            user: {
                _id: req.user._id,
                name: req.user.name,
                email : req.user.email,
            }
        });


    } catch (error) {
        res.status(500).json({
            msj: "Internal server error"
        })
    }
}

const logout = async(req, res) => {
    res.cookie('token', '').json({
        msj: "Logout correcto"
    })
}

module.exports = {
    register,
    login,
    renewToken,
    logout
}