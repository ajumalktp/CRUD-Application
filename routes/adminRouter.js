const express = require('express')
const router = express.Router()
const { adminHome, adminLogin, login, logOut, getEditUser, editUser, deleteUser, searchUser, createUser, getCreateUser } = require('../controller/adminController');
const {route} = require('./userRouter')



router.get('/',adminHome)
router.get('/adminLogin',adminLogin)

router.post('/adminLogin',login)
router.get('/logOut',logOut)

router.get("/edit/:id", getEditUser)
router.post("/edit-user", editUser)
router.get("/delete-user/:id", deleteUser)
router.post("/search-user", searchUser)
router.get('/create-user',getCreateUser)
router.post('/create-users',createUser)

module.exports = router;