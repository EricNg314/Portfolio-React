const router = require('express').Router();
const projectRoutes = require('./projects');

router.use('/api/projects', projectRoutes);

module.exports = router;
