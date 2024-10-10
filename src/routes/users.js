var express = require('express');
const { getUsers, createNewUser, updateUser, deleteUser } = require('../controllers/users.js');
var router = express.Router();

/* GET users listing. */
router.get('/:id?', getUsers);

/* POST users create. */
router.post('/create', createNewUser);

/* PUT users update. */
router.put('/update/:id', updateUser);

/* DELETE users delete. */
router.delete('/delete/:id', deleteUser);

module.exports = router;
