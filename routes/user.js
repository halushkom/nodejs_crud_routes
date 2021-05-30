var express = require('express');
var router = express.Router();
let connection = require('../config')
connection.connect(err => {
  if (err) {
    console.log(err)
    return err
  } else {
    console.log('Connection ------- OK')
  }

})
// let userList = [
//   {
//     "id": 1,
//     "name": "Jean",
//     "lastName": "K. Rist"
//   },
//   {
//     "id": 2,
//     "name": "Justin",
//     "lastName": "Hill"
//   }]

/* GET users listing. */
router.get('/', function (req, res, next) {
  // Database version
  let getUsersList = "SELECT * FROM users"
  connection.query(getUsersList, (err, result) => {
    if (err) throw err
    res.send(result)
  })
  connection.end()

  // without database
  //res.send(userList);
});
// GET user by ID
router.get('/:id', (req, res) => {

  // without database
  // let user = userList.find(item => item.id === +req.params.id)
  // if (!user) res.status(404).send("User with given id was not found")
  // res.send(user)


  // Database version
  let getUser = `SELECT * FROM users WHERE id='${req.params.id}'`
  connection.query(getUsers, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
// ADD new user
router.post('/', (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('First name is to short')
    return;
  }
  if (!req.body.lastName || req.body.lastName.length < 6) {
    res.status(400).send('Last name is to short')
    return;
  }
  // without database
  // let user = {
  //   id: userList.length + 1,
  //   name: req.body.name,
  //   lastName: req.body.lastName
  // }

  // Database version
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let newDBRecord = `INSERT INTO users (id, name, lastName) VALUES ('${getRandomIntInclusive(0, 100000)}', '${req.body.name}', '${req.body.lastName}')`;
  connection.query(newDBRecord, (err, result) => {
    if (err) throw err
    console.log("1 record inserted");
    res.json({ error: false, message: "User added successfully!", data: [req.body.name, req.body.lastName] });
  })
  connection.end()


  // without database
  // userList.push(user)
  // console.log(user)
  // console.log(userList)
  // res.send(user)
})
// Update user by id
router.put('/:id', (req, res) => {
  // without database
  //let user = userList.find(item => item.id === +req.params.id)
  //if (!user) res.status(404).send("User with given id was not found")

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('First name is to short')
    return;
  }
  if (!req.body.lastName || req.body.lastName.length < 6) {
    res.status(400).send('Last name is to short')
    return;
  }

  // without database
  // user.name = req.body.name
  // user.lastName = req.body.lastName
  // res.send(user)


  // Database version
  let updateDBRecord = `UPDATE users SET name="${req.body.name}", lastName="${req.body.lastName}" WHERE id = "${req.params.id}"`;
  connection.query(updateDBRecord, (err, result) => {
    if (err) throw err
    console.log(`${result.affectedRows} record inserted`);
    res.json({ error: false, message: "User added successfully!", data: [req.body.name, req.body.lastName] });
  })
})
// Delete user by id
router.delete('/:id', (req, res) => {
  // without database
  // let user = userList.find(item => item.id === +req.params.id)
  // if (!user) res.status(404).send("User with given id was not found")
  // userList.splice(userList.indexOf(user), 1)
  // res.send(user)


  // Database version
  let deleteDBRecord = `DELETE FROM users WHERE id = '${req.params.id}'`;
  connection.query(deleteDBRecord, (err, result) => {
    if (err) throw err
    console.log(`${result.affectedRows} record has been deleted`);
    res.status(200).send('OK')
  })
})

module.exports = router;
