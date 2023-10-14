const mongoose = require('mongoose');
const initdata = require('../init/data.js');
const Listing = require('../models/listing.js');
require('dotenv').config()
const mongo_url = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@projects.e6luzys.mongodb.net/wanderlust?retryWrites=true&w=majority`
// const mongo_url = "mongodb://127.0.0.1/wanderlust"

main().then(() => {
    console.log("connected")
})
.catch(() => {
    console.log("failed")
})


async function main() {
    await mongoose.connect(mongo_url)
}

// console.log(process.env)

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialised");
}

initDB();
