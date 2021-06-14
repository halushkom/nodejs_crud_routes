
let db = require('../db/config')
var express = require('express');
const { projects } = require('../db/config');
var router = express.Router();
const Project = db.projects
let controller = require('../controller/user.controller')

router.get('/', controller.findAllProjects)
router.get('/:id', controller.findProjectById)
router.post('/', controller.createProject)
router.delete('/:id', controller.deleteProjectById)
router.put('/:id', controller.updateProjectById)
module.exports = router;