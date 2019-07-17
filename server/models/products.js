const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    createdAt: {type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: "Product"});

module.exports = mongoose.model('Product', productSchema);