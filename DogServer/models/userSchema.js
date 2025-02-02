const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
    name: {
        type: String,
        // required: [true, 'name is required'],
        unique: [true, 'nmae most be unique'],
        trim: true,
        minLength: [2, 'name must have 2 letters']
    },
    profilePic: {
        type: ObjectId,
        ref: 'favorite'
    },
})

userSchema.pre(/^find/, async function (next) {
    this.populate({
        path: 'profilePic',
        select: 'imgSrc -_id'
    })
    next();
})

module.exports = mongoose.model('dogUser', userSchema)