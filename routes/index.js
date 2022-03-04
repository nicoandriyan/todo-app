const router = require('express').Router();
const TodosRouter = require('./todos-router');
const UsersRouter = require('./users-routes');
const RegisterController = require('../controllers/register-controller');
const SignInController = require('../controllers/sign-in-controller');
const errorHandlingMiddleware = require('./../middlewares/error-handling');
const adminAuthorizationMiddleware = require('./../middlewares/admin-authorization');
const authenticationMiddleware = require('./../middlewares/authentication');

// POST /sign-in
router.post('/sign-in', SignInController.signIn);

// POST /register
router.post('/register', RegisterController.register);

router.use(authenticationMiddleware)

router.use('/todos', TodosRouter);
router.use('/users', adminAuthorizationMiddleware, UsersRouter);

router.use(errorHandlingMiddleware);

module.exports = router;
