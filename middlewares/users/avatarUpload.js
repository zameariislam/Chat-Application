
const upload = require('multer-uploader')
const path = require('path')

const avatarUpload = (req, res, next) => {
    // absolute path of your upload directory

    const uploadDir = path.join(__dirname, '../../public/uploads/avatar')
    const max_file_size = 1000000;
    const allowed_file_mime_type = ["image/png", "image/jpg", "image/jpeg"];

    upload(uploadDir, max_file_size, allowed_file_mime_type)
        .single('avatar')(req, res, (err) => {
            if (err) {
                const user=req.body
                res.render('users',{
                    user,
                    
                })
               



            }
            else {
                next()


            }

        })










}

module.exports = avatarUpload