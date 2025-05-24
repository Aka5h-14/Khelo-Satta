const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    password: String,
    email: String,
    money: {
        type: Number,
        get: v => Math.floor(v),  // Ensure we always get whole numbers
        set: v => Math.floor(v),  // Ensure we always store whole numbers
        default: 0
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    amount: {
        type: Number,
        get: v => Math.floor(v),
        set: v => Math.floor(v),
        default: 0
    },
    bet: {
        type: Number,
        get: v => Math.floor(v),
        set: v => Math.floor(v),
        default: 0
    },
    time: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '48h' }   // This sets the TTL to 48 hour
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

const user = mongoose.model('users', UserSchema);
const account = mongoose.model('account', accountSchema);

module.exports = {
    user,
    account
};
