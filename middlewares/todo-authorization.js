const { Todo } = require('../models/index');

async function TodoAuthorizationMiddleware(req, res, next) {
  // Cek jika user adalah si pembuat todo
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo) throw { name: 'NotFound' };
    if (todo.UserId !== req.user.id) throw { name: 'Forbidden' };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = TodoAuthorizationMiddleware;
  