const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6
    },

    congratulation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PersonalCongratulation'
        }
    ]

})

module.exports = mongoose.model('User', userSchema);