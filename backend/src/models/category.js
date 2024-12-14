const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    },
    deletedAt: {
        type: Date
    }
},{timestamps:true});

module.exports = mongoose.model('category', categorySchema)