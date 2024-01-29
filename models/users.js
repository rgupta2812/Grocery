// Required NPM modules
var mongoose = require('mongoose');

let user_schema = new mongoose.Schema(
    {
        user_name: { type: String},
        user_email: { type: String},
        user_password : {type : String},
        user_type : {type : String},
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('users', user_schema);