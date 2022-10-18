const jwt = require('jsonwebtoken');
const AuthService = require('../service/AuthService');

verifyToken = async (req, res, next) => {
  try{
    const { authorization } = req.headers;
    const aceessToken = authorization.split("Bearer")[1].trim();    
    const authService = new AuthService();
    const verificationResult = authService.verifyAccessToken(aceessToken);
    req.userId = verificationResult.id;
    next();
  } catch(err) {
    req.userId = null
    next();
  }
}

module.exports = verifyToken;
