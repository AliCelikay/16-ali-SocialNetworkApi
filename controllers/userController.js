const { User, Thought } = require('../models');

module.exports = {
    // /api/users
    getUsers(req, res) {
        User.find()//finds all
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:userId
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })//matching _id(in MongoDb) w/ userId
            .select('-__v')//dont give version
            .populate('thoughts')
            .populate('friends')//grab the thoughts of this user and their friends
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/users
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // /api/users/:userId
    updateUser(req, res) {
        // find one first w/ id, then update w/ $set
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },
    // /api/users/:userId
    deleteUser(req, res) {
        // find one first w/ id, then delete will happen when id matches
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    // I believe this was the bonus 
                    // Once the id matches, the promise will find all the thoughts of the user( in user.thoughts) and then delete as many thoughts there is
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        // for adding friends, were finding the main user(Id) and the we're finding the friend(Id), then we're adding the friend(Id) to the friends array in model
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID >8(' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        // to remove friends, we're finding the main user(Id) and the we're finding the friend(Id), then we're adding the friend(Id) to the friends array in model
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // $pull removes from an existing array
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID >8/' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
