// Required NPM modules
var mongoose = require('mongoose');

var inventory_updates_schema = new mongoose.Schema(
    {
        product_id : {type:String},
        product_operation_name : {type : String},
        product_update_date : {type : Date},
        product_old_data : {type : Object},
        product_new_data : {type : Object}
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('updates', inventory_updates_schema);