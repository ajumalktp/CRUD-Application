const express = require('express')
const userModel = require('../models/userModel')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const app = express()


var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'public/image/')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
  }
})
var upload = multer({storage:storage}).single("image")


const adminHome = async(req,res)=>{
    const users=await userModel.find().lean();
    
    if(req.session.admin){
        res.render('adminHome', {users})
    }else{

        res.redirect('/admin/adminLogin')
    }
}

const adminLogin = (req,res)=>{
    if(req.session.admin){
     res.redirect('/admin')   
    }else{

        res.render('adminLogin')
    }
}

const login =(req,res)=>{
    const email = 'admin@gmail.com'
    const password ='1234'
    const error = 'User not found!!!!'
    
    if(email == req.body.email && password == req.body.password){
        req.session.admin={
            id:email
        }
        res.redirect('/admin/')
    }else{
        res.render('adminLogin',{error})
    }  
}

const logOut = (req,res)=>{

    req.session.admin=null
    res.redirect('/admin/adminLogin')
}


const getEditUser=async (req, res)=>{
    const _id=req.params.id;
    const user=await userModel.findOne({_id}).lean();
    // console.log(user)
    res.render("editUser", {user})
}
const editUser=async (req, res)=>{
    const _id=req.body._id
        if(req.file){
            await userModel.findByIdAndUpdate(_id,{
                $set:{
                    ...req.body,
                    image:req.file.filename,
                }
            })
        }else{
            await userModel.findByIdAndUpdate(_id,{
                $set:{
                    ...req.body
                }
            })
        }
    
    
    
    res.redirect("/admin/")
}

const deleteUser= async(req,res)=>{
    const id = req.params.id
    await userModel.deleteOne({_id:id})
    res.redirect('/admin/')
}


const searchUser= async(req,res)=>{
    const name= req.body.name
    const users= await userModel.find({name: new RegExp(name, "i")}).lean();

    res.render('adminHome', {users})
}

const createUser = async (req,res)=>{
    const {name, email, phone , password} = req.body;
    const duplicate = await userModel.findOne({email})
    const error = "Email already exists"
    if(duplicate){
        res.render('createUser',{error})
    }else{
    if(req.file){
         user =new userModel({email:email,name:name,phone:phone,password:password,image:req.file.filename
        })
        }else{
            user =new userModel({email:email,name:name,phone:phone,password:password
            })
        }
     
    
    user.save()
    .then(result => {
        if(result){
            console.log(result)
            res.redirect('/admin')
        }
    }).catch(error => {console.log(error);})
}

    }

const getCreateUser = (req,res)=>{
    res.render('createUser')
}


module.exports={
  adminHome,adminLogin,login,logOut,deleteUser, editUser, getEditUser, searchUser,createUser,getCreateUser,upload,
}