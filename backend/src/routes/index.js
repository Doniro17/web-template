const Router = require('@koa/router');
const users = require('@root/routes/users');
const products = require('@root/routes/products');
const orders = require('@root/routes/orders');
const { errorHandling } = require('@root/middleware');

const router = new Router();

router.use('/api/users', errorHandling, users.routes());
router.use('/api/products', errorHandling, products.routes());
router.use('/api/orders', errorHandling, orders.routes());

module.exports = router;
