const jwt = require('jsonwebtoken');
// const request = require('request');
const dotenv = require('dotenv');
const User = require('../models/User');
const Congratulation = require('../models/Congratulation');
const Subcategory = require('../models/Subcategory');
dotenv.config();


const login = async (req, res) => {
  try {
    console.log("*********login");
    let user = await User.findOne({
      name: req.params.name, password: req.params.password
    }).populate('congratulation');
    if (user < 1) {
      console.log("user was not found");
      res.send({ "messege": "The user is not defined, Please register" });
    }
    else {
      let token = jwt.sign({ email: req.params.email, password: req.params.password }, process.env.ACSSES_TOKEN_SECRET);
      console.log("user logged in");
      res.send({ "messege": "You have successfully logged in", user, token });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}




const createUser = async (req, res) => {
  console.log("*********create user");
  const { name, email, password } = req.body;
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);
  let newUser = new User({
    name,
    email,
    password
  });

  try {
    await newUser.save();
    console.log("save");
    let token = jwt.sign({ name: req.body.name, password: req.body.password, email: req.body.email }, process.env.ACSSES_TOKEN_SECRET)
    console.log(token);
    console.log(newUser);
    res.status(200).json({ user: newUser, token })
  }
  catch (error) {
    res.status(400).send(error)
  }
}
const updateUser = async (req, res) => {
  try {
    console.log(req.params.email);
    console.log(req.body.password);
    let userUpdate = await User.findOneAndUpdate({email: req.params.email}, {$set: {password: req.body.password}},{useFindAndModify: false})
    res.status(200).send({message:"user update"})
  }
  catch (error) {
    res.status(500).json({ "error message": error.message })
  }
}
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({ users: users })
  }
  catch (error) {
    res.status(400).send(error)
  }
}
const getUsersWithCons = async (req, res) => {
  try {
    console.log("***********getUsersWithCons");
      let users = await User.find({$expr:{$gt:[{$size:"$congratulation"}, 0]}})
  // console.log("users:" +users);
    res.status(200).send(users)
  }
  catch (error) {
    res.status(400).send(error)
  }
}
// const requestApi = (date) => {
//   return new Promise((resolve, reject) => {
//     let options = {
//       method: "GET",
//       url: `https://api.nasa.gov/planetary/apod?api_key=AxYmZ2SvB2PTSWPxZAiityAhRqk4cgPndlrKE6YU&date=${date}`

//     }

//     request(options, (err, res, body) => {
//       if (err)
//         reject(err)
//       else {
//         resolve(body)
//       }
//     })

//   })
// }
const checkMail = async (req, res) => {
  try {
    console.log("*********checkMail");
    let mail = await User.findOne({
      email: req.params.email
    })
    if (mail < 1) {
      console.log("mail was not found");
      res.send({ "messege": "mail was not found" });
    }
    else {
      res.send({ "messege": "mail was found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const checkpassword = async (req, res) => {
  try {
    console.log("*********checkMail");
    let mail = await User.findOne({
       password: req.params.password
    })
    if (mail < 1) {
      console.log("password was not found");
      res.send({ "messege": "password was not found" });
    }
    else {
      res.send({ "messege": "password was found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}


module.exports = { createUser, login, getAllUsers, updateUser,getUsersWithCons,checkMail,checkpassword }




