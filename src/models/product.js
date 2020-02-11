const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String, 
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type:Number,
    required: true,
  },
  active:{
    type: Boolean,
    default: true,
  },
  tags: [{
    type: String,
    required: true,
  }]
});
module.exports = mongoose.model('Product', productSchema );