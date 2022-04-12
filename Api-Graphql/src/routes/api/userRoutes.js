const router = require('express').Router();

const { protect } = require('../../middleware/authMiddleware');

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
  .get(protect, getCurrentUser)
  .put(protect, updateCurrentUser);

module.exports = router;
