const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = 3000
const mongo_url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@airbnb-alt.wiica1f.mongodb.net/?retryWrites=true&w=majority`
const Listing = require("../models/listing.js")


main().then(() => {
    console.log("connected")
})
.catch(() => {
    console.log("failed")
})


async function main() {
    await mongoose.connect(mongo_url)
}



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/test",  async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the Beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India",
    })
    await sampleListing.save();
    console.log("sample was saved"),
})