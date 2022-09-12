const News = require('../models/news');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const news = await News.find({});
    res.render('news/index', { news })
}

module.exports.renderNewForm = (req, res) => {
    res.render('news/new');
}

module.exports.createNews = async (req, res, next) => {
    const news = new News(req.body.news);
    news.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    news.author = req.user._id;
    await news.save();
    req.flash('success', 'Successfully made a new article!');
    res.redirect(`/news/${news._id}`)
}

module.exports.showNews = async (req, res,) => {
    const news = await News.findById(req.params.id).populate('author');
    if (!news) {
        req.flash('error', 'Cannot find that article!');
        return res.redirect('/news');
    }
    res.render('news/show', { news });
}