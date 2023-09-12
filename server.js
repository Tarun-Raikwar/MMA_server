// set dependencies
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const navigator = require("navigator");
require("./db");
require("./models/clientData");
require("./models/FieldAgent");
require("dotenv").config();
const cors = require("cors");


//create express app
const app = express();
const PORT = process.env.PORT || 3000;

// getting collections
const Client = mongoose.model("Client");
const FieldAgent = mongoose.model("FieldAgent");


// setting middleWares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    if(req.body.agent){
        console.log(req.body);
        FieldAgent.find(req.body.agent)
        .then(data => {
            if(data.length == 0) res.send({status: false});
            else{
                req.body = req.body.data;
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.send({status: false});
        })
    }
    else if(req.body.Credentials && req.body.Credentials.username == process.env.Admin_username && req.body.Credentials.password == process.env.Admin_password){
        req.body = req.body.data;
        next();
    }
    else{
        res.send({status: false});
    }
});


// *********************** get requests *************************
app.get('/', (req, res)=>{
    res.send("hello")
});


app.get("/Admin_data", (req, res) => {
    Client.find()
    .then(data => {
        console.log("fetched")
        res.send(data);
    })
    .catch(err => res.send(false))
})

app.post("/FieldAgentData", (req, res) => {
    FieldAgent.find()
    .then(data => res.send(data))
    .catch(err => res.send(false))
});


// ************************ post requests *********************



// submit initial form trigger only during assigning
app.post("/submitForm", (req, res) => {
    Client.insertMany(req.body)
    .then(data => {
        res.send({status: "true", data: data});
    })
    .catch(err => {
        console.log(err);
        res.send({status: "false"});
    })
})


//delete_form

app.post("/delete_form", (req, res) => {
    Client.deleteOne({_id : req.body.id})
    .then(data => {
        res.send({"status": true});
    })
    .catch(err => {
        res.send({"status": false, "error": err});
    })
})



// for admin login
app.post("/loginAdmin", (req, res) => {
    res.send({status: true});
})






const base64_to_binary = (base64String) => {
    return Buffer.from(base64String, 'base64');
} 

//for update data in form
app.post("/updateData", (req, res) => {
    
    let imageArray = new Array();

    for(b64str in req.body.update.image){
        console.log("tarun")
        let converted_str = base64_to_binary(b64str);
        console.log(converted_str);
        imageArray.push(converted_str);
    }

    if(imageArray.length > 0) req.body.image = imageArray;
    

    Client.updateOne({_id: req.body.id}, {$set: req.body.update})
    .then(updatRes => {
        res.send({status: true});
    })
    .catch(err => {
        console.log(err);
        res.send({status: false});
    })
})





//create Field agent account
app.post("/CreateFieldAgentAccount", (req, res) => {
    const FieldAgent_instance = new FieldAgent({
        Name: req.body.Name,
        DOB: req.body.DOB,
        Adharno: req.body.AdharNo,
        Username: req.body.UserName,
        Pass: req.body.Pass,
    })
    FieldAgent_instance.save()
    .then(data => {
        res.send("true");
    })
    .catch(err => {
        console.log(err);
        res.send("false");
    })
});




//for updating internal data of assigning/deleting field agent
app.post("/updateAgent", (req, res) => {
    FieldAgent.updateOne(req.body.agentId, {$set: req.body.update})
    .then(data => {
        res.send("true");
    })
    .catch(err => {
        console.log(err);
        res.send("false");
    })
})



//find data from data using mongo ID
app.post("/findForm", (req, res) => {
    console.log("tarun")
    console.log(req.body);
    Client.find({"_id": {$in: req.body}})
    .then(data => {
        res.send({status: true, fetchedData: data});
    })
    .catch(err => {
        res.send({status: false});
    })
});



//for login field agent
app.post("/loginFieldAgent", (req, res) => {
    FieldAgent.find(req.body)
    .then(data => {
        if(data.length == 0) res.send({status: false});
        else res.send({status: true, AgentData: data[0]});
    })
    .catch(err => {
        console.log(err);
        res.send({status: false});
    })
})



//for marking pending work to be verified
app.post("/AgentWorkDone", (req, res) => {
    FieldAgent.updateOne({_id: req.body.id}, {$set: req.body.update})
    .then(data => {
        res.send("true");
    })
    .catch(err => {
        console.log(err);
        res.send("false");
    })
})


app.listen(PORT, ()=>{
    console.log(`app is listining on port ${PORT}`);
})