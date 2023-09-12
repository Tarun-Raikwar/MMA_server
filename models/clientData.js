const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dob: {
        type: String
    },
    address: {
        type: String
    },
    age: {
        type: String
    },
    fi_type: {
        type: String
    },
    case_no: {
        type: String
    },

    IsAddressSame: {
        type: String
    },
    PersonMetName: {
        type: String
    },
    RelationWithApplicant: {
        type: String
    },
    ProvideAddressIfChanged: {
        type: String
    },

    
    Family_income: {
        type: String
    },
    Previous_occupation: {
        type: String
    },
    Occupation: {
        type: String
    },
    Residence_owned_by: {
        type: String
    },
    residence: {
        type: String
    },
    Rent_amount_if_rented: {
        type: String
    },
    Name_of_landlord_if_rented: {
        type: String
    },
    Tenure_of_stay: {
        type: String
    },

    

    Name_plate_seen: {
        type: String
    },
    Name_mentioned_on_plate: {
        type: String
    },
    Floor_number: {
        type: String
    },
    Color_of_building: {
        type: String
    },
    Color_of_gate: {
        type: String
    },



    FamilyCount: {
        type: String
    },
    MartialStatus: {
        type: String
    },
    TypeOfFamily: {
        type: String
    },
    dependentCount: {
        type: String
    },



    Id_proof: {
        type: String
    },
    Type_of_house: {
        type: String
    },
    Locality_type: {
        type: String
    },
    Furnishing_of_house: {
        type: String
    },
    Area_approx: {
        type: String
    },
    


    Asset_seen: {
        type: String
    },


    tpcOne: {
        type: String
    },
    tpcTwo: {
        type: String
    },    


    Type_of_veichel: {
        type: String
    },
    Value_of_veichel: {
        type: String
    },
    Manufacturer_name: {
        type: String
    },
    Model: {
        type: String
    },



    Previous_visit: {
        type: String
    },


    Status_of_verifier: {
        type: String
    },
    Verifier_notes: {
        type: String
    },
    

    Status: {
        type: String
    },

    
    image: {
        type: Array,
        default: []
    },
    date: {
        type: String
    },
    remarks: {
        type: String
    },
    location: {
        type: String
    }
});

mongoose.model("Client", ClientSchema);