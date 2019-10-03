const mongoose = require('mongoose');

const Product = mongoose.model('Product');

const getAll = (req, res) => {
    Product.find()
        .exec()
        .then(products => res.json(products))
        .catch(err => res.status(500).json(err));
};

const create = (req, res) => {
    Product.create(req.body)
        .then(createdProduct => res.json(createdProduct))
        .catch(err => res.status(500).json(err));
}

const update = (req, res) => {
    Product.findOneAndUpdate({ id: req.params.id }, req.body)
        .exec()
        .then(product => res.json(product))
        .catch(err => res.status(500).json(err));
}

const remove = (req, res) => {
    Product.deleteOne({ id: req.params.id })
        .exec()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json(err));
}

module.exports = {
    getAll,
    create,
    update,
    remove
}
