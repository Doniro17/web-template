const Router = require('@koa/router');
const { isAuthenticated, isClient, isAdmin } = require('@root/auth');
const {
  addProduct,
  productList,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('@root/controllers/product');

const router = new Router();

router.get('/', isAuthenticated, isClient, productList);
router.post('/', isAuthenticated, isAdmin, addProduct);
router.get('/:id', isAuthenticated, getProduct);
router.put('/:id', isAuthenticated, isAdmin, updateProduct);
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct);

module.exports = router;
