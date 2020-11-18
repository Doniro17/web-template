const Router = require('@koa/router');
const users = require('@root/routes/users');
const products = require('@root/routes/products');
const orders = require('@root/routes/orders');
const { errorHandling } = require('@root/middleware');

const router = new Router();

router.use('/users', errorHandling, users.routes());
router.use('/products', errorHandling, products.routes());
router.use('/orders', errorHandling, orders.routes());

module.exports = router;
