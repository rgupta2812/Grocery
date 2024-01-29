const orderQuery = require('../query/order');

const order = (async(req, res, next) => {
  orderQuery.placeOrder(req.body.order , req.session.details.user_email) 
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


const details = (async(req, res, next) => {
  orderQuery.detailsOrder(req.body.order_id) 
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
module.exports = { order, details };
