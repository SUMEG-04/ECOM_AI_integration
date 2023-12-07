const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      color:{
        type:String,
        required:true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      product:{
        type:Object,
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
