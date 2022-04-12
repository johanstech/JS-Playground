const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
} = require('../../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router
  .route('/current')
  .get(authMiddleware, getCurrentUser)
  .put(authMiddleware, updateCurrentUser);

module.exports = router;
