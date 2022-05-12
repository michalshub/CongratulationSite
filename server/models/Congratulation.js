const mongoose = require('mongoose');

const congratulationSchema = mongoose.Schema({
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'
    },
    // sub: {
    //     type: String,
    //     require
    // },
    title: {
        type: String,
        require
    },
    content: {
        type: String,
        require
    },
    wishes: {
        type: String
    },
    male: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Congratulation',
    },
    female: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Congratulation',
    }
    // subcategoryId: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'
    // },
    // sub: {
    //     type: String,
    //     require
    // },
    // title: {
    //     type: String,
    //     require
    // },
    // content: {
    //     type: String,
    //     require
    // },
    // wishes: {
    //     type: String,
    //     require
    // },
    // male: {
    //     type: Boolean,
    //     require
    // },
    // female: {
    //     type: Boolean,
    //     require
    // }


})

module.exports = mongoose.model('Congratulation', congratulationSchema);