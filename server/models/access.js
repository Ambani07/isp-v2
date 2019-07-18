const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessSchema = new Schema({
    name: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    createdAt: {type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: "Access"});

module.exports = mongoose.model('Access', accessSchema);