const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const favofiteSchema = new Schema({
    imgSrc: {
        type: String,
    },
    name: String,
    user: {
        type: ObjectId,
        ref: 'dogUser',
        required: false
    },
})

module.exports = mongoose.model('favorite', favofiteSchema);