//wallpapers
const jwt = require('jsonwebtoken');
// const request = require('request');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/CategoryCongratulate');
const Wallpapers = require('../models/Wallpapers');
const Subcategory = require('../models/Subcategory');
dotenv.config();



const createCategory = async (req, res) => {
    let flag = true;
    try {
        console.log("*********createCategory");
        let category = new Category();
        category.name = req.body.name;
        // console.log(category);
        await category.save();

        for (let i = 0; i < req.body.subCategories.length; i++) {
            try {
                let subCategory = new Subcategory(req.body.subCategories[i]);
                // console.log(subCategory);
                subCategory.categoryCongratulateId = category.id;
                await subCategory.save();
                if (subCategory) {
                    category.subCategories.push(subCategory)
                    await category.save();
                    // console.log(category);
                }
                else flag = false;
            }
            catch (error) {
                flag = false;
            }
        }
        if (flag)
            res.status(200).json({ newCategory: category });
        else res.status(400).send(error)

    }
    catch (error) {
        res.status(400).send(error)
    }
}


const getAllCategories = async (req, res) => {
    try {
        console.log("*********getAllCategories");

        let categories = await Category.find().populate('subCategories').populate('congratulation').populate('wallpapers');
        res.status(200).json({ allCategories: categories })
    }
    catch (error) {
        res.status(400).send(error)
    }
}


const deleteCategoryById = async (req, res) => {
    try {
        let category = await Category.findByIdAndDelete(req.params.categoryId);
        res.status(200).send({ "message": "category is deleted" })
    }
    catch (error) {
        res.status(500).json({ "error message": error.message })
    }
}


const updateCategoryById = async (req, res) => {
    try {
        let category = await Category.findByIdAndUpdate(req.params.categoryId, { name: req.body.name })
        for (let i = 0; i < req.body.subCategories.length; i++) {
            let sub = await Subcategory.findByIdAndUpdate(req.body.subCategories[i]._id, { name: req.body.subCategories[i].name })
            if (sub)
                await sub.save();
        }
        res.status(200).send("the wallpaper is updated")
    }
    catch (err) {
        res.status(500).json({ "error message": error.message })
    }
}


module.exports = { createCategory, getAllCategories, deleteCategoryById, updateCategoryById }






