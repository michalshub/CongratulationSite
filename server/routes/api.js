const router = require("express").Router();
const user = require('../controllers/user');
const wallpapers=require('../controllers/wallpapers');
const congratulation=require('../controllers/congratulation');
const category=require('../controllers/category');
const subcategory=require('../controllers/subCategory');
const mail=require('../nodeMailer');
const payment=require('../payment');
const personalCongratulation=require('../controllers/personalCongratulation');


router.post('/createUser',user.createUser);
router.get('/login/:name/:password',user.login);
router.get('/getAllUsers',user.getAllUsers);
router.get('/getUsersWithCons',user.getUsersWithCons);
router.patch('/updateUser/:email',user.updateUser);


router.post('/createWallpapers/:subcategoryId',wallpapers.createWallpapers);
router.get('/getWallpaperById/:wallPaperId',wallpapers.getWallpaperById);
router.get('/getAllWallpaper',wallpapers.getAllWallpaper);
router.get('/getWallpaperBySubcategoryId/:subcategoryId',wallpapers.getWallpaperBySubcategoryId);
router.delete('/deleteWallpaperById/:wallpaperId',wallpapers.deleteWallpaperById)
router.patch('/updateWallpaperById/:wallpaperId',wallpapers.updateWallpaperById);
// router.get('/getAllWallpapers',wallpapers.getAllWallpapers);

// router.post('/createCongratulation/:user/:subCategoryId',congratulation.createCongratulation);
router.post('/createCongratulation/:subCategoryId',congratulation.createCongratulation);
router.get('/getCongratulationsBySubcategoryId/:subcategoryId',congratulation.getCongratulationsBySubcategoryId);
router.get('/getAllCongratulations',congratulation.getAllCongratulations);
router.delete('/deleteCongratulationById/:congratulationId',congratulation.deleteCongratulationById)
router.patch('/updateCongratulationById/:congratulationId',congratulation.updateCongratulationById)
router.get('/getLastCongratulations',congratulation.getLastCongratulations)

router.post('/createCategory',category.createCategory);
router.get('/getAllCategories',category.getAllCategories);
router.delete('/deleteCategoryById/:categoryId',category.deleteCategoryById)
router.patch('/updateCategoryById/:categoryId',category.updateCategoryById);

router.post('/createSubCategory/:categoryId',subcategory.createSubCategory);
router.get('/getSubCategoriesByCategoryId/:categoryId',subcategory.getSubCategoriesByCategoryId);
router.get('/getSubCategoriesByCategoryName/:categoryName',subcategory.getSubCategoriesByCategoryName);
router.get('/getAllSubcategories',subcategory.getAllSubcategories);
router.delete('/deleteSubcategoryById/:subcategoryId',subcategory.deleteSubcategoryById);
router.patch('/updateSubcategoryById/:subcategoryId',subcategory.updateSubcategoryById);

router.post('/sendMail',mail.send);
router.get('/paymentGetTransactionId',payment.getTransactionId);
router.get('/paymentCreateTransactionId',payment.createTransactionId);
router.get('/paymentGetResult',payment.getResult);

// router.post('/createPersonalCongratulation/:userId/:subCategoryId',personalCongratulation.createPersonalCongratulation);
router.post('/createPersonalCongratulation/:email',personalCongratulation.createPersonalCongratulation);
router.get('/getAllPerCongratulationsByUserId/:email',personalCongratulation.getAllPerCongratulationsByUserId);
router.patch('/updatePerCongratulationById/:perCongratulationId',personalCongratulation.updatePerCongratulationById);
router.get('/getAllPersonalCongratulations',personalCongratulation.getAllPersonalCongratulations);
router.delete('/deletePerCongratulationById/:perCongratulationId',personalCongratulation.deletePerCongratulationById);

router.get('/checkMail/:email',user.checkMail);
router.get('/checkpassword/:password',user.checkpassword);
module.exports = router;
