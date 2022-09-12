const express = require('express');
const router = express.Router();
const maps = require('../controllers/maps');
const catchAsync = require('../utils/catchAsync');

const Place = require('../models/place');

router.route('/cluster')
    .get(catchAsync(maps.cluster))

router.route('/radius')
    .get(catchAsync(maps.radius))

router.route('/routes')
    .get(catchAsync(maps.routes))


module.exports = router;