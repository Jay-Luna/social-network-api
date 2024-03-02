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

            // if thought not found, throw 404 error
            if (!thought) {
                return res.status(404).json({
                    message: 'No thought with that ID'
                });
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

            // find user and newly created thought to thoughts array
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                // adds to specific thoughts field
                { $addToSet: { thoughts: thought._id } },
                // Sets to true so updated document is returned; Otherwise original document will be returned
                { new: true }
            );

            // if user not found, throw 404 error
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
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                // updates thought with request body
                { $set: req.body },
                // Sets to true so updated document is returned; Otherwise original document will be returned
                { new: true }
            );

            // if thought not found, throw 404 error
            if (!thought) {
                return res.status(404).json({
                    message: 'No thought with that ID'
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            // if thought not found, throw 404 error
            if (!thought) {
                return res.status(404).json({
                    message: 'No thought with that ID'
                });
            }
            res.json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new reaction and add to a thought's reaction array field
    async postReaction(req, res) {
        try {
            // reaction is a schema and can be updated thought object directly
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // adds reaction to thought with request body
                { $addToSet: { reactions: req.body } },
                // Sets to true so updated document is returned; Otherwise original document will be returned
                { new: true }
            );

            // if thought not found, throw 404 error
            if (!thought) {
                return res.status(404).json({
                    message: 'No thought with that ID'
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a reaction and update thought reaction array field
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // removes reaction from thought with reactionId
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );

            // if thought not found, throw 404 error
            if (!thought) {
                return res.status(404).json({
                    message: 'No thought with that ID'
                });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};