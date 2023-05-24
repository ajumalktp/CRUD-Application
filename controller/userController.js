const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const multer = require('multer')


var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'public/image/')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
  }
})
var upload = multer({
  storage:storage,
}).single("image")

const getUserHome = async (req, res) => {
    if (req.session.user) {
      const user = await userModel.findById(req.session.user.id).lean();
      console.log("user", user);

      res.render("userHome", { user });
    } else {
      res.redirect("/login");
    }
};

const getLogin = (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("userLogin");
  }
};
const getSignup = (req, res) => {
  res.render("userSignUp");
};
const signUp = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const duplicate = await userModel.findOne({ email });
  
  if (email == "" || password == "" || phone == "" || password == "") {
    const err = "all field required";
    res.render("userSignUp", { err });
  } else {
    const user = new userModel({
      email: email,
      name: name,
      phone: phone,
      password: password,
    });
    if(req.file){
      user = new userModel({
        image:req.file.filename
      })
    }
    user
      .save()
      .then((result) => {
        if (result) {
          console.log(result);
          res.redirect("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //else{
  //     const user =new userModel({email:email,name:name,phone:phone,password:password})
  //     user.save((err,data)=>{
  //         if(err){
  //             console.log(err);
  //         }else{
  //             res.redirect('./login')
  //         }
  //     })
  // }
};
const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userOg = await userModel.findOne({ email });
  if (userOg) {
    if (password == userOg.password) {
      req.session.user = {
        id: userOg._id,
        name: userOg.name,
      };
      res.redirect("/");
    }
  } else {
    const error = "user not found";
    res.render("userLogin", { error });
  }
};
const getUserEdit = async (req, res) => {
  const _id = req.params.id;
  const user = await userModel.findOne({ _id }).lean();
  res.render("userEdit", { user });
};
const userEdit = async (req, res) => {
  const _id = req.body._id;
  if(req.file){
  await userModel.findByIdAndUpdate(_id, {
    $set: {
      image:req.file.filename
    },
  });
}
await userModel.findByIdAndUpdate(_id, {
  $set: {
    ...req.body
  },
});
  console.log(req.body);
  res.redirect("/");
};
const userLogout = (req, res) => {
  req.session.user = null;
  res.redirect("/");
};
module.exports = {
  getUserHome,
  getLogin,
  getSignup,
  userLogout,
  signUp,
  userLogin,
  getUserEdit,
  userEdit,
  upload
};
