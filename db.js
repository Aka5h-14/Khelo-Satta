const mongoose = require ('mongoose');
const Schema = mongoose;
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const UserSchema = {
    name: String,
    phoneNumber: String,
    password: String,
    email: String,
    money: Number
}

const accountSchema = {
    userId: { type:Schema.Types.ObjectId, ref: 'user' },
    amount: Number,
    bet: Number,
    time: String,
    createdAt: {
        type: Date,
        default: Date.now,  
        index:{expires: "86400"}   // This sets the TTL to 1 hour (use a string or number of seconds)
    }
}

const user = mongoose.model( "users", UserSchema);
const account = mongoose.model( "account", accountSchema);

module.exports = {
    user,
    account
}
