const { check, validationResult } = require('express-validator')
const User = require('../../models/People')
const createError = require('http-errors')
const { unlink } = require('fs')
const path = require('path')


const addUserValidators = [check('name')
    .trim()
    .isEmpty()
    .withMessage('Name is Required')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Name must not contain anything other than alphabet'),
   

check('email').
    isEmail().
    withMessage('Invalid Email Adress')
    .trim()
    .custom(async (value,{req}) => {
        try {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject()

            }
            else{
                return Promise.resolve()
            }


        }
        catch (err) {
            throw createError(err.message)

        }
    })
    .withMessage("Email is already in use"),
check('mobile')
    .isMobilePhone('bn-BD', {
        strictMode: true
    })
    .withMessage('Mobile number must be a valid Bangladeshi mobile number')
    .custom(async (value) => {
        try {
            const user = await User.findOne({ mobile: value })
            if (user) {

                throw createError('Mobile Already in use !!')
            }

        }
        catch (err) {
            throw createError(err.message)

        }

    }),
check('password')
    .isStrongPassword()
    .withMessage('Password must be at least 8 character long and should contain 1 lower case, 1 usercase. 1 number and 1 symbol ')

]
const addUserValidationHandler = (req, res, next) => {

    const erros = validationResult(req)
    const mappedErrors = erros.mapped()
    if (Object.keys(mappedErrors).length === 0) {
        next()
    }
    else {
        // remove uploaded files
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (err) => {
                    if (err) console.log(err);
                }
            );

        }

        // response the errors 

        res.status(500).json({
            errors:mappedErrors
        })


    }




}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}