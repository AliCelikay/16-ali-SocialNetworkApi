const { Schema, Types } = require('mongoose');
const { format_date, format_time } = require('../utils/helpers');

const reactionSchema = new Schema(
    {
        reactionsId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format the timestamp on query
            get: (date) => { return `${format_date(date)} ${format_time(date)}` }
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
