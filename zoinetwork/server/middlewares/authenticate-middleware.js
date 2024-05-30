const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

// Authentication middleware
const authenticate = async (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
      return res.status(400).json("unauthorized HTTP request, token not providedss")
    }
const jwtToken = token.replace("Bearer", "").trim();
  
    try{

      const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
      const userData = await User.findOne({ email: isVerified.email }).select({
        password:0
      })
      

      req.user = userData;
      req.token = token;
      req.userID = userData._id;
    next();

  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;
