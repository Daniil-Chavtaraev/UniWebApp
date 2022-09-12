const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galleryimageSchema = new Schema({
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("GalleryImage", galleryimageSchema);