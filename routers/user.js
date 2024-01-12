const express = require('express')
const { UserlogInPage,UserSignUpPage ,createNewUser, handleUserLogIn} = require('../controllers/user')

router = express.Router()

router.route('/').get((req,res)=>res.redirect('/'))
router.route('/signup').get(UserSignUpPage).post(createNewUser)
router.route('/login').get(UserlogInPage).post(handleUserLogIn)

module.exports = router