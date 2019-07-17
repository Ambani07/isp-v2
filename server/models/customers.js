const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    surname: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    email: {type: String, required: true},
    company: {type: String, required: true, lowercase: true},
    contactPersonName: {type: String, required: true, lowercase: true },
    contactPersonCellNo: {type: String, required: true},
    contactPersonPhoneNo: {type: String, required: true},
    address: {type: String, required: true},
    customerProduct: {
        vlanId: String,
        term: String,
        circuitNo: String,
        accessType: String,
        accessSpeed: String,
        noIPs: String,
        totalBandwidth: String,
        localBandwidth: String,
        intBandwidth: String,
        teracoConnect: String,
        eiOption: String,
        prioritisation: String,
        productName: String,
        username: String,
        accessUsername: String,
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
    },
    createdAt: {type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: "Customer"});

module.exports = mongoose.model('Customer', customerSchema);