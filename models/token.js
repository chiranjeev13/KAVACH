//token model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tokenAddress: {
        type: String,
        required: true
    },
    issuefaced: {
        type: String,
        required: true
    },
});

