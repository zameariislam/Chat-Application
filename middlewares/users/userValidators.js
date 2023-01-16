
const createError = require('http-errors')
const { validationResult, check } = require('express-validator')
const fs = require('fs')
const path = require('path')
const User = require('../../models/People')

const addUserValidators = () => {

    return [
        check("name")
            .isLength({ min: 1 })
            .withMessage("Name must not contain anything other than alphabet")
            .isAlpha("en-US", { ignore: " -" })

            .trim(),
        check("email")
            .isLength({ min: 1 })
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email address")
            .trim()
            .custom(async (value) => {
                try {
                    const user = await User.findOne({ email: value });
                    if (user) {
                        throw createError("Email already in use!");
                    }
                } catch (err) {
                    throw createError(err.message);
                }
            }),
        check("mobile")
            .isLength({ min: 1 })
            .withMessage("Mobile number is required")
            .isMobilePhone('da-DK', {
                strictMode: true,
            })
            .withMessage("Mobile number must be a valid Denish mobile number")
            .custom(async (value) => {
                try {
                    const user = await User.findOne({ mobile: value });
                    if (user) {
                        throw createError("Mobile number already in use!");
                    }
                } catch (err) {
                    throw createError(err.message);
                }
            }),
        check("password")
            .isLength({ min: 1 })
            .withMessage("Password is required")
            .isStrongPassword()
            .withMessage(
                "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
            ),
    ];





}


const addUserValidationHandler = (req, res, next) => {

    const errors = validationResult(req)

    const mappedErrors = errors.mapped()


    if ((Object.keys(mappedErrors)).length === 0) {
        next()

    }
    else {
        res.status(500).json({
            errors: mappedErrors

        })









    }




}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}