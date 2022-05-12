
const User = require('../models/User');
const Congratulation = require('../models/Congratulation');
const Subcategory = require('../models/Subcategory');

const createCongratulation = async (req, res) => {

  console.log("*********createCongratulation");


  try {
    // const congratulation = new Congratulation(req.body);
    // await congratulation.save();
    // // let user = await User.findByIdAndUpdate(req.params.user, { $push: { congratulation: congratulation } })
    // // await user.save();
    // let subcategory = await Subcategory.findByIdAndUpdate(req.params.subCategoryId, { $push: { congratulation: congratulation } })
    // await subcategory.save();
    // console.log(subcategory);
    // res.status(200).json({ newCongratulation: congratulation })

    let congratulation = new Congratulation(req.body);
    let subcategory = await Subcategory.findById(req.params.subCategoryId);
    congratulation.subcategoryId = subcategory;
    await congratulation.save();
    // console.log(congratulation);
    // console.log(subcategory);
    subcategory.congratulation.push(congratulation);
    // let subcategory = await Subcategory.findByIdAndUpdate(req.params.subcategoryId, { $push: { wallpapers: wallpaper } })
    await subcategory.save();
    // console.log(subcategory);
    res.status(200).json({ newCongratulation: congratulation })
  }
  catch (error) {
    res.status(400).send(error)
  }
}

const getCongratulationsBySubcategoryId = async (req, res) => {
  try {
    let congratulations = await Congratulation.findById(req.params.subcategoryId)
    res.status(200).json({ congratulations: congratulations })
  }
  catch (error) {
    res.status(400).send(error)
  }
}

const getAllCongratulations = async (req, res) => {
  try {
    console.log("*********getAllCongratulations");

    let congratulations = await Congratulation.find();
    res.status(200).json({ congratulations: congratulations })
  }
  catch (error) {
    res.status(400).send(error)
  }

}
const getLastCongratulations = async (req, res) => {
  try {
    console.log("*********getLastCongratulations");
    let congratulations = await Congratulation.find().sort({ $natural: -1 }).limit(10)
    // console.log(congratulations);
    res.status(200).json({ congratulations: congratulations })

  }
  catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
}

const deleteCongratulationById = async (req, res) => {
  try {
    let myCongratulation = await Congratulation.findById(req.params.congratulationId);
    if (myCongratulation !== null) {
      let subcategory = await Subcategory.findById(myCongratulation.subcategoryId);
      if (subcategory !== null) {
        subcategory.congratulation.pull({ _id: myCongratulation._id })
        await subcategory.save();
        myCongratulation.remove();
        await myCongratulation.save();
        res.status(200).send({ "message": "myCongratulation is deleted" })
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })
  }
  catch (error) {
    res.status(500).json({ "error message": error.message })
  }
}


const updateCongratulationById = async (req, res) => {
  try {
    console.log("*********updateCongratulationById");

    let con = await Congratulation.findById(req.params.congratulationId);
    // console.log(con);
    if (con) {
      let myCongratulation = await Congratulation.findByIdAndUpdate(req.params.congratulationId, req.body)
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
module.exports = { getLastCongratulations, createCongratulation, getCongratulationsBySubcategoryId, getAllCongratulations, deleteCongratulationById, updateCongratulationById }
