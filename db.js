const mongoose = require("mongoose");

const connection_url = "mongodb+srv://raikwartarun72:pOJF1tIzpkgsKAf7@cluster0.ultgp9l.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url).then(()=>{
    console.log("connected successfully");
})
.catch(err => {
    console.log(err);
})