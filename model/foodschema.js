// model/foodschema.js
const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String }  // Tasvir uchun yangi maydon
});

const Food = model('Food', foodSchema);
module.exports = Food;
