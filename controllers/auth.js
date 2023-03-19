const User = require("../models/User");

const register = async(req, res) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

    res.status(201).json(user)

}

module.exports = {
    register
}