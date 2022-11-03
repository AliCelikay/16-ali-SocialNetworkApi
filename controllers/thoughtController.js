const { User, Thought } = require('../models');

module.exports = {
    // /api/thoughts
    getUsers(req, res) {
        User.find()//finds all
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // /api/users/:userId
    getSingleThought(req, res) {
        User.findOne({ _id: req.params.userId })//matching _id(in MongoDb) w/ userId
            .select('-__v')//dont give version
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/thoughts
    // to create a thought, we will first be creating a thought in the Thought model, then we will push(addToSet) this new thought into the thought array in User model
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    // _id name of document from mongodb in thoughts model
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // /api/thoughts/:thoughtId
    updateThought(req, res) {
        // find one first w/ id, then update w/ $set
        User.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },
    // /api/thoughts/:thoughtId
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'THought deleted but no username found with id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/thoughts/:thoughtId/reactions
    addReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID >8(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // /api/thoughts/:thoughtId/reactions/:reactionsId
    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionsId } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID >8(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
