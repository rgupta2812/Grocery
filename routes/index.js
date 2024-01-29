const express = require('express');


const loginRoute = require('./login');
const inventoryRoute = require('./inventory');
const orderRoutes = require('./order')

const router = express.Router();

const defaultRoutes = [
  { path: '/login', route: loginRoute },
  { path: '/inventory', route: inventoryRoute },
  { path: '/order', route: orderRoutes },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
