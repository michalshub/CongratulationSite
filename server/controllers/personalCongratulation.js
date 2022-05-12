const User = require('../models/User');
const Congratulation = require('../models/Congratulation');
const Subcategory = require('../models/Subcategory');
const PersonalCongratulation = require('../models/PersonalCongratulation');

const createPersonalCongratulation = async (req, res) => {
  console.log("*********createPersonalCongratulation");

  try {
    let personalCongratulation = new PersonalCongratulation(req.body);
    // if(req.params.subCategoryId) {
    //   let subcategory = await Subcategory.findById(req.params.subCategoryId);
    //   personalCongratulation.subcategoryId = subcategory;
    //   await personalCongratulation.save();
    // }
    // let user= await User.findById(req.params.userId);
    console.log("ffv " + req.params.email);
    let user = await User.findOne({ email: req.params.email });
    personalCongratulation.userId = user._id;
    await personalCongratulation.save();
    console.log("P" + personalCongratulation);
    console.log("u" + user);
    user.congratulation.push(personalCongratulation);
    console.log("um" + user);

    await user.save();
    console.log("u2" + user);
    res.status(200).json({ newPersonalCongratulation: personalCongratulation })
  }
  catch (error) {
    res.status(400).send(error)
  }
}

const getAllPerCongratulationsByUserId = async (req, res) => {
  try {
    console.log("*********getAllPerCongratulationsByUserId");
    console.log(req.params.email);

    let user = await User.findOne({ email: req.params.email }).populate('congratulation');

    console.log(user);
    if (user) {
      let personalCongratulations = user.congratulation;
      res.status(200).send(user);
    }
    else res.status(400).send(error)
  }
  catch (error) {
    res.status(500).send(error)
  }
}


const updatePerCongratulationById = async (req, res) => {
  try {
    console.log("*********updatePerCongratulationById");

    let con = await PersonalCongratulation.findById(req.params.perCongratulationId);
    // console.log(con);
    if (con) {
      let myCongratulation = await PersonalCongratulation.findByIdAndUpdate(req.params.perCongratulationId, req.body)
      // console.log(myCongratulation);
      if (myCongratulation) {
        await myCongratulation.save();
        res.status(200).send("the congratulation is updated")
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })

  }
  catch (err) {
    res.status(500).json({ "error message": error.message })
  }
}

const deletePerCongratulationById = async (req, res) => {
  try {
    let perCongratulation = await PersonalCongratulation.findById(req.params.perCongratulationId);
    if (perCongratulation !== null) {
      let user = await User.findById(perCongratulation.userId);
      if (user !== null) {
        user.congratulation.pull({ _id: perCongratulation._id })
        await user.save();
        perCongratulation.remove();
        await perCongratulation.save();
        res.status(200).send({ "message": "perCongratulation is deleted" })
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })
  }
  catch (error) {
    res.status(500).json({ "error message": error.message })
  }
}


const getAllPersonalCongratulations = async (req, res) => {
  try {
    console.log("*********getAllPersonalCongratulations");

    let congratulations = await PersonalCongratulation.find();
    res.status(200).json({ personalCongratulations: congratulations })
  }
  catch (error) {
    res.status(400).send(error)
  }

}

module.exports = { createPersonalCongratulation, getAllPerCongratulationsByUserId, updatePerCongratulationById, deletePerCongratulationById, getAllPersonalCongratulations }
