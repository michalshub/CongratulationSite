const mongoose = require('mongoose');

const wallpapersSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },

    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'
    },

    url: {
        type: String,
        require
    },
    type: {
        type: String,
        require
    }

})

module.exports = mongoose.model('Wallpapers', wallpapersSchema);