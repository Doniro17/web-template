const Router = require('@koa/router');
const { isAuthenticated, isClient, isCourier } = require('@root/auth');
const {
  addOrder,
  getOrder,
  updateOrder,
  getOrders,
  cancelOrder,
} = require('@root/controllers/order');

const router = new Router();

router.post('/', isAuthenticated, isClient, addOrder);
router.get('/:id', isAuthenticated, isClient, getOrder);
router.put('/:id', isAuthenticated, updateOrder);
router.delete('/:id', isAuthenticated, cancelOrder);

router.get('/', isAuthenticated, isCourier, getOrders);

module.exports = router;
