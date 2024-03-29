const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v');

      // if user not found, throw 404 error
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        // validators re-run to verify if email is in the correct format
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { runValidators: true, new: true }
      );

      // if user not found, throw 404 error
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      // if user not found, throw 404 error
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }

      // BONUS: delete associated thoughts when deleted
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a new friend to a user's friend list
  async postFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // adds new friendId to friends array of user
        { $addToSet: { friends: req.params.friendId } },
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true }
      );

      // if user not found, throw 404 error
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // removes friendId from friends array
        { $pull: { friends: req.params.friendId } },
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true }
      );

      // if user not found, throw 404 error
      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID'
        });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};