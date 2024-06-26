const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercare: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    require: true
  }, quantity: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: { type: Array },
  brand: {
    type: String,
    require: true, select: true
  },
  color: {
    type: String,
    require: true
  },
  ratings: {
    star: Number,
    postedby: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
  },
  totalrating: {
    type: String,
    default: 0
  },

}, { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
