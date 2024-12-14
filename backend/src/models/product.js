const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initialStock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    colors: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'ML', 'XL']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps:true});

module.exports = mongoose.model('product', productSchema)