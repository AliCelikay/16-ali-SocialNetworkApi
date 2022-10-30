const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// If any wrong routes
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
