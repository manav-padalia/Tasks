const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

module.exports = async (req, res, next) => {
  try {
    //get token from cookies if store in cookie
    const token = req.cookies.token;

    // // if store in header authorization
    // const token =req.headers.authorization.split(" ")[1];
    let admin = await Admin.findOne({ token: token });
    if (admin) {
      await jwt.verify(token, "secret");
      next();
    } else {
      console.log("admin");
      res.sendStatus(403)
    }
    //verify jwt with jsonwebtoken
  } catch (error) {
    //if error then give error
    // console.log(error);
    res.sendStatus(403)
  }
};
