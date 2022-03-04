const { Todo } = require('./../models/index');
const moment = require('moment');

class TodosController {

    static async findAll(req, res, next) {
        try {
            const todos = await Todo.findAll({ where: { UserId: req.user.id } });
            res.status(200).json(todos);
        } catch (error) {
            next(error)
        }
    }

    static async findById(req, res, next) {
        const { id } = req.params;
        try {
            const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
            if (!todo) throw { name: 'NotFound' };
            res.status(200).json(todo);
        } catch (error) {
            next(error);
        }
    }

    static async addTodo(req, res, next) {
        const { title, description, due_date } = req.body;
        try {
            if (!moment(due_date).isValid()) throw { name: 'dateInvalid' };
            const result = await Todo.create({ title, description, UserId: req.user.id, due_date });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    static async deleteTodo(req, res, next) {
        const { id } = req.params;
        try {
            const result = await Todo.destroy({ where: { id } });
            if (!result) throw { name: 'NotFound' };
            res.status(200).json({ message: 'todo has been successfully deleted' });
        } catch (error) {
            next(error);
        }
    }

    static async updateTodo(req, res, next) {
        const { id } = req.params;
        const { title, description, due_date } = req.body;
        try {
            if (due_date) {
                if (!moment(due_date).isValid()) throw { name: 'dateInvalid' };
            }
            const result = await Todo.update({ title, description, due_date }, { where: { id }, returning: true });
            if (!result[0]) throw { name: 'NotFound' };
            res.status(200).json(result[1][0]);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = TodosController