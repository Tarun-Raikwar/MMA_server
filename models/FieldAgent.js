const mongoose = require("mongoose");

const FieldAgentSchema = new mongoose.Schema({
    Name:{
        type: String
    },
    DOB:{
        type: String
    },
    Adharno:{
        type: String
    },
    Username:{
        type: String
    },
    Pass:{
        type: String
    },
    Pending: {
        type: Array,
        default: []
    },
    Done: {
        type: Array,
        default: []
    }
});

mongoose.model("FieldAgent", FieldAgentSchema);