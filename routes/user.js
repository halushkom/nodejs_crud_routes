var express = require('express');
var router = express.Router();
let db = require('../db/config')
const { users } = require('../db/config');
const ProjectModel = require('../models/Project.model');
const User = db.users
const Project = db.projects
let controller = require('../controller/user.controller')

/* GET users listing. */
router.get('/', controller.findAllUsers);



// GET user by ID
router.get('/:id', controller.findUserById)
// ADD new user
router.post('/', controller.createUser)

router.post('/:id/assign', controller.assignProjectToUser);

// Update user by id
router.put('/:id', (req, res) => {


    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('First name is to short')
        return;
    }
    if (!req.body.lastName || req.body.lastName.length < 6) {
        res.status(400).send('Last name is to short')
        return;
    }

    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });

})
// Delete user by id
router.delete('/:id', controller.userAndProjectDelete)

module.exports = router;
