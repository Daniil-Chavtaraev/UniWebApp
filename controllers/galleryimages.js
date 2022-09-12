const GalleryImage = require('../models/galleryimage');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const galleryimages = await GalleryImage.find({});
    res.render('galleryimages/index', { galleryimages })
}

module.exports.renderNewForm = (req, res) => {
    res.render('galleryimages/new');
}

module.exports.createGalleryImage = async (req, res, next) => {
    const galleryimage = new GalleryImage(req.body.galleryimage);
    galleryimage.author = req.user._id;
    await galleryimage.save();
    req.flash('success', 'Successfully added new image!');
    res.redirect(`galleryimages/`)
}
