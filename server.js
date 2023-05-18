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
    
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    
    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
    
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

app.post("/submitForm", (req, res) => {
    const client_insatnce = new Client({
                name: req.body.name,
                fi_type: req.body.fi_type,
                case_no: req.body.case_no, 
                address: req.body.address,
                dob: req.body.dob,
                age: req.body.age,
                IsAddressSame: "",
                PersonMetName: "",
                RelationWithApplicant: "",
                ProvideAddressIfChanged: "",
                Customer_and_dealer_distance_in_km: "",
                Customer_phone_number: "",
                Family_income: null,
                Previous_occupation: "",
                Residence_owned_by: "",
                Rent_amount_if_rented: "",
                Name_of_landlord_if_rented: "",
                Tenure_of_stay: "",
                Name_plate_seen: "",
                Name_mentioned_on_plate: "",
                Floor_number: "",
                Color_of_building: "",
                FamilyCount: null,
                MartialStatus: "",
                TypeOfFamily: "",
                Occupation: "",
                dependentCount: null,
                Id_proof_seen: "",
                Id_proof_type: "",
                Address_proof_seen: "",
                Address_proof_type: "",
                Type_of_house: "",
                Locality_status: "",
                Locality_type: "",
                Furnishing_of_house: "",
                Area_type: "",
                Locality_and_residencial_area: "",
                Asset_seen: "",
                Residence_accessible_by: "",
                Age_approx: "",
                Phone_number: "",
                Address_neighbour: "",
                Feedback: "",
                Type_of_veichel: "",
                Value_of_veichel: "",
                Manufacturer_name: "",
                Model: "",
                Previous_visit_done_on_this_address: "",
                Number_of_time_visited: "",
                Person_in_previous_visit: "",
                Status_of_verifier: "",
                Verifier_notes: "",
                remarks: "",
                Gaurantor_status_of_verifier: "",
                Gaurantor_verifier_notes: "",
                Gaurantor_remarks: "",
                Status: "",
                Final_address: "",
                FI_done_by: "",
                Final_phone_number: "",
                image: null
    });
    client_insatnce.save()
    .then(data => {
        res.send({status: true, id: data._id});
    })
    .catch(err => {
        console.log(err);
        res.send({status: false});
    })
})

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

app.post("/AssignWork", (req, res) => {
    console.log(req.body);
    FieldAgent.updateOne({_id: req.body.agentId}, {$set: {Pending: req.body.PendingWork}})
    .then(data => {
        console.log(data);
        res.send("true");
    })
    .catch(err => {
        console.log(err);
        res.send("false");
    })
})

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
    // res.send(true);
})


app.listen(PORT, ()=>{
    console.log(`app is listining on port ${PORT}`);
})