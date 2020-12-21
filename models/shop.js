const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({ 
    item: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
 }, { timestamps: true});

 const Shop = mongoose.model('Shop', shopSchema);
 module.exports = Shop;