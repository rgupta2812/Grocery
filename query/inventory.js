const httpStatus = require('http-status');
const { inventory , updates } = require('../models');

const addInventory = async (product_id, product_name , product_price_per_unit , product_units) => {
    try {
        let finder = await inventory.findOne({
            product_id,
        }, {
            product_name : 1 , product_id : 1
        });
        if (finder == null && product_units > 0) {
            let data = await inventory.create({
                product_id,
                product_name,
                product_price_per_unit,
                product_units,
                product_availability : true
            })
            await updates.create({product_id , product_operation_name : "CREATE" , product_update_date : new Date() , product_old_data : {} , product_new_data : data})            
            return Promise.resolve({
                status: true, statusCode: httpStatus.CREATED, message : "Product Added Sucessfully"      
            });
        }
        else if(finder) {
            return Promise.resolve({
                status: true, statusCode: httpStatus.CONFLICT, message : `Product ID : ${finder.product_id} was already used for Product Name : ${finder.product_name}`,
            });
        }
        else if(product_units < 1){
            return Promise.resolve({
                status: true, statusCode: httpStatus.CONFLICT, message : `Number of Units Should be Greater than 0`,
            });
        }

    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};

const getItemAdmin = async () => {
    try {
        let finder = await inventory.find({});
        return Promise.resolve({status : true ,statusCode : httpStatus.OK, data : finder})
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};

const getItemUser = async () => {
    try {
        let finder = await inventory.find({product_availability : true});
        return Promise.resolve({status : true ,statusCode : httpStatus.OK, data : finder})
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};

const updateInventory = async (product_id, product_name , product_price_per_unit , product_units) => {
    try {

        let updateQuery = {$set:{}}

        if(product_name){updateQuery.$set.product_name = product_name}
        if(product_price_per_unit){updateQuery.$set.product_price_per_unit = product_price_per_unit}
        if(product_units){updateQuery.$set.product_units = product_units}
        if(product_units == 0){updateQuery.$set.product_availability = false}

        console.log(updateQuery)

        let finder0 = await inventory.findOne({product_id});
        let update = await inventory.updateOne({
            product_id,
        }, updateQuery)

        console.log(update)

        if(update.modifiedCount == 1 && update.matchedCount == 1){
            let finder1 = await inventory.findOne({product_id});
            await updates.create({product_id , product_operation_name : "UPDATE" , product_update_date : new Date() , product_old_data : finder0 , product_new_data : finder1})            
            return Promise.resolve({
                status:true ,statusCode:httpStatus.OK , message : "Inventory updated Sucessfully"
            })
        }
        else if(update.matchedCount == 0){
            return Promise.resolve({
                status:false ,statusCode:httpStatus.NOT_FOUND , message : "Inventory Not Found"
            })
        }
        else if(update.modifiedCount == 0 && update.matchedCount == 1){
            return Promise.resolve({
                status:false ,statusCode:httpStatus.NOT_MODIFIED , message : "Inventory Not Updated"
            })
        }      
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};

const deleteInventory = async (product_id) => {
    try {
        let deleter = await inventory.deleteOne({product_id});
        let finder0 = await inventory.findOne({product_id});

        if(deleter.deletedCount == 1){
            await updates.create({product_id , product_operation_name : "DELETE" , product_update_date : new Date() , product_old_data : finder0 , product_new_data : {}})            
            return Promise.resolve({status : true ,statusCode : httpStatus.OK, message : "Inventory Deleted Sucessully"})
        }
        else{
            return Promise.resolve({status : false ,statusCode : httpStatus.EXPECTATION_FAILED, message : "Inventory not deleted"})
        }

        
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};


const historyInventory = async (product_id) => {
    try {
        let finder = await updates.find({product_id}).sort({createdAt : -1});
        return Promise.resolve({status : true ,statusCode : httpStatus.OK, data : finder})
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};

module.exports = {addInventory , getItemAdmin , getItemUser, updateInventory , deleteInventory , historyInventory}