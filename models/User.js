const { Schema , model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: [true, 'El correo ya existe'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
}, {
    timestamps: true,
    versionKey: false
});

// Encryptamos la contraseña antes de guardarla en la base de datos
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparamos la contraseña ingresada con la que está en la base de datos
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);