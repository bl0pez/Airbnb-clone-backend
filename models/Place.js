const { Schema , model } = require('mongoose');

const PlaceSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    perks: {
        type: [String],
    },
    extraInfo: {
        type: String,
    },
    checkIn: {
        type: String,
    },
    checkOut: {
        type: String,
    },
    maxGuests: {
        type: Number,
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('Place', PlaceSchema);