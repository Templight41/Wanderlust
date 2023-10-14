const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = 8080
const mongo_url = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@projects.e6luzys.mongodb.net/wanderlust?retryWrites=true&w=majority`
// const mongo_url = "mongodb://127.0.0.1/wanderlust"
const Listing = require("./models/listing.js")


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
    console.log("sample was saved");
    res.send("done")
})

app.listen(port)