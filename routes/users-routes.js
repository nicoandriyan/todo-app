const router = require('express').Router();
const UsersController = require('./../controllers/users-controller')

// ONLY USER ROLE ADMIN CAN ACCESS THIS ROUTES

// GET /users
router.get('/', UsersController.findAll);

// GET /users/:id
router.get('/:id', UsersController.findById);

// POST /users
router.post('/', UsersController.addUser);

module.exports = router;
