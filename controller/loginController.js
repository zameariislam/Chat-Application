
// external imports 


const jwt = require('jsonwebtoken');
const createError = require('http-errors')

// internal imports 

const User = require('../models/People')

const getLogin = (req, res, next) => {
    res.render('index')


}

const login = async (req, res, next) => {


    try {
        if (req.validUser) {

            // prepare the user object to generate token
            const userObject = {
                name: req.user.name,
                mobile: req.user.mobile,
                email: req.user.email,
                role: "user",
            };

            // make token 
            const token = jwt.sign(userObject , process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY

            })
            // set cookies 


            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.JWT_EXPIRY,
                httpOnly: true,
                signed: true
            })
            res.locals.loggedInUser = userObject
            res.render('inbox')

        }
        else {
            throw createError("Login failed! Please try again.");

        }


    }


    catch (err) {

        res.render('index', {
            data: req.body.username,
            errors: {
                common: {
                    msg: err.message
                }
            }

        })

    }

}
const logOut = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('logout')



}

module.exports = {
    getLogin,
    login,
    logOut
}