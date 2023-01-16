
// external imports 

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const createError = require('http-errors')

// internal imports 

const User = require('../models/People')

const getLogin = (req, res, next) => {
    res.render('index')


}

const login = async (req, res, next) => {
    console.log('I am from controller')

    try {
        // find user from database

        const user = await User.findOne({
            $or:
                [{ email: req.body.username }, { mobile: req.body.username }]
        })
        console.log(user)

        if (user && user._id) {

            //  password validation 

            const isValidPassword = await bcrypt.compare(req.body.password, user.password)

            if (isValidPassword) {

                // make user object 

                const userObject = {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: 'user'
                }
                // make token 
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY

                })
                // set cookies 

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                })

                // set logged in user to the locals 
                res.locals.loggedInUser=userObject
                res.render('inbox')


            }
            else {

                throw createError('Login failed !! Try again')

            }


        }
        else {
            throw createError('Login failed !! Try again')

        }

    }
    catch (err) {
       
        res.render('index',{
            data:req.body.username,
            errors:{
                common:{
                    msg:err.message
                }
            }

        })

    }

}

module.exports = {
    getLogin,
    login
}