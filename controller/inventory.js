const inventoryQuery = require('../query/inventory');

const add = (async(req, res, next) => {
    inventoryQuery.addInventory(req.body.product_id, req.body.product_name , req.body.price_per_unit , req.body.units)
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

const get = (async(req, res, next) => {
    inventoryQuery.getItemAdmin()
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

const getAvail = (async(req, res, next) => {
    inventoryQuery.getItemUser()
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

const update = (async(req, res, next) => {
    inventoryQuery.updateInventory(req.body.product_id, req.body.product_name , req.body.price_per_unit , req.body.units)
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

const deleteInv = (async(req, res, next) => {
    inventoryQuery.deleteInventory(req.body.product_id)
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


const history = (async(req, res, next) => {
    inventoryQuery.historyInventory(req.body.product_id)
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
module.exports = {add , get , update,deleteInv ,history,getAvail }