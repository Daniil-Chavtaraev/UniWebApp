const express = require('express');
const router = express.Router();
const galleryimages = require('../controllers/galleryimages');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');



const GalleryImage = require('../models/galleryimage');

router.route('/')
    .get(catchAsync(galleryimages.index))
    .post(isLoggedIn, catchAsync(galleryimages.createGalleryImage))


router.get('/new', isLoggedIn, galleryimages.renderNewForm)



module.exports = router;