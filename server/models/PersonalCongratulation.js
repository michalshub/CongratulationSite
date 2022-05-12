const mongoose = require('mongoose');

const personalCongratulationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    // subcategoryId: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'
    // },
    title: {
        type: String,
        require
    },
    content: {
        type: String,
        require
    },
    // wishes: {
    //     type: String,
    //     require
    // },
    male: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Congratulation',
    },
    female: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Congratulation',
    }


})

module.exports = mongoose.model('PersonalCongratulation', personalCongratulationSchema);
