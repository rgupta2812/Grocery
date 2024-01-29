const { Joi } = require('express-validation');

const login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const create_user = {
    body: Joi.object({
        name : Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        type: Joi.string().required()
    }),
};


const add_inventory = {
    body: Joi.object({
        product_id : Joi.string().required(),
        product_name : Joi.string().required(),
        price_per_unit : Joi.number().integer().required(),
        units : Joi.number().integer().required(),
    }),
}

const update_inventory = {
    body: Joi.object({
        product_id : Joi.string().required(),
        product_name : Joi.string(),
        price_per_unit : Joi.number().integer(),
        units : Joi.number().integer(),
    }),
}

const delete_inventory = {
    body: Joi.object({
        product_id : Joi.string().required(),
    }),
}

const place_order = {
    body: Joi.object({
        order : Joi.array().items(Joi.object({
            product_id : Joi.string().required(),
            units : Joi.number().integer().required()
        })),
    }),
}

const order_details = {
    body: Joi.object({
        order_id : Joi.string().required(),
    }),
}

module.exports = { login , create_user , add_inventory , update_inventory, delete_inventory , place_order , order_details}