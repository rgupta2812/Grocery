// Required NPM modules
var mongoose = require('mongoose');

var order_schema = new mongoose.Schema(
    {
        user_email : {type:String},
        product_id : {type : String},
        product_units : {type : Number},
        purchase_cost : {type : Number}
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('orders', order_schema);