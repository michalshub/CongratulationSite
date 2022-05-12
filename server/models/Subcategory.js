const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        require
    },

    categoryCongratulateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryCongratulate'
    },

    congratulation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Congratulation'
        }
    ],
    wallpapers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallpapers'
        }
    ]

})

module.exports = mongoose.model('Subcategory', subcategorySchema);