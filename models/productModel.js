const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);