const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const port = 8080
const mongo_url = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@projects.e6luzys.mongodb.net/wanderlust?retryWrites=true&w=majority`
// const mongo_url = "mongodb://127.0.0.1/wanderlust"
const Listing = require("./models/listing.js")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}))

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


//Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
})

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

//Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
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