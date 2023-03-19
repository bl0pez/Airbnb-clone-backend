const User = require("../models/User");

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
        console.log(error);
        res.status(500).json({
            msj: "Internal server error"
        });
    }

}

module.exports = {
    register
}