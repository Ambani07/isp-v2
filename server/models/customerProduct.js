const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerProductSchema = new Schema({
    term: {type: Number, required: true},
    vlanId : {type: String, required: true},
    circuitNo: {type: String, required: true},
    accessType: {type: String, required: true},
    accessSpeed: {type: String, required: true},
    noIPs: {type: String, required: true},
    totalBandwidth: {type: String, required: true, lowercase: true },
    localBandwidth: {type: String, required: true, lowercase: true },
    intBandwidth: {type: String, required: true, lowercase: true },
    teracoConnect: String,
    eiOption: String,
    prioritisation: String,
    productName: {type: String, required: true},
    username: {type: String, required: true},
    accessUsername: {type: String, required: true},
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now },
}, {collection: "CustomerProduct"});

module.exports = mongoose.model('CustomerProduct', customerProductSchema);
