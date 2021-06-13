
let db = require('../models')
const Project = db.projects
const User = db.users

exports.createUser = (req, res) => {
    let user = {
        name: req.body.name,
        lastName: req.body.lastName
    }

    return User.create(user)
        .then((user) => {
            // console.log(">> Created user: " + JSON.stringify(user, null, 4));
            // return user;
            res.json({ error: false, message: "User created successfully!", data: [req.body.name, req.body.lastName] });
        }, { include: [Project] })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
};

exports.createProject = (req, res) => {
    return Project.create({
        name: req.body.name,
        duration: req.body.duration,
        userID: req.body.userID,
        status: req.body.status
    })
        .then((project) => {
            // console.log(">> Created project: " + JSON.stringify(project, null, 4));
            // return project;
            res.send({ error: false, message: ">> Created project: ", project: project })
        })
        .catch((err) => {
            console.log(">> Error while creating project: ", err);
        });
};
exports.findAllUsers = (req, res, next) => {
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}
exports.findAllProjects = (req, res, next) => {
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Project.findAll({
        where: condition,
        attributes: [
            'id', 'name', 'duration', 'status' // We had to list all attributes...
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

exports.findUserById = (req, res,) => {
    let userId = req.params.id
    return User.findByPk(userId, { include: ["projects"] })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
};

exports.findProjectById = (req, res) => {
    let projectId = req.body.id

    return Project.findByPk(projectId, { include: ["User"] })
        .then((project) => {
            //return project;
            res.send(project)
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};

exports.findAll = () => {
    return User.findAll({
        include: ["projects"],
    }).then((users) => {
        return user;
    });
};

exports.assignProjectToUser = (req, res) => {
    let ids = req.body.Id
    let updatedId = {
        userID: req.params.id
    }

    Project.update(updatedId, { where: { id: ids } })

    return User.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: db.projects,
            where: {
                id: req.body.Id
            },
            required: false
        }
    })
        .then(user => { res.json(user) })

}
exports.userDelete = (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id: id }, force: true })
        .then(num => {
            res.json(num)
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
    Project.destroy({ where: { userID: id }, force: true })
}
