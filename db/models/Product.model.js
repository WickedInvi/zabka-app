import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  barcode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  expDate: {
    type: String,
    required: true,
  },
  dateStamp: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

// module.exports = mongoose.model('Product', ProductSchema);
