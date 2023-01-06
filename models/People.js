
const mongoose = require('mongoose')

const peopleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,

            required: true,
            trim: true,
           
            unique:true,
            lowercase: true,
            validator: {
                validate: (v) => {
                    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v);
                }
            }
        },
        mobile: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true,
            validator: {
                validate: (v) => {
                    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) ;
                }
            }
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

const People = mongoose.model('People', peopleSchema)

module.exports = People