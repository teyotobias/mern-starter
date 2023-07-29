//server
const express = require('express')
const router = express.Router();
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// ALL paths start w /api/users

//POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

//protecting this specific route
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);


module.exports = router;
