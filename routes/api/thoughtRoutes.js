const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:id
router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// // /api/users/:userId
// router.route('/:userId/friends/:friendId')
//   .post(postFriend)
//   .delete(deleteFriend);

module.exports = router;
