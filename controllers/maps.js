const Place = require('../models/place');
const mapBoxToken = process.env.MAPBOX_TOKEN;

module.exports.cluster = async (req, res) => {
    const places = await Place.find({}).populate('popupText');
    res.render('maps/cluster', { places })
}

module.exports.radius = async (req, res) => {
    const places = await Place.find({}).populate('popupText');
    res.render('maps/radius', { places })
}

module.exports.routes = async (req, res) => {
    const places = await Place.find({}).populate('popupText');
    res.render('maps/routes', { places })
}

