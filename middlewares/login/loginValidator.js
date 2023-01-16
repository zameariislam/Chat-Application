const { check, validationResult } = require('express-validator')

const doLoginValidators = () => {

    return [
        check("username")
            .isLength({ min: 1 })
            .withMessage("Mobile number or email is required"),

        check("password")
            .isLength({ min: 1 })
            .withMessage("Password is required")

    ];



}


const loginValidationHandler = (req, res, next) => {

    const errors = validationResult(req)

    const mappedErrors = errors.mapped()
    console.log(mappedErrors)


    if ((Object.keys(mappedErrors)).length === 0) {
        console.log('No error')
        next()

    }
    else {
        res.render('index', {
            errors: mappedErrors

        })



    }

}



module.exports = {
    doLoginValidators,
    loginValidationHandler
}