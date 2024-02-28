const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property `reactionCount` that gets the length of the thoughts's reactions array field
thoughtSchema
    .virtual('reactionCount')
    // Getter 
    .get(function () {
        return this.reactions.length;
    })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
