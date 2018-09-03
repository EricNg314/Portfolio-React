const router = require('express').Router();

const projectController = require('../controllers/projectController');

// Matching with "/api/projects/all"
router.route('/all')
  .get(projectController.getAllProjects)
  // console.log("entered projects routes all");

module.exports = router;


