const authService = require('../services/auth-service');
const {successResponse,errorResponse, isValidEmail} = require('../utils/utils');

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const result = await authService.signup(req.body);
    successResponse(res,result,200);
  } catch (err) {
    console.error(err);
    errorResponse(res,err.message || 'Server error',err.status || 500);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    if(!email || isValidEmail(email)===false){
      return errorResponse(res, 'Invalid email format', 422);
    }
    const result = await authService.login(req.body);
    console.log(result);
    successResponse(res,result,200);
  } catch (err) {
    console.error(err);
    errorResponse(res,err.message || 'Server error',err.status || 500);
  }
};

module.exports = { signup, login };
