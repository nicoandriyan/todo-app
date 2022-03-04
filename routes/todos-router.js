const router = require('express').Router();
const TodosController = require('./../controllers/todos-controller');
const TodoAuthorizationMiddleware = require('./../middlewares/todo-authorization');

// GET /todos
router.get('/', TodosController.findAll);

// GET /todos/:id
router.get('/:id', TodosController.findById);

// POST /todos
router.post('/', TodosController.addTodo);

// DELETE /todos/:id
router.delete('/:id', TodoAuthorizationMiddleware, TodosController.deleteTodo);

// PUT /todos/:id
router.put('/:id', TodoAuthorizationMiddleware, TodosController.updateTodo);

module.exports = router;
