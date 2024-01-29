const httpStatus = require('http-status');
const { inventory, orders } = require('../models');
const { ObjectId } = require('mongodb');


const placeOrder = async (order, email) => {
    try {

        let response = []
        for (i of order) {
            let check_avail = await inventory.findOne({
                product_id: i.product_id,
                product_availability: true,
                product_units: { $gte: i.units }
            })

            if (check_avail) {
                let place_order = await orders.create({
                    user_email: email,
                    product_id: i.product_id,
                    product_units: i.units,
                    purchase_cost: i.units * check_avail.product_price_per_unit
                })

                response.push({
                    order_id: place_order._id,
                    product_id: i.product_id,
                    product_units: i.units,
                    purchase_cost: i.units * check_avail.product_price_per_unit,
                    message: "ORDER PLACED SUCCESSFULLY"
                })

                if ((check_avail.product_units - i.units) == 0) {
                    await inventory.updateOne({ product_id: i.product_id }, { $set: { product_units: (check_avail.product_units - i.units), product_availability: false } })
                }
                else {
                    await inventory.updateOne({ product_id: i.product_id }, { $set: { product_units: (check_avail.product_units - i.units) } })
                }

            }
            else {
                response.push({
                    product_id: i.product_id,
                    product_units: i.units,
                    message: "ORDER PLACEMENT FAILED"
                })
            }
        }

        return Promise.resolve({
            status: true,
            statusCode: httpStatus.OK,
            data: response
        })
    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status: false, message: "Internal Server Error"
        });
    }
};


const detailsOrder = async (order_id) => {
    try {

        let details = await orders.findOne({_id : new ObjectId(order_id)})
        if(details){
            return Promise.resolve({
                status : true,
                statusCode : httpStatus.OK,
                data : details
            })
        }
        else{
            return Promise.resolve({
                status : false,
                statusCode : httpStatus.NOT_FOUND,
                messae : "Data not found"
            })
        }

    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status: false, message: "Internal Server Error"
        });
    }
};

module.exports = { placeOrder , detailsOrder}