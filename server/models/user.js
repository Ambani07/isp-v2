const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        min: [2, 'Too short, min is 2 character'],
        max: [32, 'Too long, max is 32 character'],
    },
    email: {
        type: String,
        min: [2, 'Too short, min is 2 character'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 character'],
        max: [32, 'Too long, max is 32 character'],
        required: 'Password is required'
    },
    customers: [{type: Schema.Types.ObjectId, ref: 'Customer'}],
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
}, {collection: "User"});

//decrypt hashed password
userSchema.methods.hasSamePassword = function(requestedPassword){

    return bcrypt.compareSync(requestedPassword, this.password);
}

//encrypt user password, before saving to DB
userSchema.pre('save', function(next){
    //get THIS user before saving to DB
    const user = this;
    //encrypt the password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            //call function that are next in the queue, which is save()
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema);