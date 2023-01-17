const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../../models/People')

const doLoginValidators = () => {

    return [
        check('username')
            .isLength({ min: 1 })
            .toLowerCase()
            .trim()
            .withMessage("Username is required !!")

            .custom(async (value, { req }) => {
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: value },
                            { mobile: value }
                        ]
                    });
                    if (user) {

                        req.user = {
                            name: user.name,
                            email: user.email,
                            mobile: user.mobile,
                            password: user.password,
                            role: 'user'

                        }
                        return Promise.resolve()

                    }
                    else {
                        return Promise.reject()
                    }
                } catch (err) {
                    throw createError(err.message);
                }
            })
            .withMessage('User not Found'),

        check('password')
            .isLength({ min: 1 })
            .withMessage("Password is required !!")
            .custom(async (password, { req }) => {
                try {
                    
                    const isValidPassword = await bcrypt.compare(password, req.user.password)
                   

                    if (isValidPassword) {
                        req.validUser = true
                        return Promise.resolve()


                    }
                    else {
                        return Promise.reject()

                    }

                } catch (err) {
                    throw createError(err.message);
                }
            })
            .withMessage('Password does not Match !!')


    ];



}


const loginValidationHandler = (req, res, next) => {

    const errors = validationResult(req)

    const mappedErrors = errors.mapped()



    if ((Object.keys(mappedErrors)).length === 0) {

        next()

    }
    else {
        console.log(mappedErrors)

        res.render('index', {
            errors: mappedErrors

        })



    }

}



module.exports = {
    doLoginValidators,
    loginValidationHandler
}