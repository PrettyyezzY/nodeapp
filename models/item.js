const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({ 
    title: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
 }, { timestamps: true});

 const Item = mongoose.model('Item', itemSchema);
 module.exports = Item;