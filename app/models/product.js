const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: mongoose.Schema.Types.Decimal128
});

mongoose.model('Product', ProductSchema);