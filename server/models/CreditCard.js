const mongoose = require('mongoose');

const creditCardSchema = mongoose.Schema({
    invitingName: {
        type: String,
        require
    },
    token: {
        type: String,
        require
    }

})

module.exports = mongoose.model('CreditCard', creditCardSchema);