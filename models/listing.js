const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    image: {
        type: String,
        set: (v) =>
            v === '' ? 'https://images.unsplash.com/photo-1682685797365-41f45b562c0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' : v,
    },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;