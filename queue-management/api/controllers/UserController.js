/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//require crypto for generate id for all database value
const { randomUUID } = require("crypto");
//require bcryptjs for bcrypt password and check bcrypt password
const bcrypt = require("bcryptjs");
//require jsonwebtoken for token generation
const jwt = require("jsonwebtoken");
//for set cookie require cookie-parser
const cookieParser = require("cookie-parser");

module.exports = {
  //create new user with user signup
  register: async (req, res) => {
    // take firstname, lastname, email & password from boody and take current time
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const date = new Date().getTime();

    //if user have already have account then give message that already have account else create new
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(400).json({message:"This Email is already register please login."});
    } else {
      await User.create({
        id: randomUUID(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        createdAt: date,
        updatedAt: date,
      });
      res.status(200).json({message: "Signup successfully."});
    }
  },

  login: async (req, res) => {
    //get email and password from body
    const email = req.body.email;
    const password = req.body.password;

    //find admin with email
    const user = await User.findOne({ email: email });

    //if user not find then show message to check Email
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: email }, "secret");
        res.cookie("token", token, {});
        await User.updateOne({ id: user.id }).set({ token: token });
        res.status(200).json({message: "Login sucess"});
      }
      //if password was incorrect then give error of check password
      else {
        res.status(401).json({message: "Please check Password"});
      }
    } else {
      res.status(401).json({message: "Please check Email"});
    }
  },

  logout: async (req, res) => {
    //get token from cookies
    const token = req.cookies.token;
    //find user with token
    const user = await User.findOne({ token: token });
    //update token to null
    await User.updateOne({ id: user.id }).set({ token: null });
    //clear token from cookie
    res.clearCookie("token");
    res.status(200).json({message: "Logout successfully."});
  },
};
