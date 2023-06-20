const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const navigator = require("navigator");
require("./db");
require("./models/clientData");
require("./models/FieldAgent");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cors());

const Client = mongoose.model("Client");
const FieldAgent = mongoose.model("FieldAgent")


const getCurrentDate = ()=>{
    return new Date();
}

// *********************** get requests *************************
app.get('/', (req, res)=>{
    res.send("hello")
});


app.get("/Admin_data", (req, res) => {
    console.log("get")
    Client.find()
    .then(data => {
        console.log("fetched")
        res.send(data);
    })
    .catch(err => res.send(false))
})

app.get("/FieldAgentData", (req, res) => {
    FieldAgent.find()
    .then(data => res.send(data))
    .catch(err => res.send(false))
});


// ************************ post requests *********************



// submit initial form trigger only during assigning
app.post("/submitForm", (req, res) => {
    Client.insertMany(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.send("server error");
    })
})


//delete_form

app.post("/delete_form", (req, res) => {
    console.log(req.body);
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
    console.log(req.body);
    if(req.body.username === "Bharat" && req.body.password === "Bharat@123"){
        res.send({status: true});
    }
    else res.send({status: false});
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
    console.log(req.body.image);

    Client.updateOne({_id: req.body.id}, {$set: req.body.update})
    .then(updatRes => {
        console.log(updatRes);
        res.send({status: true});
    })
    .catch(err => {
        console.log(err);
        res.send({status: false});
    })
})





//create Field agent account
app.post("/CreateFieldAgentAccount", (req, res) => {
    console.log(req.body);
    const FieldAgent_instance = new FieldAgent({
        Name: req.body.Name,
        DOB: req.body.DOB,
        Adharno: req.body.AdharNo,
        Username: req.body.UserName,
        Pass: req.body.Pass,
    })
    FieldAgent_instance.save()
    .then(data => {
        console.log(data);
        res.send("true");
    })
    .catch(err => {
        console.log(err);
        res.send("false");
    })
});




//for updating internal data of assigning/deleting field agent
app.post("/updateAgent", (req, res) => {
    console.log(req.body);
    FieldAgent.updateOne({_id: req.body.agentId}, {$set: req.body.update})
    .then(data => {
        console.log(data);
        res.send("true");
    })
    .catch(err => {
        console.log(err);
        res.send("false");
    })
})



//find data from data using mongo ID
app.post("/findForm", (req, res) => {
    console.log(req.body);
    Client.find({"_id": {$in: req.body}})
    .then(data => {
        // console.log(data);
        res.send({status: true, fetchedData: data});
    })
    .catch(err => {
        res.send({status: false});
    })
});



//for login field agent
app.post("/loginFieldAgent", (req, res) => {
    console.log(req.body);
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
    console.log(req.body)
    FieldAgent.updateOne({_id: req.body.id}, {$set: req.body.update})
    .then(data => {
        console.log(data);
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