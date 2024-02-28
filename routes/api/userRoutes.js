const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  postFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId
router.route('/:userId/friends/:friendId')
  .post(postFriend);

module.exports = router;
