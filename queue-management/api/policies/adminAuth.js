const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

module.exports = async (req, res, next) => {
  try {
    //get token from cookies
    const token = req.cookies.token;

    let admin = await Admin.findOne({token: token})
    if (admin) {
      await jwt.verify(token, "secret");
      next();
    } else {
      console.log("admin");
      res.json({ message: "Auth fail." });
    }
    //verify jwt with jsonwebtoken
  } catch (error) {
    //if error then give error
    console.log(error);
    res.json({ message: "Auth fail." });
  }
};