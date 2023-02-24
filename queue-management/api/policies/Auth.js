const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

module.exports = async (req, res, next) => {
  try {
    //get token from cookies
    const token = req.cookies.token;
    //verify jwt with jsonwebtoken
    await jwt.verify(token, "secret");
    next()
  } 
  //if error then give error 
  catch (error) {
    res.json({message: 'Auth fail.'})
  }
};
