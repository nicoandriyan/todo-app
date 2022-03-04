const { User } = require('./../models/index');

class UsersController {

    static async findAll(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }

    static async findById(req, res, next) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) throw { name: 'NotFound' };
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async addUser(req, res, next) {
        const { username, email, password, role } = req.body;
        try {
            const result = await User.create({ username, email, password, role });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = UsersController
