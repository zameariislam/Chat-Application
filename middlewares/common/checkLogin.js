// external import

const jwt = require('jsonwebtoken')

const checkLogin = (req, res, next) => {

    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
    if (cookies) {
        try {
            let token = cookies[process.env.COOKIE_NAME]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)


            // pass user info to response locals
            if (res.locals.html) {
                console.log('I am inlocal')
                res.locals.loggedInUser = decoded
            }
            req.user = decoded
            next()

        }
        catch (err) {
            if (res.locals.html) {
                res.redirect('/')

            }
            else {
                res.status(500).json({

                    errors: {
                        common: {
                            msg: err.message
                        }
                    }

                })
            }

        }



    }
    else {
        if (res.locals.html) {
            res.redirect('/')
        }
        else {
            res.status(401).json({
                error: 'Authentication Failure'

            })
        }


    }




}
const redirectLogIn = (res, req, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) {
        next()
    }
    else {
        res.redirect('/')
    }

}


module.exports = checkLogin