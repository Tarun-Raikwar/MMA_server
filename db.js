const mongoose = require("mongoose");
require("dotenv").config();

const connection_url = process.env.MONGO_URL;

mongoose.connect(connection_url).then(()=>{
    console.log("connected successfully");
})
.catch(err => {
    console.log(err);
})