const Router = require('@koa/router');
const passport = require('koa-passport');
const { isAuthenticated, isAdmin } = require('@root/auth');
const {
  register,
  profile,
  userList,
  getUser,
  updateUser,
  deleteUser,
  getOrders,
} = require('@root/controllers/user');

const router = new Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/users/profile',
  }),
);
router.post('/logout', (ctx) => {
  ctx.logout();
});
router.get('/', isAuthenticated, isAdmin, userList);
router.get('/profile', isAuthenticated, profile);
router.post('/register', register);
router.get('/:id', isAuthenticated, isAdmin, getUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);
router.get('/:id/orders', isAuthenticated, getOrders);

module.exports = router;
