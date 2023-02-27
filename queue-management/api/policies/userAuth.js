const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

module.exports = async (req, res, next) => {
  try {
    //get token from cookies
    const token = req.cookies.token;

    let user = await User.findOne({ token: token });
    if (user) {
      //verify jwt with jsonwebtoken
      await jwt.verify(token, "secret");
      next();
    } else {
      console.log("user");
      res.sendStatus(403)
    }
  } catch (error) {
    //if error then give error
    // console.log(error);
    res.sendStatus(403)
  }
};
