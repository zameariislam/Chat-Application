
const multer = require('multer')
const createError = require('http-errors')

const uploader = (subfolder_path,
    allowed_file_tpes,
    max_file_size,
    error_message) => {


    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();

            cb(null, fileName + fileExt);
        },
    });


    // preapre the final multer upload object
    var upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size, 
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_tpes.includes(file.mimetype)) {

                cb(null, true);
            } else {
                cb(createError(error_message));
            }

        },
    });





    return upload

}

module.exports = uploader