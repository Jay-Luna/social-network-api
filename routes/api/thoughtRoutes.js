const router = require('express').Router();
const {
  getThoughts,
//   getSingleThought,
  createThought,
//   updateThought,
//   deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:id
// router.route('/:id')
//   .get(getSingleUser)
//   .put(updateUser)
//   .delete(deleteUser);

// // /api/users/:userId
// router.route('/:userId/friends/:friendId')
//   .post(postFriend)
//   .delete(deleteFriend);

module.exports = router;
