const mongoose = require('mongoose');

const categoryCongratulateSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },
    subCategories: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }
    ]
    
})

module.exports = mongoose.model('CategoryCongratulate', categoryCongratulateSchema);