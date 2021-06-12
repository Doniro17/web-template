const Router = require('@koa/router');
const { isAuthenticated, isClient } = require('@root/auth');
const { addOrder, getOrder, updateOrder } = require('@root/controllers/order');

const router = new Router();

router.post('/', isAuthenticated, isClient, addOrder);
router.get('/:id', isAuthenticated, isClient, getOrder);
router.put('/:id', isAuthenticated, updateOrder);

module.exports = router;
