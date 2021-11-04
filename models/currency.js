const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CurrencySchema = new Schema({
    name: { type: String, required: true },
    rate: { type: Number, required: true },
});

module.exports = mongoose.model("Currency", CurrencySchema);