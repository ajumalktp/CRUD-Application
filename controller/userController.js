const express = require('express')
const userModel = require('../models/userModel')
const router = express.Router();

const getUserHome = (req,res)=>{
    if(req.session.user){
        res.render('userHome',{name:req.session.user.name})
    }else{
        res.redirect('/login')
    }
}
const getLogin =(req, res)=>{
    if(req.session.user){
        res.redirect('/')
    }
    else{
        res.render('userLogin')
    }
}
const getSignup = (req,res)=>{
    res.render('userSignUp')
}
const signUp = async(req, res)=>{
    const {name ,email, phone, password}=req.body;
    const duplicate = await userModel.findOne({email})

    if(email=="" || password=="" || phone =="" || password==""){
        const err = 'all field required'
        res.render('userSignUp', {err})
    }else{
        const user =new userModel({email:email,name:name,phone:phone,password:password})
        user.save()
        .then(result => {
            if(result){
                console.log(result)
                res.redirect('/login')
            }
        }).catch(error => {console.log(error);})
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

}
const userLogin = async(req, res)=>{
    const email = req.body.email
    const password =req.body.password

    const userOg=await userModel.findOne({email})
    if(userOg){
        if(password == userOg.password){
            req.session.user={
                id:userOg._id,
                name:userOg.name
            }
            res.redirect('/')
        }
    }else{
        const error = "no user found"
        res.render('userLogin',{error})
    }
}
const userLogout =(req, res)=>{
    req.session.user=null;
    res.redirect('/')
}
module.exports={getUserHome, getLogin, getSignup, userLogout,signUp, userLogin}