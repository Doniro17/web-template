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
  logout,
} = require('@root/controllers/user');

const router = new Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/users/profile',
  }),
);
// router.post('/logout', (ctx) => {
//   console.log('HALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');

//   ctx.logout();
//   // ctx.cookies.set('hui', 'ALOO', { httpOnly: false });
// });
router.post('/logout', isAuthenticated, logout);
router.get('/', isAuthenticated, isAdmin, userList);
router.get('/profile', isAuthenticated, profile);
router.post('/register', register);
router.get('/:id', isAuthenticated, getUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);
router.get('/:id/orders', isAuthenticated, getOrders);

module.exports = router;
