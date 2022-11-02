const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes');

// /api

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
