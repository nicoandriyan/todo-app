const { verify } = require('../helpers/jwt-helper');
const { User } = require('../models/index');

async function authenticationMiddleware(req, res, next) {
  const { access_token } = req.headers;
  try {
    // 1. Cek if access_token provided, if not throw error
    if (!access_token) throw { name: 'MissingToken' };
    // 2. Verify the token, if failed error will be thrown
    const { id, email } = verify(access_token);
    const user = await User.findOne({ where: {email} });
    // 3. Check if user exists, if not throw error
    if (!user) throw { name: 'Unauthenticated' };
    // 4. Attach user object to the request, so it can be used by other processes later
    req.user =  {
      id: user.id,
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authenticationMiddleware;
