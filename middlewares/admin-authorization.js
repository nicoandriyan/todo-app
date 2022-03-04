function adminAuthorizationMiddleware(req, res, next) {
  // Cek if user role is admin, if not throw error
  try {
    if (req.user.role !== 'admin') throw { name: 'Forbidden' };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = adminAuthorizationMiddleware;
