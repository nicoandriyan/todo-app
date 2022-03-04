function errorHandling(error, req, res, next) {
    let code;
    let message;
    if (error.name === "SequelizeValidationError") {
      code = 400;
      message = error.errors[0].message;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      code = 400;
      message = error.errors[0].message;
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
      code = 400;
      message = 'bad request';
    } else if (error.name === 'SignInFailed') {
      code = 401;
      message = 'wrong email/password'
    } 
    
    // handle new errors here
    else if (error.name === 'MissingToken') {
      code = 401;
      message = 'missing access token'
    } else if (error.name === 'JsonWebTokenError') {
      code = 401;
      message = 'jwt error'
    } else if (error.name === 'Unauthorized') {
      code = 401;
      message = 'unauthorized'
    } else if (error.name === 'Forbidden') {
      code = 403;
      message = 'forbidden'
    }
    
    else if (error.name === 'NotFound') {
      code = 404;
      message = 'not found';
    } else if (error.name === 'dateInvalid') {
      code = 400;
      message = 'invalid date format, try YYYY-MM-DD or MM/DD/YYYY';
    } else {
      code = 500;
      message = 'internal server error';
    }
    res.status(code).json({ message });
  }
  
  module.exports = errorHandling;
  