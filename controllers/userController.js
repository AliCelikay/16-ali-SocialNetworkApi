const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()//finds all
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // getSingleUser(req, res) {
    //     User.findOne({})
    // }
};
