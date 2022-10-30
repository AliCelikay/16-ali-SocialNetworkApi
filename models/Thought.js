const { Schema, model } = require('mongoose');
const { format_date, format_time } = require('../utils/helpers');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format the timestamp on query
            get: (date) => { return `${format_date(date)} ${format_time(date)}` }
        },
        username: [
            {
                type: String,
                required: true,
            },
        ],
        //  Array of nested documents created with the `reactionSchema`
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// Virtual property `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
userSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
