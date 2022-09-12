const express = require('express');
const router = express.Router();
const news = require('../controllers/news');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const News = require('../models/news');

router.route('/')
    .get(catchAsync(news.index))
    .post(isLoggedIn, upload.array('image'), catchAsync(news.createNews))


router.get('/new', isLoggedIn, news.renderNewForm)

router.route('/:id')
    .get(catchAsync(news.showNews))

module.exports = router;