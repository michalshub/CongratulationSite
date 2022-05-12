const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/CategoryCongratulate');
const Wallpapers = require('../models/Wallpapers');
const Subcategory = require('../models/Subcategory');
dotenv.config();



const createSubCategory = async (req, res) => {
  try {
    let subcategory = new Subcategory(req.body);
    console.log("gg "+req.body.subCategory);
    let category = await Category.findById(req.params.categoryId);
    console.log("mm "+category.name);
    subcategory.categoryCongratulateId = category;
    subcategory.name = req.body.subCategory;
    await subcategory.save();
    console.log("gg "+subcategory);
    console.log(category);
    await category.subCategories.push(subcategory);
    await category.save();
    // console.log(subcategory);
    res.status(200).json({ newSubcategory: subcategory })
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    let subcategories = await Subcategory.find({ categoryCongratulateId: req.params.categoryId }).populate('congratulation').populate('wallpapers');
    if (subcategories)
      res.status(200).json({ subcategories: subcategories });
    else
      res.send('subcategories were not found');
  }
  catch (error) {
    res.status(400).send(error);
  }
}
const getSubCategoriesByCategoryName = async (req, res) => {
  try {
    let subcategories = await Subcategory.find({ name: req.params.categoryName }).populate('congratulation').populate('wallpapers');
    if (subcategories)
      res.status(200).json({ subcategories: subcategories[0] });
    else
      res.send('subcategories were not found');
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const getAllSubcategories = async (req, res) => {
  console.log("*********getAllSubcategories");

  try {
    let subcategories = await Subcategory.find().populate('congratulation').populate('wallpapers');
    if (subcategories) {
      // console.log(subcategories);
      res.status(200).json({ subcategories: subcategories });
    }
    else{
      res.send('subcategories were not found');
    }
  }
  catch (err) {
    res.status(400).send(err);

  }
}



const deleteSubcategoryById = async (req, res) => {
  try {
    let subcategory = await Subcategory.findById(req.params.subcategoryId);
    if (subcategory !== null) {
      let category = await Category.findById(subcategory.categoryCongratulateId);
      if (category !== null) {
        category.subCategories.pull({ _id: subcategory._id })
        await category.save();
        subcategory.remove();
        await subcategory.save();
        res.status(200).send({ "message": "subcategory is deleted" })
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })
  }
  catch (error) {
    res.status(500).json({ "error message": error.message })
  }
}


const updateSubcategoryById = async (req, res) => {
  try {
    console.log("*********updateSubcategoryById");

    let sub = await Subcategory.findById(req.params.subcategoryId);
    // console.log(sub);
    if (sub) {
      let subcategory = await Subcategory.findByIdAndUpdate(req.params.subcategoryId, req.body)
      // console.log(subcategory);
      if (subcategory) {
        await subcategory.save();
        res.status(200).send("the subcategory is updated")
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })

  }
  catch (err) {
    res.status(500).json({ "error message": error.message })
  }
}

module.exports = { createSubCategory,getSubCategoriesByCategoryName, getSubCategoriesByCategoryId, getAllSubcategories, deleteSubcategoryById, updateSubcategoryById }