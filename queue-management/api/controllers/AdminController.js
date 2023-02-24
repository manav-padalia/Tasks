/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const express = require("express");
//require bcryptjs for bcrypt password and check bcrypt password
const bcrypt = require("bcryptjs");
//require jsonwebtoken for token generation
const jwt = require("jsonwebtoken");

//for set cookie require cookie-parser
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

module.exports = {
  //static admin login
  adminLogin: async (req, res) => {
    //get email and password from body
    const email = req.body.email;
    const password = req.body.password;

    //find admin with email
    const admin = await Admin.findOne({ email: email });

    //if admin was awailable then check password else throuth error to check id
    if (admin) {
      if (await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ email: email, id: admin.id }, "secret");
        res.cookie("token", token, {});
        await Admin.updateOne({ id: admin.id }).set({
          token: token,
        });

        res.redirect("/adminplace");
      }
      //if password was incorrect then give error of check password
      else {
        res.json({ message: "Please Check password" });
      }
    } else {
      res.json({ message: "Please Check Email" });
    }
  },

  //admin logout with authantication
  adminLogout: async (req, res) => {
    //get token from cookies
    const token = req.cookies.token;
    //find admin with token
    const admin = await Admin.findOne({ token: token });
    //update token to null
    await Admin.updateOne({ id: admin.id }).set({ token: null });
    //clear token from cookie
    res.clearCookie("token");
    res.json({ message: "Admin logout successfully" });
  },
};
