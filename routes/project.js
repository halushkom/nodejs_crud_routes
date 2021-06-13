
let db = require('../db/config')
var express = require('express');
const { projects } = require('../db/config');
var router = express.Router();
const Project = db.projects
let controller = require('../controller/user.controller')

router.get('/', controller.findAllProjects)
router.get('/a', controller.findAll)
router.post('/', controller.createProject)
module.exports = router;