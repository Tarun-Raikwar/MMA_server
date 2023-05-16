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
    Customer_and_dealer_distance_in_km: {
        type: String
    },
    Customer_phone_number: {
        type: String
    },
    Family_income: {
        type: String
    },
    Previous_occupation: {
        type: String
    },
    Residence_owned_by: {
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
    FamilyCount: {
        type: String
    },
    MartialStatus: {
        type: String
    },
    TypeOfFamily: {
        type: String
    },
    Occupation: {
        type: String
    },
    dependentCount: {
        type: String
    },
    Id_proof_seen: {
        type: String
    },
    Id_proof_type: {
        type: String
    },
    Address_proof_seen: {
        type: String
    },
    Address_proof_type: {
        type: String
    },
    Type_of_house: {
        type: String
    },
    Locality_status: {
        type: String
    },
    Locality_type: {
        type: String
    },
    Furnishing_of_house: {
        type: String
    },
    Area_type: {
        type: String
    },
    Locality_and_residencial_area: {
        type: String
    },
    Asset_seen: {
        type: String
    },
    Residence_accessible_by: {
        type: String
    },
    Age_approx: {
        type: String
    },
    Phone_number: {
        type: String
    },
    Address_neighbour: {
        type: String
    },
    Feedback: {
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
    Previous_visit_done_on_this_address: {
        type: String
    },
    Number_of_time_visited: {
        type: String
    },
    Person_in_previous_visit: {
        type: String
    },
    Status_of_verifier: {
        type: String
    },
    Verifier_notes: {
        type: String
    },
    remarks: {
        type: String
    },
    Gaurantor_status_of_verifier: {
        type: String
    },
    Gaurantor_verifier_notes: {
        type: String
    },
    Gaurantor_remarks: {
        type: String
    },
    Status: {
        type: String
    },
    Final_address: {
        type: String
    },
    FI_done_by: {
        type: String
    },
    Final_phone_number: {
        type: String
    },
    image: {
        type: Array,
        default: []
    },
    date: {
        type: String
    },
    location: {
        type: String
    }
});

mongoose.model("Client", ClientSchema);