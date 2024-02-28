const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought & add id to associated user thought array
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //   // Update a user
    //   async updateUser(req, res) {
    //     try {
    //       const user = await User.findOneAndUpdate(
    //         { _id: req.params.id },
    //         { $set: req.body },
    //         // Sets to true so updated document is returned; Otherwise original document will be returned
    //         { runValidators:true, new: true }
    //       );

    //       if (!user) {
    //         return res.status(404).json({ message: 'No user with that ID' });
    //       }

    //       res.json(user);
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   },
    //   // Delete a user and associated thoughts
    //   async deleteUser(req, res) {
    //     try {
    //       const user = await User.findOneAndDelete({ _id: req.params.id });

    //       if (!user) {
    //         return res.status(404).json({ message: 'No user with that ID' });
    //       }

    //       // BONUS: delete associated thoughts when deleted
    //       //  await Application.deleteMany({ _id: { $in: user.applications } });
    //       res.json({ message: 'User and associated thoughts deleted!' })
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   },
    //   // Add a new friend to a user's friend list
    //   async postFriend(req, res) {
    //     try {
    //       const user = await User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $addToSet: { friends: req.params.friendId } },
    //         // Sets to true so updated document is returned; Otherwise original document will be returned
    //         { new: true }
    //       );

    //       if (!user) {
    //         return res.status(404).json({ message: 'No user with that ID' });
    //       }

    //       res.json(user);
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   },
    //   // Remove a friend from a user's friend list
    //   async deleteFriend(req, res) {
    //     try {
    //       const user = await User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $pull: { friends: req.params.friendId } },
    //         // Sets to true so updated document is returned; Otherwise original document will be returned
    //         { new: true }
    //       );

    //       if (!user) {
    //         return res.status(404).json({ message: 'No user with that ID' });
    //       }

    //       res.json(user);
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   }
};