const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({ 
    item: {
        type: mongoose.Schema.ObjectId,
        ref: "Item",
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
 },
 {
    toJSON: {
      virtuals: true
    }
  },
   { timestamps: true});


 shopSchema.virtual("items", {  // nazwa virtualnego pola
    ref: "Item",                  // model, którego chcemy użyć
    localField: "\_id",           // znajdź talk gdzie 'localField'
    foreignField: "shop",        // jest równe 'foreignField'
    justOne: false                // wartości talks dla eventu może być więcej nize 1
  });

 const Shop = mongoose.model('Shop', shopSchema);
 module.exports = Shop;