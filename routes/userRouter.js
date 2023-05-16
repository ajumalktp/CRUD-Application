const express =require('express')
const router = express.Router();
const {getUserHome, getLogin, getSignup, userLogout,signUp, userLogin,getUserEdit,userEdit} =require('../controller/userController')
const userModel =require('../models/userModel')

router.get('/',getUserHome)
router.get('/login',getLogin)
router.get('/signUp',getSignup)
router.get('/logOut',userLogout)
router.get('/edit/:id',getUserEdit)

router.post('/login',userLogin)
router.post('/signUp',signUp)
router.post('/edit-user',userEdit)


module.exports = router;