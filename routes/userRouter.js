const express =require('express')
const router = express.Router();
const {getUserHome, getLogin, getSignup, userLogout,signUp, userLogin} =require('../controller/userController')
const userModel =require('../models/userModel')

router.get('/',getUserHome)
router.get('/login',getLogin)
router.get('/signUp',getSignup)
router.get('/logOut',userLogout)

router.post('/login',userLogin)
router.post('/signUP',signUp)


module.exports = router;