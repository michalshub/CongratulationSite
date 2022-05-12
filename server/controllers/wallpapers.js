//wallpapers
const jwt = require('jsonwebtoken');
// const request = require('request');
const dotenv = require('dotenv');
const User = require('../models/User');
const Congratulation = require('../models/Congratulation');
const Wallpapers = require('../models/Wallpapers');
const Subcategory = require('../models/Subcategory');
dotenv.config();


const getWallpaperById = async (req, res) => {
  try {
    console.log("*********getWallpaperById");

    let wallPaper = await Wallpapers.findById(req.params.wallPaperId);
    if (wallPaper) {
      // console.log(wallPaper);
      res.status(200).send(wallpaper);
    }
    else
      res.send("wallPaper was not found");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getWallpaperBySubcategoryId = async (req, res) => {
  try {
    let subcategory = await Subcategory.findById(req.params.subcategoryId).populate('wallpapers');
    res.send({ "wallpapers": subcategory.wallpapers });
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllWallpaper = async (req, res) => {
  console.log("****************getAllWallpaper");
  try {
    let wallpapers = await Wallpapers.find()
    res.send({ "wallpapers": wallpapers });
  } catch (err) {
    res.status(500).json(err);
  }
}

const createWallpapers = async (req, res) => {
  try {
    let wallpaper = new Wallpapers(req.body);
    let subcategory = await Subcategory.findById(req.params.subcategoryId);
    wallpaper.subcategoryId = subcategory;
    await wallpaper.save();
    // console.log(wallpaper);
    // console.log(subcategory);
    subcategory.wallpapers.push(wallpaper);
    // let subcategory = await Subcategory.findByIdAndUpdate(req.params.subcategoryId, { $push: { wallpapers: wallpaper } })
    await subcategory.save();
    // console.log(subcategory);
    res.status(200).json({ newWallpaper: wallpaper })

  }
  catch (error) {
    res.status(400).send(error)
  }
}


const deleteWallpaperById = async (req, res) => {
  try {
    let wallpaper = await Wallpapers.findById(req.params.wallpaperId);
    if (wallpaper !== null) {
      let subcategory = await Subcategory.findById(wallpaper.subcategoryId);
      if (subcategory !== null) {
        subcategory.wallpapers.pull({ _id: wallpaper._id })
        await subcategory.save();
        wallpaper.remove();
        await wallpaper.save();
        res.status(200).send({ "message": "wallpaper is deleted" })
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })
  }
  catch (error) {
    res.status(500).json({ "error message": error.message })
  }
}

const updateWallpaperById = async (req, res) => {
  try {
    console.log("*********updateWallpaperById");

    let wall = await Wallpapers.findById(req.params.wallpaperId);
    // console.log(wall);
    if (wall) {
      let wallpaper = await Wallpapers.findByIdAndUpdate(req.params.wallpaperId, req.body)
      // console.log(wallpaper);
      if (wallpaper) {
        await wallpaper.save();
        res.status(200).send("the wallpaper is updated")
      }
      else res.status(500).json({ "error message": error.message })
    }
    else res.status(500).json({ "error message": error.message })

  }
  catch (err) {
    res.status(500).json({ "error message": error.message })
  }
}


module.exports = { createWallpapers, getWallpaperById, getWallpaperBySubcategoryId, deleteWallpaperById, updateWallpaperById, getAllWallpaper }






