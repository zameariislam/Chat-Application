
const bcrypt = require('bcrypt');
const User = require('../models/People')

// get users page 

const getUsers = (req, res, next) => {
   try {
      res.render('users')

   }
   catch (err) {
      next(err)

   }



}

//  add users 

const addUser = async (req, res, next) => {

   console.log(req.body)
   console.log(req.file)
   let newUser;

   // try {
   //    const hashedPassward = await bcrypt.hash(req.body.password, 10)

   //    if (req.files && req.files.length > 0) {
   //       newUser = new User({
   //          ...req.body,
   //          avatar: req.files[0].filename,
   //          password: hashedPassward,
   //       })


   //    }
   //    else {
   //       newUser = new User({
   //          ...req.body,
   //          password: hashedPassward

   //       })
   //    }

   //    const result = await newUser.save()

   //    res.status(200).json({
   //       message: 'User was added successfully'
   //    })

   // }
   // catch (err) {
   //    res.status(500).json({
   //       errors: {
   //          common: {
   //             message: 'Unknown Error Occured  !!!'
   //          }
   //       }
   //    })

   // }




}
module.exports = {
   getUsers,
   addUser
}