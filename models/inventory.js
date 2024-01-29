// Required NPM modules
var mongoose = require('mongoose');

var inventory_schema = new mongoose.Schema(
    {
        product_id: {type : String},
        product_name : {type : String},
        product_price_per_unit : {type : Number},
        product_units : {type : Number},
        product_availability : {type : Boolean}
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('inventory', inventory_schema);